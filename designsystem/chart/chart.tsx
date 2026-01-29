import { forwardRef } from "react";
import { toCustomElementProps } from "../utils";
import "./chart-element";
import { Table } from "../react";
import type { CustomReactElementProps } from "../react-types";
import type { MTDSChartElement } from "./chart-element";

declare global {
	namespace React.JSX {
		interface IntrinsicElements {
			"mtds-chart": ChartProps;
		}
	}
}

export type ChartProps = CustomReactElementProps<MTDSChartElement> & {
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
				<Table key={`table_${++RENDER}`}>
					<Table.Thead>
						{data.slice(0, 1).map((tr, row) => (
							<Table.Tr key={`${row}_${RENDER}`}>
								{tr.map((td, i) => (
									<Table.Th suppressHydrationWarning key={`${i}_${RENDER}`}>
										{td}
									</Table.Th>
								))}
							</Table.Tr>
						))}
					</Table.Thead>
					<Table.Tbody>
						{data.slice(1).map((tr, row) => (
							<Table.Tr key={`${row}_${RENDER}`}>
								{tr.map((td, i) =>
									i ? (
										<Table.Td key={`${i}_${RENDER}`}>{td}</Table.Td>
									) : (
										<Table.Th key={`${i}_${RENDER}`}>{td}</Table.Th>
									),
								)}
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			) : (
				children
			)}
		</mtds-chart>
	);
});
