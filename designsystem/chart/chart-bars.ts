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
			.map(({ tooltip, style, number }) =>
				content.appendChild(
					tag("div", {
						"aria-label": tooltip,
						"data-event": event,
						class: "bar",
						role: "img",
						style: `${style}; --value: ${number}`,
						tabindex: "0",
					}),
				),
			);
		return group;
	});
}
