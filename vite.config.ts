import fs from 'node:fs';
import path from 'node:path';
import postcssNesting from 'postcss-nesting';
import { defineConfig } from 'vite';

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
    {
      name: 'Generate CSS modules map to styles.json',
      generateBundle: () => fs.writeFileSync(path.resolve(dist, 'styles.json'), JSON.stringify(cssMap, null, 2))
    }
  ],
  build: {
    cssMinify: false, // Prevent LESS crash when CSS rule ends in a custom property without trailing ; (i.e. div { --custom: red })
    sourcemap: true,
    outDir: dist,
    lib: {
      name: 'mtds',
      cssFileName: 'styles',
      entry: path.resolve(root, 'index.ts'),
      fileName: '[name]',
      formats: ['es', 'iife']
    }
  }
});
