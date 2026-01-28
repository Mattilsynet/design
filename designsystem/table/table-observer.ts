import { attr, debounce, isBrowser, onHotReload, onMutation } from "../utils";

const TABLES = isBrowser() ? document.getElementsByTagName("table") : [];
const handleTableMobile = () => {
	for (const table of TABLES) {
		const ths = Array.from(table.tHead?.rows[0]?.cells || [], (th) =>
			th.innerText.trim(),
		);

		for (const tbody of table.tBodies)
			for (const row of tbody.rows)
				for (const cell of row.cells)
					attr(cell, "data-th", ths[cell.cellIndex] || ":empty");
	}
};

onHotReload("table", () => [
	onMutation(document, debounce(handleTableMobile, 200), {
		attributeFilter: ["data-mobile"],
		attributes: true,
		childList: true,
		subtree: true,
	}),
]);
