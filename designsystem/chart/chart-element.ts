import styles from "../styles.module.css";
import {
	attr,
	defineElement,
	isBrowser,
	MTDSElement,
	off,
	on,
	onMutation,
	onResize,
	tag,
} from "../utils";
import css from "./chart.css?raw";
import { toAxis } from "./chart-axis";
import { toBars } from "./chart-bars";
import { toLines } from "./chart-lines";
import { toPies } from "./chart-pies";

export type ChartData = ReturnType<typeof toData>;

declare global {
	interface HTMLElementTagNameMap {
		"mtds-chart": MTDSChartElement;
	}
}

const EVENTS = "click,keydown,mousemove,mouseout";
const TOOLTIP_ID = "mtds-chart-tooltip";
const TOOLTIP = isBrowser()
	? document.getElementById(TOOLTIP_ID) ||
		tag("div", {
			"aria-hidden": "true",
			class: styles._tooltip,
			hidden: "",
			id: TOOLTIP_ID,
		})
	: null;

export class MTDSChartElement extends MTDSElement {
	#unmutate?: () => void;
	#unresize?: () => void;

	static get observedAttributes() {
		return ["data-variant", "data-aspect"]; // Using ES2015 syntax for backwards compatibility
	}
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}
	connectedCallback() {
		this.#unresize = onResize(() => this.handleResize(), this);
		this.#unmutate = onMutation(() => this.attributeChangedCallback(), {
			attr: "data-tooltip",
			root: this,
		});
		this.attributeChangedCallback(); // Initial setup
		on(this, EVENTS, this);
	}
	disconnectedCallback() {
		if (TOOLTIP) TOOLTIP.hidden = true;
		off(this, EVENTS, this);
		this.#unresize?.();
		this.#unmutate?.();
		this.#unmutate = this.#unresize = undefined;
	}
	attributeChangedCallback() {
		const data = toData(this.querySelector("table"));
		if (!data[0]) return; // We require at least one row

		Array.from(this.shadowRoot?.children || []).map((el) => el.remove()); // Clear shadowRoot
		const [variant, type] = (attr(this, "data-variant") || "column").split("-");
		const aspect = attr(this, "data-aspect") || undefined;
		const style = tag("style", {}, css);
		const legend = tag("div", {
			"aria-hidden": "hidden",
			class: "legends",
			role: "group",
		});
		data.slice(1).forEach(([{ value, style }]) => {
			legend.appendChild(tag("div", { class: "legend", style }, value));
		});

		const { axis, groups, total } = toAxis(data, { aspect, type });
		if (variant === "column" || variant === "bar")
			groups.append(...toBars(data));
		if (variant === "line" || variant === "area")
			groups.append(toLines(data, { total, variant, type }));
		if (variant === "doughnut" || variant === "pie")
			this.shadowRoot?.append(toPies(data, { aspect, variant }));

		this.shadowRoot?.append(axis, legend, style); // Axis must be first
	}
	handleEvent(e: Event) {
		if (e.type === "click" || e.type === "keydown") onClick(e, this);
		else onMoveTooltip(e as MouseEvent);
	}
	handleResize() {
		const axis = this.shadowRoot?.firstElementChild as HTMLElement | null;
		const steps = axis?.firstElementChild as HTMLElement | null;
		axis?.classList.toggle("axisStepsYHalf", (steps?.offsetHeight || 0) < 400);
		axis?.classList.toggle("axisStepsXHalf", (steps?.offsetWidth || 0) < 500);
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
		TOOLTIP.style.transform = `translate(${Math.min(event.clientX, window.innerWidth - TOOLTIP.clientWidth - 10)}px, ${event.clientY}px)`;
	if (tip !== TOOLTIP_TEXT) {
		if (tip) TOOLTIP.textContent = tip;
		TOOLTIP_TEXT = tip;
		TOOLTIP.hidden = !tip;
	}
}

const text = (el?: Element | null) => el?.textContent?.trim() || ""; // Helper to get trimmed text
const toData = (table?: HTMLTableElement | null) =>
	Array.from(table?.rows || [], (row, rowIndex) =>
		Array.from(row.cells, (cell, cellIndex) => {
			const rowHeading = text(row.cells[0]);
			const colHeading = text(table?.rows[0].cells[cellIndex]);
			const tooltip = `${rowHeading}: ${text(cell)}${colHeading ? ` (${colHeading})` : ""}`;

			return {
				number: (cellIndex && rowIndex && Number.parseFloat(text(cell))) || 0, // First row and column is not a number
				event: cell.querySelector("a,button") && `${rowIndex}-${cellIndex}`, // Reference to proxy events
				style: `--color: var(--mtdsc-chart-color-${rowIndex}, var(--mtdsc-chart-color-base))`,
				value: text(cell),
				tooltip: attr(cell, "data-tooltip") || tooltip,
			};
		}),
	);

defineElement("mtds-chart", MTDSChartElement);
