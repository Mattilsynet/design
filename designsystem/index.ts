"use client"; // Enable client side code

// Expose API
export { pagination } from "./pagination/pagination-helper";
export * as styles from "./styles.module.css";

// Load beahviours
// import "./toast/toast-observer";
import "./dialog/dialog-observer";
import "./field/field-observer";
import "./fieldset/fieldset-observer";
import "./layout/app-observer";
import "./logo/logo-observer";
import "./popover/popover-observer";
import "./table/table-observer";
import "./tooltip/tooltip-observer";
import "@u-elements/u-datalist";
import "@u-elements/u-details"; // Polyfill for <details> element
import "@u-elements/u-tabs";
import "@u-elements/u-tags";

// Expose types
export type Size = "sm" | "md" | "lg";
export type HeadingSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

