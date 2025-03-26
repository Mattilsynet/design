"use client"; // Enable client side code
export * as styles from "./styles.module.css";
export { pagination } from "./pagination/pagination-helper";
import "./tooltip/tooltip-observer"; // Load data-tooltip behaviour
import "@u-elements/u-datalist";
import "@u-elements/u-details"; // Polyfill for <details> element
import "@u-elements/u-tabs";
import "@u-elements/u-tags";
import * as dialog from "./dialog/dialog-observer";
import * as field from "./field/field-observer";
import * as fieldset from "./fieldset/fieldset-observer";
import * as app from "./layout/app-observer";
import * as logo from "./logo/logo-observer";
import * as popover from "./popover/popover-observer";
import * as table from "./table/table-observer";
// import * as toast from "./toast/toast-observer";
import { IS_BROWSER } from "./utils";

export type Size = "sm" | "md" | "lg";
export type HeadingSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

// Automatic observe on browser
if (IS_BROWSER) {
  const isLoading = document.readyState === "loading"; // Check if the page is still loading - might happen if the script is in <head>
  const onLoaded = () => observe(document.body);

  if (isLoading) document.addEventListener("DOMContentLoaded", onLoaded);
  else onLoaded();
}

export function observe(el: Element) {
  app.observe(el);
  dialog.observe(el);
  field.observe(el);
  fieldset.observe(el);
  logo.observe(el);
  popover.observe(el);
  table.observe(el);
  // toast.observe(el);
}

export function unobserve(el: Element) {
  app.unobserve(el);
  dialog.unobserve(el);
  field.unobserve(el);
  fieldset.unobserve(el);
  logo.unobserve(el);
  popover.unobserve(el);
  table.unobserve(el);
  // toast.unobserve(el);
}
