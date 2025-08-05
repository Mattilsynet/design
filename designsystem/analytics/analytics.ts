import { IS_BROWSER } from "../utils";

const MATOMO = "mattilsynet.matomo.cloud";
let ENABLED: AnalyticsActions["init"]["enabled"] = true;

type Matomo = (string | number | boolean)[];
declare global {
	interface Window {
		_paq?: Matomo[];
		_mtm?: Record<string, string | number>[];
	}
}

// window._paq = window._paq || [];
// window._mtm = window._mtm || [];

// window._paq.push(["setCustomUrl", `${document.location.href}&eirik`]);
// window._paq.push(["setDocumentTitle", "Eirik 3"]);
// window._mtm.push({
// 	event: "mtm.Start",
// 	"mtm.startTime": new Date().getTime(),
// 	customTitle: "Eirik 1",
// 	customUrl: `${document.location.href}&eirik`,
// });

// window._mtm.push({
// 	event: "mtm.PageView",
// 	customTitle: "Eirik 2",
// 	customUrl: `${document.location.href}&eirik`,
// });

// const containerId = "A9utKk3O";

// document.head.append(
// 	Object.assign(document.createElement("script"), {
// 		src: `https://cdn.matomo.cloud/mattilsynet.matomo.cloud/container_${containerId}.js`,
// 		async: true,
// 		onload: () => console.log(window._paq),
// 	}),
// );

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
	}
	if (action === "init") {
		const { matomoId, enabled } = args as AnalyticsActions["init"];
		ENABLED = enabled ?? window.location.hostname === "localhost";
		window._paq.push(["setSiteId", matomoId]);
		document.querySelector('script[src*="matomo.js"]') ||
			document.head.append(
				Object.assign(document.createElement("script"), {
					async: true,
					src: `https://cdn.matomo.cloud/${MATOMO}/matomo.js`,
				}),
			);
	}

	if (ENABLED === "debug") return console.info(`Analytics: "${action}"`, args);
	if (ENABLED === false) return;

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
