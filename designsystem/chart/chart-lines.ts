import { attr, tag } from "../utils";
import type { ChartData } from "./chart-element";

type Config = {
	total: number;
	type: string;
	variant: string;
};

export function toLines(data: ChartData, { total, type, variant }: Config) {
	const smoothing = Number.parseFloat(type || "0") || 0;
	const group = tag("div", { class: "axisGroup" });
	data.slice(1).forEach(([, ...values]) => {
		const lineContainer = tag("div", {
			class: `lineContainer`,
			role: "list",
			style: values[0].style,
		});

		const pathDefintion = toPath(
			values.map(({ number }, index, { length }) => [
				(100 / (length - 1)) * index,
				100 - (number / total) * 100,
			]),
			smoothing / 100,
		);

		const line = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		attr(line, "aria-hidden", "true");
		attr(line, "preserveAspectRatio", "none");
		attr(line, "viewBox", "0 0 100 100");

		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		attr(path, "class", "line");
		attr(path, "d", pathDefintion);
		attr(path, "fill", "none");
		attr(path, "stroke", "currentColor");

		if (variant === "area") {
			const lineShade = path.cloneNode(true) as SVGPathElement;
			attr(lineShade, "d", `M-100,100 L${pathDefintion.slice(1)}L200,100`);
			attr(lineShade, "class", "lineShade");
			line.append(lineShade);
		}

		values.forEach(({ number, tooltip, event }) => {
			const col = tag("div", { role: "listitem" });
			col.appendChild(
				tag("div", {
					"aria-label": tooltip,
					"data-event": event,
					tabindex: "0",
					class: "linePoint",
					role: "img",
					style: `--value: ${number}`,
				}),
			);
			lineContainer.append(col);
		});

		lineContainer.appendChild(line).append(path);
		group.append(lineContainer);
	});
	return group;
}

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
