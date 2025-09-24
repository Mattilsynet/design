import { attr } from "../utils";
import type { ChartData } from "./chart-element";

export function toPies(data: ChartData, { variant }: { variant: string }) {
	const pie = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	attr(pie, "class", "pie");
	attr(pie, "viewBox", "0 0 100 100");

	let offset = 0;
	const radius = 50;
	const inner = variant === "doughnut" ? 25 : 0;
	const total = data.slice(1).reduce((tot, [, td]) => tot + td.number, 0);

	data.slice(1).forEach(([, { tooltip, number, event, style }]) => {
		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		const start = offset / total;
		offset += number;
		const end = offset / total;
		const largeArc = end - start > 0.5 ? 1 : 0;
		const a0 = 2 * Math.PI * (start - 0.25);
		const a1 = 2 * Math.PI * (end - 0.25);
		const x0 = Math.cos(a0);
		const y0 = Math.sin(a0);
		const x1 = Math.cos(a1);
		const y1 = Math.sin(a1);
		const d = `M ${radius + inner * x0} ${radius + inner * y0} L ${radius + radius * x0} ${radius + radius * y0} A ${radius} ${radius} 0 ${largeArc} 1 ${radius + radius * x1} ${radius + radius * y1} L ${radius + inner * x1} ${radius + inner * y1} A ${inner} ${inner} 0 ${largeArc} 0 ${radius + inner * x0} ${radius + inner * y0}`;

		attr(path, "aria-label", tooltip);
		attr(path, "data-event", event);
		attr(path, "style", style);
		attr(path, "d", d);
		attr(path, "role", "img");
		attr(path, "tabindex", "0");
		pie.appendChild(path);
	});
	return pie;
}
