import { UHTMLComboboxElement } from "@u-elements/u-combobox";
import { UHTMLDataListElement } from "@u-elements/u-datalist";
import styles from "../styles.module.css";
import {
	QUICK_EVENT,
	anchorPosition,
	attr,
	isInputLike,
	on,
	onLoaded,
	onMutation,
	useId,
} from "../utils";

const CSS_FIELD = styles.field.split(" ")[0];
const CSS_PROPERTY_OVER = "--mtds-text-count-over";
const CSS_PROPERTY_UNDER = "--mtds-text-count-under";
const CSS_VALIDATIONS = styles.validation.split(" ");
const CSS_VALIDATION = CSS_VALIDATIONS[0];

function handleMutation(fields: HTMLCollectionOf<Element>) {
	for (const field of fields)
		if (field.isConnected) {
			const labels: HTMLLabelElement[] = [];
			const descs: Element[] = [];
			let combobox: UHTMLComboboxElement | null = null;
			let input: HTMLInputElement | null = null;
			let valid = true;

			for (const el of field.getElementsByTagName("*")) {
				if (el instanceof HTMLLabelElement) labels.push(el);
				else if (el instanceof UHTMLComboboxElement) combobox = el;
				else if (isInputLike(el)) input = el;
				else if (el.hasAttribute("data-description")) descs.push(el);
				else if (el.classList.contains(CSS_VALIDATION)) {
					valid =
						attr(el, "data-color") === "success" ||
						!el.clientWidth ||
						!el.clientHeight; // Only set invalid if Validation is visible
					descs.unshift(el);
				} else if (el instanceof HTMLParagraphElement)
					descs.some((desc) => desc.contains(el)) || descs.push(el); // Only add if not already inside description
			}

			if (input) {
				for (const label of labels) label.htmlFor = useId(input);
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

function renderCombobox(combobox: UHTMLComboboxElement | null) {
	if (!combobox) return;

	// Setup translations from CSS custom properties
	const list = combobox.querySelector("u-datalist,datalist");
	const style = window.getComputedStyle(combobox);
	const i11n = (key: string) => style.getPropertyValue(`--mtds-text-${key}`);

	if (list) {
		attr(list, "data-sr-plural", i11n("datalist-plural"));
		attr(list, "data-sr-singular", i11n("datalist-singular"));
		attr(list, "popover", "manual");
	}

	attr(combobox, "data-sr-added", i11n("combobox-added"));
	attr(combobox, "data-sr-empty", i11n("combobox-empty"));
	attr(combobox, "data-sr-found", i11n("combobox-found"));
	attr(combobox, "data-sr-invalid", i11n("combobox-invalid"));
	attr(combobox, "data-sr-of", i11n("combobox-of"));
	attr(combobox, "data-sr-remove", i11n("combobox-remove"));
	attr(combobox, "data-sr-removed", i11n("combobox-removed"));
	attr(combobox, "data-sr-removed", i11n("combobox-removed"));
}

function renderCounter(input: HTMLInputElement) {
	const el = input?.nextElementSibling;
	const limit = el && attr(el, "data-count");

	if (el && limit) {
		const remainder = Number(limit) - input.value.length;
		const nextInvalid = remainder < 0;
		const prevInvalid = attr(el, "aria-live") === "polite";
		const style = window.getComputedStyle(el || input);
		const over = style.getPropertyValue(CSS_PROPERTY_OVER)?.slice(1, -1) || ""; // slice to trim quotes
		const under =
			style.getPropertyValue(CSS_PROPERTY_UNDER)?.slice(1, -1) || ""; // slice to trim quotes

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
			anchorPosition(el, anchor, "bottom", true); // TODO: Prevent flip
		}
	}
}
// Update when typing
function handleInput({ target }: Event) {
	if (isInputLike(target)) {
		renderCounter(target);
		renderTextareaSize(target);
	}
}

// Prevent browsers from showing default validation bubbles
function handleInvalid(event: Event) {
	if ((event.target as Element)?.closest?.(`.${CSS_FIELD}`))
		event.preventDefault();
}

onLoaded(() => {
	onMutation(document.documentElement, CSS_FIELD, handleMutation);
	on(document, "input", handleInput, QUICK_EVENT);
	on(document, "invalid", handleInvalid, true); // Use capture as invalid does noe bubble
	on(document, "toggle", handleToggle, QUICK_EVENT); // Use capture since toggle does not bubble
});
