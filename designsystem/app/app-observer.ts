import styles from "../styles.module.css";
import { debounce, on, onLoaded, onMutation, QUICK_EVENT } from "../utils";
import "./app-toggle";

const CSS_APP = styles.app.split(" ")[0];
const CSS_STICKY = styles.sticky.split(" ")[0];
const CSS_TOGGLE = '[data-command="toggle-app-expanded"]';
const CSS_SIDEBAR = `.${CSS_APP} > dialog,.${CSS_APP} dialog ~ main`;

const useTransition = (callback: () => void) => {
	if (!document.startViewTransition) callback();
	else document.startViewTransition(callback);
};

export const toggleAppExpanded = (force?: boolean) =>
	// @ts-expect-error window.mtdsAppToggle comes from app-toggle.js
	useTransition(() => window.mtdsToggleAppExpanded?.(force));

function handleAppToggleClick({ target: el, defaultPrevented: stop }: Event) {
	const link = (el as Element)?.closest?.("a");
	if (link?.closest("dialog") && link?.closest(CSS_SIDEBAR))
		return closeSidebar(); // Close sidebar if link is clicked inside sidebar

	if (stop || !(el instanceof HTMLButtonElement) || !el.matches(CSS_TOGGLE))
		return;
	const isDesktop = getComputedStyle(el).position === "sticky";

	if (isDesktop) toggleAppExpanded();
	else
		useTransition(() => {
			const sidebar = document.querySelector<HTMLDialogElement>(CSS_SIDEBAR);
			sidebar?.setAttribute("data-closedby", "any"); // Allow closing by clicking outside
			sidebar?.showModal();
		});
}

function closeSidebar() {
	document.querySelector<HTMLDialogElement>(CSS_SIDEBAR)?.close();
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
	handleAppScroll(); // Run on connect
}

function handleAppScroll() {
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
	on(document, "click", handleAppToggleClick, QUICK_EVENT);
	on(window, "resize", debounce(closeSidebar, 100), QUICK_EVENT);
	on(window, "scroll", handleAppScroll, QUICK_EVENT);
});
