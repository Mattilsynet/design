import { setTooltipElement } from "@digdir/designsystemet-web";
import styles from "../styles.module.css";
import { isBrowser, tag } from "../utils";

// Set custom tooltip element for designsystemet-web
if (isBrowser())
	setTooltipElement(
		document.getElementById("mtds-tooltip") ||
			tag("div", {
				class: styles._tooltip,
				id: "mtds-tooltip",
				popover: "manual",
			}), // This id is also used by app.module.css
	);
