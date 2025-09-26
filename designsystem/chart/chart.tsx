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
					{data.map((row, rowIndex) => (
						<tr key={`${rowIndex + 1}`}>
							{row.map((cell, cellIndex) => (
								<td key={`${cellIndex + 1}`}>{cell}</td>
							))}
						</tr>
					))}
				</table>
			) : (
				children
			)}
		</mtds-chart>
	);
});
