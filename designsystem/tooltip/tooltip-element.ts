import styles from "../styles.module.css";
import { isBrowser, onHotReload, onMutation } from "../utils";

// Set custom tooltip element, will soon be replaced by `setTooltipElement` when exposed by @digdir/designsystemet-web
const TIP = isBrowser() ? document.getElementsByClassName("ds-tooltip") : [];
const CSS_TIP = styles._tooltip.split(" ");
const addCSSClassToTooltips = () => {
	for (const tip of TIP) tip.classList.add(...CSS_TIP);
};

onHotReload("tooltip", () => [
	onMutation(document, addCSSClassToTooltips, {
		childList: true,
		subtree: true,
	}),
]);
