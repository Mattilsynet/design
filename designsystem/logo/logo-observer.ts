import styles from "../styles.module.css";
import { onLoaded, onMutation } from "../utils";

const CSS_LOGO = styles.logo.split(" ")[0];

function handleMutation([logo]: HTMLCollectionOf<HTMLElement>) {
	if (logo?.isConnected && logo?.firstElementChild instanceof SVGSVGElement) {
		for (const icon of document.head.querySelectorAll("link[rel~='icon']"))
			icon.remove();

		const svg = logo.firstElementChild;
		const isDot = logo?.hasAttribute("data-env");
		const style = window.getComputedStyle(svg);
		const text = style.getPropertyValue("color");
		const back = style.getPropertyValue("--mtds-logo-color");

		document.head.appendChild(
			Object.assign(document.createElement("link"), {
				href: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 55 55'><rect fill='${isDot ? "none" : back}' width='51' height='51' x='2' y='2' stroke='${text}' stroke-dasharray='0.09 6.38' stroke-linecap='round' stroke-opacity='${isDot ? 0.6 : 0}' stroke-width='2.3' rx='25.5'/><g transform="translate(7.5 7.5)">${svg.outerHTML.replace(/(fill|width|height|xmlns)=\S+/gi, "").replace("<svg", `<svg width="40" height="40" fill="${text}"`)}</g></svg>`)}`,
				rel: "icon",
			}),
		);
	}
}

onLoaded(() => onMutation(document.documentElement, CSS_LOGO, handleMutation));
