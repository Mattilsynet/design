// Expose custom elements not matching HTML elements
export {
	UHTMLTabsElement,
	UHTMLTabElement,
	UHTMLTabListElement,
	UHTMLTabPanelElement,
} from "@u-elements/u-tabs";
export { UHTMLTagsElement } from "@u-elements/u-tags";

// Expose API
export { version } from "../package.json"; // Expose version to make it easier to debug
export { pagination } from "./pagination/pagination-helper";
export { toggleAppExpanded } from "./app/app-observer";
export * as styles from "./styles.module.css";

// Load behaviours
// import "./toast/toast-observer";
import "./breadcrumbs/breadcrumbs-observer";
import "./dialog/dialog-observer";
import "./errorsummary/errorsummary-observer";
import "./field/field-observer";
import "./fieldset/fieldset-observer";
import "./logo/logo-observer";
import "./popover/popover-observer";
import "./table/table-observer";
import "./togglegroup/togglegroup-observer";
import "./tooltip/tooltip-observer";
import "@u-elements/u-datalist";
import "@u-elements/u-details"; // Polyfill for <details> element
import "@u-elements/u-progress";
import "@u-elements/u-tabs";
import "@u-elements/u-tags";

// Expose types
export type Size = "sm" | "md" | "lg";
export type HeadingSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
