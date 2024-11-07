import { defineLoader } from 'vitepress';
import fs from 'node:fs';
import path from 'node:path';

declare const data: Data;
const cwd = process.cwd();
const pub = path.join(cwd, 'public');

export type Data = string[][];
export { data }

export default defineLoader({
  watch: [path.join(pub, '**/*.svg')],
	async load(watchedFiles): Promise<Data> {
    return await Promise.all(watchedFiles.map(async (file) =>
      [path.resolve(cwd, file).slice(pub.length), await fs.promises.readFile(file, 'utf-8')]
  ));
	},
});

// import fs from 'node:fs'
// import { parse } from 'csv-parse/sync'

// export default {
//   watch: ['./data/*.csv'],
//   load(watchedFiles) {
//     // watchedFiles will be an array of absolute paths of the matched files.
//     // generate an array of blog post metadata that can be used to render
//     // a list in the theme layout
//     return watchedFiles.map((file) => {
//       return parse(fs.readFileSync(file, 'utf-8'), {
//         columns: true,
//         skip_empty_lines: true
//       })
//     })
//   }
// }