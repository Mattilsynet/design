import styles from "../styles.module.css";
import { attr, onLoaded, onMutation } from "../utils";

const CSS_TABLE = styles.table.split(" ")[0];

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

onLoaded(() =>
	onMutation(document.documentElement, CSS_TABLE, handleTableMutation),
);
