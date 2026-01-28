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
const CSS_INPUTS = ":is(input,textarea,select)" as "input";
const CSS_SUGGESTION = "ds-suggestion,u-combobox" as "ds-suggestion"; // u-combobox kept for backward compatibility
const CSS_VALIDATION = styles.validation.split(" ")[0];
const CSS_FORM = `[data-validation="form"]`;

const handleValidations = (event?: Event) => {
	const isTyping = event?.type === "input";
	const isChecking = !isTyping && event;

	for (const form of document.forms)
		if (form.getAttribute("data-validation") === "form") {
			let firstInvalid: HTMLInputElement | undefined;
			for (const input of form.querySelectorAll(CSS_INPUTS)) {
				if (!input.clientHeight) continue; // Skip hidden inputs
				const scope =
					input.closest("fieldset") || input.closest(CSS_FIELD) || form;
				const suggestion = input.closest(CSS_SUGGESTION);
				const isValid = suggestion
					? attr(input, "aria-required") === "true" &&
						!!suggestion?.items.length
					: input.validity.valid;

				if (!firstInvalid && !isValid) firstInvalid = input;
				if (!isTyping || event.target === input)
					for (const el of scope.getElementsByClassName(CSS_VALIDATION)) {
						const isNested =
							scope.nodeName === "FIELDSET" && el.parentElement !== scope;
						attr(el, "hidden", isNested || !isChecking || isValid ? "" : null);
					}
			}
			if (firstInvalid && isChecking && form.contains(event?.target as Node)) {
				event.preventDefault(); // Prevent submit if focusable invalid element found
				firstInvalid.focus(); // Only move focus to first invalid field if validate was true
			}
		}
};

const handleInvalid = (e: Event) =>
	(e.target as Element)?.closest?.(CSS_FORM) && e?.preventDefault(); // Prevent default browser invalid popup

onHotReload("validations", () => [
	on(document, "submit", handleValidations, true), // Use capture as submit does not bubble
	on(document, "invalid", handleInvalid, true), // Use capture as invalid does not bubble
	on(document, "invalid input", debounce(handleValidations, 10), QUICK_EVENT), // Debounced to group invalid events
	onMutation(
		document,
		debounce(() => handleValidations(), 10),
		{
			childList: true,
			subtree: true,
		},
	),
]);
