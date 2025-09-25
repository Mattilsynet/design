import type { Meta, StoryObj } from "@storybook/react-vite";
import { Map as OlMap, View } from "ol";
import { Control, Zoom } from "ol/control";
import { getTopLeft, getWidth } from "ol/extent";
import { defaults as defaultInteractions } from "ol/interaction";
import { Tile } from "ol/layer";
import { get as getProjection } from "ol/proj";
import { OSM, WMTS } from "ol/source";
import { WMTS as WMTSTileGrid } from "ol/tilegrid";
import { useEffect, useRef } from "react";
import "../../node_modules/ol/ol.css";
import { tag } from "../utils";

class RotateNorthControl extends Control {
	/**
	 * @param {Object} [opt_options] Control options.
	 */
	constructor(opt_options?: Record<string, string>) {
		const options = opt_options || {};

		const button = tag("button");
		button.innerHTML = "N";

		const element = tag("div", {
			class: "rotate-north ol-unselectable ol-control",
		});
		element.appendChild(button);

		super({
			element: element,
			target: options.target,
		});

		button.addEventListener("click", this.handleRotateNorth.bind(this), false);
	}

	handleRotateNorth() {
		this.getMap()?.getView().setRotation(0);
	}
}

const createKartverketGraatoneWMTSLayer = () => {
	const projection = getProjection("EPSG:3857");
	if (!projection) throw new Error("Projection not found");

	const projectionExtent = projection.getExtent();
	const size = getWidth(projectionExtent) / 256;
	const resolutions = new Array(19);
	const matrixIds = new Array(19);
	// generate resolutions and matrixIds arrays for this WMTS
	for (let z = 0; z < 19; ++z) {
		resolutions[z] = size / 2 ** z;
		matrixIds[z] = z;
	}
	return new Tile({
		opacity: 0.75,
		properties: { name: "Kartverket Gr...", type: "baseLayer" },
		visible: false,
		source: new WMTS({
			attributions: "© Kartverket",
			url: "https://cache.kartverket.no/v1/wmts/1.0.0/topograatone/default/",
			layer: "topograatone",
			matrixSet: "webmercator",
			format: "image/png",
			tileGrid: new WMTSTileGrid({
				origin: getTopLeft(projectionExtent),
				resolutions: resolutions,
				matrixIds: matrixIds,
			}),
			style: "default",
			wrapX: true,
		}),
	});
};

const meta = {
	title: "Designsystem/Map",
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	tags: ["!dev"],
	render: function Render() {
		const mapRef = useRef<HTMLDivElement>(null);

		// Initialize the map when the component mounts
		useEffect(() => {
			const baseMap = createKartverketGraatoneWMTSLayer();
			const baseMapOSM = new Tile({
				source: new OSM({ attributions: "© OpenStreetMap-contributors" }),
				properties: { name: "OpenStreetMap" },
				visible: true,
			});
			const map = new OlMap({
				target: mapRef.current || undefined, // Target the div using the ref
				layers: [baseMapOSM, baseMap],
				view: new View({
					center: [0, 0],
					zoom: 2,
				}),
				controls: [
					new Zoom({
						zoomInTipLabel: "Zoom inn",
						zoomOutTipLabel: "Zoom ut",
					}),
					new RotateNorthControl(),
				],
				interactions: defaultInteractions({
					doubleClickZoom: true,
					mouseWheelZoom: false,
				}),
			});

			// Cleanup function when the component unmounts
			return () => map.setTarget(undefined);
		}, []);

		return <div ref={mapRef} style={{ height: 400 }} />;
	},
};
