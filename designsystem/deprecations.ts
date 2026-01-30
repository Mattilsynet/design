import { DSFieldElement } from "@digdir/designsystemet-web";
import styles from "./styles.module.css";
import {
	attr,
	debounce,
	getByCSSModule,
	isBrowser,
	on,
	onHotReload,
	onMutation,
	QUICK_EVENT,
} from "./utils";

const DEPRECATIONS = new WeakSet<Element>();
const deprecate = (el: Element) =>
	!DEPRECATIONS.has(el) && DEPRECATIONS.add(el);

const warn = (from: string, to: string, el: Element) =>
	window.dsWarnings === false ||
	console.warn(
		`\x1B[1m@mattilsynet/design:\x1B[m ${from} is deprecated, please use ${to}:`,
		el,
	);

// Deprecate togglegroup without data-toggle-group attribute
const TOGGLEGROUPS = getByCSSModule("togglegroup");
const CSS_BUTTON = styles.button.split(" ");
const deprecateToggleGroup = () => {
	for (const el of TOGGLEGROUPS) {
		if (deprecate(el) && !el.hasAttribute("data-toggle-group")) {
			attr(el, "data-toggle-group", "Valgknapper");
			warn(
				'Only setting class="styles.togglegroup"',
				'data-toggle-group="LABEL-HERE" attribute also for better accessibility',
				el,
			);
		}
		for (const label of el.getElementsByTagName("label")) {
			if (deprecate(label) && !label.classList.contains(CSS_BUTTON[0])) {
				label.classList.add(...CSS_BUTTON);
				warn(
					'Only setting class="styles.button"',
					`<label class="styles.button">`,
					label,
				);
			}
		}
	}
};

// Deprecate errorsummary without ds-error-summary element
const BREADCRUMBS = getByCSSModule("breadcrumbs");
const deprecateBreadcrumbs = () => {
	for (const el of BREADCRUMBS)
		if (deprecate(el) && el.nodeName !== "DS-BREADCRUMBS") {
			el.classList.add(...styles.breadcrumbs.split(" "));
			warn(
				'Only setting class="styles.breadcrumbs"',
				'<ds-breadcrumbs class="styles.breadcrumbs">',
				el,
			);
		}
};

// Deprecate errorsummary without ds-error-summary element
const ERRORSUMMARYS = getByCSSModule("errorsummary");
const deprecateErrorSummary = () => {
	for (const el of ERRORSUMMARYS)
		if (deprecate(el) && el.nodeName !== "DS-ERROR-SUMMARY") {
			warn(
				'Only setting class="styles.errorsummary"',
				'<ds-error-summary class="styles.errorsummary">',
				el,
			);
		}
};

// Deprecate data-variant and data-modal and data-closedby on dialogs
const DIALOGS = getByCSSModule("dialog") as HTMLCollectionOf<HTMLDialogElement>;
const deprecateDialog = () => {
	for (const el of DIALOGS) {
		if (!deprecate(el)) continue;
		if (el.hasAttribute("data-variant")) {
			warn(
				'<dialog data-variant="drawer">',
				'<dialog data-placement="center|left|right|top|bottom">',
				el,
			);
		}
		if (el.isConnected && el.showModal && el.close) {
			const closedby = attr(el, "data-closedby");
			if (closedby) {
				attr(el, "closedby", closedby);
				warn(
					`<dialog data-closedby="${closedby}">`,
					`<dialog closedby="${closedby}">`,
					el,
				);
			}
			if (el.matches('[open]:not([data-modal="false"]):not(:modal)')) {
				warn(
					'<dialog data-modal="true">',
					'.showModal() or <button command="show-modal" commandfor="DIALOG-ID"></button>',
					el,
				);
				attr(el, "open", null); // Using attribute instead of .close to avoid `close` event
				el.showModal();
			} else if (el.matches(":modal:not([open])")) {
				attr(el, "open", ""); // Set as open
				el.close(); // So we correctly can call .close, removing <dialog> from #top-layer
			}
		}
	}
};

// Deprecate data-count in favor of data-limit
const deprecateCounter = () => {
	for (const el of document.querySelectorAll("[data-count]"))
		if (deprecate(el)) {
			const count = attr(el, "data-count");
			el.classList.add(...styles.validation.split(" "));
			attr(el, "data-limit", count);
			warn(
				`data-count="${count}"`,
				`class="styles.validation" data-field="counter" data-limit="${count}"`,
				el,
			);
		}
};

// Deprecate data-command on buttons and other elements
const deprecateDataCommand = () => {
	for (const el of document.querySelectorAll("[data-command]"))
		if (deprecate(el)) {
			const command = attr(el, "data-command");

			if (command === "row")
				warn(
					`<${el.nodeName.toLowerCase()} data-command="${command}">`,
					`<tr data-clickdelegatefor="${el.nodeName}-ID">`,
					el,
				);
			else
				warn(
					`<button data-command="${command}">`,
					`<button command="${command?.replace("toggle-app-expanded", "show-modal")}" commandfor="TARGET-ID">`,
					el,
				);
		}
};

