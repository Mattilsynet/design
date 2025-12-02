import { booleanPointInPolygon as inGeo } from "@turf/boolean-point-in-polygon";
import { point as turfPoint } from "@turf/helpers";

import L from "leaflet";
import {
	attr,
	debounce,
	defineElement,
	isBrowser,
	MTDSElement,
} from "../utils";
import type { MTDSAtlasElement } from "./atlas-element";

type Feature = L.Polygon["feature"];
type Collection = Record<string, unknown>;
type Collections = Map<string, Collection>;
type LayerWithFeature = L.Layer & { feature?: Feature };
declare global {
	interface HTMLElementTagNameMap {
		"mtds-atlas-matgeo": MTDSAtlasMatgeoElement;
	}
	interface GlobalEventHandlersEventMap {
		atlasfeatureclick: CustomEvent<
			Omit<L.LeafletMouseEvent, "target"> & {
				targets: LayerWithFeature[];
				collections: Collections;
			}
		>;
	}
	interface Window {
		_matgeoCollections?: Promise<Collections>;
	}
}

const MATGEO_EVENTS = "moveend zoomend refresh";
const MATGEO_URL =
	"https://matgeoservice-256616427209.europe-north1.run.app/ogc/features/collections";

if (isBrowser() && !window._matgeoCollections)
	window._matgeoCollections = fetch(MATGEO_URL)
		.then((res) => res.json())
		.then((d) => new Map(d.collections?.map((c: Collection) => [c.id, c])));

export class MTDSAtlasMatgeoElement extends MTDSElement {
	atlas?: MTDSAtlasElement;
	geojson?: L.GeoJSON;

	static get observedAttributes() {
		return ["hidden", "data-collection", "data-color", "popovertarget"]; // Using ES2015 syntax for backwards compatibility
	}
	constructor() {
		super();
		this.refresh = debounce(this.refresh, 300); // Debounce to avoid too many requests
	}
	connectedCallback() {
		queueMicrotask(() => {
			this.atlas = this.closest<MTDSAtlasElement>("mtds-atlas") || undefined;
			this.atlas?.map?.on(MATGEO_EVENTS, this.refresh, this);
			this.geojson = new L.GeoJSON(null, {
				style: this.#getStyle(),
				onEachFeature: (_, layer) => layer.on("click", this.handleEvent, this),
			}).bindPopup(() => `#${attr(this, "popovertarget")}`);
			this.refresh();
			this.attributeChangedCallback("hidden"); // Maybe add to map
		}); // Let the atlas parent initialize first
	}
	attributeChangedCallback(name?: string) {
		const geojson = this.geojson;
		const map = this.atlas?.map;
		if (name === "popovertarget") geojson?.getPopup()?.update();
		if (name === "data-color") geojson?.setStyle(this.#getStyle());
		if (name === "data-collection") this.refresh();
		if (name === "hidden" && geojson && map)
			map[this.hidden ? "removeLayer" : "addLayer"](geojson);
	}
	disconnectedCallback() {
		this.atlas?.map?.off(MATGEO_EVENTS, this.refresh, this);
		this.geojson?.unbindPopup().remove();
		this.geojson = this.atlas = undefined;
	}
	refresh(nocache?: boolean | L.LeafletEvent) {
		if (!this.geojson || !this.atlas?.map?.hasLayer(this.geojson)) return;
		getCollections().then((collections) => {
			const collection = attr(this, "data-collection") || "";
			const cache = nocache === true ? `&nocache=${Date.now()}` : "";
			const bbox = this.atlas?.map?.getBounds().toBBoxString();
			if (!collections.has(collection))
				console.warn(
					`mtds-atlas-matgeo: Please set a vaild \x1B[103mdata-collection="${Array.from(collections.keys()).join(" | ")}"\x1B[m`,
				);
			else
				fetch(`${MATGEO_URL}/${collection}/items?bbox=${bbox}${cache}`)
					.then((res) => res.json())
					.then((data) => this.geojson?.clearLayers().addData(data));
		});
	}
	handleEvent(event: L.LeafletMouseEvent) {
		event.originalEvent.stopPropagation(); // Prevent clicks from bubbling from ShadowDOM
		getCollections().then((collections) => {
			const targets: LayerWithFeature[] = [event.target]; // Leaflet does not list all clicked layers, so we find them manually
			const detail = { ...event, targets, collections };
			const point = turfPoint([event.latlng.lng, event.latlng.lat]);

			this.atlas?.map?.eachLayer((layer: LayerWithFeature) => {
				if (layer === event.target) return; // Already added
				const inside =
					(layer.feature?.geometry && inGeo(point, layer.feature.geometry)) ||
					(layer instanceof L.Marker && layer.getLatLng().equals(event.latlng));
				if (inside) targets.push(layer);
			});

			this.dispatchEvent(new MouseEvent("click", event.originalEvent)); // Forward click, but from <mtds-atlas-matgeo> element
			this.dispatchEvent(
				new CustomEvent("atlasfeatureclick", { detail, bubbles: true }),
			);
		});
	}
	async getCollection() {
		const id = attr(this, "data-collection") || "";
		return getCollections().then((col) => col.get(id));
	}
	#getStyle() {
		return {
			color: `var(--mtds-color-${attr(this, "data-color") || "main"}-base-default)`,
		};
	}
}

defineElement("mtds-atlas-matgeo", MTDSAtlasMatgeoElement);

function getCollections() {
	return window._matgeoCollections || Promise.resolve(new Map());
}
