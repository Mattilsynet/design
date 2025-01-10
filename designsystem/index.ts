import * as field from './field/field';
import * as fieldset from './fieldset/fieldset';
import * as popover from './popover/popover';
import * as table from './table/table';
import { IS_BROWSER } from './utils';
export { pagination } from './pagination/pagination';
export * as styles from './styles.module.css';

if (IS_BROWSER) observe(document); // Automatic observe on browser

export function observe(el: Element | Document) {
  field.observe(el);
  fieldset.observe(el);
  popover.observe(el);
  table.observe(el);
}

export function unobserve(el: Element | Document) {
  field.unobserve(el);
  fieldset.unobserve(el);
  popover.unobserve(el);
  table.unobserve(el);
}