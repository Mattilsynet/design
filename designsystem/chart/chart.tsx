import { forwardRef } from "react";
import { toCustomElementProps } from "../utils";
import "./chart-element";

export type ChartProps = React.ComponentPropsWithoutRef<"div"> & {
	"data-variant"?:
		| "bar"
		| "column"
		| "column-stacked"
		| "area"
		| "line"
		| "doughnut";
};

export const Chart = forwardRef<HTMLDivElement, ChartProps>(
	function Chart(props, ref) {
		return <mtds-chart ref={ref} {...toCustomElementProps(props)} />;
	},
);
