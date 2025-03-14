import styles from "../styles.module.css";
import { IS_BROWSER, onMutation } from "../utils";
const CSS_LOGO = styles.logo.split(" ")[0];
let FAVICON: HTMLLinkElement;

function process(logos: HTMLCollectionOf<Element>) {
  const svg = logos[0]?.firstElementChild;

  if (!svg) return;
  if (!FAVICON) {
    const oldIcon = document.head.getElementsByTagName("link[rel~='icon']");
    const newIcon = document.createElement("link");

    for (const icon of oldIcon) icon.remove();
    FAVICON = document.head.appendChild(Object.assign(newIcon, { rel: "icon" }));
  }

  const isDot = svg.parentElement?.hasAttribute("data-color");
  const style = window.getComputedStyle(svg);
  const text = style.getPropertyValue("color");
  const back = style.getPropertyValue("background-color");

  FAVICON.href = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 55 55'><rect fill='${isDot ? "none" : back}' width='51' height='51' x='2' y='2' stroke='${text}' stroke-dasharray='0.09 6.38' stroke-linecap='round' stroke-opacity='${isDot ? 0.6 : 0}' stroke-width='2.3' rx='25.5'/><g transform="translate(7.5 7.5)">${encodeURIComponent(svg.outerHTML.replace(/(fill|width|height|xmlns)=\S+/gi, "").replace("<svg", `<svg width="40" height="40" fill="${text}"`))}</g></svg>`;
}

// Force a update even if not active tab
if (IS_BROWSER)
  setTimeout(() => process(document.getElementsByClassName(CSS_LOGO)), 300);

export const observe = (el: Element) => onMutation(el, CSS_LOGO, process);
export const unobserve = (el: Element) => onMutation(el, CSS_LOGO, false);
