import styles from "../styles.module.css";
import { attr, on, onLoaded, onMutation } from "../utils";

const CSS_TABLE = styles.table.split(" ")[0];
const INTERACTIVE = 'a,button,label,input,select,textarea,[role="button"]';

function handleTableMutation(tables: HTMLCollectionOf<HTMLTableElement>) {
	for (const table of tables) {
		const ths = Array.from(table.tHead?.rows[0]?.cells || [], (th) =>
			th.innerText.trim(),
		);

		for (const tbody of table.tBodies)
			for (const row of tbody.rows)
				for (const cell of row.cells)
					attr(cell, "data-th", ths[cell.cellIndex] || ":empty");
	}
}

function handleTableClick({ target: el }: Event) {
	if (!(el instanceof Element)) return;
	const row = el.closest("tr");
	const action = row?.querySelector<HTMLInputElement>('[data-command="row"]');
	if (action && !el.closest(INTERACTIVE)) action.click?.(); // Forward click to data-command="row" element
}

onLoaded(() => {
	onMutation(document.documentElement, CSS_TABLE, handleTableMutation);
	on(document, "click", handleTableClick);
});
