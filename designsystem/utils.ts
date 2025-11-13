import type { Placement, SizeOptions } from "@floating-ui/dom";
import {
	autoUpdate,
	computePosition,
	flip,
	shift,
	size,
} from "@floating-ui/dom";
import clsx from "clsx";
import styles from "./styles.module.css";

export const QUICK_EVENT = { capture: true, passive: true };
export const IS_BROWSER =
	typeof window !== "undefined" && typeof document !== "undefined";

export function debounce<T extends unknown[]>(
	callback: (...args: T) => void,
	delay: number,
) {
	let timer: ReturnType<typeof setTimeout>;

	return function (this: unknown, ...args: T) {
		clearTimeout(timer);
		timer = setTimeout(() => callback.apply(this, args), delay);
	};
}

/**
 * attr
 * @description Utility to quickly get, set and remove attributes
 * @param el The Element to use as EventTarget
 * @param name The attribute name to get, set or remove, or a object to set multiple attributes
 * @param value A valid attribute value or null to remove attribute
 */
export function attr(
	el: Element,
	name: string,
	value?: string | null,
): string | null {
	if (value === undefined) return el.getAttribute(name) ?? null; // Fallback to null only if el is undefined
	if (value === null) el.removeAttribute(name);
	else if (el.getAttribute(name) !== value) el.setAttribute(name, value);
	return null;
}

/**
 * useId
 * @return A generated unique ID
 */
let id = 0;
const UUID = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
export function useId(el: Element) {
	if (!el.id) el.id = `${UUID}${++id}`;
	return el.id;
}

// Internal helper for on / off
const events = (
	action: "add" | "remove",
	element: Node | Window,
	[...rest]: Parameters<typeof Element.prototype.addEventListener>, // Spreat to make a copy of the array
): void => {
	for (const type of rest[0].split(",")) {
		rest[0] = type;
		element[`${action}EventListener`](...rest);
	}
};

/**
 * on
 * @param element The Element to use as EventTarget
 * @param types A comma separated string of event types
 * @param listener An event listener function or listener object
 */
export const on = (
	element: Node | Window,
	...rest: Parameters<typeof Element.prototype.addEventListener>
): (() => void) => {
	events("add", element, rest);
	return () => off(element, ...rest);
};

/**
 * off
 * @param element The Element to use as EventTarget
 * @param types A comma separated string of event types
 * @param listener An event listener function or listener object
 */
export const off = (
	element: Node | Window,
	...rest: Parameters<typeof Element.prototype.removeEventListener>
): void => events("remove", element, rest);

declare global {
	interface Window {
		_mtdsCleanups?: Map<string, Array<() => void>>;
	}
}

/**
 * onLoaded
 * @description Runs a callback when window is loaded in browser, and ensures events are unbound if hot reloading
 * @param callback The callback to run when the page is ready
 */
export const onLoaded = (setup: () => Array<() => void>) => {
	if (!IS_BROWSER || !window.requestAnimationFrame) return; // Skip if not in browser environment
	if (!window._mtdsCleanups) window._mtdsCleanups = new Map();

	const run = () =>
		requestAnimationFrame(() => {
			const key = String(setup).replace(/(\n|\s)/g, ""); // Create a key based on setup function body
			window._mtdsCleanups?.get(key)?.map((cleanup) => cleanup()); // Run cleanups
			window._mtdsCleanups?.set(key, setup()); // Rum setup and store cleanups
		});

	if (document.readyState === "complete") run();
	else on(window, "load", run);
};

