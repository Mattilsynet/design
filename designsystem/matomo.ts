import { IS_BROWSER } from "./utils";

let LOADED = false;
const MATOMO = "mattilsynet.matomo.cloud";
declare global {
	interface Window {
		_paq?: string[][];
		// matomoAsyncInit?: () => void;
		// Matomo?: {
		// 	getTracker: (url: string, id: number) => Record<string, () => void>;
		// 	getAsyncTracker: (url: string, id: number) => Record<string, () => void>;
		// };
	}
}

export function track(action: string, ...args: string[]) {
	if (!IS_BROWSER) return;
	window._paq = window._paq || [];

	if (!LOADED) {
		window._paq.push(["setTrackerUrl", `https://${MATOMO}/matomo.php`]);
		window._paq.push(["enableLinkTracking"]);
		LOADED = !!(
			document.querySelector('script[src*="matomo.js"]') ||
			document.documentElement.append(
				Object.assign(document.createElement("script"), {
					async: true,
					src: `https://cdn.matomo.cloud/${MATOMO}/matomo.js`,
				}),
			)
		);
		// window.matomoAsyncInit = () => {
		// 	try {
		// 		const url = `https://${MATOMO}/matomo.php`;
		// 		const tracker = window.Matomo?.getAsyncTracker(url, 9999);
		// 		console.log({ tracker });
		// 		// matomoTracker?.trackPageView();
		// 	} catch (err) {}
		// };
	}

	window._paq.push([action, ...args]);
}

// window._paq.push(["setCustomUrl", url]); // Use location.href to fix storybook iframe url issues
// window._paq.push(["setDocumentTitle", title || document.title]);
// window._paq.push(["setSiteId", "17"]);
// window._paq.push(["setTrackerUrl", `https://${MATOMO}/matomo.php`]);
// window._paq.push(["trackPageView"]);

// const matomoURLs = [
// 	"https://mattilsynet.matomo.cloud",
// 	"https://cdn.matomo.cloud",
// ];

// export const EVENT_ID_NO_RESULTS = "search_no_results";
// export const EVENT_ID_SEARCH_FILTER = "search_filter";
// export const EVENT_ID_FAST_SEARCH = "fast_search";
// export const EVENT_ID_FEEDBACK_FORM = "feedback_form";

// declare global {
// 	interface Window {
// 		_mtm?: unknown[];
// 		_paq?: unknown[];
// 	}
// }

// export function publishMatomoEvent(
// 	eventName: string,
// 	data: Record<string, string>,
// ): void {
// 	console.log("publishMatomoEvent eventName: ", eventName, data);
// 	const eventObject = {
// 		event: eventName,
// 		...data,
// 	};
// 	//_mtm = Matomo Tag Manager vs _paq = Matomo low level JavaScript API
// 	if (window._mtm !== undefined) {
// 		const _mtm = window._mtm || [];
// 		_mtm.push(eventObject);
// 	}
// }

// // import { onMount } from 'svelte'
// // import { isProdEnvironment, matomoUrl } from '$lib/env'
// // import { page } from '$app/state'
// // import { SEARCH_PARAM_SEARCH } from '$svelte-xp-lib/constants'
// // import { browser } from '$app/environment'
// // import { CONSENT_TYPE, cookieConsent as cookieConsentStore } from '../stores/cookie-consent'
// // import { forceArray } from '$lib/utils/utils'

// onMount(() => {
// 	// Setup tag manager
// 	if (window._mtm === undefined && matomoUrl) {
// 		const _mtm = (window._mtm = window._mtm || []);
// 		_mtm.push({ "mtm.startTime": new Date().getTime(), event: "mtm.Start" });
// 		const d = document,
// 			g = d.createElement("script"),
// 			s = d.getElementsByTagName("head")[0];
// 		g.async = true;
// 		g.defer = true;
// 		g.src = matomoUrl;
// 		s?.appendChild(g);
// 	}
// });

// function trackPageChange() {
// 	const _paq = (window._paq = window._paq || []);

// 	// Implicit consent to use of Matomo's necessary cookies by not adding either of the following:
// 	// Stops any page tracking from being sent and no cookies created
// 	// _paq.push(['requireConsent'])
// 	// Keeps sending page tracking, but no cookies are created
// 	// _paq.push(['requireCookieConsent'])

// 	// Setup use of heatmap and session recording cookie according to user consent:
// 	if (
// 		forceArray($cookieConsentStore?.consents).includes(
// 			CONSENT_TYPE.STATISTICAL_COOKIES,
// 		)
// 	) {
// 		_paq.push(["HeatmapSessionRecording::enable"]);
// 		console.log("Matomo enabled Heatmap Session Recording");
// 	} else {
// 		_paq.push(["HeatmapSessionRecording::disable"]);
// 		console.log("Matomo disabled Heatmap Session Recording");
// 	}

// 	/** Start track page views in client side routing */
// 	// Make Matomo aware of client side page change by setting new url and title
// 	_paq.push(["setCustomUrl", window.location]);
// 	_paq.push(["setDocumentTitle", document.title]);
// 	// Make Matomo aware of any newly added content in the document
// 	_paq.push(["FormAnalytics::scanForForms", document]);
// 	_paq.push(["MediaAnalytics::scanForMedia", document]);
// 	_paq.push(["enableLinkTracking"]);
// 	// Actual page tracking
// 	_paq.push(["trackPageView"]);
// 	console.log("trackPageView window.location: ", window.location);
// 	/** End track page views */

// 	// Track site search
// 	if (page.url.searchParams.has(SEARCH_PARAM_SEARCH)) {
// 		_paq.push([
// 			"trackSiteSearch",
// 			page.url.searchParams.get(SEARCH_PARAM_SEARCH).toLowerCase(),
// 		]);
// 		console.log(
// 			"trackSiteSearch search param: ",
// 			page.url.searchParams.get(SEARCH_PARAM_SEARCH).toLowerCase(),
// 		);
// 	}

// 	// Setup Matomo javascript tracking API
// 	_paq.push(["setTrackerUrl", "https://mattilsynet.matomo.cloud/matomo.php"]);
// 	if (isProdEnvironment) {
// 		const MATOMO_ID_PROD: Readonly<number> = 3;
// 		_paq.push(["setSiteId", MATOMO_ID_PROD]);
// 	} else {
// 		const MATOMO_ID_QA: Readonly<number> = 6;
// 		_paq.push(["setSiteId", MATOMO_ID_QA]);
// 	}
// 	const d = document,
// 		g = d.createElement("script"),
// 		s = d.getElementsByTagName("script")[0];
// 	g.async = true;
// 	g.src = "https://cdn.matomo.cloud/mattilsynet.matomo.cloud/matomo.js";
// 	s.parentNode?.insertBefore(g, s);
// }

// /**
//  * Track a page view when the URL path changes
//  * Matomo doesn't pick up on client side page changes on its own
//  */
// $effect(() => {
// 	if (page?.url?.pathname && browser) {
// 		trackPageChange();
// 	}
// });
