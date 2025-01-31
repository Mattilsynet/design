import * as field from './field/field';
import * as fieldset from './fieldset/fieldset';
import * as popover from './popover/popover';
import * as table from './table/table';
import { IS_BROWSER } from './utils';
export { pagination } from './pagination/pagination';
export * as styles from './styles.module.css';

if (IS_BROWSER) {
  // Check if the page is still loading - might happen if the script is in <head>
  const isLoading = document.readyState === "loading";
  const onLoaded = () => observe(document.body);

  if (isLoading) document.addEventListener("DOMContentLoaded", onLoaded);
  else onLoaded();
}
  
  observe(document.body); // Automatic observe on browser

export function observe(el: Element) {
  field.observe(el);
  fieldset.observe(el);
  popover.observe(el);
  table.observe(el);
}

export function unobserve(el: Element) {
  field.unobserve(el);
  fieldset.unobserve(el);
  popover.unobserve(el);
  table.unobserve(el);
}