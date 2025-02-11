import styles from '../styles.module.css';
import { QUICK_EVENT, off, on } from '../utils';

const CSS_APP = styles.app.split(' ')[0];
const CSS_TOGGLE = `.${CSS_APP} > header + :not(main) > button:empty:first-child`;

const handleToggleClick = ({ target: el }: Event) => {
  const btn = (el as Element)?.nodeName === 'BUTTON' && (el as Element)?.closest(CSS_TOGGLE);

  if (!btn) return;

  const nav = btn.closest(`.${CSS_APP} > *`);
  const toggle = () =>
    nav?.setAttribute(
      "data-expanded",
      `${nav?.getAttribute("data-expanded") === "false"}`,
    );

  if (!document.startViewTransition) toggle();
  else document.startViewTransition(() => toggle());
};

export function observe(el: Element) {
  on(el, 'click', handleToggleClick, QUICK_EVENT);
}

export function unobserve(el: Element) {
  off(el, 'click', handleToggleClick, QUICK_EVENT);
}
