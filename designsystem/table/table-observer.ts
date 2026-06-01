import { attr, debounce, isBrowser, onHotReload, onMutation } from "../utils";

const MOBILE = new WeakSet();
const TABLES = isBrowser() ? document.getElementsByTagName("table") : [];
const RESIZER = isBrowser()
	? new ResizeObserver(debounce(handleResize, 200))
	: null;

function handleResize(
	entries: Pick<ResizeObserverEntry, "target" | "contentRect">[],
) {
	for (const { target: table, contentRect: rect } of entries) {
		if (!table.isConnected) MOBILE.delete(table) && RESIZER?.unobserve(table);
		else {
			const isSelf = table.getAttribute("data-mobile-source") === "self";
			const source = isSelf ? rect.width : window.innerWidth;
			const size = Number(table.getAttribute("data-mobile-size")) || 768;

			attr(table, "data-mobile-active", source < size ? "" : null);
		}
	}
}

function handleTableMobile() {
	for (const target of TABLES)
		if (target.hasAttribute("data-mobile")) {
			const ths = Array.from(target.tHead?.rows[0]?.cells || [], (th) =>
				th.innerText.trim(),
			);

			if (!MOBILE.has(target)) {
				MOBILE.add(target);
				RESIZER?.observe(target);
				handleResize([{ target, contentRect: target.getBoundingClientRect() }]); // Instant initial check
			}

			for (const tbody of target.tBodies)
				for (const row of tbody.rows)
					for (const cell of row.cells)
						attr(cell, "data-th", ths[cell.cellIndex] || ":empty");
		}
}

onHotReload("table", () => [
	onMutation(document, handleTableMobile, {
		attributeFilter: ["data-mobile"],
		attributes: true,
		childList: true,
		subtree: true,
	}),
]);
