import { UHTMLComboboxElement } from "@u-elements/u-combobox";
import { UHTMLDataListElement } from "@u-elements/u-datalist";
import styles from "../styles.module.css";
import {
	anchorPosition,
	attr,
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

const getText = (style: CSSStyleDeclaration, key: string) =>
	style.getPropertyValue(`--mtds-text-${key}`)?.slice(1, -1) || ""; // slice to trim quotes

function handleMutation(fields: HTMLCollectionOf<Element>, validate?: boolean) {
	for (const field of fields)
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
	if (!el?.list || el.list?.hasAttribute("popover")) return;
	const style = window.getComputedStyle(el);
	attr(el, "data-sr-added", getText(style, "combobox-added"));
	attr(el, "data-sr-empty", getText(style, "combobox-empty"));
	attr(el, "data-sr-found", getText(style, "combobox-found"));
	attr(el, "data-sr-invalid", getText(style, "combobox-invalid"));
	attr(el, "data-sr-of", getText(style, "combobox-of"));
	attr(el, "data-sr-remove", getText(style, "combobox-remove"));
	attr(el, "data-sr-removed", getText(style, "combobox-removed"));
	attr(el.list, "data-sr-plural", getText(style, "datalist-plural"));
	attr(el.list, "data-sr-singular", getText(style, "datalist-singular"));
	attr(el.list, "popover", "manual");
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

function handleToggle({ target: el, newState }: Event & { newState?: string }) {
	if (el instanceof UHTMLDataListElement) {
		const root = el.getRootNode() as ShadowRoot | null;
		const anchor = root?.querySelector<HTMLElement>(
			`[popovertarget="${el.id}"]`,
		);

		if (newState === "closed") anchorPosition(el, false);
		else if (anchor) {
			el.style.width = `${anchor.clientWidth}px`;
			anchorPosition(el, anchor, attr(el, "data-position") ?? "bottom", true);
		}
	}
}
// Update when typing
function handleInput({ target: el }: Event) {
	if (isInputLike(el)) {
		renderCounter(el);
		renderTextareaSize(el);

		// Reposition list datalist // TODO Enhance by using style.bottom?
		const list = el.hasAttribute("list") && el.list;
		if (list)
			setTimeout(() => {
				anchorPosition(list, el, attr(list, "data-position") ?? "bottom", true);
			}, 10);
	}
}

function handleValdiation(event: Event) {
	const field = (event.target as Element)?.closest?.(`.${CSS_FIELD}`);

	if (event.type === "invalid" && field) event.preventDefault(); // Prevent browsers from showing default validation bubbles
	handleMutation(document.getElementsByClassName(CSS_FIELD), true); // Update state
}

// Position combobox when changing content
function handleBeforeChange({ target: el }: Event) {
	const list = el instanceof UHTMLComboboxElement && el.list;
	if (list && !list?.hidden)
		setTimeout(() => anchorPosition(list, el, 2, true), 10); // Reposition list if not hidden
}

onLoaded(() => {
	onMutation(document.documentElement, CSS_FIELD, handleMutation);
	on(document, "beforechange", handleBeforeChange, QUICK_EVENT);
	on(document, "input", handleInput, QUICK_EVENT);
	on(document, "invalid,submit", handleValdiation, true); // Use capture as invalid and submit does not bubble
	on(document, "toggle", handleToggle, QUICK_EVENT); // Use capture since toggle does not bubble
});
