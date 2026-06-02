// Expose u-progress, which is not used in @digdir/designsystemet-web, but is used by Mattilsynet
import "@u-elements/u-progress";

// Expose API
export * from "@digdir/designsystemet-web"; // Import and expose Digdir web functionality
export * from "@u-elements/u-combobox"; // Kept for backward compatibility
export { version } from "../package.json"; // Expose version to make it easier to debug
export * from "./analytics/analytics";
export * from "./app/app-observer";
export * from "./law/law-helper";
export * as styles from "./styles.module.css";
export * from "./toast/toast-helper";

// Load behaviors
import "./chart/chart-element";
import "./deprecations";
import "./logo/logo-observer";
import "./popover/popover-observer";
import "./table/table-observer";
import "./toast/toast-observer";
import "./tooltip/tooltip-element";
import "./validation/validation-observer";
import { isBrowser, onHotReload, onMutation } from "./utils";

// Expose types
export type Size = "sm" | "md" | "lg";
export type HeadingSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

// Fix ds-suggestion while waiting for https://github.com/digdir/designsystemet/pull/4933
const LISTS = isBrowser() ? document.getElementsByTagName("u-datalist") : [];
const LISTED = new WeakSet();
const handleDatalistConnect = () => {
	for (const list of LISTS)
		if (!LISTED.has(list)) {
			list.closest("ds-suggestion")?.connectedCallback();
			LISTED.add(list);
		}
};

onHotReload("deprecations", () => [
	onMutation(document, handleDatalistConnect, {
		childList: true,
		subtree: true,
	}),
]);
