import styles from "../styles.module.css";
import { IS_BROWSER, QUICK_EVENT, anchorPosition, attr, on } from "../utils";

const CSS_TOOLTIP = styles._tooltip.split(" ");
const DESCRIBEDBY = "aria-describedby";
const ESC = "Escape";
const LABELLEDBY = "aria-labelledby";
const POSITION_CSS_PROPERTY = "--mtds-tooltip-position";
const THROTTLE_DELAY = 300;
const TOOLTIP_ID = "mtds-tooltip";

let ANCHOR: HTMLElement | null = null;
let LAST_CALL = Number.NEGATIVE_INFINITY;
let THROTTLE: number | ReturnType<typeof setTimeout> = 0;
let TOOLTIP: HTMLElement | null = null;

function handleMove({ target, type, key }: Event & { key?: string }) {
  if (type === "keydown" && key !== ESC) return; // Allow ESC dismiss to follow https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
  const wait = LAST_CALL + THROTTLE_DELAY - Date.now();
  clearTimeout(THROTTLE);
  THROTTLE = setTimeout(
    handleMoveThrottled,
    Math.max(wait, 0),
    key === ESC ? null : target
  );
}

// Using a throttled function to avoid performance issues
function handleMoveThrottled(target: Element | null) {
  LAST_CALL = Date.now();

  if (!TOOLTIP || target === TOOLTIP) return; // Allow tooltip to be hovered, following https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus
  let anchor = target?.closest?.<HTMLElement>("[data-tooltip]") || null;

  // No need to update
  if (anchor === ANCHOR) return;

  const content = (anchor && attr(anchor, "data-tooltip")) || "";
  const position =
    (anchor && attr(anchor, "data-tooltip-position")) ||
    window
      .getComputedStyle(anchor || document.body)
      .getPropertyValue(POSITION_CSS_PROPERTY) ||
    "top";

  const isHidden =
    !content ||
    content === "false" ||
    content === "true" ||
    position === "none";

  if (isHidden) anchor = null; // Do not show tooltip if boolish value
  if (anchor) TOOLTIP.textContent = content; // Only update content if new anchor

  const hadLabel = ANCHOR && attr(ANCHOR, LABELLEDBY) === TOOLTIP_ID;
  const hasLabel =
    Boolean(anchor?.innerText.trim()) ||
    anchor?.hasAttribute(LABELLEDBY) ||
    anchor?.hasAttribute("aria-label");

  ANCHOR?.removeAttribute(hadLabel ? LABELLEDBY : DESCRIBEDBY); // Unlink previous anchor
  anchorPosition(TOOLTIP, false); // Reset anchor position

  ANCHOR = anchor; // Store new anchor - might be null if no new anchor
  if (ANCHOR) attr(ANCHOR, hasLabel ? DESCRIBEDBY : LABELLEDBY, TOOLTIP_ID); // Use tooltip as description if allready has label
  TOOLTIP.togglePopover(!!anchor);
  anchorPosition(TOOLTIP, anchor, position);
}

// Initialize if in browser and not already initialized
if (IS_BROWSER && !document.getElementById(TOOLTIP_ID)) {
  TOOLTIP = document.body.appendChild(document.createElement("div"));
  TOOLTIP.classList.add(...CSS_TOOLTIP);
  TOOLTIP.id = TOOLTIP_ID;
  attr(TOOLTIP, "popover", "manual");
  on(document, "blur,focus,mouseout,mouseover", handleMove, QUICK_EVENT);
  on(window, "keydown", handleMove, QUICK_EVENT);
  on(window, "blur", handleMove, QUICK_EVENT);
}