type AnchorOptions = Parameters<typeof computePosition>[2] & {
	contain?: SizeOptions["apply"] | false;
};
const ANCHORED = new WeakMap<Element, ReturnType<typeof autoUpdate>>();
const DIALOG = `.${styles.dialog.split(" ")[0]}`;
export function anchorPosition(
	target: HTMLElement,
	anchor: false | Element,
	{ contain, middleware, placement, ...options }: AnchorOptions = {},
) {
	ANCHORED.get(target)?.(); // Unbind previous anchor position
	ANCHORED.delete(target);

	// TODO aria-label på app
	if (anchor) {
		const footer = target.closest(DIALOG)?.querySelector(":scope > footer");
		const inset = Number(attr(target, "data-inset")) || 20;
		const bottom = (footer?.clientHeight || 0) + inset;
		const padding = { bottom, left: inset, right: inset, top: inset };
		const position = (attr(target, "data-position") ?? "bottom") as Placement;

		ANCHORED.set(
			target,
			autoUpdate(anchor, target, () => {
				if (!target.isConnected || !anchor.isConnected || target.hidden)
					return anchorPosition(target, false);
				computePosition(anchor, target, {
					...options,
					placement: placement || position,
					middleware: [
						flip({ padding }),
						shift(),
						...(contain ? [size({ padding, apply: contain })] : []),
						...(middleware || []),
					],
				}).then(({ x, y }) => {
					target.style.left = `${x}px`;
					target.style.top = `${y}px`;
				});
			}),
		);
	}
}

/**
 * Speed up MutationObserver by debouncing and only running when page is visible
 * @return new MutaionObserver
 */
export function onMutation(
	callback: (observer: MutationObserver) => void,
	attr: string | { attr: string; root?: HTMLElement; delay?: number },
) {
	let queue = 0;
	const config = typeof attr === "string" ? { attr } : attr;
	const onFrame = () => setTimeout(onTimer, config?.delay ?? 200); // Use both requestAnimationFrame and setTimeout to debounce and only run when visible
	const onTimer = () => {
		if (!IS_BROWSER) return cleanup(); // If using JSDOM, the document might have been removed
		callback(observer);
		observer.takeRecords(); // Clear records to avoid running callback multiple times
		queue = 0;
	};
	const observer = new MutationObserver(() => {
		if (!queue) queue = requestAnimationFrame(onFrame);
	});
	const cleanup = () => {
		try {
			observer.disconnect();
		} catch (_) {
			// No more observer
		}
	};

	observer.observe(config?.root || document.documentElement, {
		attributeFilter: [config.attr],
		attributes: true,
		childList: true,
		subtree: true,
	});

	callback(observer); // Initial run
	return cleanup;
}

export function onResize(callback: ResizeObserverCallback, element: Element) {
	const resize = new ResizeObserver(callback);
	resize.observe(element);
	return () => resize.disconnect();
}

/**
 * isInputLike
 * @description Check if element is an input like element
 * @param el The element to check
 * @returns True if the element is an input like element
 */
export const isInputLike = (el: unknown): el is HTMLInputElement =>
	el instanceof HTMLElement &&
	"validity" in el &&
	!(el instanceof HTMLButtonElement);

/**
 * toCustomElementProps
 * @description Utility to quickly convert props to custom element attributes
 * @param props The props to convert
 * @returns The converted props
 */
const SELECTED = "aria-selected";
export const toCustomElementProps = (
	{ className, hidden, open, ...rest }: Record<string, unknown>,
	klass?: string,
) => {
	rest.suppressHydrationWarning = true; // Make Next.js happy
	if (rest[SELECTED] !== undefined)
		rest[SELECTED] = `${(rest[SELECTED] || "false") !== "false"}`; // Ensure aria-selected boolean is string
	if (className || klass) rest.class = clsx(klass, className as string); // Use class instead of className
	if (hidden) rest.hidden = true; // Ensure boolean prop behaviour
	if (open) rest.open = true; // Ensure boolean prop behaviour
	return rest;
};

/**
 * tag
 * @description creates element and assigns properties
 * @param tagName The tagname of element to create
 * @param attrs Optional attributes to add to the element
 * @param text Optional text content to add to the element
 * @return HTMLElement with props
 */
export const tag = <TagName extends keyof HTMLElementTagNameMap>(
	tagName: TagName,
	attrs?: Record<string, string | null> | null,
	text?: string | null,
): HTMLElementTagNameMap[TagName] => {
	const el = document.createElement(tagName);
	if (text) el.textContent = text;
	if (attrs) for (const [key, val] of Object.entries(attrs)) attr(el, key, val);
	return el;
};

// Make sure we have a HTMLElement to extend (for server side rendering)
export const MTDSElement =
	typeof HTMLElement === "undefined"
		? (class {} as typeof HTMLElement)
		: HTMLElement;
