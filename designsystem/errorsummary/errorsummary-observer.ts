import styles from "../styles.module.css";
import { IS_BROWSER, QUICK_EVENT, attr, on } from "../utils";

function handleInject(event: Event & { animationName?: string }) {
  if (event.animationName !== styles._errorsummary) return;
  const first = (event.target as Element)?.firstElementChild;

  if (first instanceof HTMLHeadingElement) {
    attr(first, "tabindex", "-1");
    first.focus(); // Autofocus first heading
  }
}

if (IS_BROWSER)
  on(document, 'animationend', handleInject, QUICK_EVENT);