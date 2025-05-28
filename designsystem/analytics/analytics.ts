import { IS_BROWSER } from "../utils";

const MATOMO = "mattilsynet.matomo.cloud";
let ENABLED: AnalyticsActions["init"]["enabled"] = true;

type Matomo = (string | number | boolean)[];
declare global {
	interface Window {
		_paq?: Matomo[];
	}
}

export type AnalyticsActions = {
	init: {
		matomoId: number | string;
		enabled?: boolean | "debug";
	};
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
		document.querySelector('script[src*="matomo.js"]') ||
			document.documentElement.append(
				Object.assign(document.createElement("script"), {
					async: true,
					src: `https://cdn.matomo.cloud/${MATOMO}/matomo.js`,
				}),
			);
	}
	if (action === "init") {
		const { matomoId, enabled = true } = args as AnalyticsActions["init"];
		ENABLED = enabled;
		window._paq.push(["setSiteId", matomoId]);
	}

	if (ENABLED === "debug") return console.info(`Analytics: "${action}"`, args);
	if (ENABLED === false || window.location.hostname === "localhost") return;

	if (action === "pageview") {
		const { url, title } = args as AnalyticsActions["pageview"];
		window._paq.push(["setCustomUrl", url || location.href]);
		window._paq.push(["setDocumentTitle", title || document.title]);
		window._paq.push(["trackPageView"]);
	} else if (action === "event") {
		const { category, action, name, value } = args as AnalyticsActions["event"];
		const event = ["trackEvent", category, action, name, value];
		window._paq.push(event.filter((v) => v !== undefined));
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
