import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import fg from "fast-glob";
import { createServer } from "vite";

const root = process.cwd();
const contractsPattern =
	process.env.MTDS_COMPONENT_CONTRACTS_PATTERN ??
	"designsystem/**/*.contract.ts";
const outputDir = path.resolve(
	root,
	process.env.MTDS_COMPONENT_METADATA_OUTPUT_DIR ??
		path.join("mtds", "component-metadata"),
);
const supportedParameterTypes = new Set(["string", "boolean", "enum"]);

function fail(message) {
	throw new Error(`[component-metadata] ${message}`);
}

function isObject(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertString(value, description) {
	if (typeof value !== "string" || value.length === 0) {
		fail(`${description} must be a non-empty string`);
	}
}

function assertOptionalBoolean(value, description) {
	if (value !== undefined && typeof value !== "boolean") {
		fail(`${description} must be a boolean when provided`);
	}
}

function assertAttributeMap(value, description) {
	if (value === undefined) return;
	if (!isObject(value)) fail(`${description} must be an object when provided`);

	for (const [key, entry] of Object.entries(value)) {
		assertString(key, `${description} key`);
		assertString(entry, `${description}.${key}`);
	}
}

function validateParameter(parameter, contractName, sourceFile, index) {
	const location = `${sourceFile} ${contractName}.parameters[${index}]`;
	if (!isObject(parameter)) fail(`${location} must be an object`);

	if (parameter.name !== undefined) {
		assertString(parameter.name, `${location}.name`);
	}
	assertString(parameter.attribute, `${location}.attribute`);

	const type = parameter.type ?? "string";
	if (!supportedParameterTypes.has(type)) {
		fail(
			`${location}.type must be one of ${Array.from(supportedParameterTypes).join(", ")}`,
		);
	}

	assertOptionalBoolean(parameter.required, `${location}.required`);
	if (parameter.default !== undefined) {
		assertString(parameter.default, `${location}.default`);
	}

	if (type === "enum") {
		assertString(parameter.enumName, `${location}.enumName`);
		if (!Array.isArray(parameter.values) || parameter.values.length === 0) {
			fail(`${location}.values must be a non-empty string array`);
		}
		parameter.values.forEach((value, valueIndex) =>
			assertString(value, `${location}.values[${valueIndex}]`),
		);
	} else if (parameter.enumName !== undefined || parameter.values !== undefined) {
		fail(`${location} can only define enumName/values when type is "enum"`);
	}
}

function validateContract(contract, sourceFile, index) {
	if (!isObject(contract)) {
		fail(`${sourceFile} export ${index + 1} must be an object`);
	}

	const location = `${sourceFile} ${contract.name ?? `export ${index + 1}`}`;
	assertString(contract.name, `${location}.name`);
	assertString(contract.className, `${location}.className`);
	assertString(contract.tag, `${location}.tag`);
	assertOptionalBoolean(contract.content, `${location}.content`);
	assertAttributeMap(contract.fixedAttributes, `${location}.fixedAttributes`);
	assertAttributeMap(contract.defaultAttributes, `${location}.defaultAttributes`);

	if (contract.parameters !== undefined) {
		if (!Array.isArray(contract.parameters)) {
			fail(`${location}.parameters must be an array when provided`);
		}
		contract.parameters.forEach((parameter, parameterIndex) =>
			validateParameter(parameter, contract.name, sourceFile, parameterIndex),
		);
	}
}

function moduleContracts(module, sourceFile) {
	const exported = module.default ?? module.contracts ?? module.contract;
	if (exported === undefined) {
		fail(`${sourceFile} must default-export a component contract`);
	}
	return Array.isArray(exported) ? exported : [exported];
}

function kebabCase(value) {
	return value
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/[^A-Za-z0-9]+/g, "-")
		.replace(/^-|-$/g, "")
		.toLowerCase();
}

function outputFileName(sourceFile, contract, contractCount) {
	if (contractCount === 1) {
		return `${path.basename(sourceFile, ".contract.ts")}.component.json`;
	}
	return `${kebabCase(contract.name)}.component.json`;
}

const server = await createServer({
	root,
	configFile: false,
	logLevel: "error",
});

try {
	const sourceFiles = (
		await fg(contractsPattern, {
			cwd: root,
			onlyFiles: true,
		})
	).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

	if (sourceFiles.length === 0) {
		fail(`No component contracts found with pattern ${contractsPattern}`);
	}

	await fs.rm(outputDir, { recursive: true, force: true });
	await fs.mkdir(outputDir, { recursive: true });

	const outputFiles = new Set();

	for (const sourceFile of sourceFiles) {
		const module = await server.ssrLoadModule(`/${sourceFile}`);
		const contracts = moduleContracts(module, sourceFile);

		contracts.forEach((contract, index) => {
			validateContract(contract, sourceFile, index);
		});

		for (const contract of contracts) {
			const fileName = outputFileName(sourceFile, contract, contracts.length);
			if (outputFiles.has(fileName)) {
				fail(`Duplicate generated metadata filename ${fileName}`);
			}
			outputFiles.add(fileName);

			await fs.writeFile(
				path.join(outputDir, fileName),
				`${JSON.stringify(contract, null, 2)}\n`,
			);
		}
	}

	console.log(
		`Generated ${outputFiles.size} component metadata file(s) in ${path.relative(root, outputDir)}`,
	);
} finally {
	await server.close();
}
