import styles from "../styles.module.css";
import { attr, isInputLike, onLoaded, onMutation, useId } from "../utils";

const CSS_FIELDSET = styles.fieldset.split(" ")[0];
const CSS_VALIDATION = styles.validation.split(" ")[0];
const ARIA_DESC = "aria-describedby";
const ARIA_INVALID = "aria-invalid";

// Using requestAnimationFrame to ensure it runs after field-observer
function handleMutation(fieldsets: HTMLCollectionOf<Element>) {
	requestAnimationFrame(() => {
		for (const fieldset of fieldsets)
			if (fieldset.isConnected) {
				const inputs: HTMLInputElement[] = [];
				let validId: string | null = null;
				let valid = true;

				for (const el of fieldset.getElementsByTagName("*")) {
					if (el.classList.contains(CSS_VALIDATION)) {
						valid = attr(el, "data-color") === "success" || !el.clientHeight; // Only set invalid if Validation is visible
						validId = useId(el);
					} else if (isInputLike(el)) inputs.push(el);
				}

				for (const input of inputs) {
					const desc = attr(input, ARIA_DESC)?.replace(validId || "#", "");

					attr(input, ARIA_DESC, `${validId || ""} ${desc || ""}`.trim());
					attr(input, ARIA_INVALID, `${!valid}`);
				}
			}
	});
}

onLoaded(() =>
	onMutation(document.documentElement, CSS_FIELDSET, handleMutation),
);
