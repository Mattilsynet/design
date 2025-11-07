import * as L from "leaflet";
import LeafletCSS from "leaflet/dist/leaflet.css?raw";
import LeafletClusterCSS from "leaflet.markercluster/dist/MarkerCluster.css?raw";
import type * as ReactTypes from "react";
import "leaflet.markercluster";

import { attr, IS_BROWSER, MTDSElement, tag } from "../utils";
import css from "./atlas.css?raw";

declare global {
	namespace React.JSX {
		interface IntrinsicElements {
			"mtds-atlas": ReactTypes.DetailedHTMLProps<
				ReactTypes.HTMLAttributes<MTDSAtlasElement>,
				MTDSAtlasElement
			> & {
				class?: string;
				"data-view"?: string;
			};
		}
	}
}

L.Marker.prototype.options.icon = L.divIcon({
	html: '<svg class="map-pin" viewBox="0 0 256 256"><rect x="78" y="50" width="100" height="100" /><path fill="var(--mtds-)" d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"/></svg>',
	iconAnchor: [15, 30],
	iconSize: [30, 30],
});

// const strToLatLng = (str?: string | null) =>
// 	[0, 0, ...(str || "").split(",").map(parseFloat)].slice(-2) as L.LatLngTuple;

const VIEW_NORWAY = "57.95, 4.73, 71.19, 31.44, 15";
const TILES_COLOR =
	"https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png";
const TILES_GRAY =
	"https://cache.kartverket.no/v1/wmts/1.0.0/topograatone/default/webmercator/{z}/{y}/{x}.png";

export class MTDSAtlasElement extends MTDSElement {
	map?: L.Map;
	tiles?: L.TileLayer;
	cluster?: L.MarkerClusterGroup;
	leaflet: typeof L;

	static get observedAttributes() {
		return ["data-view", "data-layers", "data-tiles"]; // Using ES2015 syntax for backwards compatibility
	}

	constructor() {
		super();
		this.leaflet = L;
		this.attachShadow({ mode: "open" }).append(
			tag("style", {}, `${LeafletCSS}\n${LeafletClusterCSS}\n${css}`),
			tag("slot"),
			tag("div"),
		);
	}
	connectedCallback() {
		const view = JSON.parse(`[${attr(this, "data-view") || VIEW_NORWAY}]`);
		const div = this.shadowRoot?.lastElementChild;
		const cluster = Number(attr(this, "data-cluster")) || 1;
		const tiles =
			attr(this, "data-tiles") === "color" ? TILES_COLOR : TILES_GRAY;

		this.tiles = L.tileLayer(tiles, { maxZoom: 18 });
		this.cluster = L.markerClusterGroup({
			showCoverageOnHover: false,
			disableClusteringAtZoom: cluster,
		});

		this.map = L.map(div as HTMLElement, {
			layers: [this.tiles, this.cluster],
			attributionControl: false,
			wheelPxPerZoomLevel: 20,
			zoomControl: false,
			zoomSnap: 0,
		});
		this.map.addControl(L.control.zoom({ position: "bottomright" }));

		// If no view is set, use Norway as default bounding box
		if (view.length === 3) this.map.setView([view[0], view[1]], view[2]);
		if (view.length >= 4) {
			const nw = [view[0], view[1]] as L.LatLngTuple;
			const se = [view[2], view[3]] as L.LatLngTuple;
			const padding = [view[4] ?? 0, view[5] ?? view[4] ?? 0] as L.PointTuple;
			this.map.fitBounds([nw, se], { padding });
		}
	}
	addMarker(latlng: L.LatLngExpression, options?: L.MarkerOptions) {
		return L.marker(latlng, options).addTo(this.cluster || (this.map as L.Map));
	}
	disconnectedCallback() {
		this.map?.remove();
	}
}

if (IS_BROWSER && !window.customElements.get("mtds-atlas"))
	window.customElements.define("mtds-atlas", MTDSAtlasElement);

// export type Adresse = {
// 	adressekode: number;
// 	adressetekst: string;
// 	bokstav: string;
// 	bruksenhetsnummer: string[];
// 	bruksnummer: number;
// 	festenummer: number;
// 	gardsnummer: number;
// 	kommunenavn: string;
// 	kommunenummer: string;
// 	nummer: number;
// 	objtype: string;
// 	oppdateringsdato: string;
// 	postnummer: string;
// 	poststed: string;
// 	representasjonspunkt: {
// 		epsg: string;
// 		lat: number;
// 		lon: number;
// 	};
// 	stedfestingverifisert: boolean;
// 	undernummer: string | null;
// };

// // Hent punkt for adresse fra GeoNorge
// export async function getPunktFraAdresse(
// 	adresseSoek: string,
// ): Promise<Adresse[]> {
// 	try {
// 		const response = await fetch(
// 			`https://ws.geonorge.no/adresser/v1/sok?sok=${adresseSoek}&fuzzy=false&utkoordsys=3857&treffPerSide=100&asciiKompatibel=true`,
// 		);
// 		const jsonresponse = await response.json();
// 		if (jsonresponse.adresser.length > 0) {
// 			return jsonresponse.adresser.map((adresse: Adresse) => ({
// 				adressekode: adresse.adressekode,
// 				adressetekst: adresse.adressetekst,
// 				bokstav: adresse.bokstav,
// 				bruksenhetsnummer: adresse.bruksenhetsnummer,
// 				bruksnummer: adresse.bruksnummer,
// 				festenummer: adresse.festenummer,
// 				gardsnummer: adresse.gardsnummer,
// 				kommunenavn: adresse.kommunenavn,
// 				kommunenummer: adresse.kommunenummer,
// 				nummer: adresse.nummer,
// 				objtype: adresse.objtype,
// 				oppdateringsdato: adresse.oppdateringsdato,
// 				postnummer: adresse.postnummer,
// 				poststed: adresse.poststed,
// 				representasjonspunkt: {
// 					epsg: adresse.representasjonspunkt.epsg,
// 					lat: adresse.representasjonspunkt.lat,
// 					lon: adresse.representasjonspunkt.lon,
// 				},
// 			}));
// 		} else {
// 			return [];
// 		}
// 	} catch (error) {
// 		console.log(`Feilet i å hente adresse fra punkt: ${error}`);
// 		return [];
// 	}
// }
