import styles from '../styles.module.css';

const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
const UUID = `:${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
const VALIDATION = styles.validation.split(' ')[0];

if (IS_BROWSER && !window.customElements.get('mt-field')) {
  class MTField extends HTMLElement {
    _observer: MutationObserver | null = null;
    _elements: HTMLCollectionOf<Element> | null = null;

    connectedCallback() {
      this._elements = this.getElementsByTagName('*');
      this._observer = createOptimizedMutationObserver(() => process(this._elements));
      this._observer.observe(this, { childList: true, subtree: true });
    }
     
    async disconnectedCallback() {
      await Promise.resolve(); // Queue microtask ref. https://nolanlawson.com/2024/12/01/avoiding-unnecessary-cleanup-work-in-disconnectedcallback/
      if (!this.isConnected && this._observer) {
        this._observer.disconnect();
        this._observer = null;
      }
    }
  }
  window.customElements.define('mt-field', MTField);
}

let id = 0;
function useId (el: Element) {
  if (!el.id) el.id = `${UUID}${++id}`;
	return el.id;
};

// Speed up MutationObserver by debouncing and only running when page is visible
function createOptimizedMutationObserver(callback: MutationCallback) {
  const queue: MutationRecord[] = [];
  const observer = new MutationObserver((mutations) => {
    if (!queue[0]) requestAnimationFrame(process);
    queue.push(...mutations);
  });

  const process = () => {
    callback(queue, observer);
    queue.length = 0; // Reset queue
  };

  process(); // Initial setup
  return observer;
}


function process(elements: HTMLCollectionOf<Element> | null) {
    const labels: HTMLLabelElement[] = [];
    const descs: string[] = [];
    let input: Element | null = null;
    let valid = true;

    for (const el of elements || []) {
      if (el instanceof HTMLLabelElement) labels.push(el);
      else if ('validity' in el && !(el instanceof HTMLButtonElement)) input = el;
      else if (el.classList.contains(VALIDATION)) { // Must be before validation since it can also be a <p>
        valid = el.getAttribute('data-color') === 'success';
        descs.unshift(useId(el));
      } else if (el instanceof HTMLParagraphElement) descs.push(useId(el));
    }

    if (input) for (const label of labels) label.htmlFor = useId(input);
    input?.setAttribute('aria-describedby', descs.join(' '));
    input?.setAttribute('aria-invalid', `${!valid}`);
  }
