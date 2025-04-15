import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const dist = path.resolve(__dirname, "mtds"); // Using mtds as dist name for readable clojurescript imports: (io/resource "mtds/logo.svg")
const { version } = JSON.parse(
	fs.readFileSync(path.resolve(__dirname, "package.json"), "utf-8"), // Read version from package.json
);

export const cssPropsRename: Plugin = {
	name: "Rename Desigynsystemet CSS variables and layers to avoid conflicts with existing Desginsystemet installations",
	transform: (code) => ({
		map: null,
		code: code
			.replace(/::details-content/g, "::part(details-content)") // Fix for LightningCSS missing support in TurboPack
			.replace(/--ds-color-primary-/g, "--ds-color-main-")
			.replace(/--ds-size-/g, "--mtds-")
			.replace(/--ds(c?)-/g, "--mtds$1-")
			.replace(/@layer [^;]+/g, (m) =>
				m.replace(/\b(ds|mt)\./g, `$1.v${version.replace(/\./g, "-")}`),
			),
	}),
};

export const cssToTailwind: Plugin = {
	name: "Generate Tailwind config",
	writeBundle: () => {
		const css = fs.readFileSync(path.resolve(dist, "styles.css"), "utf-8");
		const tailwind: string[] = ["--font-sans: var(--ds-font-family)"];
		const tokens = Array.from(
			new Set(css.match(/--mtds-[^:)]+/g)),
			(m) => m,
		).sort((a, b) =>
			a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
		);

		// Scrape tokens relevant for Tailwind
		for (const token of tokens) {
			if (
				token.startsWith("--mtds-color-") &&
				!token.startsWith("--mtds-color-focus")
			) {
				tailwind.push(
					`--color-${token.replace("--mtds-color-", "")}: var(${token})`,
				);
			} else if (token.startsWith("--mtds-font-weight-")) {
				tailwind.push(
					`--font-weight-${token.replace("--mtds-font-weight-", "")}: var(${token})`,
				);
			} else if (token.match(/--mtds-border-radius-(sm|md|lg|xl)/)) {
				// Not including "full" as this crashes with Tailwind
				tailwind.push(
					`--radius-${token.replace("--mtds-border-radius-", "")}: var(${token})`,
				);
			} else if (token.match(/--mtds-body-(sm|mg|lg)-body-font-size/)) {
				tailwind.push(
					`--text-${token.replace("--mtds-body-", "").replace("-font-size", "")}: var(${token})`,
				);
			} else if (token.match(/^--mtds-\d$/)) {
				tailwind.push(
					`--spacing-${token.replace("--mtds-", "")}: var(${token})`,
				);
			}
		}

		// Make [data-colors] dynamically change also Tailwind colors
		const dynamicColors = `[data-color] {
      --color-background-default: var(--mtds-color-background-default);
      --color-background-tinted: var(--mtds-color-background-tinted);
      --color-surface-default: var(--mtds-color-surface-default);
      --color-surface-tinted: var(--mtds-color-surface-tinted);
      --color-surface-hover: var(--mtds-color-surface-hover);
      --color-surface-active: var(--mtds-color-surface-active);
      --color-border-subtle: var(--mtds-color-border-subtle);
      --color-border-default: var(--mtds-color-border-default);
      --color-border-strong: var(--mtds-color-border-strong);
      --color-text-subtle: var(--mtds-color-text-subtle);
      --color-text-default: var(--mtds-color-text-default);
      --color-base-default: var(--mtds-color-base-default);
      --color-base-hover: var(--mtds-color-base-hover);
      --color-base-active: var(--mtds-color-base-active);
      --color-base-contrast-subtle: var(--mtds-color-base-contrast-subtle);
      --color-base-contrast-default: var(--mtds-color-base-contrast-default);
    }`;

		fs.writeFileSync(
			path.resolve(dist, "tailwind.css"),
			`@theme {${tailwind.map((str) => `\n\t${str};`).join("")}\n}\n${dynamicColors}`,
		);
	},
};
