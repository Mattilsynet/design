import styles from "../styles.module.css";
import { attr, debounce, on, onLoaded, QUICK_EVENT } from "../utils";

const CSS_INPUTS = '[data-validation="form"] :is(input,textarea,select)';
const CSS_VALIDATION = `:scope > .${styles.validation.split(" ")[0]}`;
const CSS_FIELD = `.${styles.field.split(" ")[0]}`;

// Need to run both on invalid and submit to both invalid and valid form submits
function handleValidationForm(event: Event) {
	const form = (event.target as Element).closest?.("form");
	if (!form) return; // Only handle if inside form validation container
	if (event.type === "invalid") {
		event.preventDefault(); // Prevent browsers from showing default validation bubbles
		handleValidationDebounced(form);
	}
	if (event.type === "submit" && handleValidation(form)) event.preventDefault(); // Prevent actual form submit
}

const handleValidationDebounced = debounce(handleValidation, 10); // Used to group all invalid events
function handleValidation(form: HTMLFormElement, focus = true) {
	let firstInvalid: HTMLInputElement | null = null;
	for (const input of form.querySelectorAll<HTMLInputElement>(CSS_INPUTS)) {
		if (!input.clientHeight) continue; // Skip hidden inputs
		const group = input.closest("fieldset") || input.closest(CSS_FIELD) || form;
		const combobox = input.closest("u-combobox");
		const valid = combobox
			? input?.getAttribute("aria-required") === "true" &&
				!!combobox?.items.length
			: input.validity.valid;

		if (!firstInvalid && !valid) firstInvalid = input;
		for (const input of group.querySelectorAll(CSS_INPUTS))
			attr(input, "aria-invalid", `${!valid}`);
		for (const validation of group.querySelectorAll(CSS_VALIDATION)) {
			attr(validation, "data-validation", valid ? "valid" : "invalid");
			attr(validation, "hidden", valid ? "" : null);
		}
	}
	if (focus) firstInvalid?.focus(); // Only move focus to first invalid field if validate was true
	return firstInvalid;
}

function handleInput({ target }: Event) {
	const input = target instanceof HTMLElement ? target : null;
	const form =
		input?.getAttribute("aria-invalid") === "true" &&
		input?.matches?.(CSS_INPUTS) &&
		input?.closest?.("form");

	if (form) handleValidationDebounced(form, false);
}

onLoaded(() => [
	on(document, "invalid,submit", handleValidationForm, true), // Use capture as invalid and submit does not bubble
	on(document, "input", handleInput, QUICK_EVENT),
]);
