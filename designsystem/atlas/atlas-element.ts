import L from "leaflet";
import LeafletCSS from "leaflet/dist/leaflet.css?raw";
import type {} from "leaflet.markercluster";
import type * as ReactTypes from "react";
import { attr, debounce, IS_BROWSER, MTDSElement, tag } from "../utils";
import css from "./atlas.css?raw";
import "./cluster.js";
export { L };
declare global {
	namespace React.JSX {
		interface IntrinsicElements {
			"mtds-atlas": ReactTypes.DetailedHTMLProps<
				ReactTypes.HTMLAttributes<MTDSAtlasElement>,
				MTDSAtlasElement
			> & {
				class?: string;
				"data-view"?: string | number[];
			};
		}
	}
}

// const EVENTS = "popupopen popupclose move zoom resize";
const BOUNDS_NORWAY: L.LatLngBoundsLiteral = [
	[57.5, 4.73],
	[71.5, 31.44],
];

// Turns out Kartverket's color tiles are better in grayscale than their grayscale tiles
// const TILES_GRAY = "https://cache.kartverket.no/v1/wmts/1.0.0/topograatone/default/webmercator/{z}/{y}/{x}.png";
const TILES_COLOR =
	"https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png";

export class MTDSAtlasElement extends MTDSElement {
	cluster?: L.MarkerClusterGroup;
	map?: L.Map;

	// Private properties
	_popup?: [HTMLElement, L.Popup];

	static get observedAttributes() {
		return ["data-view", "data-scrollzoom"]; //TODO: "data-layers" // Using ES2015 syntax for backwards compatibility
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open" }).append(
			tag("style", {}, `${LeafletCSS}\n${css}`),
			tag("slot"),
			tag("div"),
		);
	}
	connectedCallback() {
		const div = this.shadowRoot?.lastElementChild;
		const cluster = Number(attr(this, "data-cluster")) || 1;
		const tiles = new L.TileLayer(TILES_COLOR, {
			attribution: "&copy; Kartverket",
			maxZoom: 18,
		});

		this.map = new L.Map(div as HTMLElement, {
			attributionControl: false,
			wheelPxPerZoomLevel: 20,
			zoomControl: false,
			zoomSnap: 0,
			layers: [tiles],
		});

		this.cluster = new L.MarkerClusterGroup({
			disableClusteringAtZoom: cluster,
			showCoverageOnHover: false,
			zoomToBoundsOnClick: true,
		}).addTo(this.map);

		this.map.addControl(new L.Control.Attribution({ prefix: "" }));
		this.map.addControl(new L.Control.Zoom({ position: "bottomright" }));
		// this.map.on(EVENTS, handleEvents);

		// Initial setup when map is connected
		MTDSAtlasElement.observedAttributes.forEach((name) => {
			this.attributeChangedCallback(name, null, attr(this, name));
		});
	}
	attributeChangedCallback(
		name: string,
		_prev: string | null = null,
		next: string | null = null,
	) {
		if (!this.map) return; // No map yet
		if (name === "data-view") this.setView(next || "");
		if (name === "data-scrollzoom")
			this.map.scrollWheelZoom[next === "false" ? "disable" : "enable"]();
	}
	setView(view: string | number[], options?: L.ZoomPanOptions) {
		const pos = `${view}`.split(",").map(parseFloat).filter(Number.isFinite);
		const bounds = this.cluster?.getBounds();

		if (pos.length === 3) this.map?.setView([pos[0], pos[1]], pos[2], options);
		else if (view !== "fit") this.map?.fitBounds(BOUNDS_NORWAY, options);
		else if (!bounds?.isValid())
			this.cluster?.on("layeradd", fitWhenMarkers, this);
		else this.map?.fitBounds(bounds, options || { padding: [40, 40] });
	}
	addMarker(latlng: L.LatLngExpression, options?: L.MarkerOptions) {
		return new L.Marker(latlng, options).addTo(
			this.cluster as L.MarkerClusterGroup,
		);
	}
	disconnectedCallback() {
		this.map?.remove();
		// this.map?.off(EVENTS, handleEvents);
	}
}

// Set default marker icon and define custom element
if (IS_BROWSER && !window.customElements.get("mtds-atlas")) {
	L.Marker.prototype.options.icon = new L.DivIcon({
		html: '<svg class="map-pin" viewBox="0 0 256 256"><rect x="78" y="50" width="100" height="100" /><path fill="var(--mtds-)" d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"/></svg>',
		iconSize: [30, 30],
		iconAnchor: [15, 30],
		popupAnchor: [0, -15],
	});
	window.customElements.define("mtds-atlas", MTDSAtlasElement);
}

const fitWhenMarkers = debounce(function (this: MTDSAtlasElement) {
	this.cluster?.off("layeradd", fitWhenMarkers);
	if (this.cluster?.getBounds().isValid()) this.setView("fit");
}, 100);

// const handleEvents: L.LeafletEventHandlerFn = ({ type, target, popup }) => {
// 	const self = target.getContainer();

// 	if (type === "popupopen" || type === "popupclose") {
// 		if (self._popup) {
// 			const [el] = self._popup;
// 			self._popup = el.hidePopover();
// 			self._popup = undefined;
// 		}
// 		const id = type === "popupopen" && popup.getContent();
// 		const el = String(id)[0] === "#" && document.getElementById(id.slice(1));

// 		if (el) {
// 			attr(el, "popover", "manual");
// 			attr(popup.getElement(), "data-atlas-popup", id);
// 			el.showPopover();
// 			self._popup = [el, popup];
// 			anchorPopover(target, popup, el);
// 		}
// 	} else if (self._popup) {
// 		anchorPopover(target, self._popup[1], self._popup[0]);
// 	}
// };

// const anchorPopover = (map: L.Map, popup: L.Popup, popover: HTMLElement) => {
// 	const point = map.latLngToContainerPoint(popup.getLatLng() as L.LatLng);
// 	const rect = map.getContainer().getBoundingClientRect();
// 	popover.style.translate = `${rect.x + point.x + window.scrollX}px ${rect.y + point.y + window.scrollY}px`;
// };

// .on("click", ({ target: marker, originalEvent: event }) => {
// 	const id = (marker.options as Record<string, string>)?.popoverTarget;
// 	const el = document.getElementById(id || "");

// 	if (el) {
// 		console.log(el, this);
// 		event.stopPropagation();
// 		el.showPopover();
// 		this.popup = el;
// 		this.map?.fire("move"); // Trigger position update

// 		// 	const updatePosition = () => {
// 		// 		const point = this.map?.latLngToContainerPoint(marker.getLatLng());
// 		// 		const rect = this.getBoundingClientRect();
// 		// 		console.dir(rect);
// 		// 		// console.log(point, this.map?.getBounds().getCenter().lat);
// 		// 		if (point)
// 		// 			el.style.translate = `${rect.x + point.x + window.scrollX}px ${rect.y + point.y + window.scrollY}px`;
// 		// 	};

// 		// 	updatePosition();
// 	}
// })

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
