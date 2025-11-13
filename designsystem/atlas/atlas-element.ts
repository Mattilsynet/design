import L from "leaflet";
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
	on,
	onResize,
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
				"data-cluster"?: number | `${number}` | boolean | "true" | "false";
				"data-scrollzoom"?: boolean | "true" | "false";
				"data-tiles"?: "color" | "gray";
				"data-view"?: string | number[];
			};
		}
	}
}

const ICON_SIZE = [30, 30] as L.PointTuple;
const MAX_ZOOM = 18; // Kartverket does not support more than zoom level 18
const NORWAY: L.LatLngBoundsLiteral = [
	[57.5, 4.73],
	[71.5, 31.44],
];

// Turns out Kartverket's color tiles are better in grayscale than their grayscale tiles
const TILES_COLOR =
	"https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png";

export class MTDSAtlasElement extends MTDSElement {
	cluster?: L.MarkerClusterGroup;
	map?: L.Map;

	static get observedAttributes() {
		return ["data-view", "data-scrollzoom"]; //TODO: "data-layers" // Using ES2015 syntax for backwards compatibility
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open" }).append(
			tag("style", {}, `@layer leaflet{${LeafletCSS}}\n${css}`),
			tag("slot"),
			tag("div"),
		);
	}
	connectedCallback() {
		const div = this.shadowRoot?.lastElementChild;
		const cluster = attr(this, "data-cluster") ?? "false";
		const tiles = new L.TileLayer(TILES_COLOR, {
			attribution: "&copy; Kartverket",
			maxZoom: MAX_ZOOM,
		});

		this.map = new L.Map(div as HTMLElement, {
			attributionControl: false,
			wheelPxPerZoomLevel: 20,
			zoomControl: false,
			zoomSnap: 0,
			layers: [tiles],
		});

		this.cluster = new L.MarkerClusterGroup({
			zoomToBoundsOnClick: true,
			showCoverageOnHover: false,
			disableClusteringAtZoom:
				cluster === "false" ? 1 : Number(cluster) || MAX_ZOOM,
			iconCreateFunction: (cluster) =>
				new L.DivIcon({
					className: "leaflet-cluster-icon",
					html: `${cluster.getAllChildMarkers().length}`,
					iconSize: ICON_SIZE,
				}),
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
		else if (view !== "fit") this.map?.fitBounds(NORWAY, options);
		else if (!bounds?.isValid())
			this.cluster?.on("layeradd", fitWhenMarkers, this);
		else this.map?.fitBounds(bounds, options || { padding: ICON_SIZE });
	}
	addMarker(latlng: L.LatLngExpression, options?: L.MarkerOptions) {
		return new L.Marker(latlng, options).addTo(
			this.cluster as L.MarkerClusterGroup,
		);
	}
	disconnectedCallback() {
		this.map?.off("popupopen", handlePopupById);
		this.map?.remove();
	}
}

if (IS_BROWSER && !window.customElements.get("mtds-atlas")) {
	// Fix accessibility
	const onAddOriginal = L.Marker.prototype.onAdd;
	L.Marker.prototype.onAdd = function (...args) {
		onAddOriginal.apply(this, args);
		const el = this.getElement();
		if (el) attr(el, "aria-label", this.options.title || null);
		if (el) attr(el, "title", null);
		return this;
	};

	// Set defaults
	L.Tooltip.prototype.options.direction = "top";
	L.Marker.prototype.options.icon = new L.DivIcon({
		html: '<svg viewBox="0 0 256 256"><rect x="78" y="50" width="100" height="100" /><path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"/></svg>',
		iconSize: ICON_SIZE,
		iconAnchor: [15, 30],
		popupAnchor: [0, -15],
		tooltipAnchor: [0, -30],
	});

	// Define custom element
	window.customElements.define("mtds-atlas", MTDSAtlasElement);
}

// TODO: Style markers
// TODO: Synlig label til marker
// TODO: Add minimum zoom level for adding markers (minimum 17 som standard?)
// TODO: data-layers: https://matgeoservice-256616427209.europe-north1.run.app/ogc/features/collections

const fitWhenMarkers = debounce(function (this: MTDSAtlasElement) {
	this.cluster?.off("layeradd", fitWhenMarkers, this);
	if (this.cluster?.getBounds().isValid()) this.setView("fit");
}, 100);

const HANDLE_POPUP_EVENTS = "popupclose move resize zoom viewreset";
const handlePopupById = ({ target: map, popup }: L.LeafletEvent) => {
	const id = popup.getContent();
	const popover = String(id)[0] === "#" && document.getElementById(id.slice(1));

	if (!!popover && popover.closest("mtds-atlas")) {
		const latlng = popup.getLatLng();
		const mode = attr(popover, "popover"); // Save current popover mode
		attr(popup.getElement(), "hidden", ""); // Hide Leaflet popup element
		attr(popover, "popover", null); // Disable Popover API to show and ensure overflow: clip on mtds-atlas works

		const update = (event?: L.LeafletEvent) => {
			if (event?.type === "popupclose" && event?.popup === popup) {
				map.off(HANDLE_POPUP_EVENTS, update);
				attr(popup.getElement(), "hidden", null); // Un-hide Leaflet popup element
				attr(popover, "data-popover", null); // Hide popover
				attr(popover, "popover", mode); // Re-enable Popover API
				unresize();
				unclick();
			} else {
				const point = map.latLngToContainerPoint(latlng);
				const x = point.x - popover.offsetWidth / 2;
				const y = point.y - popover.offsetHeight - ICON_SIZE[1];
				popover.style.translate = `${x}px ${y}px`;
			}
		};

		const unresize = onResize(() => update(), popover);
		const unclick = on(popover, "click", (e: Event) => {
			if ((e.target as Element)?.closest?.('[popovertargetaction="hide"]'))
				popup.close(); // Listen for close actions inside popover since we are not using actual Popover API
		});

		map.on(HANDLE_POPUP_EVENTS, update);
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

// type GeoNorgeAdresser = {
// 	metadata: {
// 		side: number;
// 		viserFra: number;
// 		totaltAntallTreff: number;
// 		asciiKompatibel: boolean;
// 		treffPerSide: number;
// 		viserTil: number;
// 		sokeStreng: string;
// 	};
// 	adresser: {
// 		adressenavn: string;
// 		adressetekst: string;
// 		adressetilleggsnavn: string | null;
// 		adressekode: number;
// 		nummer: number;
// 		bokstav: string;
// 		kommunenummer: string;
// 		kommunenavn: string;
// 		gardsnummer: number;
// 		bruksnummer: number;
// 		festenummer: number;
// 		undernummer: string | null;
// 		bruksenhetsnummer: (string | null)[];
// 		objtype: string;
// 		poststed: string;
// 		postnummer: string;
// 		adressetekstutenadressetilleggsnavn: string;
// 		stedfestingverifisert: boolean;
// 		oppdateringsdato: string;
// 		representasjonspunkt: {
// 			epsg: string;
// 			lat: number;
// 			lon: number;
// 		};
// 	}[];
// };

// // Hent punkt for adresse fra GeoNorge
// const toUrlQuery = (obj: Record<string, unknown>) =>
// 	new URLSearchParams(
// 		Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, `${v}`])),
// 	).toString();

// export const getGeoNorgeAdresser = async (params: {
// 	adressekode?: number;
// 	adressenavn?: string;
// 	adressetekst?: string;
// 	adressetilleggsnavn?: string;
// 	asciiKompatibel?: boolean;
// 	bokstav?: string;
// 	bruksenhetsnummer?: string;
// 	bruksnummer?: number;
// 	festenummer?: number;
// 	filtrer?: string;
// 	fuzzy?: boolean;
// 	gardsnummer?: number;
// 	kommunenavn?: string;
// 	kommunenummer?: number;
// 	nummer?: number;
// 	objtype?: "Vegadresse" | "Matrikkeladresse";
// 	postnummer?: string;
// 	poststed?: string;
// 	side?: number;
// 	sok?: string;
// 	sokemodus?: "AND" | "OR";
// 	treffPerSide?: number;
// 	undernummer?: string;
// 	utkoordsys?: number;
// }): Promise<GeoNorgeAdresser | undefined> =>
// 	fetch(
// 		`https://ws.geonorge.no/adresser/v1/sok?${toUrlQuery({
// 			asciiKompatibel: true,
// 			fuzzy: true,
// 			side: 0,
// 			treffPerSide: 10,
// 			utkoordsys: 4326,
// 			...params,
// 		})}`,
// 	)
// 		.then((res) => res.json())
// 		.catch((error) =>
// 			console.log(`Feilet i å hente adresse fra punkt: ${error}`),
// 		);
