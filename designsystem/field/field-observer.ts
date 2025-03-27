import { UHTMLDataListElement, syncDatalistState } from "@u-elements/u-datalist";
import styles from "../styles.module.css";
import {
  IS_BROWSER,
  QUICK_EVENT,
  attr,
  isInputLike,
  on,
  onMutation,
  useId,
} from "../utils";

const CSS_FIELD = styles.field.split(" ")[0];
const CSS_PROPERTY_OVER = "--mtds-text-count-over";
const CSS_PROPERTY_UNDER = "--mtds-text-count-under";
const CSS_VALIDATIONS = styles.validation.split(" ");
const CSS_VALIDATION = CSS_VALIDATIONS[0];

function renderAria(fields: HTMLCollectionOf<Element>) {
  for (const field of fields) {
    const labels: HTMLLabelElement[] = [];
    const descs: string[] = [];
    let input: HTMLInputElement | null = null;
    let datalist: UHTMLDataListElement | null = null;
    let valid = true;

    for (const el of field.getElementsByTagName("*")) {
      if (el instanceof HTMLLabelElement) labels.push(el);
      else if (el instanceof UHTMLDataListElement) datalist = el;
      else if (isInputLike(el)) input = el;
      else if (el.classList.contains(CSS_VALIDATION)) {
        // Must be before instanceof HTMLParagraphElement since validation can also be a <p>
        valid = attr(el, "data-color") === "success";
        descs.unshift(useId(el));
      } else if (el instanceof HTMLParagraphElement) descs.push(useId(el));
    }

    if (input) {
      for (const label of labels) label.htmlFor = useId(input);
      renderDatalist(input, datalist);
      renderCounter(input);
      renderTextareaSize(input);
      attr(input, "aria-describedby", descs.join(" "));
      attr(input, "aria-invalid", `${!valid}`);
    }
  }
}

// iOS does not support field-sizing: content, so we need to manually resize
function renderTextareaSize(textarea: Element) {
  if (textarea instanceof HTMLTextAreaElement) {
    textarea.style.setProperty('--mtds-textarea-height', 'auto');
    textarea.style.setProperty('--mtds-textarea-height', `${textarea.scrollHeight}px`);
  }
}

function renderDatalist(
  input: HTMLInputElement,
  list?: UHTMLDataListElement | null
) {
  attr(input, "list", list ? useId(list) : null);

  if (!list) return;
  if (!input.hasAttribute("placeholder")) attr(input, "placeholder", ""); // Needed to render dropdown chevron when <datalist> is present

  // Setup translations from CSS custom properties
  const style = window.getComputedStyle(list);
  const tags = input.closest('u-tags');
  const i11n = (key: string) => style.getPropertyValue(`--mtds-text-${key}`);

  attr(list, "data-sr-plural", i11n("datalist-plural"));
  attr(list, "data-sr-singular", i11n("datalist-singular"));

  if (tags) {
    attr(tags,'data-sr-added', i11n("tags-added"));
    attr(tags,'data-sr-empty', i11n("tags-empty"));
    attr(tags,'data-sr-found', i11n("tags-found"));
    attr(tags,'data-sr-of', i11n("tags-of"));
    attr(tags,'data-sr-remove', i11n("tags-remove"));
    attr(tags,'data-sr-removed', i11n("tags-removed"));
  }
}

function renderCounter(input: HTMLInputElement) {
  const el = input?.nextElementSibling;
  const limit = el && attr(el, "data-count");

  if (el && limit) {
    const remainder = Number(limit) - input.value.length;
    const nextInvalid = remainder < 0;
    const prevInvalid = attr(el, "aria-live") === "polite";
    const style = window.getComputedStyle(el || input);
    const over = style.getPropertyValue(CSS_PROPERTY_OVER)?.slice(1, -1) || ""; // slice to trim quotes
    const under =
      style.getPropertyValue(CSS_PROPERTY_UNDER)?.slice(1, -1) || ""; // slice to trim quotes

    if (prevInvalid !== nextInvalid) {
      attr(el, "aria-live", nextInvalid ? "polite" : "off");
      for (const css of CSS_VALIDATIONS) el.classList.toggle(css, nextInvalid);
    }
    el.textContent = (nextInvalid ? over : under).replace(
      "%d",
      `${Math.abs(remainder)}`
    );
  }
}

// Update when typing
function handleInput({ target }: Event) {
  if (isInputLike(target)) {
    renderCounter(target);
    renderTextareaSize(target);

    const noFilter = target.list?.getAttribute('data-filter') === 'false';
    if (noFilter) syncDatalistState(target);
  }
}

// Prevent browsers from showing default validation bubbles
function handleInvalid(event: Event) {
  if ((event.target as Element)?.closest?.(`.${CSS_FIELD}`))
    event.preventDefault();
}

if (IS_BROWSER) {
  onMutation(document.documentElement, CSS_FIELD, renderAria);
  on(document, "input", handleInput, QUICK_EVENT);
  on(document, "invalid", handleInvalid, true); // Use capture as invalid does noe buttle
}