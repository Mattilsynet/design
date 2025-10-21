import { UHTMLComboboxElement } from "@u-elements/u-combobox";
import { UHTMLDataListElement } from "@u-elements/u-datalist";
import styles from "../styles.module.css";
import {
	anchorPosition,
	attr,
	IS_BROWSER,
	isInputLike,
	on,
	onLoaded,
	onMutation,
	QUICK_EVENT,
	useId,
} from "../utils";

const CSS_FIELD = styles.field.split(" ")[0];
const CSS_VALIDATIONS = styles.validation.split(" ");
const CSS_VALIDATION = CSS_VALIDATIONS[0];
const FIELDS = IS_BROWSER ? document.getElementsByClassName(CSS_FIELD) : [];

const getText = (style: CSSStyleDeclaration, key: string) =>
	style.getPropertyValue(`--mtds-text-${key}`)?.slice(1, -1) || ""; // slice to trim quotes

function handleFieldMutation(validate?: boolean) {
	for (const field of FIELDS)
		if (field.isConnected) {
			const labels: HTMLLabelElement[] = [];
			const descs: Element[] = [];
			const valids: Element[] = [];
			let combobox: UHTMLComboboxElement | null = null;
			let input: HTMLInputElement | null = null;
			let valid = true;

			for (const el of field.getElementsByTagName("*")) {
				if (el instanceof HTMLLabelElement) labels.push(el);
				else if (el instanceof UHTMLComboboxElement) combobox = el;
				else if (isInputLike(el) && !el.hidden) input = el;
				else if (el.hasAttribute("data-description")) descs.push(el);
				else if (el.classList.contains(CSS_VALIDATION)) {
					valid = attr(el, "data-color") === "success" || !el.clientHeight; // Only set invalid if Validation is visible
					valids.push(el);
					descs.unshift(el);
				} else if (el instanceof HTMLParagraphElement)
					descs.some((desc) => desc.contains(el)) || descs.push(el); // Only add if not already inside description
			}

			if (input) {
				for (const label of labels) label.htmlFor = useId(input);
				if (validate && attr(field, "data-validation") === "form") {
					valid = input.matches(":valid");
					for (const el of valids) attr(el, "hidden", valid ? "" : null);
				}
				renderCombobox(combobox);
				renderCounter(input);
				renderTextareaSize(input);
				attr(input, "aria-describedby", descs.map(useId).join(" ") || null); // Remove if empty
				attr(input, "aria-invalid", `${!valid}`);
			}
		}
}

// iOS does not support field-sizing: content, so we need to manually resize
function renderTextareaSize(textarea: Element) {
	if (textarea instanceof HTMLTextAreaElement) {
		textarea.style.setProperty("--mtds-textarea-height", "auto");
		textarea.style.setProperty(
			"--mtds-textarea-height",
			`${textarea.scrollHeight}px`,
		);
	}
}

// Setup translations from CSS custom properties
function renderCombobox(el: UHTMLComboboxElement | null) {
	const { control, list } = el || {};

	if (el && list && !el.hasAttribute("data-sr-added")) {
		const style = window.getComputedStyle(el);
		attr(el, "data-sr-added", getText(style, "combobox-added"));
		attr(el, "data-sr-empty", getText(style, "combobox-empty"));
		attr(el, "data-sr-found", getText(style, "combobox-found"));
		attr(el, "data-sr-invalid", getText(style, "combobox-invalid"));
		attr(el, "data-sr-of", getText(style, "combobox-of"));
		attr(el, "data-sr-remove", getText(style, "combobox-remove"));
		attr(el, "data-sr-removed", getText(style, "combobox-removed"));
		attr(list, "data-sr-plural", getText(style, "datalist-plural"));
		attr(list, "data-sr-singular", getText(style, "datalist-singular"));
	}
	if (list && control && !list.hasAttribute("popover")) {
		attr(list, "popover", "manual");
		attr(control, "popovertarget", useId(list));
	}
}

function renderCounter(input: HTMLInputElement) {
	const el = input?.nextElementSibling;
	const limit = el && attr(el, "data-count");

	if (el && limit) {
		const remainder = Number(limit) - input.value.length;
		const nextInvalid = remainder < 0;
		const prevInvalid = attr(el, "aria-live") === "polite";
		const style = window.getComputedStyle(el || input);
		const over = getText(style, "count-over");
		const under = getText(style, "count-under");

		if (prevInvalid !== nextInvalid) {
			attr(el, "aria-live", nextInvalid ? "polite" : "off");
			for (const css of CSS_VALIDATIONS) el.classList.toggle(css, nextInvalid);
		}
		el.textContent = (nextInvalid ? over : under).replace(
			"%d",
			`${Math.abs(remainder)}`,
		);
	}
}

function handleFieldToggle({ target: el, newState }: Partial<ToggleEvent>) {
	if (el instanceof UHTMLDataListElement) {
		const root = el.getRootNode() as ShadowRoot | null;
		const anchor = root?.querySelector<HTMLElement>(
			`[popovertarget="${el.id}"]`,
		);

		if (newState === "closed") anchorPosition(el, false);
		else if (anchor)
			anchorPosition(el, anchor, {
				contain({ availableHeight }) {
					el.style.width = `${anchor.clientWidth}px`;
					el.style.maxHeight = `${Math.max(50, availableHeight)}px`;
				},
			});
	}
}
// Update when typing
function handleFieldInput(event: Event) {
	if (isInputLike(event.target)) {
		renderCounter(event.target);
		renderTextareaSize(event.target);
	}
}

function handleFieldValdiation(event: Event) {
	const field = (event.target as Element)?.closest?.(`.${CSS_FIELD}`);
	if (event.type === "invalid" && field) event.preventDefault(); // Prevent browsers from showing default validation bubbles
	handleFieldMutation(true); // Update state
}

onLoaded(() => [
	onMutation(() => handleFieldMutation()),
	on(document, "input", handleFieldInput, QUICK_EVENT),
	on(document, "toggle", handleFieldToggle, QUICK_EVENT), // Use capture since toggle does not bubble
	on(document, "invalid,submit", handleFieldValdiation, true), // Use capture as invalid and submit does not bubble
]);
