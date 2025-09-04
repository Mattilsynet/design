import type * as ReactTypes from "react";
import { customElements, MTDSElement } from "../utils";

export type ReactChart = ReactTypes.JSX.IntrinsicElements["div"] & {
	class?: string;
};
declare global {
	namespace React.JSX {
		interface IntrinsicElements {
			"mtds-chart": ReactChart;
		}
	}
}

export class MTDSChart extends MTDSElement {
	// Using underscore instead of private class fields for Safari 14 support
	_resizeObserver: ResizeObserver | null = null;
	_svg: SVGSVGElement | null = null;

	constructor() {
		super();
		console.log("MTDSChart constructor");
	}

	connectedCallback() {}
	disconnectedCallback() {}
}

customElements.define("mtds-chart", MTDSChart);
