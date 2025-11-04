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

export const Chart = forwardRef<MTDSChartElement, ChartProps>(function Chart(
	{ data, children, ...rest },
	ref,
) {
	return (
		<mtds-chart ref={ref} {...toCustomElementProps(rest)}>
			{data ? (
				<table>
					<thead>
						{data.slice(0, 1).map((tr, row) => (
							<tr key={`${row + 1}`}>
								{tr.map((td, i) => (
									<th key={`${i + 1}`}>{td}</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{data.slice(1).map((tr, row) => (
							<tr key={`${row + 1}`}>
								{tr.map((td, i) =>
									i ? (
										<td key={`${i + 1}`}>{td}</td>
									) : (
										<th key={`${i + 1}`}>{td}</th>
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
