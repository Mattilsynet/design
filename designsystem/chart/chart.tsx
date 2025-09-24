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
	"data-variant"?:
		| "area"
		| "bar"
		| "bar-stacked"
		| "column"
		| "column-stacked"
		| "doughnut"
		| "line"
		| "pie"
		| `area-${number}`
		| `line-${number}`;
};

export const Chart = forwardRef<HTMLDivElement, ChartProps>(
	function Chart(props, ref) {
		return <mtds-chart ref={ref} {...toCustomElementProps(props)} />;
	},
);
