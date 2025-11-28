import L from "leaflet";
import {
	attr,
	debounce,
	defineElement,
	isBrowser,
	MTDSElement,
} from "../utils";
import type { MTDSAtlasElement } from "./atlas-element";

declare global {
	interface HTMLElementTagNameMap {
		"mtds-atlas-matgeo": MTDSAtlasMatgeoElement;
	}
	interface GlobalEventHandlersEventMap {
		atlasfeatureclick: CustomEvent<
			Omit<L.LeafletMouseEvent, "target"> & {
				feature: L.Polygon["feature"];
				target: L.Layer;
			}
		>;
	}
	interface Window {
		_matgeoCollections?: Promise<string[]>;
	}
}

// TODO: Warn if invalid collection, and tell what collections is available
// TODO: Show loading?

const MATGEO_EVENTS = "moveend zoomend refresh";
const MATGEO_URL =
	"https://matgeoservice-256616427209.europe-north1.run.app/ogc/features/collections";

if (isBrowser() && !window._matgeoCollections)
	window._matgeoCollections = fetch(MATGEO_URL)
		.then((res) => res.json())
		.then((d) => d.collections?.map(({ id }: { id: string }) => id));

export class MTDSAtlasMatgeoElement extends MTDSElement {
	atlas?: MTDSAtlasElement;
	geojson?: L.GeoJSON;

	static get observedAttributes() {
		return ["data-collection", "popovertarget"]; // Using ES2015 syntax for backwards compatibility
	}
	constructor() {
		super();
		this.refresh = debounce(this.refresh, 300); // Debounce to avoid too many requests
	}
	connectedCallback() {
		queueMicrotask(() => {
			this.atlas = this.closest<MTDSAtlasElement>("mtds-atlas") || undefined;
			this.geojson = new L.GeoJSON(null, {
				style: this.#getStyle(),
				onEachFeature: (_, layer) => layer.on("click", this.handleEvent, this),
			});
			this.geojson.bindPopup(() => `#${attr(this, "popovertarget")}`);
			this.atlas?.map?.on(MATGEO_EVENTS, this.refresh, this);
			this.atlas?.map?.addLayer(this.geojson);
			this.refresh();
		}); // Let the atlas parent initialize first
	}
	attributeChangedCallback(name?: string) {
		if (name === "popovertarget") this.geojson?.getPopup()?.update();
		if (name === "data-color") this.geojson?.setStyle(this.#getStyle());
		if (name === "data-collection") this.refresh();
	}
	disconnectedCallback() {
		this.atlas?.map?.off(MATGEO_EVENTS, this.refresh, this);
		this.geojson?.unbindPopup().remove();
		this.geojson = this.atlas = undefined;
	}
	refresh(nocache?: boolean | L.LeafletEvent) {
		window._matgeoCollections?.then((collections) => {
			const collection = attr(this, "data-collection") || "";
			const cache = nocache === true ? `&nocache=${Date.now()}` : "";
			const bbox = this.atlas?.map?.getBounds().toBBoxString();
			if (!collections.includes(collection))
				console.warn(
					`mtds-atlas-matgeo: Please set a vaild \x1B[103mdata-collection="${collections.join(" | ")}"\x1B[m`,
				);
			else
				fetch(`${MATGEO_URL}/${collection}/items?bbox=${bbox}${cache}`)
					.then((res) => res.json())
					.then((data) => this.geojson?.clearLayers().addData(data));
		});
	}
	handleEvent(event: L.LeafletMouseEvent) {
		event.originalEvent.stopPropagation(); // Prevent clicks from bubbling from ShadowDOM
		const detail = { ...event, feature: event.target.feature };
		// this.atlas?.togglePopup(detail.target, this);
		this.dispatchEvent(new MouseEvent("click", event.originalEvent)); // Forward click, but from <mtds-atlas-matgeo> element
		this.dispatchEvent(
			new CustomEvent("atlasfeatureclick", { detail, bubbles: true }),
		);
	}
	#getStyle() {
		return {
			color: `var(--mtds-color-${attr(this, "data-color") || "main"}-base-default)`,
		};
	}
}

defineElement("mtds-atlas-matgeo", MTDSAtlasMatgeoElement);
