import { QUICK_EVENT, off, on } from '../utils';

const handleToggleClick = ({ target }: Event) => {
  // const el =
  //   (target as Element)?.closest("nav") ||
  //   document.querySelector("aside"); // "nav,aside,header,footer"
  // const toggle = () =>
  //   el?.setAttribute(
  //     "data-expanded",
  //     `${el?.getAttribute("data-expanded") === "false"}`,
  //   );

  // if (!document.startViewTransition) toggle();
  // else document.startViewTransition(() => toggle());
};

export function observe(el: Element) {
  on(el, 'click', handleToggleClick, QUICK_EVENT);
}

export function unobserve(el: Element) {
  off(el, 'click', handleToggleClick, QUICK_EVENT);
}
