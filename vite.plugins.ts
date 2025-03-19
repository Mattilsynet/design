import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const dist = path.resolve(__dirname, "mtds"); // Using mtds as dist name for readable clojurescript imports: (io/resource "mtds/logo.svg")
const { version } = JSON.parse(fs.readFileSync(path.resolve(__dirname, "package.json"), "utf-8")); // Read version from package.json

export const cssPropsRename: Plugin = {
  name: "Rename Desigynsystemet CSS variables and layers to avoid conflicts with existing Desginsystemet installations",
  transform: (code) => ({
    map: null,
    code: code
      .replace(/--ds-color-primary-/g, "--ds-color-main-")
      .replace(/--ds-size-/g, "--mtds-")
      .replace(/--ds(c?)-/g, '--mtds$1-')
      .replace(/@layer [^;]+/g, (m) =>
        m.replace(/\b(ds|mt)\./g, `$1.v${version.replace(/\./g, "-")}`)
      ),
  }),
};

export const cssToTailwind: Plugin = {
  name: "Generate Tailwind config",
  writeBundle: () => {
    const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
    const css = fs.readFileSync(path.resolve(dist, "styles.css"), 'utf-8');

    const tokens = Array.from(
      new Set(css.match(/--mtds-[^:)]+/g)),
      (m) => m,
    ).sort(collator.compare);

    const tailwind: string[] = ['--font-default: var(--ds-font-family)'];

    for (const token of tokens) {
      if (token.startsWith('--mtds-color-') && !token.startsWith('--mtds-color-focus')){
        tailwind.push(`--color-${token.replace('--mtds-color-', '')}: var(${token})`);
      } else if (token.startsWith('--mtds-font-weight-')){
        tailwind.push(`--font-weight-${token.replace('--mtds-font-weight-', '')}: var(${token})`);
      } else if (token.match(/--mtds-border-radius-(sm|lg|xl|full)/)){
        tailwind.push(`--radius-${token.replace('--mtds-border-radius-', '')}: var(${token})`);
      } else if (token.match(/--mtds-body-(sm|mg|lg)-body-font-size/)){
        tailwind.push(`--text-${token.replace('--mtds-body-', '').replace('-font-size', '')}: var(${token})`);
      } else if (token.match(/^--mtds-\d$/)) {
        tailwind.push(`--spacing-${token.replace('--mtds-', '')}: var(${token})`);
      }
    };

    fs.writeFileSync(path.resolve(dist, "tailwind.css"), `@theme {${tailwind.map((str) => `\n\t${str};`).join('')}\n}`);
  },
};