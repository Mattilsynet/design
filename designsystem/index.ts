import * as field from './field/field';
import * as popover from './popover/popover';
export * as styles from './styles.module.css';

export function observe(el: Element) {
  field.observe(el);
  popover.observe(el);
}

export function unobserve(el: Element) {
  field.unobserve(el);
  popover.unobserve(el);
}