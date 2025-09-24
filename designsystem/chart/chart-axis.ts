import { tag } from "../utils";
import type { ChartData } from "./chart-element";

type Config = { type: string };

export function toAxis(data: ChartData, { type }: Config) {
	const isStacked = type === "stacked";
	const max = data[0].reduce((acc, _, index) => {
		const all = data.map((row) => row[index].number);
		const sum = all.reduce((acc, num) => acc + num, 0);
		return Math.max(acc, ...(isStacked ? [sum] : all));
	}, 0);

	const digits = 10 ** (`${~~max}`.length - 1); // Get amount of digits in total number
	const step = max / digits < 5 ? digits / 2 : digits; // If we get less than 5 steps, make smaller steps
	const total = Math.ceil(max / step) * step;
	const groups = tag("div", { class: "axisGroups" });
	const steps = tag("div");

	steps.classList.add("axisSteps");
	steps.append(
		...Array.from({ length: total / step + 1 }, (_, i) => getNum(step * i))
			.reverse()
			.map((num) => tag("div", { class: "axisStep", "data-label": num })),
	);

	const axis = tag("div", {
		"aria-label": data[0][0].value || null,
		class: "axis",
		role: "figure",
	});
	axis.style.setProperty("--groups", `${data.length - 1}`);
	axis.style.setProperty("--total", `${total}`);
	axis.append(steps, groups);

	return { total, groups, axis };
}

const getNum = new Intl.NumberFormat().format;
