import styles from "../styles.module.css";
import { IS_BROWSER, onLoaded, onMutation, tag } from "../utils";

const CSS_LOGO = styles.logo.split(" ")[0];
const LOGOS = IS_BROWSER ? document.getElementsByClassName(CSS_LOGO) : [];

function handleLogoMutation() {
	const logo = LOGOS[0];
	const svg = logo?.firstElementChild;

	if (svg instanceof SVGSVGElement) {
		for (const icon of document.head.querySelectorAll("link[rel~='icon']"))
			icon.setAttribute("rel", "disabled"); // Disable previous icon (but not remove is as this makes Next.js sad)

		const isDot = logo?.hasAttribute("data-env");
		const style = window.getComputedStyle(svg);
		const text = style.getPropertyValue("color");
		const back = style.getPropertyValue("--mtdsc-logo-background");
		const icon = svg.outerHTML
			.replace(/\n+/g, " ") // Prevent line breaks
			.replace(/(fill|width|height|xmlns)="[^"]+"/gi, "")
			.replace("<svg", `<svg width="40" height="40" fill="${text}"`);

		document.head.appendChild(
			tag("link", {
				href: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 55 55'><rect fill='${isDot ? "none" : back}' width='51' height='51' x='2' y='2' stroke='${text}' stroke-dasharray='0.09 6.38' stroke-linecap='round' stroke-opacity='${isDot ? 0.6 : 0}' stroke-width='2.3' rx='25.5'/><g transform="translate(7.5 7.5)">${icon}</g></svg>`)}`,
				rel: "icon",
			}),
		);
	}
}

onLoaded(() => [onMutation(handleLogoMutation, "class")]);
