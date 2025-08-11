import styles from "../styles.module.css";
import { attr, IS_BROWSER, on, onLoaded, QUICK_EVENT } from "../utils";

const CSS_BREADCRUMBS = `.${styles.breadcrumbs.split(" ")[0]}`;
const CSS_CHIP = `.${styles.chip.split(" ")[0]}`;
const CSS_HELPTEXT = `.${styles.helptext.split(" ")[0]}`;
const CSS_PAGINATION = `.${styles.pagination.split(" ")[0]}`;
const CLICKS = `summary,u-summary,a,button,[role="tab"],[role="button"]`;
const EVENTS = "click,toggle,submit,change";
const MATOMO = "mattilsynet.matomo.cloud";

type Matomo = (
	| string
	| number
	| boolean
	| ((this: Record<string, <T>() => T>) => void)
)[];
declare global {
	interface Window {
		_paq?: Matomo[];
		_mtm?: Record<string, string | number>[];
		_mtdsTracking?: AnalyticsActions["init"];
		_mtdsUntrack?: () => void;
	}
}

export type AnalyticsActions = {
	init: {
		enabled?: boolean | "debug";
	} & (
		| {
				matomoId: number | string;
				matomoTagManagerId?: never;
		  }
		| {
				matomoId?: never;
				matomoTagManagerId: string;
		  }
	);
	pageview: {
		url?: string;
		title?: string;
	};
	event: {
		category: string;
		action: string;
		name?: string;
		value?: number;
	};
	search: {
		query: string;
		category?: string;
		results?: number;
	};
	matomo: Matomo;
};

export function analytics<Action extends keyof AnalyticsActions>(
	action: Action,
	args = {} as AnalyticsActions[Action],
) {
	if (!IS_BROWSER) return;
	if (!window._paq) {
		window._paq = [];
		window._paq.push(["HeatmapSessionRecording::disable"]); // Disable heatmaps by default as this require cookies
		window._paq.push(["enableLinkTracking"]);
		window._paq.push(["setTrackerUrl", `https://${MATOMO}/matomo.php`]);
	}
	if (!window._mtm) {
		window._mtm = window._mtm || []; // Prepare Matomo Tag Manager
		window._mtm.push({ "mtm.startTime": Date.now(), event: "mtm.Start" });
	}

	if (action === "init") {
		window._mtdsTracking = {
			enabled: window.location.hostname !== "localhost",
			...window._mtdsTracking,
			...args,
		} as AnalyticsActions["init"];
		const { enabled, matomoId, matomoTagManagerId } = window._mtdsTracking;

		if (matomoId) window._paq.push(["setSiteId", matomoId]);
		if (enabled) {
			const src = matomoTagManagerId
				? `https://cdn.matomo.cloud/${MATOMO}/container_${matomoTagManagerId}.js`
				: `https://cdn.matomo.cloud/${MATOMO}/matomo.js`;
			document.querySelector(`script[src="${src}"]`) ||
				document.head.append(
					Object.assign(document.createElement("script"), {
						async: true,
						src,
					}),
				);
		}
	}

	if (window._mtdsTracking?.enabled === false) return;
	if (window._mtdsTracking?.enabled === "debug")
		return console.info(`analytics("${action}", `, args, ")");

	if (action === "pageview") {
		const { url, title } = args as AnalyticsActions["pageview"];
		window._paq.push(["setCustomUrl", url || location.href]);
		window._paq.push(["setDocumentTitle", title || document.title]);
		window._paq.push(["trackPageView"]);
	} else if (action === "event") {
		const { category, action, name, value } = args as AnalyticsActions["event"];
		const event = ["trackEvent", category, action, name, value];

		// We do not want to track events with hash in URL as this causes hard-to-read data,
		// so temporarily remove the hash part, and add it back after the event is pushed
		let url = location.href;
		window._paq.push([
			function () {
				url = this.getCurrentUrl<string>();
			},
		]);
		window._paq.push(["setCustomUrl", url.split("#")[0]]); // Skip hash part of URL
		window._paq.push(event.filter((v) => v !== undefined)); // Push event
		window._paq.push(["setCustomUrl", url]); // Reverrt to original URL with hash
	} else if (action === "search") {
		const {
			query,
			category = false,
			results = false,
		} = args as AnalyticsActions["search"];
		window._paq.push(["trackSiteSearch", query, category, results]);
	} else if (action === "matomo") {
		window._paq.push(args as AnalyticsActions["matomo"]);
	}
}