// Deprecate u-tabs
const TABS = isBrowser() ? document.getElementsByTagName("u-tabs") : [];
const deprecateUTabs = () => {
	for (const el of TABS) if (deprecate(el)) warn("u-tabs", "ds-tabs", el);
};

// Deprecate u-combobox and add class to ds-suggestion
const CSS_SUGGESTION = styles.suggestion.split(" ");
const OLD = isBrowser() ? document.getElementsByTagName("u-combobox") : [];
const NEW = isBrowser() ? document.getElementsByTagName("ds-suggestion") : [];
const deprecateUCombobox = () => {
	for (const el of OLD)
		if (deprecate(el)) {
			el.classList.add(...CSS_SUGGESTION);
			warn("<u-combobox>", `<ds-suggestion class="styles.suggestion">`, el);
		}
	for (const el of NEW)
		if (deprecate(el) && !el.classList.contains(CSS_SUGGESTION[0])) {
			el.classList.add(...CSS_SUGGESTION);
			warn(
				"Only using <ds-suggestion>",
				`<ds-suggestion class="styles.suggestion">`,
				el,
			);
		}
};

const handleCommandClick = ({ target: el }: Event) => {
	if (el instanceof Element === false) return;
	const row = el?.closest("tr")?.querySelector('[data-command="row"]');
	const click =
		row && !el?.closest('a,button,label,input,select,textarea,[role="button"]');
	if (click) (row as HTMLElement).click(); // Forward click to data-command="row" element

	const dialog = el?.closest("dialog");
	const close = dialog && el?.closest('[data-command="close"]');
	if (close) dialog.close();
};

// Deprecate fields without ds-field element
const FIELDS = getByCSSModule("field");
const FIELD_UNBIND = new Set<Element>();
const deprecateField = () => {
	for (const el of FIELDS)
		if (el.nodeName !== "DS-FIELD") {
			if (!deprecate(el))
				warn(
					'Only setting class="styles.field"',
					'<ds-field class="styles.field">',
					el,
				);
			if (!FIELD_UNBIND.has(el) && FIELD_UNBIND.add(el)) {
				DSFieldElement.prototype.connectedCallback.call(el as DSFieldElement);
			}
		}
};
const unbindFields = () => {
	for (const el of FIELD_UNBIND) {
		DSFieldElement.prototype.disconnectedCallback.call(el as DSFieldElement);
		FIELD_UNBIND.delete(el);
	}
};

// Deprecate validation without data-field="validation"
const CSS_DESCRIPTIONS = `[data-description], .${styles.field.split(" ")[0]} label + p`;
const deprecateFeildDescription = () => {
	for (const el of document.querySelectorAll(CSS_DESCRIPTIONS))
		if (deprecate(el) && el.getAttribute("data-field") !== "description") {
			attr(el, "data-field", "description");
			warn(
				"Descriptions created by data-description of <p> only",
				'data-field="data-description"',
				el,
			);
		}
};

// Deprecate validation without data-field="validation"
const VALIDATIONS = getByCSSModule("validation");
const deprecateFieldValidation = () => {
	for (const el of VALIDATIONS)
		if (deprecate(el) && !el.hasAttribute("data-field")) {
			attr(el, "data-field", "validation");
			warn(
				'Only setting class="styles.validation"',
				'class="styles.validation" data-field="validation"',
				el,
			);
		}
};

const deprecatePopoverPosition = () => {
	for (const el of document.querySelectorAll("[popover][data-position]"))
		if (deprecate(el)) {
			attr(el, "data-placement", attr(el, "data-position"));
			warn("data-position", "data-placement", el);
		}
};

const handleDeprecations = debounce(() => {
	deprecateCounter();
	deprecateDataCommand();
	deprecateBreadcrumbs();
	deprecateDialog();
	deprecateErrorSummary();
	deprecateFeildDescription();
	deprecateFieldValidation();
	deprecatePopoverPosition();
	deprecateField(); // Should run after other field deprecations to access correct data-attributes
	deprecateToggleGroup();
	deprecateUCombobox();
	deprecateUTabs();
}, 200);

onHotReload("deprecations", () => [
	unbindFields, // Return as cleanup function
	on(document, "click", handleCommandClick, QUICK_EVENT),
	onMutation(document, handleDeprecations, {
		attributeFilter: [
			"class",
			"data-command",
			"data-count",
			"data-description",
			"data-variant",
			"open",
		],
		attributes: true,
		childList: true,
		subtree: true,
	}),
]);
