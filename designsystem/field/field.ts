import styles from '../styles.module.css';
import { QUICK_EVENT, isInputLike, off, on, onAdd, useId } from '../utils';

const CSS_FIELD = styles.field.split(' ')[0];
const CSS_VALIDATIONS = styles.validation.split(' ');
const CSS_VALIDATION = CSS_VALIDATIONS[0];
const BOUND = new WeakMap<Element | Document, ReturnType<typeof onAdd>>();

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

    if (input) for (const label of labels) label.htmlFor = useId(input);
    if (input) renderCounter(input);

    input?.setAttribute('aria-describedby', descs.join(' '));
    input?.setAttribute('aria-invalid', `${!valid}`);
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

    if (prevInvalid !== nextInvalid) {
      el.setAttribute('aria-live', nextInvalid ? 'polite' : 'off');
      for (const css of CSS_VALIDATIONS) el.classList.toggle(css, nextInvalid);
    }
    el.textContent = `${Math.abs(remainder)} tegn ${nextInvalid ? 'for mye' : 'igjen'}`;
  }
}

export function observe (el: Element | Document) {
  const fields = el.getElementsByClassName(CSS_FIELD);
  const add = onAdd(styles.fieldChildAdded, () => renderAria(fields));
  BOUND.set(el, add);
  add.observe(el);
  on(el, 'input', handleInput, QUICK_EVENT);
}

export function unobserve (el: Element | Document) {
  BOUND.get(el)?.disconnect(el);
  off(el, 'input', handleInput, QUICK_EVENT);
}
