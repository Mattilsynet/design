import { tag } from "../utils";
import type { ChartData } from "./chart-element";

export function toBars(data: ChartData) {
	return data[0].slice(1).map(({ value, event }, index) => {
		const group = tag("div", { class: "axisGroup", "data-label": value });
		const content = group.appendChild(
			tag("div", { class: "axisGroupContent" }),
		);

		data
			.slice(1)
			.map((values) => values[index + 1])
			.map(({ tooltip, color, number }) => {
				const el = tag("div", {
					"aria-label": tooltip,
					"data-event": event,
					class: "bar",
					role: "img",
					tabindex: "0",
				});
				el.style.setProperty("--color", color);
				el.style.setProperty("--value", `${number}`);
				return content.appendChild(el);
			});
		return group;
	});
}
