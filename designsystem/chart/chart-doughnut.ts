import styles from "../styles.module.css";
import { attr, onLoaded, onMutation } from "../utils";

const CSS_DOUGHNUT = styles.doughnut.split(" ")[0];

function handleDoughnutMutation(doughnuts: HTMLCollectionOf<SVGSVGElement>) {
	for (const doughnut of doughnuts) {
		attr(doughnut, "viewBox", "0 0 100 100");

		let total = 0;
		let offset = 0;
		const radius = 50;
		const inner = 25;

		Array.from(doughnut.children, (el) => {
			const value = Number(attr(el, "data-value"));
			total += value;
			return [el, value] as const;
		}).forEach(([path, value]) => {
			const start = offset / total;
			offset += value;
			const end = offset / total;
			const largeArc = end - start > 0.5 ? 1 : 0;
			const a0 = 2 * Math.PI * (start - 0.25);
			const a1 = 2 * Math.PI * (end - 0.25);
			const x0 = Math.cos(a0);
			const y0 = Math.sin(a0);
			const x1 = Math.cos(a1);
			const y1 = Math.sin(a1);
			const d = `M ${radius + inner * x0} ${radius + inner * y0} L ${radius + radius * x0} ${radius + radius * y0} A ${radius} ${radius} 0 ${largeArc} 1 ${radius + radius * x1} ${radius + radius * y1} L ${radius + inner * x1} ${radius + inner * y1} A ${inner} ${inner} 0 ${largeArc} 0 ${radius + inner * x0} ${radius + inner * y0}`;

			attr(path, "tabindex", "0");
			attr(path, "d", d);
		});
	}
}

onLoaded(() =>
	onMutation(document.documentElement, CSS_DOUGHNUT, handleDoughnutMutation),
);