const handleTrack = (event: Event) =>
	window._mtdsTracking?.enabled && setTimeout(processTrack, 0, event); // Let other events process first

const processTrack = ({ type, target }: Event) => {
	const el = type === "click" ? (target as Element)?.closest?.(CLICKS) : target;
	if (!(el instanceof Element) || attr(el, "data-analytics") === "ignore")
		return;

	let action = "click";
	let category = "Button";
	let name = label(el) || heading(el) || attr(el, "data-tooltip") || "";

	if (type === "submit") {
		category = "Form";
		action = "submit";
		name = name || document.title;
	} else if (type === "toggle") {
		if (!el.matches("dialog:modal")) return; // Skip non-modal dialogs
		category = "Dialog";
		action = "open";
	} else if (type === "change") {
		const type = attr(el, "type");
		const group =
			type === "checkbox" || type === "radio" ? el.closest("fieldset") : null;

		category = "Form";
		action = "change";
		name =
			label(group || el) ||
			text(group?.querySelector("legend")) ||
			text((el as HTMLInputElement)?.labels?.[0]);
	} else if (attr(el, "role") === "tab") {
		category = "Tab";
		action = "navigate";
	} else if (attr(el, "popovertarget")) {
		if (!popover(el)?.matches(":popover-open")) return; // Skip if not open
		category = el.closest(CSS_HELPTEXT) ? "HelpText" : "Popover";
		action = "open";
	} else if (el.nodeName.endsWith("SUMMARY")) {
		if (!(el.parentElement as HTMLDetailsElement).open) return; // Skip if not open
		category = "Details";
		action = "open";
	} else if (attr(el, "data-command") === "toggle-app-expanded") {
		const open = style(el, "--mtds-tooltip-position") === "none";
		category = "Sidebar";
		action = open ? "expand" : "minimize";
		name = (open && attr(el, "data-tooltip")) || text(el);
	} else if (el.closest(CSS_BREADCRUMBS)) {
		category = "Breadcrumbs";
		action = "navigate";
	} else if (el.closest(CSS_PAGINATION)) {
		category = "Pagintation";
		action = "navigate";
	} else if (el.closest(CSS_CHIP)) {
		category = "Chip";
		action = el.hasAttribute("data-removable") ? "remove" : "click";
	} else if (el.closest("th[aria-sort]")) {
		category = "Table";
		action = "sort";
	} else if (el instanceof HTMLAnchorElement) {
		category = "Link";
		action = el.protocol === "mailto:" ? "email" : "navigate";
		if (el.hasAttribute("download")) action = "download";
		else if (el.hash && el.href.startsWith(location.href.split("#")[0]))
			action = "anchor"; // Only track as anchor if same page
	} else if (el.hasAttribute("aria-expanded")) {
		if (attr(el, "aria-expanded") !== "true") return; // Skip if not open
		category = "Expand";
		action = "open";
	}

	// Respect attributes and send
	analytics("event", {
		category: attr(el, "data-analytics-category") ?? category,
		action: attr(el, "data-analytics-action") ?? action,
		name: attr(el, "data-analytics-name") ?? name,
	});
};

// Utilities
const text = (el?: Element | null) => el?.textContent?.trim() || "";
const label = (el?: Element | null) => (el && attr(el, "aria-label")) || "";
const popover = (el: Element) =>
	document.getElementById(attr(el, "popovertarget") || "");
const style = (el: Element, key: string) =>
	window.getComputedStyle(el).getPropertyValue(key)?.trim();
const heading = (el: Element) => {
	const body = text(el);
	const head = text(el.querySelector("h1,h2,h3,h4,h5,h6")); // Note: head might be empty string ''
	return (body.startsWith(head) && head) || body.slice(0, 100).trim(); // Limit to 100 characters
};

onLoaded(() => {
	on(document, EVENTS, handleTrack, QUICK_EVENT);
});
