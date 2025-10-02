import type * as ReactTypes from "react";
import { MTDSElement } from "../utils";

type JSXMapAttrs = ReactTypes.HTMLAttributes<MTDLovvelgerElement>;
type JSXMapProps = ReactTypes.DetailedHTMLProps<
	JSXMapAttrs,
	MTDLovvelgerElement
>;
declare global {
	namespace React.JSX {
		interface IntrinsicElements {
			"mtds-lovvelger": JSXMapProps & { class?: string };
		}
	}
}
export class MTDLovvelgerElement extends MTDSElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}
	connectedCallback() {
		console.log(`I'm here`);
	}
}
