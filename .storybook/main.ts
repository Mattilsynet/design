import fs from "node:fs";
import path from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";
import fg from "fast-glob";
import { version } from "../package.json";
import illustrations from "../public/illustrations/illustrations.json";

const PUBLIC_DIR = path.resolve("./public");
const FOLDERS = "@(identitet|designsystem|profilering)";
const IGNORE = "!(avatar|chip)";

export default {
	stories: [
		`../${FOLDERS}/**/${IGNORE}.mdx`,
		`../${FOLDERS}/**/${IGNORE}.stories.@(js|jsx|mjs|ts|tsx)`,
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
		"@storybook/addon-storysource",
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
      window.VERSION = ${JSON.stringify(version)};
      window.SVGS = ${JSON.stringify(
				fg.sync(path.join(PUBLIC_DIR, "**", "*.svg")).map((file) => ({
					file: path.relative(PUBLIC_DIR, file),
					categories: illustrations[path.basename(file)] ?? [],
					svg: fs.readFileSync(file, { encoding: "utf-8" }),
				})),
			)};
    </script>`,
} satisfies StorybookConfig;
