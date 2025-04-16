import styles from "../styles.module.css";
import {
	IS_BROWSER,
	QUICK_EVENT,
	attr,
	on,
	onMutation,
	useCSSVariable,
	useTransition,
} from "../utils";

let IS_MOBILE_OPEN = false;
const CSS_APP = styles.app.split(" ")[0];
const CSS_STICKY = styles.sticky.split(" ")[0];
const CSS_TOGGLE = '[data-command="toggle-app-expanded"]';
const KEY_TOGGLE = "--mtds-app-expanded";

// Setting CSS custom properties on constructed style sheet to avoid
// flash of unstyled content and still be Next.js hydration compatible
const setToggle = useCSSVariable(KEY_TOGGLE);
const setStickyPos = useCSSVariable("--mtds-app-sticky-pos");
const setStickyTop = useCSSVariable("--mtds-app-sticky-top");

const isToggle = (el: unknown): el is HTMLElement =>
	el instanceof Element && el.matches(CSS_TOGGLE);

const isMobile = (el: Element) =>
	window.getComputedStyle(el).getPropertyValue("--mtds-mobile") === "true";

function toggleExpanded(toggle = true) {
	const prev = !window.localStorage.getItem(KEY_TOGGLE)?.includes("false");
	const next = `var(${KEY_TOGGLE}--${toggle ? !prev : prev})`;
	window.localStorage.setItem(KEY_TOGGLE, `${next}`);
	useTransition(() => setToggle?.(next));
}

function handleToggleClick({ target: el }: Event) {
	if (el instanceof Element && el.classList.contains(CSS_APP)) {
		IS_MOBILE_OPEN && document.querySelector<HTMLElement>(CSS_TOGGLE)?.click();
	}
	if (!isToggle(el)) return;
	if (!isMobile(el)) return toggleExpanded();
	useTransition(() => {
		const nav = el.closest("nav");
		IS_MOBILE_OPEN = !IS_MOBILE_OPEN;

		attr(el, "aria-expanded", `${IS_MOBILE_OPEN}`);
		for (let el = nav; el && el !== document.body; el = el.parentElement)
			Array.from(el.parentElement?.children || [], (child) => {
				if (!child.contains(nav))
					child.toggleAttribute("inert", IS_MOBILE_OPEN); // Disable/enable tabbing out of mobile navigation
			});
	});
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
		setStickyPos?.("sticky");
		setStickyTop?.("0px");
		STICK = -1; // Not sticking to top and sidebar is smaller than viewport or scrolling up
	} else if (STICK === -1 && !SCROLL_UP) {
		setStickyPos?.("relative");
		setStickyTop?.(`${Math.max(0, WIN_Y - MIN_Y)}px`);
		STICK = 0; // Sticking to top and scrolling down
	} else if (STICK !== 1 && !SCROLL_UP && WIN_Y + WIN_H >= STICK_Y + STICK_H) {
		setStickyPos?.("sticky");
		setStickyTop?.(`${WIN_H - STICK_H}px`);
		STICK = 1; // Not sticking to bottom and scrolling down
	} else if (STICK === 1 && SCROLL_UP) {
		setStickyPos?.("relative");
		setStickyTop?.(`${STICK_Y - MIN_Y}px`);
		STICK = 0; // Sticking to bottom and scrolling up
	}
}

// Run instantly to avoid flash of unstyled content
// Using adoptedStyleSheets to avoid Next.js hydration conflict
if (IS_BROWSER) {
	toggleExpanded(false);
	onMutation(document.documentElement, CSS_STICKY, handleMutation);
	on(document, "click", handleToggleClick);
	on(window, "scroll", handleScroll, QUICK_EVENT);
}
