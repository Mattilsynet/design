import styles from '../styles.module.css';

const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
const FIELDS = IS_BROWSER ? document.getElementsByClassName(styles.field.split(' ')[0]) : []; // Reutrns a live HTMLCollection
const UUID = `:${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
const VALIDATION = styles.validation.split(' ')[0];

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


function process() {
  for(const field of FIELDS) {
    const labels: HTMLLabelElement[] = [];
    const descs: string[] = [];
    let input: Element | null = null;
    let valid = true;

    for (const el of field.getElementsByTagName('*')) {
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
}

if (IS_BROWSER) {
  createOptimizedMutationObserver(process).observe(document.body, {
    attributeFilter: ['class'],
    attributes: true,
    childList: true,
    subtree: true
  });
}