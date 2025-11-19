import type * as ReactTypes from "react";
import { forwardRef } from "react";
import { toCustomElementProps } from "../utils";
import "./chart-element";
import type { MTDSChartElement } from "./chart-element";

declare global {
	namespace React.JSX {
		interface IntrinsicElements {
			"mtds-chart": ChartProps;
		}
	}
}

export type ChartProps = ReactTypes.DetailedHTMLProps<
	ReactTypes.HTMLAttributes<MTDSChartElement>,
	MTDSChartElement
> & {
	class?: string;
	data?: (number | string)[][];
	"data-legend"?: "none" | "hidden" | "false" | "true" | boolean;
	"data-axis"?: "none" | "hidden" | "false" | "true" | boolean;
	"data-variant"?:
		| "area"
		| "bar"
		| "bar-stacked"
		| "column"
		| "column-stacked"
		| "doughnut"
		| "line"
		| "pie";
};

let RENDER = 0; // Ensure re-render on data change
export const Chart = forwardRef<MTDSChartElement, ChartProps>(function Chart(
	{ data, children, ...rest },
	ref,
) {
	return (
		<mtds-chart ref={ref} {...toCustomElementProps(rest)}>
			{data ? (
				<table key={`table_${++RENDER}`}>
					<thead>
						{data.slice(0, 1).map((tr, row) => (
							<tr key={`${row}_${RENDER}`}>
								{tr.map((td, i) => (
									<th key={`${i}_${RENDER}`}>{td}</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{data.slice(1).map((tr, row) => (
							<tr key={`${row}_${RENDER}`}>
								{tr.map((td, i) =>
									i ? (
										<td key={`${i}_${RENDER}`}>{td}</td>
									) : (
										<th key={`${i}_${RENDER}`}>{td}</th>
									),
								)}
							</tr>
						))}
					</tbody>
				</table>
			) : (
				children
			)}
		</mtds-chart>
	);
});
