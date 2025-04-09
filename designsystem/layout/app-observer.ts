import styles from "../styles.module.css";
import { IS_BROWSER, QUICK_EVENT, on, onLoaded, onMutation } from "../utils";

// Setting app-expanded as CSS custom property of constructed style sheet to
// avoid flash of unstyled content and still be Next.js hydration compatible
const CSS_SHEET = IS_BROWSER ? new CSSStyleSheet() : null;
const CSS_APP = styles.app.split(" ")[0];
const CSS_NAV = `.${CSS_APP} > nav, .${CSS_APP} nav:has(+ main)`;
const CSS_TOGGLE = '[data-command="toggle-app-expanded"]';
const KEY_TOGGLE = "--mtdsc-app-expanded";
const MOBILE_NAV_BREAKPOINT = 960;

function handleToggleClick(event: Event) {
	if (event.target instanceof Element) {
		if (event.target.closest(CSS_TOGGLE)) {
			event.preventDefault(); // Ensure button does not cause submit even without `type="button"`
			if (!document.startViewTransition) toggleExpanded();
			else document.startViewTransition(toggleExpanded);
		}
		if (
			window.innerWidth <= MOBILE_NAV_BREAKPOINT &&
			event.target.matches(CSS_NAV)
		) {
			console.log(event.target);
		}
	}
}

// TODO Better handle for when app is not in DOM
let NAV: HTMLElement;
let MAIN: HTMLElement;
function handleMutation(apps: HTMLCollectionOf<HTMLElement>) {
	for (const app of apps)
		if (app.isConnected) {
			NAV = app.querySelector<HTMLElement>(CSS_NAV) as HTMLElement;
			MAIN = app.querySelector<HTMLElement>("main") as HTMLElement;
		}
}

function toggleExpanded(toggle = true) {
	const prev = window.localStorage.getItem(KEY_TOGGLE) !== "false";
	const next = toggle ? !prev : prev;
	CSS_SHEET?.replaceSync(
		`:root { ${KEY_TOGGLE}: var(${KEY_TOGGLE}--${next}) }`,
	);
	// document.querySelector(`.${CSS_APP} aside`)?.toggleAttribute("hidden"); // Just for testing
	window.localStorage.setItem(KEY_TOGGLE, `${next}`);
}

// Run instantly to avoid flash of unstyled content
// Using adoptedStyleSheets to avoid Next.js hydration conflict
if (CSS_SHEET) document.adoptedStyleSheets?.push(CSS_SHEET);
if (IS_BROWSER) toggleExpanded(false); // Sync UI with store

let NAV_H = 0;
let NAV_Y = 0;
let OFFSET_Y = 0; // Used to figure min top of the sidebar
let SCROLL_UP: boolean;
let STICK_DIR = 0; // -1 = stick top, 0 = relative, 1 = stick bottom
let WIN_H = 0;
let WIN_Y = 0;
let NAV_LT_WIN = false; // Used to figure if nav is larger than viewport
const KEY_NAV_ALIGN = "--mtdsc-app-nav-align";
const KEY_NAV_BOTTOM = "--mtdsc-app-nav-bottom";
const KEY_NAV_POS = "--mtdsc-app-nav-position";
const KEY_NAV_TOP = "--mtdsc-app-nav-top";

function handleScroll() {
	if (!NAV?.isConnected) return;
	const NEXT_Y = window.scrollY;
	const NEXT_UP = NEXT_Y < WIN_Y;
	WIN_Y = NEXT_Y;

	// Only calculate if scroll direction has changed
	if (NEXT_UP !== SCROLL_UP) {
		NAV_H = NAV.offsetHeight;
		NAV_LT_WIN = NAV.offsetHeight <= window.innerHeight;
		NAV_Y = NAV.offsetTop;
		OFFSET_Y = MAIN.offsetTop;
		SCROLL_UP = NEXT_UP;
		WIN_H = window.innerHeight;
	}

	if (STICK_DIR === -1 && NAV_LT_WIN) return; // Allways sticky when sidebar is smaller than viewport
	if (STICK_DIR !== -1 && (NAV_LT_WIN || (SCROLL_UP && WIN_Y <= NAV_Y))) {
		// Not sticking to top and scrolling up or sidebar is smaller than viewport
		NAV.style.setProperty(KEY_NAV_POS, "sticky");
		NAV.style.setProperty(KEY_NAV_TOP, "0px");
		NAV.style.removeProperty(KEY_NAV_BOTTOM);
		NAV.style.setProperty(KEY_NAV_ALIGN, "start");
		STICK_DIR = -1;
		// console.log("a");
	} else if (STICK_DIR === -1 && !SCROLL_UP) {
		// Sticking to top and scrolling down
		NAV.style.setProperty(KEY_NAV_POS, "relative");
		NAV.style.setProperty(KEY_NAV_TOP, `${Math.max(0, WIN_Y - OFFSET_Y)}px`);
		NAV.style.removeProperty(KEY_NAV_BOTTOM);
		NAV.style.setProperty(KEY_NAV_ALIGN, "start");
		STICK_DIR = 0;
		// console.log("b");
	} else if (STICK_DIR !== 1 && !SCROLL_UP && WIN_Y + WIN_H >= NAV_Y + NAV_H) {
		// Not sticking to bottom and scrolling down
		NAV.style.setProperty(KEY_NAV_POS, "sticky");
		NAV.style.removeProperty(KEY_NAV_TOP);
		NAV.style.setProperty(KEY_NAV_BOTTOM, "0px");
		NAV.style.setProperty(KEY_NAV_ALIGN, "end");
		STICK_DIR = 1;
		// console.log("c");
	} else if (STICK_DIR === 1 && SCROLL_UP) {
		NAV.style.setProperty(KEY_NAV_POS, "relative");
		NAV.style.setProperty(
			KEY_NAV_TOP,
			`${Math.min(NAV_Y - OFFSET_Y, WIN_Y + WIN_H - NAV_H - OFFSET_Y)}px`,
		);
		NAV.style.removeProperty(KEY_NAV_BOTTOM);
		NAV.style.setProperty(KEY_NAV_ALIGN, "start");
		STICK_DIR = 0;
		// console.log("d");
	}
}

onLoaded(() => {
	onMutation(document.documentElement, CSS_APP, handleMutation);
	on(window, "scroll", handleScroll, QUICK_EVENT);
	on(document, "click", handleToggleClick);
});
