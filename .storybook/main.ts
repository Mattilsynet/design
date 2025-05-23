import fs from "node:fs";
import path from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";
import fg from "fast-glob";

const root = process.cwd();
const pkg = JSON.parse(
	fs.readFileSync(path.resolve(root, "package.json"), "utf-8"),
);
const illustrations = JSON.parse(
	fs.readFileSync(
		path.resolve(root, "public/illustrations/illustrations.json"),
		"utf-8",
	),
);

const PUBLIC_DIR = path.resolve("./public");
const DESIGN_DIR = path.resolve("./designsystem");
const FOLDERS = "@(identitet|designsystem|profilering)";

// Generate overview.mdx
const stories = fg
	.sync(path.join(DESIGN_DIR, "*/*.stories.tsx"))
	.sort()
	.map((file) => ({
		name: path
			.basename(path.dirname(file))
			.replace(/./, (m) => m.toUpperCase()),
		file: path.relative(DESIGN_DIR, file),
	}));

fs.writeFileSync(
	path.join(DESIGN_DIR, "overview.mdx"),
	`{/* THIS FILE IS AUTOGENERATED */}
import { Meta } from '@storybook/blocks';
import { SquaresFourIcon } from "@phosphor-icons/react";
import { Overview } from '../.storybook/blocks';
${stories.map(({ name, file }) => `import * as ${name} from './${file}';`).join("\n")}

<Meta title="Designsystem/Komponenter" />

# <SquaresFourIcon /> Komponenter

<Overview items={[${stories.map(({ name }) => name).join(", ")}]} />`,
);

export default {
	stories: [
		`../${FOLDERS}/**/*.mdx`,
		`../${FOLDERS}/**/*.stories.@(js|jsx|mjs|ts|tsx)`,
	],
	addons: [
		{
			name: "@storybook/addon-essentials",
			options: {
				// disable the addons
				actions: false,
				backgrounds: false,
				highlight: false,
				toolbars: false,
			},
		},
		"@storybook/addon-mdx-gfm",
		"@storybook/addon-storysource",
		"@storybook/addon-themes",
	],
	core: {
		disableTelemetry: true,
	},
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	typescript: {
		check: false,
		reactDocgen: false, // Speed up as we put all props in argTypes
	},
	// Expose package versions and icons
	previewHead: (head) =>
		`${head}<script>
      window.VERSION = ${JSON.stringify(pkg.version)};
      window.SVGS = ${JSON.stringify(
				fg.sync(path.join(PUBLIC_DIR, "**", "*.svg")).map((file) => {
					const data = illustrations[path.basename(file)] || [];

					return {
						categories: data[0]?.split(",") || [],
						file: path.relative(PUBLIC_DIR, file),
						svg: fs.readFileSync(file, { encoding: "utf-8" }),
						tags: data[1]?.split(",") || [],
					};
				}),
			)};
    </script>`,
} satisfies StorybookConfig;
