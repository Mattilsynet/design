import styles from "../styles.module.css";
import { attr, isInputLike, onLoaded, onMutation, useId } from "../utils";

const CSS_FIELDSET = styles.fieldset.split(" ")[0];
const CSS_VALIDATION = styles.validation.split(" ")[0];

function handleMutation(fieldsets: HTMLCollectionOf<Element>) {
	for (const fieldset of fieldsets) {
		const inputs: HTMLInputElement[] = [];
		let validationId: string | null = null;

		for (const el of fieldset.getElementsByTagName("*")) {
			if (el.classList.contains(CSS_VALIDATION)) validationId = useId(el);
			else if (isInputLike(el)) inputs.push(el);
		}

		for (const input of inputs) {
			attr(input, "aria-describedby", validationId);
			attr(input, "aria-invalid", `${!!validationId}`);
		}
	}
}

onLoaded(() => {
	onMutation(document.documentElement, CSS_FIELDSET, handleMutation);
});
