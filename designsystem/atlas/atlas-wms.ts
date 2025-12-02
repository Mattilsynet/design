import L from "leaflet";
import { attr, defineElement, MTDSElement } from "../utils";
import type { MTDSAtlasElement } from "./atlas-element";

declare global {
	interface HTMLElementTagNameMap {
		"mtds-atlas-wms": MTDSAtlasWMSElement;
	}
}

export class MTDSAtlasWMSElement extends MTDSElement {
	atlas?: MTDSAtlasElement;
	wms?: L.TileLayer.WMS;

	static get observedAttributes() {
		return ["hidden", "data-url", "popovertarget"]; // Using ES2015 syntax for backwards compatibility
	}
	connectedCallback() {
		queueMicrotask(() => {
			this.atlas = this.closest<MTDSAtlasElement>("mtds-atlas") || undefined;
			this.refresh();
		}); // Let the atlas parent initialize first
	}
	attributeChangedCallback(name?: string) {
		if (name === "data-url") this.refresh();
		if (name === "popovertarget") this.wms?.getPopup()?.update();
		if (name === "hidden" && this.wms) {
			this.atlas?.map?.[this.hidden ? "removeLayer" : "addLayer"](this.wms);
			this.wms.bringToFront();
		}
	}
	refresh() {
		const url = new URL(attr(this, "data-url") || "");
		const params = Object.fromEntries(url.searchParams.entries());
		this.wms?.unbindPopup().remove();
		this.wms = new L.TileLayer.WMS(`${url.origin}${url.pathname}`, params);
		this.attributeChangedCallback("hidden"); // Maybe add to map
	}
	disconnectedCallback() {
		this.wms?.unbindPopup().remove();
		this.wms = this.atlas = undefined;
	}
}

defineElement("mtds-atlas-wms", MTDSAtlasWMSElement);
