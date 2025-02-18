import styles from '../styles.module.css';
import { QUICK_EVENT, attr, isInputLike, off, on, onMutation, useId } from '../utils';

const CSS_FIELD = styles.field.split(' ')[0];
const CSS_PROPERTY_OVER = '--mtds-text-count-over';
const CSS_PROPERTY_UNDER = '--mtds-text-count-under';
const CSS_VALIDATIONS = styles.validation.split(' ');
const CSS_VALIDATION = CSS_VALIDATIONS[0];

function renderAria(fields: HTMLCollectionOf<Element>) {
  for(const field of fields) {
    const labels: HTMLLabelElement[] = [];
    const descs: string[] = [];
    let input: HTMLInputElement | null = null;
    let valid = true;

    for (const el of field.getElementsByTagName('*')) {
      if (el instanceof HTMLLabelElement) labels.push(el);
      else if (isInputLike(el)) input = el;
      else if (el.classList.contains(CSS_VALIDATION)) { // Must be before instanceof HTMLParagraphElement since validation can also be a <p>
        valid = el.getAttribute('data-color') === 'success';
        descs.unshift(useId(el));
      } else if (el instanceof HTMLParagraphElement) descs.push(useId(el));
    }

    if (input) {
      for (const label of labels) label.htmlFor = useId(input);
      renderCounter(input);
      attr(input, 'aria-describedby', descs.join(' '));
      attr(input, 'aria-invalid', `${!valid}`);
    }
  }
}
function handleInput({ target }: Event) {
  if (isInputLike(target)) renderCounter(target);
}

function renderCounter(input: HTMLInputElement) {
  const el = input?.nextElementSibling;
  const limit = el?.getAttribute('data-count');
  
  if (el && limit) {
    const remainder = Number(limit) - input.value.length;
    const nextInvalid = remainder < 0;
    const prevInvalid = el.getAttribute('aria-live') === 'polite';
    const style = window.getComputedStyle(el || input);
    const over = style.getPropertyValue(CSS_PROPERTY_OVER)?.slice(1, -1) || ''; // slice to trim quotes
    const under = style.getPropertyValue(CSS_PROPERTY_UNDER)?.slice(1, -1) || ''; // slice to trim quotes

    if (prevInvalid !== nextInvalid) {
      attr(el, 'aria-live', nextInvalid ? 'polite' : 'off');
      for (const css of CSS_VALIDATIONS) el.classList.toggle(css, nextInvalid);
    }
    el.textContent = (nextInvalid ? over : under).replace('%d', `${Math.abs(remainder)}`);
  }
}

// Prevent browsers from showing default validation bubbles
function handleInvalid(event: Event) {
  if ((event.target as Element)?.closest?.(`.${CSS_FIELD}`)) event.preventDefault();
}

export function observe (el: Element) {
  onMutation(el, CSS_FIELD, renderAria);
  on(el, 'input', handleInput, QUICK_EVENT);
  on(el, 'invalid', handleInvalid, true); // Use capture as invalid does noe buttle
}

export function unobserve (el: Element) {
  onMutation(el, CSS_FIELD, false);
  off(el, 'input', handleInput, QUICK_EVENT);
  off(el, 'invalid', handleInvalid, true);
}
