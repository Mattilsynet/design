import styles from "../styles.module.css";
import {
	attr,
	debounce,
	isBrowser,
	on,
	onHotReload,
	onMutation,
	QUICK_EVENT,
} from "../utils";

const CSS_FIELD = `.${styles.field.split(" ")[0]}`;
const CSS_INPUTS = `${CSS_FIELD} :is(input,textarea,select)` as "input";
const CSS_SUGGESTION = "ds-suggestion,u-combobox" as "ds-suggestion"; // u-combobox kept for backward compatibility
const CSS_VALIDATION = styles.validation.split(" ")[0];

const isValidationForm = (form: unknown): form is HTMLFormElement =>
	form instanceof HTMLFormElement && attr(form, "data-validation") === "form";

const getField = (el: Element) => el.closest(CSS_FIELD);
const getInputs = (el?: Element | Document | null) =>
	el?.querySelectorAll(CSS_INPUTS) || [];

const getValidations = (el?: Element | Document | null) =>
	el?.getElementsByClassName(CSS_VALIDATION) || [];

const getInvalid = (input: HTMLInputElement) => {
	const skip =
		!input.clientHeight ||
		input.disabled ||
		input.readOnly ||
		attr(input, "aria-readonly") === "true" ||
		attr(input, "aria-disabled") === "true";
	const suggestion = input.closest(CSS_SUGGESTION)?.items;
	const ok = attr(input, "aria-required") !== "true" || !!suggestion?.length;
	if (suggestion) input.setCustomValidity(skip || ok ? "" : "Required"); // "Fake" native validity for suggestions
	return skip ? false : input.matches(":user-invalid");
};

// Hide or show validations on submit or invalid event
const handleValidations = (event: Event) => {
	const form = (event.target as HTMLInputElement)?.form || event.target;
	let invalid: HTMLInputElement | undefined;
	if (!isValidationForm(form)) return;

	// Toggle validitiy of fields
	for (const field of form.querySelectorAll(CSS_FIELD)) {
		const isInvalid = [...getInputs(field)].find(getInvalid);

		if (!invalid && isInvalid) invalid = isInvalid;
		for (const el of getValidations(field))
			attr(el, "hidden", isInvalid ? null : "");
	}

	// Toggle validitiy of fieldset
	for (const fieldset of form.querySelectorAll("fieldset")) {
		const isInvalid = [...getInputs(fieldset)].some(getInvalid);
		for (const el of getValidations(fieldset))
			if (!getField(el)) attr(el, "hidden", isInvalid ? null : ""); // Only toggle fieldset validations if they are not also in a field
	}

	if (!invalid) return;
	event.preventDefault(); // Prevent submit if focusable invalid element found
	invalid.focus(); // Only move focus to first invalid field if validate was true
};

// Hide related validations again when typing
const handleInput = ({ target }: Event) => {
	const input = target as HTMLInputElement;
	if (!isValidationForm(input.form)) return; // Skip if not in a validation form
	for (const el of getValidations(input.closest("fieldset") || getField(input)))
		attr(el, "hidden", "");
};

// Hide native browser validation popup
const handleInvalid = (e: Event) =>
	isValidationForm((e.target as HTMLInputElement).form) && e?.preventDefault();

// Hide validations when added to the DOM
const VALIDATIONS = isBrowser() ? getValidations(document) : [];
const handleMutation = () => {
	for (const valid of VALIDATIONS)
		if (!valid.hasAttribute("data-validation")) {
			const input = getInputs(getField(valid))[0];
			attr(valid, "data-validation", "form"); // Mark as handled to avoid hiding again if moved in the DOM
			if (isValidationForm(input?.form)) attr(valid, "hidden", "");
		}
};

onHotReload("validations", () => [
	on(document, "input comboboxbeforeselect", handleInput, true), // Hide validation when typing
	on(document, "invalid", handleInvalid, true), // Prevent default browser invalid popup
	on(document, "invalid", debounce(handleValidations, 10), QUICK_EVENT), // Debounced to group invalid events
	on(document, "submit", handleValidations, true), // Use capture as submit does not bubble
	onMutation(document, handleMutation, {
		childList: true,
		subtree: true,
	}),
]);
