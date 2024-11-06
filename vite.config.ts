import { defineConfig } from 'vite';
import postcssNesting from 'postcss-nesting';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import fs from 'node:fs';

const pkg = JSON.parse(String(fs.readFileSync(path.resolve(__dirname, './package.json'))));
const root = path.resolve(__dirname, 'designsystem');
const dist = path.resolve(__dirname, 'dist');
const isVitepress = process.env.npm_lifecycle_script?.includes('vitepress');

export default defineConfig(isVitepress ? {} : {
  css: { postcss: { plugins: [postcssNesting] } }, // Polyfill support modern CSS nesting for Samsung Internet
  plugins: [
    dts({
      entryRoot: root,
      outDir: dist,
      beforeWriteFile: (filePath, content) => ({
        filePath,
        content: content.replace(/\.module\.css/g, '.module.css.js') // Correct CSS modules types
      }),
    }),
  ],
  build: {
    // LESS is not happy if a CSS rule ends in a custom property without trailing ;
    // Example: Sad LESS: .hello { --custom: red } vs. happy LESS: .hello { --custom: red; }
    // Therefore we need to disable css minification at this point
    cssMinify: false,
    sourcemap: true,
    outDir: dist,
    lib: {
      entry: path.resolve(root, 'index.ts'),
      fileName: '[name]',
      formats: ['es']
    },
    rollupOptions: {
      // Creating regexes of the packages to make sure subpaths of the packages are also treated as external
      // See https://github.com/rollup/rollup/issues/3684#issuecomment-926558056
      external: Object.keys(pkg.dependencies).map((name) => new RegExp(`^${name}(/.*)?`)),
      // Needed to truly enable being treeshakable when Vite is in lib mode
      // https://stackoverflow.com/questions/74362685/tree-shaking-does-not-work-in-vite-library-mode
      output: {
        preserveModules: true,
        preserveModulesRoot: root
      },
    }
  }
});
