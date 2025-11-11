import fs from "node:fs";
import path from "node:path";
import react from "@vitejs/plugin-react";
import postcssNesting from "postcss-nesting";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import pkg from "./package.json";
import {
	cssPropsRename,
	cssToTailwind,
	preserveUseClient,
} from "./vite.plugins";

const root = path.resolve(__dirname, "designsystem");
const dist = path.resolve(__dirname, "mtds"); // Using mtds as dist name for readable clojurescript imports: (io/resource "mtds/logo.svg")
const cssModulesMap: Record<string, string> = {}; // Used to create a map of all CSS modules classes

export default defineConfig(({ mode }) =>
	// IIFE builds can contain dash to enable i.e. `iife-atlas`
	mode.startsWith("iife")
		? {
				build: {
					emptyOutDir: !mode.includes("-"), // IIFE build without dash is the first to build
					outDir: dist,
					lib: {
						entry: path.resolve(root, `${mode.split("-")[1] || "index"}.ts`),
						cssFileName: "iife",
						fileName: "[name]",
						formats: ["iife"],
						name: `mtds${mode.split("-")[1] || ""}`,
					},
				},
			}
		: {
				css: {
					postcss: { plugins: [postcssNesting] }, // Polyfill support modern CSS nesting for Samsung Internet
					modules: {
						// Cache, but await writing file as dist might be cleared
						getJSON: (_, json) =>
							Object.assign(
								cssModulesMap,
								Object.fromEntries(
									Object.entries(json).filter(([key]) => key[0] !== "_"),
								), // Skip private keys (starting with _)
							),
					},
				},
				plugins: [
					react(),
					dts({
						beforeWriteFile: (filePath, content) => ({
							filePath,
							content: content.replace(
								`export * as styles from './styles.module.css';`, // Fix CSS modules in .d.ts,
								`export declare const styles: {\r\n${Object.keys(cssModulesMap)
									.map((key) => `${key}: string;\r\n`)
									.join("")}};`,
							),
						}),
						entryRoot: root,
						outDir: dist,
					}),
					{
						name: "Generate CSS modules map to styles.json and add ensure correct order when loading with TailwindCSS",
						writeBundle: () => {
							const css = path.resolve(dist, "styles.css");
							const json = path.resolve(dist, "styles.json");
							const prefix = "@layer base, tailwind-base, ds, mt;";

							// Insert @layer directive to ensure correct order when loading with TailwindCSS
							fs.writeFileSync(
								css,
								`${[prefix, ...fs.readFileSync(css, "utf-8").split(prefix)].join("")}`,
							);
							fs.writeFileSync(json, JSON.stringify(cssModulesMap, null, 2));
						},
					},
					cssToTailwind,
					cssPropsRename,
				],
				build: {
					emptyOutDir: false, // This runs after IIFE build, so we don't want to clear the dist folder
					outDir: dist,
					sourcemap: true,
					lib: {
						entry: [
							path.resolve(root, "index.ts"),
							path.resolve(root, "atlas.ts"),
							path.resolve(root, "react.tsx"),
						],
						cssFileName: "styles",
						fileName: "[name]",
						formats: ["es"],
					},
					rollupOptions: {
						plugins: [preserveUseClient],
						// Externalize React
						external: [
							"react",
							"react-dom",
							"react/jsx-runtime",
							...Object.keys(pkg.dependencies),
						].map((name) => new RegExp(`^${name}(/.*)?`)),
						output: {
							// Needed to truly enable being treeshakable when Vite is in lib mode
							// https://stackoverflow.com/questions/74362685/tree-shaking-does-not-work-in-vite-library-mode
							preserveModules: true,
							preserveModulesRoot: root,
							// See https://github.com/rollup/rollup/issues/3684#issuecomment-1535836196
							entryFileNames: ({ name }) =>
								`${name.includes("node_modules") ? name.replace(/node_modules/, "external") : "[name]"}.js`,
						},
					},
				},
			},
);
