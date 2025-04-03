import styles from "../styles.module.css";
import { IS_BROWSER, QUICK_EVENT, on } from "../utils";
let FAVICON: HTMLLinkElement;

function handleInject(event: Event & { animationName?: string }) {
  if (event.animationName !== styles._onInjectLogo && event.animationName !== styles._onChangeLogo) return;
  const logo = event.target as HTMLElement;
  const svg = logo?.firstElementChild;

  if (!svg) return;
  if (!FAVICON) {
    const oldIcon = document.head.getElementsByTagName("link[rel~='icon']");
    const newIcon = document.createElement("link");

    for (const icon of oldIcon) icon.remove();
    FAVICON = document.head.appendChild(Object.assign(newIcon, { rel: "icon" }));
  }

  const isDot = logo?.hasAttribute("data-env");
  const style = window.getComputedStyle(svg);
  const text = style.getPropertyValue("color");
  const back = style.getPropertyValue("--mtds-logo-color");

  FAVICON.href = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 55 55'><rect fill='${isDot ? "none" : back}' width='51' height='51' x='2' y='2' stroke='${text}' stroke-dasharray='0.09 6.38' stroke-linecap='round' stroke-opacity='${isDot ? 0.6 : 0}' stroke-width='2.3' rx='25.5'/><g transform="translate(7.5 7.5)">${svg.outerHTML.replace(/(fill|width|height|xmlns)=\S+/gi, "").replace("<svg", `<svg width="40" height="40" fill="${text}"`)}</g></svg>`)}`;
}

if (IS_BROWSER)
  on(document, 'animationend', handleInject, QUICK_EVENT);
