import type * as ReactTypes from "react";
import { forwardRef } from "react";
import { toCustomElementProps } from "../utils";
import "./chart-element";

declare global {
	namespace React.JSX {
		interface IntrinsicElements {
			"mtds-chart": ReactTypes.JSX.IntrinsicElements["div"] & {
				class?: string;
			};
		}
	}
}

export type ChartProps = React.ComponentPropsWithoutRef<"div"> & {
	data?: (number | string)[][];
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

export const Chart = forwardRef<HTMLDivElement, ChartProps>(function Chart(
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
									<th key={`${i}-${td}`}>{td}</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{data.slice(1).map((tr, row) => (
							<tr key={`${row + 1}`}>
								{tr.map((td, i) =>
									i ? <th key="th">{td}</th> : <td key={`${i}-${td}`}>{td}</td>,
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
