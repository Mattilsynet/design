import styles from '../styles.module.css';
import { IS_BROWSER, onAdd, useId } from '../utils';
const CSS_FIELD = styles.field.split(' ')[0];
const CSS_COUNT = styles.count.split(' ')[0];
const CSS_VALIDATION = styles.validation.split(' ')[0];
const BOUND = new Map<Element | Document, ReturnType<typeof onAdd>>();


function process(fields: HTMLCollectionOf<Element>) {
  for(const field of fields) {
    const labels: HTMLLabelElement[] = [];
    const descs: string[] = [];
    let input: Element | null = null;
    let valid = true;

    for (const el of field.getElementsByTagName('*')) {
      if (el instanceof HTMLLabelElement) labels.push(el);
      else if ('validity' in el && !(el instanceof HTMLButtonElement)) input = el;
      else if (el.classList.contains(CSS_VALIDATION)) { // Must be before validation since it can also be a <p>
        valid = el.getAttribute('data-color') === 'success';
        descs.unshift(useId(el));
      } else if (el instanceof HTMLParagraphElement) descs.push(useId(el));
    }

    if (input) for (const label of labels) label.htmlFor = useId(input);

    // const count = input?.nextElementSibling?.getAttribute('data-count');
    // if (count) {
    //   (input as HTMLElement).style.background = 'red';
    // }

    input?.setAttribute('aria-describedby', descs.join(' '));
    input?.setAttribute('aria-invalid', `${!valid}`);
  }
}

if (IS_BROWSER) observe(document);

export function observe (el: Element | Document) {
  const fields = el.getElementsByClassName(CSS_FIELD);
  const add = onAdd(styles.fieldChildAdded, () => process(fields));
  BOUND.set(el, add);
  add.observe(el);
}

export function unobserve (el: Element | Document) {
  BOUND.get(el)?.disconnect(el);
}
