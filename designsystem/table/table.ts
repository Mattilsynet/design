import styles from '../styles.module.css';
import { onAdd } from '../utils';
const CSS_TABLE = styles.table.split(' ')[0];
const BOUND = new WeakMap<Element | Document, ReturnType<typeof onAdd>>();

function process(tables: HTMLCollectionOf<Element>) {
  for(const table of tables) if (table instanceof HTMLTableElement) {
    const ths = Array.from(table.tHead?.rows[0]?.cells || [], (el) => el.innerText?.trim()); // Using innerText to only include visible text
    console.log(ths);
    for (const tbody of table.tBodies) {
      for (const row of tbody.rows) {
        for (const cell of row.cells) {
          cell.setAttribute('data-th', ths[cell.cellIndex] || ':empty'); // Using U+200B to prevent empty string from collapsing
        }
      }
    }
  }
}

export function observe (el: Element | Document) {
  const tables = el.getElementsByClassName(CSS_TABLE);
  const add = onAdd(styles.tableChildAdded, () => process(tables));
  BOUND.set(el, add);
  add.observe(el);
}

export function unobserve (el: Element | Document) {
  BOUND.get(el)?.disconnect(el);
}
