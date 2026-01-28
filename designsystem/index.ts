// Import and expose custom elements not matching HTML elements for backward compatibility
export * from "@u-elements/u-combobox";
export * from "@u-elements/u-tabs";
import "@u-elements/u-details";

import printcssraw from "./print/print.css?raw"; // Expose print CSS

// Minify print CSS
export const printcss = String(printcssraw)
	.replace(/\/\*[^!][^*]*\*\//gs, "") // Strip comments
	.replace(/(\n|\t)/g, "") // Strip newlines and tabs
	.replace(/\s+/g, " "); // Strip multiple spaces

// Expose API
export * from "@digdir/designsystemet-web"; // Import and expose Digdir web functionality
export { version } from "../package.json"; // Expose version to make it easier to debug
export * from "./analytics/analytics";
export * from "./app/app-observer";
export * from "./law/law-helper";
export * as styles from "./styles.module.css";
export * from "./toast/toast-helper";

// Load behaviors
import "./deprecations";
import "./chart/chart-element";
import "./logo/logo-observer";
import "./table/table-observer";
import "./toast/toast-observer";
import "./tooltip/tooltip-element";
import "./validation/validation-observer";
import "@u-elements/u-datalist";
import "@u-elements/u-progress";

// Expose types
export type Size = "sm" | "md" | "lg";
export type HeadingSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
