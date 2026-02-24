import styles from "../styles.module.css";
import {
	attr,
	debounce,
	on,
	onHotReload,
	onMutation,
	QUICK_EVENT,
} from "../utils";

const CSS_FIELD = `.${styles.field.split(" ")[0]}`;
const CSS_INPUTS = "input,textarea,select" as "input";
const CSS_SUGGESTION = "ds-suggestion,u-combobox" as "ds-suggestion"; // u-combobox kept for backward compatibility
const CSS_VALIDATION = styles.validation.split(" ")[0];

const isValidationForm = (form: unknown): form is HTMLFormElement =>
	form instanceof HTMLFormElement && attr(form, "data-validation") === "form";

const isValidationInput = (input: unknown): input is HTMLInputElement =>
	isValidationForm((input as HTMLInputElement).form);

const getScope = (input: HTMLInputElement) =>
	input.closest("fieldset") || input.closest(CSS_FIELD) || input.form;

const getValidations = (el?: HTMLElement | null) =>
	el?.getElementsByClassName(CSS_VALIDATION) || [];

const handleValidations = (event?: Event) => {
	const isSubmit = event?.type === "submit" || event?.type === "invalid";
	let firstInvalid: HTMLInputElement | undefined;

	for (const form of document.forms)
		if (isValidationForm(form))
			for (const input of form.querySelectorAll(CSS_INPUTS)) {
				if (!input.clientHeight) continue; // Skip hidden inputs
				const scope = getScope(input);
				const suggestion = input.closest(CSS_SUGGESTION);
				const prevValid = attr(input, "data-validation");
				const nextValid = suggestion
					? attr(input, "aria-required") === "true" &&
						!!suggestion?.items.length
					: input.validity.valid;

				attr(input, "data-validation", `${nextValid}`);
				if (!firstInvalid && !nextValid) firstInvalid = input;
				// Update if not registered or validation does not match
				if (event || !prevValid)
					for (const el of getValidations(scope)) {
						const isNested =
							scope?.nodeName === "FIELDSET" && el.parentElement !== scope;
						attr(el, "hidden", isNested || !isSubmit || nextValid ? "" : null);
					}
			}

	if (firstInvalid && isSubmit) {
		event.preventDefault(); // Prevent submit if focusable invalid element found
		firstInvalid.focus(); // Only move focus to first invalid field if validate was true
	}
};

const handleInput = ({ target }: Event) => {
	if (isValidationInput(target))
		for (const el of getValidations(getScope(target))) attr(el, "hidden", "");
};

const handleInvalid = (e: Event) =>
	isValidationForm((e.target as HTMLInputElement).form) && e?.preventDefault(); // Prevent default browser invalid popup

onHotReload("validations", () => [
	on(document, "input", handleInput, true), // Hide validation when typing
	on(document, "invalid", handleInvalid, true), // Prevent default browser invalid popup
	on(document, "invalid", debounce(handleValidations, 10), QUICK_EVENT), // Debounced to group invalid events
	on(document, "submit", handleValidations, true), // Use capture as submit does not bubble
	onMutation(
		document,
		debounce(() => handleValidations(), 0),
		{
			childList: true,
			subtree: true,
		},
	),
]);
