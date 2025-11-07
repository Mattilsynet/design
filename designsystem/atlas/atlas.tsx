import type * as ReactTypes from "react";
import { forwardRef } from "react";
import { toCustomElementProps } from "../utils";
import type { MTDSAtlasElement } from "./atlas-element";

declare global {
	namespace React.JSX {
		interface IntrinsicElements {
			"mtds-atlas": AtlasProps;
		}
	}
}

export type AtlasProps = ReactTypes.DetailedHTMLProps<
	ReactTypes.HTMLAttributes<MTDSAtlasElement>,
	MTDSAtlasElement
> & {
	class?: string;
	"data-view"?: string;
};

export const Atlas = forwardRef<MTDSAtlasElement, AtlasProps>(function Atlas(
	{ children, ...rest },
	ref,
) {
	return (
		<mtds-atlas ref={ref} {...toCustomElementProps(rest)}>
			{children}
		</mtds-atlas>
	);
});
