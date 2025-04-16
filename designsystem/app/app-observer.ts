import styles from "../styles.module.css";
import { QUICK_EVENT, attr, on, onLoaded, onMutation } from "../utils";
import "./app-toggle";

let IS_MOBILE_OPEN = false;
const CSS_APP = styles.app.split(" ")[0];
const CSS_STICKY = styles.sticky.split(" ")[0];
const CSS_TOGGLE = '[data-command="toggle-app-expanded"]';

const useTransition = (callback: () => void) => {
	if (!document.startViewTransition) callback();
	else document.startViewTransition(callback);
};

// Disable/enable interaction on other elements
const useInert = (host: HTMLElement | null, state: boolean) => {
	for (let el = host; el && el !== document.body; el = el.parentElement)
		Array.from(el.parentElement?.children || [], (child) => {
			if (!child.contains(host)) child.toggleAttribute("inert", state);
		});
};

function handleToggleClick({ target: el }: Event) {
	if (!(el instanceof Element)) return;
	if (IS_MOBILE_OPEN && el.classList.contains(CSS_APP))
		return document.querySelector<HTMLElement>(CSS_TOGGLE)?.click();

	if (el.matches(CSS_TOGGLE)) {
		useTransition(() => {
			const isMobile =
				getComputedStyle(el).getPropertyValue("--mobile") === "true";

			// @ts-expect-error window.mtdsAppToggle comes from app-toggle.js
			if (!isMobile) window.mtdsAppToggle?.();
			else {
				IS_MOBILE_OPEN = !IS_MOBILE_OPEN;
				attr(el, "aria-expanded", `${IS_MOBILE_OPEN}`);
				useInert(el.closest("nav"), IS_MOBILE_OPEN);
			}
		});
	}
}

// Scroll state
let MIN_Y = 0; // Offset to avoid scroll jump when sticky is set to relative
let SCROLL_UP: boolean;
let STICK = 0; // -1 = stick top, 0 = relative, 1 = stick bottom
let STICK_EL: HTMLElement;
let STICK_H = 0;
let STICK_Y = 0;
let STUCK = false; // Used to figure if nav is larger than viewport
let WIN_H = 0;
let WIN_Y = 0;

function handleMutation([sticky]: HTMLCollectionOf<HTMLElement>) {
	STICK_EL = sticky;
	handleScroll(); // Run on connect
}

function handleScroll() {
	if (!STICK_EL?.isConnected) return;
	const NEXT_Y = window.scrollY;
	const NEXT_UP = NEXT_Y < WIN_Y;
	WIN_Y = NEXT_Y;

	// Only calculate if scroll direction has changed
	if (NEXT_UP !== SCROLL_UP) {
		MIN_Y = (STICK_EL.parentElement?.getBoundingClientRect().top || 0) + WIN_Y;
		SCROLL_UP = NEXT_UP;
		STICK_H = STICK_EL.offsetHeight;
		STICK_Y = STICK_EL.getBoundingClientRect().top + WIN_Y;
		STUCK = STICK_EL.offsetHeight <= window.innerHeight;
		WIN_H = window.innerHeight;
	}

	if (STICK === -1 && STUCK) return; // Allways sticky when sidebar is smaller than viewport
	if (STICK !== -1 && (STUCK || (SCROLL_UP && WIN_Y <= STICK_Y))) {
		STICK_EL.style.setProperty("--pos", "sticky");
		STICK_EL.style.setProperty("--top", "0px");
		STICK = -1; // Not sticking to top and sidebar is smaller than viewport or scrolling up
	} else if (STICK === -1 && !SCROLL_UP) {
		STICK_EL.style.setProperty("--pos", "relative");
		STICK_EL.style.setProperty("--top", `${Math.max(0, WIN_Y - MIN_Y)}px`);
		STICK = 0; // Sticking to top and scrolling down
	} else if (STICK !== 1 && !SCROLL_UP && WIN_Y + WIN_H >= STICK_Y + STICK_H) {
		STICK_EL.style.setProperty("--pos", "sticky");
		STICK_EL.style.setProperty("--top", `${WIN_H - STICK_H}px`);
		STICK = 1; // Not sticking to bottom and scrolling down
	} else if (STICK === 1 && SCROLL_UP) {
		STICK_EL.style.setProperty("--pos", "relative");
		STICK_EL.style.setProperty("--top", `${STICK_Y - MIN_Y}px`);
		STICK = 0; // Sticking to bottom and scrolling up
	}
}

onLoaded(() => {
	onMutation(document.documentElement, CSS_STICKY, handleMutation);
	on(document, "click", handleToggleClick, QUICK_EVENT);
	on(window, "scroll", handleScroll, QUICK_EVENT);
});
