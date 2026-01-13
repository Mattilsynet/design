// Expose custom elements not matching HTML elements
export { UHTMLComboboxElement } from "@u-elements/u-combobox";
export {
	UHTMLTabElement,
	UHTMLTabListElement,
	UHTMLTabPanelElement,
	UHTMLTabsElement,
} from "@u-elements/u-tabs";

// Ensure polyfills are loaded in browser environment only
if (isBrowser()) {
	import("invokers-polyfill");
	import("dialog-closedby-polyfill");
}

import printcssraw from "./print/print.css?raw"; // Expose print CSS

export const printcss = String(printcssraw)
	.replace(/\/\*[^!][^*]*\*\//gs, "") // Strip comments
	.replace(/(\n|\t)/g, "") // Strip newlines and tabs
	.replace(/\s+/g, " "); // Strip multiple spaces

// Expose API
export { version } from "../package.json"; // Expose version to make it easier to debug
export * from "./analytics/analytics";
export * from "./app/app-observer";
export * from "./law/law-helper";
export * from "./pagination/pagination-helper";
export * as styles from "./styles.module.css";
export * from "./toast/toast-helper";

// Load behaviours
import "./breadcrumbs/breadcrumbs-observer";
import "./chart/chart-element";
import "./dialog/dialog-observer";
import "./errorsummary/errorsummary-observer";
import "./field/field-observer";
import "./fieldset/fieldset-observer";
import "./logo/logo-observer";
import "./popover/popover-observer";
import "./table/table-observer";
import "./toast/toast-observer";
import "./togglegroup/togglegroup-observer";
import "./tooltip/tooltip-observer";
import "./validation/validation-observer";
import "@u-elements/u-combobox";
import "@u-elements/u-datalist";
import "@u-elements/u-details"; // Polyfill for <details> element
import "@u-elements/u-progress";
import "@u-elements/u-tabs";
import { isBrowser } from "./utils";

// Expose types
export type Size = "sm" | "md" | "lg";
export type HeadingSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
