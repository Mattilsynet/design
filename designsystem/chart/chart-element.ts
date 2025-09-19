import type * as ReactTypes from "react";
import { attr, IS_BROWSER, useId } from "../utils";
import css from "./chart.module.css?raw";

const MTDSElement =
	typeof HTMLElement === "undefined"
		? (class {} as typeof HTMLElement)
		: HTMLElement;

export type ReactChart = ReactTypes.JSX.IntrinsicElements["div"] & {
	class?: string;
};

declare global {
	namespace React.JSX {
		interface IntrinsicElements {
			"mtds-chart": ReactChart;
		}
	}
}

const xmlns = "http://www.w3.org/2000/svg";
export class MTDSChart extends MTDSElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}
	connectedCallback() {
		let max = 0;
		let rowMax = 0;
		const table = this.querySelector("table");
		const data = Array.from(table?.rows || [], (row, isTbody) => {
			let rowTotal = 0;
			const values = Array.from(row.cells, (cell, isTd) => {
				const val = cell.textContent.trim() || "";
				const num = Number(val) || 0;
				if (isTbody && isTd) {
					max = Math.max(max, num);
					rowTotal += num;
				}
				return val;
			});
			rowMax = Math.max(rowMax, rowTotal);
			return values;
		});

		const [variant, type] = (attr(this, "data-variant") || "bar").split("-");
		const isVertical = variant === "column";
		const isStacked = type === "stacked";

		const smoothing = Number(type || 10) || 0;
		const style = createElement("style", {}, css);
		const axis = createElement("div", {
			"aria-label": data[0][0] || null,
			class: "axis",
			role: "figure",
		});
		const groups = createElement("div", { class: "axisGroups" });
		const steps = toSteps(isStacked ? rowMax : max);
		const legend = createElement("div", { class: "legends" });
		const legends = data
			.slice(1)
			.map(([text], index) =>
				createElement("div", { class: `legend color-${index + 1}` }, text),
			);
		const legendIds = legends.map(useId);

		axis.classList.toggle("is-horizontal", !isVertical);
		axis.classList.toggle("is-vertical", isVertical);
		axis.classList.toggle("is-stacked", isStacked);
		axis.style.setProperty("--groups", `${data.length - 1}`);
		axis.style.setProperty("--total", `${steps.total}`);
		axis.append(steps.el, groups);

		if (variant === "bar" || variant === "column") {
			data[0].forEach((groupLabel, index) => {
				if (index === 0) return; // Skip first column internally so index matches rest of data
				const group = createElement("div", { class: "axisGroup" });
				const content = createElement("div", { class: "axisGroupContent" });
				const label = createElement("div", { class: "axisLabel" }, groupLabel);
				group.append(content, label);
				groups.append(group);

				data.slice(1).forEach((values, legendIndex) => {
					content.append(
						createElement("div", {
							"aria-describedby": legendIds[legendIndex],
							class: `bar color-${legendIndex + 1}`,
							role: "img",
							style: `--value: ${values[index]}`,
							tabindex: "0",
							title: `${values[0]}: ${values[index]}`,
						}),
					);
				});
			});
		}

		if (variant === "line" || variant === "area") {
			const group = createElement("div", { class: "axisGroup" });
			data.slice(1).forEach(([legend, ...values], legendIndex) => {
				const lineContainer = createElement("div", {
					class: `lineContainer color-${legendIndex + 1}`,
					role: "list",
				});

				const line = document.createElementNS(xmlns, "svg");
				attr(line, "aria-hidden", "true");
				attr(line, "preserveAspectRatio", "none");
				attr(line, "viewBox", "0 0 100 100");

				const path = toPath(
					values.map((value, index, { length }) => [
						(100 / (length - 1)) * index,
						100 - (Number(value) / steps.total) * 100,
					]),
					smoothing / 100,
				);

				const linePath = document.createElementNS(xmlns, "path");
				attr(linePath, "class", "line");
				attr(linePath, "d", path);
				attr(linePath, "fill", "none");
				attr(linePath, "stroke", "currentColor");
				const lineBorder = linePath.cloneNode(true) as SVGPathElement;
				attr(lineBorder, "class", "lineBorder");

				if (variant === "area") {
					const lineShade = linePath.cloneNode(true) as SVGPathElement;
					attr(lineShade, "d", `M-100,100 L${path.slice(1)}L200,100`);
					attr(lineShade, "class", "lineShade");
					line.append(lineShade);
				}

				values.forEach((value, index) => {
					const col = createElement("div", { role: "listitem" });
					col.appendChild(
						createElement("div", {
							"aria-describedby": legendIds[legendIndex],
							tabindex: "0",
							title: `${data[0][index + 1]}: ${value} (${legend})`,
							class: "linePoint",
							role: "img",
							style: `--value: ${value}`,
						}),
					);
					lineContainer.append(col);
				});

				line.append(lineBorder, linePath);
				lineContainer.append(line);
				group.append(lineContainer);
			});
			groups.append(group);
		}

		if (variant === "doughnut") {
			const doughnut = document.createElementNS(xmlns, "svg");
			const tot = data.slice(1).reduce((acc, [, val]) => acc + Number(val), 0);
			attr(doughnut, "class", "doughnut");
			attr(doughnut, "viewBox", "0 0 100 100");

			let offset = 0;
			const radius = 50;
			const inner = 25;

			data.slice(1).forEach(([label, value], legendIndex) => {
				const path = document.createElementNS(xmlns, "path");
				const start = offset / tot;
				offset += Number(value);
				const end = offset / tot;
				const largeArc = end - start > 0.5 ? 1 : 0;
				const a0 = 2 * Math.PI * (start - 0.25);
				const a1 = 2 * Math.PI * (end - 0.25);
				const x0 = Math.cos(a0);
				const y0 = Math.sin(a0);
				const x1 = Math.cos(a1);
				const y1 = Math.sin(a1);
				const d = `M ${radius + inner * x0} ${radius + inner * y0} L ${radius + radius * x0} ${radius + radius * y0} A ${radius} ${radius} 0 ${largeArc} 1 ${radius + radius * x1} ${radius + radius * y1} L ${radius + inner * x1} ${radius + inner * y1} A ${inner} ${inner} 0 ${largeArc} 0 ${radius + inner * x0} ${radius + inner * y0}`;

				attr(path, "aria-describedby", legendIds[legendIndex]);
				attr(path, "class", `color-${legendIndex + 1}`);
				attr(path, "d", d);
				attr(path, "role", "img");
				attr(path, "tabindex", "0");
				attr(path, "title", label || null);
				doughnut.appendChild(path);
				this.shadowRoot?.append(doughnut);
			});
		}

		if (variant !== "doughnut") this.shadowRoot?.append(axis);

		legend.append(...legends);

		this.shadowRoot?.append(style, legend);
	}
}

