import L, { type PointExpression } from "leaflet";
import LeafletCSS from "leaflet/dist/leaflet.css?raw";
import type {} from "leaflet.markercluster";
import type * as ReactTypes from "react";
import css from "./atlas.css?raw";
import "./cluster.js";
import {
	attr,
	debounce,
	IS_BROWSER,
	MTDSElement,
	off,
	on,
	tag,
} from "../utils";
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

const MARKER_SIZE = [30, 30];
const BOUNDS_NORWAY: L.LatLngBoundsLiteral = [
	[57.5, 4.73],
	[71.5, 31.44],
];

// Turns out Kartverket's color tiles are better in grayscale than their grayscale tiles
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
		this.map.on("popupopen", handlePopupById);

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
	}
}

// Set default marker icon and define custom element
if (IS_BROWSER && !window.customElements.get("mtds-atlas")) {
	L.Marker.prototype.options.icon = new L.DivIcon({
		html: '<svg class="map-pin" viewBox="0 0 256 256"><rect x="78" y="50" width="100" height="100" /><path fill="var(--mtds-)" d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"/></svg>',
		iconSize: MARKER_SIZE as PointExpression,
		iconAnchor: [15, 30],
		popupAnchor: [0, -15],
	});
	window.customElements.define("mtds-atlas", MTDSAtlasElement);
}

// TODO: Style markers
// TODO: Synlig label til marker

const fitWhenMarkers = debounce(function (this: MTDSAtlasElement) {
	this.cluster?.off("layeradd", fitWhenMarkers);
	if (this.cluster?.getBounds().isValid()) this.setView("fit");
}, 100);

const HANDLE_POPUP_EVENTS = "popupclose move resize zoomanim viewreset";
const handlePopupById = ({ target: map, popup }: L.LeafletEvent) => {
	const id = popup.getContent();
	const popover = String(id)[0] === "#" && document.getElementById(id.slice(1));

	if (!!popover && popover.closest("mtds-atlas")) {
		const latlng = popup.getLatLng();
		const mode = attr(popover, "popover"); // Save current popover mode
		attr(popup.getElement(), "hidden", ""); // Hide Leaflet popup element
		attr(popover, "data-popover", "open"); // Show popover
		attr(popover, "popover", "manual"); // Disable Popover API to show and ensure overflow: clip on mtds-atlas works

		const resize = new ResizeObserver(() => update());
		const update = (event?: L.LeafletEvent) => {
			if (event?.type === "popupclose" && event?.popup === popup) {
				resize.disconnect();
				map.off(HANDLE_POPUP_EVENTS, update);
				attr(popup.getElement(), "hidden", null); // Un-hide Leaflet popup element
				attr(popover, "data-popover", null); // Hide popover
				attr(popover, "popover", mode); // Re-enable Popover API
				off(popover, "click", click);
			} else {
				const point = map.latLngToContainerPoint(latlng);
				const x = point.x - popover.offsetWidth / 2 - MARKER_SIZE[0] / 2;
				const y = point.y - popover.offsetHeight - MARKER_SIZE[1];
				popover.style.translate = `${x}px ${y}px`;
			}
		};
		const click = ({ target: el }: Event) =>
			(el as Element)?.closest?.('[popovertargetaction="hide"]') &&
			popup.close();

		map.on(HANDLE_POPUP_EVENTS, update);
		on(popover, "click", click); // Listen for close actions inside popover since we are not using actual Popover API
		resize.observe(popover); // Listen for changes of popover size
		update(); // Initial position
	}
};

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
