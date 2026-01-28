import L from "leaflet";
import { attr, defineElement, MTDSElement, off, on, tag } from "../utils";
import type { MTDSAtlasElement } from "./atlas-element";

declare global {
	interface HTMLElementTagNameMap {
		"mtds-atlas-marker": MTDSAtlasMarkerElement;
	}
}

let SLOT = 0;
export class MTDSAtlasMarkerElement extends MTDSElement {
	atlas?: MTDSAtlasElement;
	marker?: L.Marker;

	static get observedAttributes() {
		return ["hidden", "draggable", "data-latlng", "popovertarget"]; // Using ES2015 syntax for backwards compatibility
	}
	connectedCallback() {
		queueMicrotask(() => {
			const html = tag("slot", { name: `${++SLOT}` });
			const icon = new L.DivIcon({ html, iconSize: [0, 0] });
			this.atlas = this.closest<MTDSAtlasElement>("mtds-atlas") || undefined;
			this.marker = new L.Marker(this.#parseLatLng(), {
				draggable: this.draggable,
				keyboard: false,
				icon,
			});
			this.marker.bindPopup(() => `#${attr(this, "popovertarget")}`);
			this.marker.on("dragend", this.#handleDragEnd);

			on(this, "click keydown", this); // Listen for clicks to toggle popup
			attr(this, "slot", `${SLOT}`); // Link slot to marker icon
			attr(this, "role", "button");
			attr(this, "tabindex", "0");
			this.attributeChangedCallback("hidden"); // Maybe add to map
		}); // Let the atlas parent initialize first
	}
	attributeChangedCallback(name: string) {
		const mark = this.marker;
		const cluster = this.atlas?.cluster;
		if (name === "popovertarget") mark?.getPopup()?.update();
		if (name === "data-latlng") {
			const latlng = this.#parseLatLng();
			mark?.getLatLng().equals(latlng) || mark?.setLatLng(latlng);
		}
		if (name === "draggable")
			mark?.dragging?.[this.draggable ? "enable" : "disable"]();
		if (name === "hidden" && mark && cluster)
			cluster[this.hidden ? "removeLayer" : "addLayer"](mark);
	}
	disconnectedCallback() {
		off(this, "click keydown", this);
		this.marker?.unbindPopup().off("dragend", this.#handleDragEnd).remove();
		this.marker = this.atlas = undefined;
	}
	handleEvent(event: KeyboardEvent) {
		if (event.type === "click") return this.marker?.fire("click"); //this.atlas?.togglePopup(this.marker, this);
		if (event.key === " ") event.preventDefault(); // Prevent page scroll on space key
		if (event.key === " " || event.key === "Enter") this.click(); // Forward keyvoard to click for accessibility
	}
	get latlng() {
		return attr(this, "data-latlng") || "";
	}
	set latlng(latlng: string) {
		attr(this, "data-latlng", latlng);
	}
	#parseLatLng() {
		return this.latlng?.split(",").map(parseFloat) as L.LatLngTuple;
	}
	#handleDragEnd(detail: L.LeafletEvent) {
		const slot = detail.target._icon
			?.firstElementChild as HTMLSlotElement | null;
		const self =
			slot?.assignedElements?.()?.[0] as MTDSAtlasMarkerElement | null;
		const { lat, lng } = detail.target.getLatLng(); // Using L.Marker.getLatLng() to get position also when in spiderified cluster
		if (self) self.latlng = `${lat},${lng}`;
		self?.dispatchEvent(new CustomEvent("dragend", { detail, bubbles: true }));
	}
}

defineElement("mtds-atlas-marker", MTDSAtlasMarkerElement);
