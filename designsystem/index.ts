// Expose custom elements not matching HTML elements
export { UHTMLComboboxElement } from "@u-elements/u-combobox";
export {
	UHTMLTabElement,
	UHTMLTabListElement,
	UHTMLTabPanelElement,
	UHTMLTabsElement,
} from "@u-elements/u-tabs";

// Expose API
export { version } from "../package.json"; // Expose version to make it easier to debug
export { analytics } from "./analytics/analytics";
export { toggleAppExpanded } from "./app/app-observer";
export { pagination } from "./pagination/pagination-helper";
export * as styles from "./styles.module.css";
export { toast } from "./toast/toast-helper";

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
import "@u-elements/u-combobox";
import "@u-elements/u-datalist";
import "@u-elements/u-details"; // Polyfill for <details> element
import "@u-elements/u-progress";
import "@u-elements/u-tabs";

// Expose types
export type Size = "sm" | "md" | "lg";
export type HeadingSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
