import styles from '../styles.module.css';
import { IS_BROWSER, isInputLike, onAdd, useId } from '../utils';
const CSS_FIELDSET = styles.fieldset.split(' ')[0];
const CSS_VALIDATION = styles.validation.split(' ')[0];
const BOUND = new WeakMap<Element | Document, ReturnType<typeof onAdd>>();

function process(fieldsets: HTMLCollectionOf<Element>) {
  for(const fieldset of fieldsets) {
    const inputs: HTMLInputElement[] = [];
    let validationId = '';

    for (const el of fieldset.getElementsByTagName('*')) {
      if (el.classList.contains(CSS_VALIDATION)) validationId = useId(el);
      else if (isInputLike(el)) inputs.push(el);
    }

    if (validationId) 
      for(const input of inputs) {
        input.setAttribute('aria-describedby', validationId);
        input.setAttribute('aria-invalid', 'true');
      }
  }
}

if (IS_BROWSER) observe(document);

export function observe (el: Element | Document) {
  const fields = el.getElementsByClassName(CSS_FIELDSET);
  const add = onAdd(styles.fieldsetValidationAdded, () => process(fields));
  BOUND.set(el, add);
  add.observe(el);
}

export function unobserve (el: Element | Document) {
  BOUND.get(el)?.disconnect(el);
}
