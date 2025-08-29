import { flip, type Placement, shift } from "@floating-ui/dom";
import styles from "../styles.module.css";
import {
	anchorPosition,
	attr,
	IS_BROWSER,
	on,
	onLoaded,
	QUICK_EVENT,
} from "../utils";

const DESCRIBEDBY = "aria-describedby";
const ESC = "Escape";
const LABELLEDBY = "aria-labelledby";
const POSITION_CSS_PROPERTY = "--mtds-tooltip-position";
const THROTTLE_DELAY = 300;
const TOOLTIP = IS_BROWSER
	? Object.assign(document.createElement("div"), {
			className: styles._tooltip,
			id: "mtds-tooltip",
			popover: "manual",
		})
	: null; // Create a dummy element to avoid null checks

let ANCHOR: Element | null = null;
let LAST_CALL = Number.NEGATIVE_INFINITY;
let THROTTLE: number | ReturnType<typeof setTimeout> = 0;

function handleTooltipMove({ target, type, key }: Event & { key?: string }) {
	if (type === "keydown" && key !== ESC) return; // Allow ESC dismiss to follow https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
	const wait = LAST_CALL + THROTTLE_DELAY - Date.now();
	clearTimeout(THROTTLE);
	THROTTLE = setTimeout(
		handleTooltipMoveThrottled,
		Math.max(wait, 0),
		key === ESC ? null : target,
	);
}

// Using a throttled function to avoid performance issues
function handleTooltipMoveThrottled(target: Element | null) {
	LAST_CALL = Date.now();

	// Build and append tooltip if not existing
	if (!TOOLTIP || target === TOOLTIP) return; // Allow tooltip to be hovered, following https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus
	if (!TOOLTIP?.isConnected) document.body.append(TOOLTIP); // Ensure connected
	let anchor = target?.closest?.<Element>("[data-tooltip]") || null;

	// No need to update
	if (anchor === ANCHOR) return;

	const content = (anchor && attr(anchor, "data-tooltip")) || "";
	const position =
		(anchor && attr(anchor, "data-tooltip-position")) ||
		window
			.getComputedStyle(anchor || document.body)
			.getPropertyValue(POSITION_CSS_PROPERTY)
			?.trim() ||
		"top";

	const isHidden =
		!content ||
		content === "false" ||
		content === "true" ||
		position === "none";

	if (isHidden) anchor = null; // Do not show tooltip if boolish value
	if (anchor) TOOLTIP.textContent = content; // Only update content if new anchor

	const hadLabel = ANCHOR && attr(ANCHOR, LABELLEDBY) === TOOLTIP?.id;
	const hasLabel =
		(anchor instanceof HTMLElement
			? anchor.innerText
			: anchor?.textContent
		)?.trim() ||
		anchor?.hasAttribute(LABELLEDBY) ||
		anchor?.hasAttribute("aria-label");

	ANCHOR?.removeAttribute(hadLabel ? LABELLEDBY : DESCRIBEDBY); // Unlink previous anchor
	anchorPosition(TOOLTIP, false); // Reset anchor position

	ANCHOR = anchor; // Store new anchor - might be null if no new anchor
	if (ANCHOR) attr(ANCHOR, hasLabel ? DESCRIBEDBY : LABELLEDBY, TOOLTIP?.id); // Use tooltip as description if allready has label
	if (ANCHOR?.isConnected) TOOLTIP.hidePopover(); // Hide tooltip so it can be placed on top-layer on next show
	TOOLTIP.togglePopover(!!anchor);
	anchorPosition(TOOLTIP, anchor || false, {
		placement: position as Placement,
		middleware: [flip(), shift({ padding: 10 })],
	});
}

onLoaded(() => {
	on(document, "blur,focus,mouseout,mouseover", handleTooltipMove, QUICK_EVENT);
	on(window, "keydown", handleTooltipMove, QUICK_EVENT);
	on(window, "blur", handleTooltipMove, QUICK_EVENT);
});
