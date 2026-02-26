import { tag } from "../utils";
import type { ChartData } from "./chart-element";

type Config = { type: string; aspect?: string };

const STEPS = [0.1, 0.2, 0.25, 0.5, 1];

export function toAxis(data: ChartData, { aspect, type }: Config) {
	const totalTicks = 10;
	const isStacked = type === "stacked";
	const max = data[0].reduce((acc, _, index) => {
		const all = data.map((row) => row[index].number);
		const sum = all.reduce((acc, num) => acc + num, 0);
		return Math.max(acc, ...(isStacked ? [sum] : all));
	}, 0);

	const tickRange = max / totalTicks;
	const tickDigits = 10 ** `${Math.round(tickRange)}`.length; // Get amount of digits in total number and use as exponent for 10x
	const tickSize = tickRange / tickDigits; // Get amount of digits in total number and use as exponent for 10
	const step = (STEPS.find((current) => current > tickSize) || 1) * tickDigits; // Find closest step larger than tick
	const total = Math.ceil(max / step) * step;
	const axis = tag("div", {
		"aria-label": data[0][0].value || null,
		class: "axis",
		role: "figure",
	});
	if (aspect) axis.style.setProperty("--mtdsc-chart-aspect", aspect);
	axis.style.setProperty("--bars", `${data[0]?.length - 1}`);
	axis.style.setProperty("--groups", `${data.length - 1}`);
	axis.style.setProperty("--total", `${total}`);
	const steps = axis.appendChild(tag("div", { class: "axisSteps" }));
	const groups = axis.appendChild(tag("div", { class: "axisGroups" }));

	Array.from({ length: total / step + 1 }, (_, i) => getNum(step * i))
		.reverse()
		.map((num) =>
			steps.append(tag("div", { class: "axisStep", "data-label": num })),
		);

	return { total, groups, axis };
}

const getNum = new Intl.NumberFormat().format;
