import { booleanPointInPolygon as inGeo } from "@turf/boolean-point-in-polygon";
import { point as turfPoint } from "@turf/helpers";

import L from "leaflet";
import { attr, debounce, defineElement, MTDSElement } from "../utils";
import type { MTDSAtlasCollection, MTDSAtlasElement } from "./atlas-element";

type Feature = L.Polygon["feature"];
type LayerWithFeature = L.Layer & { feature?: Feature };
declare global {
	interface HTMLElementTagNameMap {
		"mtds-atlas-matgeo": MTDSAtlasMatgeoElement;
	}
	interface GlobalEventHandlersEventMap {
		atlasfeatureclick: CustomEvent<
			Omit<L.LeafletMouseEvent, "target"> & {
				targets: LayerWithFeature[];
				collections: MTDSAtlasCollection[];
			}
		>;
	}
}

const EVENTS = "moveend zoomend refresh";

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
			this.atlas?.map?.on(EVENTS, this.refresh, this);
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
		this.atlas?.map?.off(EVENTS, this.refresh, this);
		this.geojson?.unbindPopup().remove();
		this.geojson = this.atlas = undefined;
	}
	refresh(nocache?: boolean | L.LeafletEvent) {
		if (!this.geojson || !this.atlas?.map?.hasLayer(this.geojson)) return;
		this.getCollection().then((collection) => {
			const items = collection?.links.find(({ rel }) => rel === "items");
			const cache = nocache === true ? `&nocache=${Date.now()}` : "";
			const bbox = this.atlas?.map?.getBounds().toBBoxString();

			if (!collection)
				this.atlas?.getCollections().then((collections) => {
					const message = `mtds-atlas-matgeo: Please set a vaild data-collection="${Object.keys(collections).join(" | ")}"`;
					console.warn(message);
				});
			else
				fetch(`${items?.href}?bbox=${bbox}${cache}`)
					.then((res) => res.json())
					.then((data) => this.geojson?.clearLayers().addData(data));
		});
	}
	handleEvent(event: L.LeafletMouseEvent) {
		event.originalEvent.stopPropagation(); // Prevent clicks from bubbling from ShadowDOM
		this.atlas?.getCollections().then((collections) => {
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
		return this.atlas
			?.getCollections()
			.then((cols) => cols?.[attr(this, "data-collection") || ""]);
	}
	#getStyle() {
		return {
			color: `var(--mtds-color-${attr(this, "data-color") || "main"}-base-default)`,
		};
	}
}

defineElement("mtds-atlas-matgeo", MTDSAtlasMatgeoElement);
