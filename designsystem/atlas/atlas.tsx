import { forwardRef } from "react";
import type { CustomReactElementProps } from "../react-types";
import { toCustomElementProps } from "../utils";
import type {
	MTDSAtlasElement,
	MTDSAtlasMarkerElement,
	MTDSAtlasMatgeoElement,
} from "./atlas-element";

export * from "./atlas-element"; // Expose { L } for Leaflet import

declare global {
	namespace React.JSX {
		interface IntrinsicElements {
			"mtds-atlas": CustomReactElementProps<MTDSAtlasElement> & {
				"data-cluster"?: number | `${number}` | boolean | "true" | "false";
				"data-scrollzoom"?: boolean | "true" | "false";
				"data-tiles"?: "color" | "gray";
				"data-view"?: string | number[];
			};
			"mtds-atlas-marker": CustomReactElementProps<MTDSAtlasMarkerElement> & {
				"data-latlng": string;
			};
			"mtds-atlas-matgeo": CustomReactElementProps<MTDSAtlasMatgeoElement> & {
				"data-collection": string;
				onatlasfeatureclick?: (
					event: GlobalEventHandlersEventMap["atlasfeatureclick"],
				) => void;
			};
		}
	}
}

export type AtlasProps = React.JSX.IntrinsicElements["mtds-atlas"];
export type AtlasMarkerProps = React.JSX.IntrinsicElements["mtds-atlas-marker"];
export type AtlasMatgeoProps =
	React.JSX.IntrinsicElements["mtds-atlas-matgeo"] & {
		onFeatureClick?: React.JSX.IntrinsicElements["mtds-atlas-matgeo"]["onatlasfeatureclick"];
	};

const AtlasComp = forwardRef<MTDSAtlasElement, AtlasProps>(
	function Atlas(props, ref) {
		return <mtds-atlas ref={ref} {...toCustomElementProps(props)} />;
	},
);

export const Atlas = Object.assign(AtlasComp, {
	Marker: forwardRef<MTDSAtlasMarkerElement, AtlasMarkerProps>(
		function AtlasMarker(props, ref) {
			return <mtds-atlas-marker ref={ref} {...toCustomElementProps(props)} />;
		},
	),
	Matgeo: forwardRef<MTDSAtlasMatgeoElement, AtlasMatgeoProps>(
		function AtlasMatgeo({ onFeatureClick, ...rest }, ref) {
			return (
				<mtds-atlas-matgeo
					ref={ref}
					onatlasfeatureclick={onFeatureClick}
					{...toCustomElementProps(rest)}
				/>
			);
		},
	),
});
