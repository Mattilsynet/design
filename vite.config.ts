import fs from 'node:fs';
import path from 'node:path';
import postcssNesting from 'postcss-nesting';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';;

const root = path.resolve(__dirname, 'designsystem');
const dist = path.resolve(__dirname, 'mtds'); // Using mtds as dist name for readable clojurescript imports: (io/resource "mtds/logo.svg")
const isVitepress = process.env.npm_lifecycle_script?.includes('vitepress');
const cssMap = {};

export default defineConfig(isVitepress ? {} : {
  css: {
    postcss: { plugins: [postcssNesting] }, // Polyfill support modern CSS nesting for Samsung Internet
    modules: { getJSON: (_, json) => Object.assign(cssMap, json) } // Cache, but await writing file as dist might be cleared
  },
  plugins: [
    dts({
      beforeWriteFile: (filePath, content) => ({
        filePath,
        content: content.replace(
          `export * as styles from './styles.module.css';`, // Fix CSS modules in .d.ts,
          `export declare const styles: {\r\n${Object.keys(cssMap).map((key) => `${key}: string;\r\n`).join('')}};`
        )
      }),
      entryRoot: root,
      outDir: dist
    }),
    {
      name: 'Generate CSS modules map to styles.json',
      generateBundle: () => fs.writeFileSync(path.resolve(dist, 'styles.json'), JSON.stringify(cssMap, null, 2))
    }
  ],
  build: {
    cssMinify: false, // Prevent LESS crash when CSS rule ends in a custom property without trailing ; (i.e. div { --custom: red })
    outDir: dist,
    sourcemap: true,
    lib: {
      entry: path.resolve(root, 'index.ts'),
      cssFileName: 'styles',
      fileName: '[name]',
    },
    rollupOptions: {
      output: [{
        format: 'es',
        // Needed to truly enable being treeshakable when Vite is in lib mode
        // https://stackoverflow.com/questions/74362685/tree-shaking-does-not-work-in-vite-library-mode
        preserveModules: true,
        preserveModulesRoot: root,
        // See https://github.com/rollup/rollup/issues/3684#issuecomment-1535836196
        entryFileNames: ({ name }) => `${name.includes('node_modules') ? name.replace(/node_modules/, 'external') : '[name]'}.js`
      }, {
        format: 'iife',
        name: 'mtds'
      }],
    }
  }
});
