import { getTopLeft, getWidth } from "ol/extent";
import { Tile } from "ol/layer";
import { get as getProjection } from "ol/proj";
import { OSM, WMTS } from "ol/source";
import { WMTS as WMTSTileGrid } from "ol/tilegrid";

// import { Zoom } from "ol/control";
// import { tag } from "../utils";

// class RotateNorthControl extends Control {
// 	/**
// 	 * @param {Object} [opt_options] Control options.
// 	 */
// 	constructor(opt_options?: Record<string, string>) {
// 		const options = opt_options || {};

// 		const button = tag("button");
// 		button.innerHTML = "N";

// 		const element = tag("div", {
// 			class: "rotate-north ol-unselectable ol-control",
// 		});
// 		element.appendChild(button);

// 		super({
// 			element: element,
// 			target: options.target,
// 		});

// 		button.addEventListener("click", this.handleRotateNorth.bind(this), false);
// 	}

// 	handleRotateNorth() {
// 		this.getMap()?.getView().setRotation(0);
// 	}
// }

export const getTilesColor = () =>
	new Tile({
		source: new OSM({ attributions: "© OpenStreetMap-contributors" }),
		properties: { name: "OpenStreetMap" },
		visible: true,
	});

export const getTilesGrascale = () => {
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
