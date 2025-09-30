import styles from "../styles.module.css";
import { attr, IS_BROWSER, MTDSElement, off, on, tag } from "../utils";
import css from "./chart.css?raw";
import { toAxis } from "./chart-axis";
import { toBars } from "./chart-bars";
import { toLines } from "./chart-lines";
import { toPies } from "./chart-pies";

export type ChartData = ReturnType<typeof toData>;

const EVENTS = "click,keydown,mousemove,mouseout";
const TOOLTIP_ID = "mtds-chart-tooltip";
const TOOLTIP = IS_BROWSER
	? document.getElementById(TOOLTIP_ID) ||
		tag("div", { class: styles._tooltip, id: TOOLTIP_ID, hidden: "" })
	: null;

export class MTDSChartElement extends MTDSElement {
	_observer?: MutationObserver; // Using underscore instead of # for backwards compatibility

	static get observedAttributes() {
		return ["data-variant"]; // Using ES2015 syntax for backwards compatibility
	}
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}
	connectedCallback() {
		this._observer = new MutationObserver(
			this.attributeChangedCallback.bind(this),
		);
		this._observer.observe(this, {
			attributeFilter: ["data-tooltip"],
			attributes: true,
			characterData: true,
			childList: true,
			subtree: true,
		});
		this.attributeChangedCallback(); // Initial setup
		on(this, EVENTS, this);
	}
	disconnectedCallback() {
		if (TOOLTIP) TOOLTIP.hidden = true;
		off(this, EVENTS, this);
		this._observer?.disconnect();
		this._observer = undefined;
	}
	attributeChangedCallback() {
		Array.from(this.shadowRoot?.children || []).map((el) => el.remove()); // Clear shadowRoot

		const data = toData(this.querySelector("table"));
		const [variant, type] = (attr(this, "data-variant") || "bar").split("-");
		const style = tag("style", {}, css);
		const legend = tag("div", { class: "legends" });
		data.slice(1).forEach(([{ value, style }]) => {
			legend.appendChild(tag("div", { class: "legend", style }, value));
		});

		const { axis, groups, total } = toAxis(data, { type });
		if (variant === "bar" || variant === "column")
			groups.append(...toBars(data));
		if (variant === "line" || variant === "area")
			groups.append(toLines(data, { total, variant, type }));
		if (variant === "doughnut" || variant === "pie")
			this.shadowRoot?.append(toPies(data, { variant }));

		this.shadowRoot?.append(style, axis, legend);
	}
	handleEvent(e: Event) {
		if (e.type === "click" || e.type === "keydown") onClick(e, this);
		else onMoveTooltip(e as MouseEvent);
	}
}

function onClick(event: Event, self: MTDSChartElement) {
	if (event instanceof KeyboardEvent && event.key !== "Enter") return; // Only handle enter key
	const el = event.composedPath()[0];
	const table = self.querySelector("table");
	const [tr, td] =
		(el instanceof Element && attr(el, "data-event")?.split("-").map(Number)) ||
		[];

	table?.rows[tr]?.cells[td]?.querySelector<HTMLElement>("a,button")?.click?.();
}

let TOOLTIP_TEXT = "";
function onMoveTooltip(event: MouseEvent) {
	if (!TOOLTIP) return;
	if (!TOOLTIP?.isConnected) document.body.append(TOOLTIP); // Ensure connected

	const el = event.composedPath()[0];
	const tip = (el instanceof Element && el.getAttribute("aria-label")) || "";

	if (tip)
		TOOLTIP.style.transform = `translate(${event.pageX}px, ${event.pageY}px)`;
	if (tip !== TOOLTIP_TEXT) {
		if (tip) TOOLTIP.textContent = tip;
		TOOLTIP_TEXT = tip;
		TOOLTIP.hidden = !tip;
	}
}

const text = (el?: Element | null) => el?.textContent?.trim() || ""; // Helper to get trimmed text
const toData = (table?: HTMLTableElement | null) =>
	Array.from(table?.rows || [], (row, rowIndex) =>
		Array.from(row.cells, (cell, cellIndex) => ({
			number: (cellIndex && rowIndex && Number.parseFloat(text(cell))) || 0, // First row and column is not a number
			event: cell.querySelector("a,button") && `${rowIndex}-${cellIndex}`, // Reference to proxy events
			style: `--color: var(--mtdsc-chart-color-${rowIndex}, var(--mtdsc-chart-color-base))`,
			value: text(cell),
			tooltip:
				attr(cell, "data-tooltip") ||
				`${text(row.cells[0])}: ${text(cell)} (${text(table?.rows[0].cells[cellIndex])})`,
		})),
	);

if (IS_BROWSER && !window.customElements.get("mtds-chart"))
	window.customElements.define("mtds-chart", MTDSChartElement);
