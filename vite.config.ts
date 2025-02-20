import fs from "node:fs";
import path from "node:path";
import react from "@vitejs/plugin-react";
import postcssNesting from "postcss-nesting";
import { type Plugin, defineConfig } from "vite";
import dts from "vite-plugin-dts";

const root = path.resolve(__dirname, "designsystem");
const dist = path.resolve(__dirname, "mtds"); // Using mtds as dist name for readable clojurescript imports: (io/resource "mtds/logo.svg")
const version = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "package.json"), "utf-8")
).version.replace(/\./g, "-");
const cssModulesMap: Record<string, string> = {}; // Used to create a map of all CSS modules classes
const cssPropsRename: Plugin = {
  name: "Rename Desigynsystemet CSS variables and layers to avoid conflicts with existing Desginsystemet installations",
  transform: (code) => ({
    map: null,
    code: code
      .replace(/--ds-size-/g, "--ds-")
      .replace(/--ds(c?)-/g, `--ds$1${version}-`)
      .replace(/@layer [^;]+/g, (m) =>
        m.replace(/\b(ds|mt)\./g, `$1.v${version}`)
      ),
  }),
};

export default defineConfig(({ mode }) =>
  mode === "iife"
    ? {
        build: {
          emptyOutDir: false,
          outDir: dist,
          sourcemap: true,
          lib: {
            entry: path.resolve(root, "index.ts"),
            cssFileName: "iife",
            fileName: "[name]",
            formats: ["iife"],
            name: "mtds",
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
                  Object.entries(json).filter(([key]) => key[0] !== "_")
                ) // Skip private keys (starting with _)
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
                  .join("")}};`
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

              // Insert @layer directive to ensure correct order when loading with TailwindCSS
              fs.writeFileSync(
                css,
                `@layer base, tailwind-base, ds, mt;${fs.readFileSync(css, "utf-8").replace('@charset "UTF-8";', "")}`
              );
              fs.writeFileSync(json, JSON.stringify(cssModulesMap, null, 2));
            },
          },
          cssPropsRename,
        ],
        build: {
          outDir: dist,
          sourcemap: true,
          lib: {
            entry: [
              path.resolve(root, "index.ts"),
              path.resolve(root, "react.tsx"),
            ],
            cssFileName: "styles",
            fileName: "[name]",
          },
          rollupOptions: {
            // Externalize React
            external: ["react", "react-dom", "react/jsx-runtime"],
            output: {
              format: "es",
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
      }
);
