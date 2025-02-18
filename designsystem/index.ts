import * as dialog from "./dialog/dialog-observer";
import * as field from "./field/field-observer";
import * as fieldset from "./fieldset/fieldset-observer";
import * as layout from "./layout/layout-observer";
import * as popover from "./popover/popover-observer";
import * as table from "./table/table-observer";
import "./tooltip/tooltip-observer"; // Load data-tooltip behaviour
import { IS_BROWSER } from "./utils";
export { pagination } from "./pagination/pagination";
export * as styles from "./styles.module.css";

// Automatic observe on browser
if (IS_BROWSER) {
  const isLoading = document.readyState === "loading"; // Check if the page is still loading - might happen if the script is in <head>
  const onLoaded = () => observe(document.body);

  if (isLoading) document.addEventListener("DOMContentLoaded", onLoaded);
  else onLoaded();
}

export function observe(el: Element) {
  dialog.observe(el);
  field.observe(el);
  fieldset.observe(el);
  layout.observe(el);
  popover.observe(el);
  table.observe(el);
}

export function unobserve(el: Element) {
  dialog.unobserve(el);
  field.unobserve(el);
  fieldset.unobserve(el);
  layout.unobserve(el);
  popover.unobserve(el);
  table.unobserve(el);
}
