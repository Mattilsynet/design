import styles from '../styles.module.css';
import { attr, onMutation } from '../utils';
const CSS_TABLE = styles.table.split(' ')[0];

function process(tables: HTMLCollectionOf<Element>) {
  for(const table of tables) if (table instanceof HTMLTableElement) {
    const ths = Array.from(table.tHead?.rows[0]?.cells || [], (el) => el.innerText?.trim()); // Using innerText to only include visible text
    for (const tbody of table.tBodies) {
      for (const row of tbody.rows) {
        for (const cell of row.cells) {
          attr(cell, 'data-th', ths[cell.cellIndex] || ':empty');
        }
      }
    }
  }
}

export const observe = (el: Element) => onMutation(el, CSS_TABLE, process);
export const unobserve = (el: Element) => onMutation(el, CSS_TABLE, false);