if (IS_BROWSER && !window.customElements.get("mtds-chart"))
	window.customElements.define("mtds-chart", MTDSChart);

// Based on https://observablehq.com/@ndry/smooth-a-svg-path-with-cubic-bezier-curves
const toPath = (points: number[][], s: number) =>
	points.map(([x, y], i, a) => (i ? smooth(i, a, s) : `M${x},${y}`)).join(" ");
const add = ([ax, ay]: number[], [bx, by]: number[]) => [ax + bx, ay + by];
const sub = ([ax, ay]: number[], [bx, by]: number[]) => [ax - bx, ay - by];
const scale = (s: number, [x, y]: number[]) => [s * x, s * y];
const smooth = (i: number, all: number[][], smooth: number) => {
	const start = all[i - 1];
	const end = all[i];
	const [csX, csY] = add(start, scale(smooth, sub(end, all[i - 2] || start))); // start control point
	const [ceX, ceY] = add(end, scale(smooth, sub(start, all[i + 1] || end))); // end control point
	return `C ${csX},${csY} ${ceX},${ceY} ${end[0]},${end[1]}`;
};

const getNum = new Intl.NumberFormat().format;
const toSteps = (max: number) => {
	const digits = 10 ** (`${~~max}`.length - 1); // Get amount of digits in total number
	const step = max / digits < 5 ? digits / 2 : digits; // If we get less than 5 steps, make smaller steps
	const total = Math.ceil(max / step) * step;
	const el = createElement("div");

	el.classList.add("axisSteps");
	el.append(
		...Array.from({ length: total / step + 1 }, (_, i) => getNum(step * i))
			.reverse()
			.map((num) => {
				const label = createElement("div", { class: "axisLabel" }, num);
				const value = createElement("div", { class: "axisStep" });
				value.append(label);
				return value;
			}),
	);

	return { total, el };
};

/**
 * createElement
 * @description creates element and assigns properties
 * @param taName The tagname of element to create
 * @param props Optional properties to add to the element
 * @return HTMLElement with props
 */
const createElement = <TagName extends keyof HTMLElementTagNameMap>(
	tagName: TagName,
	attrs?: Record<string, string | null>,
	text?: string | null,
): HTMLElementTagNameMap[TagName] => {
	const el = document.createElement(tagName);
	if (text) el.textContent = text;
	if (attrs) for (const [key, val] of Object.entries(attrs)) attr(el, key, val);
	return el;
};
