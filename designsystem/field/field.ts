import styles from '../styles.module.css';
import { IS_BROWSER, createOptimizedMutationObserver, useId } from '../utils';

const CSS_FIELD = styles.field.split(' ')[0];
const CSS_VALIDATION = styles.validation.split(' ')[0];
const OBSERVERS = new WeakMap();


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
    input?.setAttribute('aria-describedby', descs.join(' '));
    input?.setAttribute('aria-invalid', `${!valid}`);
  }
}

// Automatically observe <body> if in browser
if (IS_BROWSER) observe(document.body);

export function observe (el: Element) {
  if (OBSERVERS.has(el)) return;
  const fields = el.getElementsByClassName(CSS_FIELD); // Reutrns a live HTMLCollection
  const observer = createOptimizedMutationObserver(() => process(fields));
  observer.observe(el, {
    attributeFilter: ['class'],
    attributes: true,
    childList: true,
    subtree: true
  });

  process(fields); // Initial run
  OBSERVERS.set(el, observer);
}

export function unobserve (el: Element) {
  OBSERVERS.get(el)?.disconnect();
}
