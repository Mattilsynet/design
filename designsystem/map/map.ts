import { Control } from "ol/control";
import { Tile } from "ol/layer";
import { OSM, XYZ } from "ol/source";
import type TileSource from "ol/source/Tile";
import { on, tag } from "../utils";

export class Zoom extends Control {
	/**
	 * @param {Object} [options] Control options.
	 */
	constructor({ target }: Record<string, string> = {}) {
		const element = tag("div", {
			style: "position: absolute; user-select: none",
		});
		const button = element.appendChild(tag("button", {}, "N"));

		super({ element, target });
		on(button, "click", this.handleRotateNorth.bind(this), false);
	}
	handleRotateNorth() {
		this.getMap()?.getView().setRotation(0);
	}
}

export type MtdsTileTypes = "color" | "gray" | "gray-subtle";
export type MtdsTileOptions = ConstructorParameters<typeof Tile>[0];
export class MtdsTile extends Tile {
	constructor(type: MtdsTileTypes, options?: MtdsTileOptions) {
		let source: TileSource;

		if (type === "gray") {
			source = new XYZ({
				url: "https://cache.kartverket.no/v1/wmts/1.0.0/topograatone/default/webmercator/{z}/{y}/{x}.png",
				attributions: "© Kartverket",
			});
		} else if (type === "gray-subtle") {
			source = new XYZ({
				url: "https://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
				attributions: "© CARTO",
			});
		} else {
			source = new OSM({ attributions: "© OpenStreetMap" });
		}

		super({ source, ...options });
	}
}

// export class MapGray extends Tile {
// 	constructor() {
// 		const projection = getProjection("EPSG:3857");
// 		if (!projection) throw new Error("Projection not found");

// 		const projectionExtent = projection.getExtent();
// 		const size = getWidth(projectionExtent) / 256;
// 		const resolutions = new Array(19);
// 		const matrixIds = new Array(19);

// 		// Generate resolutions and matrixIds arrays for this WMTS
// 		for (let z = 0; z < 19; ++z) {
// 			resolutions[z] = size / 2 ** z;
// 			matrixIds[z] = z;
// 		}

// 		super({
// 			opacity: 0.75,
// 			properties: { name: "Kartverket", type: "baseLayer" },
// 			visible: false,
// 			source: new WMTS({
// 				attributions: "© Kartverket",
// 				// url: "https://cache.kartverket.no/v1/wmts/1.0.0/topograatone/default/", // Does not respont at the moment
// 				url: "https://cache.kartverket.no/v1/service",
// 				format: "image/png",
// 				layer: "topograatone",
// 				// matrixSet: "webmercator", // Does not respont at the moment
// 				matrixSet: "utm33n",
// 				style: "default",
// 				wrapX: true,
// 				tileGrid: new WMTSTileGrid({
// 					origin: getTopLeft(projectionExtent),
// 					resolutions,
// 					matrixIds,
// 				}),
// 			}),
// 		});
// 	}
// }
