import L from "leaflet";
import LeafletCSS from "leaflet/dist/leaflet.css?raw";
import type {} from "leaflet.markercluster"; // Extend L namespace
import "./cluster.js";
import {
	attr,
	defineElement,
	isBrowser,
	MTDSElement,
	off,
	on,
	tag,
} from "../utils";
import css from "./atlas.css?raw";
export { L };
export { MTDSAtlasMarkerElement } from "./atlas-marker";
export { MTDSAtlasMatgeoElement } from "./atlas-matgeo";
export { MTDSAtlasWMSElement } from "./atlas-wms";

// TODO: Add minimum zoom level for adding markers (minimum 17 som standard?)
// TODO: Add search helper (https://ws.geonorge.no/adresser/v1/openapi.json + https://ws.geonorge.no/adresser/v1/#/default/get_sok)
// TODO: matgeo-autoload popover info

declare global {
	interface HTMLElementTagNameMap {
		"mtds-atlas": MTDSAtlasElement;
	}
}

let SKIP_CLICK: number | NodeJS.Timeout = 0;
const KARTVERKET_MAX_ZOOM = 18; // Kartverket does not support more than zoom level 18
const KARTVERKET_TILES_URL =
	"https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png";
const BOUNDS_NORWAY: L.LatLngBoundsLiteral = [
	[57.5, 4.73],
	[71.5, 31.44],
];

export class MTDSAtlasElement extends MTDSElement {
	cluster?: L.MarkerClusterGroup;
	map?: L.Map;

	static get observedAttributes() {
		return ["data-view", "data-scrollzoom"]; // Using ES2015 syntax for backwards compatibility
	}
	constructor() {
		super();
		this.attachShadow({ mode: "open" }).append(
			tag(
				"style",
				null,
				`@layer leaflet{${LeafletCSS}}\n@layer mt.design{${css}`,
			),
			tag("figure"),
		);
	}
	connectedCallback() {
		const container = this.shadowRoot?.lastElementChild as HTMLElement;
		const cluster = attr(this, "data-cluster") ?? "false";
		const tiles = new L.TileLayer(KARTVERKET_TILES_URL, {
			attribution: "&copy; Kartverket",
			className: "leaflet-kartverket-tiles",
			maxZoom: KARTVERKET_MAX_ZOOM,
		});

		this.map = new L.Map(container, {
			attributionControl: false,
			fadeAnimation: false, // Prevent popup fades
			layers: [tiles],
			zoomControl: false,
			zoomSnap: 0.2,
		});

		on(this, "pointerup,click", this.#skipClick); // Prevent clicks from bubbling up unless sent from Leaflet
		this.map.addControl(new L.Control.Attribution({ prefix: "" }));
		this.map.addControl(new L.Control.Zoom({ position: "bottomright" }));
		this.map.on("popupopen popupclose", this.#handlePopup, this);
		this.cluster = new L.MarkerClusterGroup({
			zoomToBoundsOnClick: true,
			showCoverageOnHover: false,
			disableClusteringAtZoom:
				cluster === "false" ? 1 : Number(cluster) || KARTVERKET_MAX_ZOOM + 1,
			iconCreateFunction: (cluster: L.MarkerCluster) =>
				new L.DivIcon({
					html: `${cluster.getChildCount()}`,
					className: "leaflet-cluster-icon",
					iconSize: [30, 30],
				}),
		}).addTo(this.map);

		// Initial setup attributes
		for (const name of MTDSAtlasElement.observedAttributes)
			this.attributeChangedCallback(name, null, attr(this, name));
	}
	attributeChangedCallback(name: string, _prev?: null, next?: string | null) {
		if (name === "data-view") this.setView(next || "");
		if (name === "data-scrollzoom")
			this.map?.scrollWheelZoom[next === "false" ? "disable" : "enable"]();
	}
	setView(view: string | number[], opts?: L.FitBoundsOptions) {
		const p = `${view}`.split(",").map(parseFloat).filter(Number.isFinite);
		const b = this.cluster?.getBounds();

		if (p.length === 3) return this.map?.setView([p[0], p[1]], p[2], opts);
		if (view !== "fit") return this.map?.fitBounds(BOUNDS_NORWAY, opts);
		if (b?.isValid()) return this.map?.fitBounds(b.pad(0.1), opts);
		this.cluster?.once("layeradd", () => {
			setTimeout(() => this.setView("fit"), 50); // Add all markers before fitting
		});
	}
	latLngFromPoint(x: number, y: number) {
		// @ts-expect-error -- Missing from Leaflet@2.0.0-alpha.1 types
		return this.map?.pointerEventToLatLng({ clientX: x, clientY: y });
	}
	disconnectedCallback() {
		off(this, "pointerup,click", this.#skipClick);
		this.map?.remove();
		this.map = this.cluster = undefined;
	}
	#handlePopup({ type, popup }: { type: string; popup: L.Popup }) {
		const open = type === "popupopen";
		const cont = popup.getElement()?.querySelector(".leaflet-popup-content");
		const slot = cont?.querySelector<HTMLSlotElement>(":scope > slot");
		const id = cont?.textContent?.match(/^#(\S+)/)?.[1] || "";
		const el = document.getElementById(slot?.name || id); // If content of popup is #id, replace with <slot>

		if (!el) return open && id && popup.close(); // Close popup if target element not found
		L.Util.setOptions(popup, { maxWidth: this.offsetWidth - 40 });
		attr(el, "data-popover", open ? attr(el, "popover") : null); // Store previous popover mode
		attr(el, "popover", open ? null : attr(el, "data-popover")); // But temporarily remove it so popover renders
		attr(el, "slot", open ? el.id : null); // Render popover in slot
		if (open) popup.setContent(tag("slot", { name: el.id }));
	}
	#skipClick(event: Partial<MouseEvent>) {
		if (event.type === "click") SKIP_CLICK && event.stopPropagation?.();
		else if (document.body.classList.contains("leaflet-dragging"))
			SKIP_CLICK = setTimeout(() => {
				SKIP_CLICK = 0;
			}, 50); // Was dragging, so skip succeeding click
	}
}

defineElement("mtds-atlas", MTDSAtlasElement);

if (isBrowser())
	L.Marker.prototype.options.icon = new L.DivIcon({
		html: '<div class="leaflet-marker-generated-slot"><div class="leaflet-marker-generated-icon"></div></div>',
		iconSize: [0, 0],
	});
