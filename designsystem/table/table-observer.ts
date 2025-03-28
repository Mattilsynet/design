import styles from "../styles.module.css";
import { IS_BROWSER, QUICK_EVENT, attr, on } from "../utils";

function handleInject(event: Event & { animationName?: string }) {
  if (event.animationName !== styles._onInjectTable) return;
  const table = event.target as HTMLTableElement;
  const ths: string[] = []; // Add data-th="" to each cell to support data-mobile designs

  attr(table, "role", "table"); // Add helping role="" to ensure screen readers understand the table regardless of CSS display
  if (table.caption) attr(table.caption, "role", "caption");
  for (const group of [table.tHead, table.tFoot, ...table.tBodies])
    if (group) {
      attr(group, "role", "rowgroup");
      const isTbody = group.nodeName === "TBODY";

      for (const row of group.rows) {
        attr(row, "role", "row");
        for (const cell of row.cells) {
          if (isTbody) attr(cell, "data-th", ths[cell.cellIndex] || ":empty");
          else ths.push(cell.innerText.trim()); // Using innerText to only include visible text
          if (cell.nodeName === "TD") attr(cell, "role", "cell");
          else {
            attr(cell, "role", isTbody ? "rowheader" : "columnheader");
            attr(cell, "scope", isTbody ? "row" : "col");
          }
        }
      }
    }
}

if (IS_BROWSER)
  on(document, 'animationend', handleInject, QUICK_EVENT);
