import styles from '../styles.module.css';
import { isInputLike, onMutation, useId } from '../utils';
const CSS_FIELDSET = styles.fieldset.split(' ')[0];
const CSS_VALIDATION = styles.validation.split(' ')[0];

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

export const observe = (el: Element) => onMutation(el, CSS_FIELDSET, process);
export const unobserve = (el: Element) => onMutation(el, CSS_FIELDSET, false);
