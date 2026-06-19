import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = await fs.mkdtemp(path.join(os.tmpdir(), "mtds-component-metadata-"));

try {
	const result = spawnSync(process.execPath, ["scripts/generate-component-metadata.mjs"], {
		cwd: root,
		env: {
			...process.env,
			MTDS_COMPONENT_CONTRACTS_PATTERN:
				"scripts/fixtures/component-metadata/**/*.contract.ts",
			MTDS_COMPONENT_METADATA_OUTPUT_DIR: outputDir,
		},
		encoding: "utf8",
	});

	assert.equal(
		result.status,
		0,
		`metadata generator failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
	);

	const files = (await fs.readdir(outputDir)).sort();
	assert.deepEqual(files, [
		"fixture-contract.component.json",
		"fixture-no-content.component.json",
	]);

	const fixtureContract = JSON.parse(
		await fs.readFile(path.join(outputDir, "fixture-contract.component.json"), "utf8"),
	);
	assert.equal(fixtureContract.name, "FixtureContract");
	assert.equal(fixtureContract.fixedAttributes["data-fixed"], "fixed");
	assert.equal(fixtureContract.defaultAttributes.type, "button");
	assert.deepEqual(
		fixtureContract.parameters.map((parameter) => parameter.type),
		["string", "enum", "boolean"],
	);
	assert.deepEqual(fixtureContract.parameters[1].values, ["primary", "25", "true"]);

	const noContent = JSON.parse(
		await fs.readFile(path.join(outputDir, "fixture-no-content.component.json"), "utf8"),
	);
	assert.equal(noContent.content, false);
	assert.equal(noContent.defaultAttributes.type, "text");
} finally {
	await fs.rm(outputDir, { recursive: true, force: true });
}
