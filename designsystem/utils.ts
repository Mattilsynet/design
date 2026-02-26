import clsx from "clsx";
import styles from "./styles.module.css";

export const QUICK_EVENT = { capture: true, passive: true };
export const isBrowser = () =>
	typeof window !== "undefined" && typeof document !== "undefined"; // Using function to play nice with Vitest where DOM can come and go

export const getByCSSModule = (key: string) =>
	isBrowser() ? document.getElementsByClassName(styles[key].split(" ")[0]) : [];

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
 * @param el The Element to read/write attributes from
 * @param name The attribute name to get, set or remove, or a object to set multiple attributes
 * @param value A valid attribute value or null to remove attribute
 */
export const attr = (
	el: Element,
	name: string,
	value?: string | null,
): string | null => {
	if (value === undefined) return el.getAttribute(name) ?? null; // Fallback to null only if el is undefined
	if (value === null) el.removeAttribute(name);
	else if (el.getAttribute(name) !== value) el.setAttribute(name, value);
	return null;
};

/**
 * on
 * @param el The Element to use as EventTarget
 * @param types A space separated string of event types
 * @param listener An event listener function or listener object
 */
export const on = (
	el: Node | Window | ShadowRoot,
	...rest: Parameters<typeof Element.prototype.addEventListener>
): (() => void) => {
	const [types, ...options] = rest;
	for (const type of types.split(" ")) el.addEventListener(type, ...options);
	return () => off(el, ...rest);
};

/**
 * off
 * @param el The Element to use as EventTarget
 * @param types A space separated string of event types
 * @param listener An event listener function or listener object
 */
export const off = (
	el: Node | Window | ShadowRoot,
	...rest: Parameters<typeof Element.prototype.removeEventListener>
): void => {
	const [types, ...options] = rest;
	for (const type of types.split(" ")) el.removeEventListener(type, ...options);
};

declare global {
	interface Window {
		_mtdsHotReloadCleanup?: Map<string, Array<() => void>>;
	}
}

/**
 * onHotReload
 * @description Runs a callback when window is loaded in browser, and ensures cleanup when hot-reloading
 * @param key The key to identify setup and corresponding cleanup
 * @param callback The callback to run when the page is ready
 */
export const onHotReload = (key: string, setup: () => Array<() => void>) => {
	if (!isBrowser()) return; // Skip if not in modern browser environment, but on each call as Vitest might have unloaded jsdom between tests
	if (!window._mtdsHotReloadCleanup) window._mtdsHotReloadCleanup = new Map(); // Hot reload cleanup support supporting all build tools

	const run = () => {
		window._mtdsHotReloadCleanup?.get(key)?.map((cleanup) => cleanup()); // Run previous cleanup
		window._mtdsHotReloadCleanup?.set(key, setup()); // Store new cleanup
	};

	if (document.readyState !== "complete") on(window, "load", run);
	else document.fonts?.ready?.then(run) || setTimeout(run, 0); // Prefer fonts ready promise if available, but fallback to setTimeout
};

/**
 * Speed up MutationObserver by debouncing and only running when page is visible
 * @return new MutaionObserver
 */
export const onMutation = (
	el: Node,
	callback: (observer: MutationObserver) => void,
	options: MutationObserverInit,
) => {
	let queue = 0;
	const onFrame = () => {
		if (!el.isConnected) return cleanup(); // Disconnect if element is removed from DOM
		callback(observer);
		observer.takeRecords(); // Clear records to avoid multiple triggers
		queue = 0;
	};
	const cleanup = () => observer?.disconnect?.();
	const observer = new MutationObserver(() => {
		if (!queue) queue = requestAnimationFrame(onFrame); // requestAnimationFrame only runs when page is visible
	});

	observer.observe(el, options);
	onFrame(); // Initial run
	return cleanup;
};

/**
 * toCustomElementProps
 * @description Utility to quickly convert props to custom element attributes
 * @param props The props to convert
 * @returns The converted props
 */
const SELECTED = "aria-selected";
export const toCustomElementProps = <T extends Record<string, unknown>>(
	rest: T,
	klass?: string,
) =>
	Object.assign({}, rest, {
		suppressHydrationWarning: true, // Make Next.js happy
		[SELECTED]:
			rest[SELECTED] === undefined
				? undefined
				: (`${(rest[SELECTED] || "false") !== "false"}` as unknown as boolean), // Ensure aria-selected boolean is string
		class: clsx(klass, rest.className as string), // Use class instead of className
		hidden: !!rest.hidden, // Ensure boolean prop behaviour
		open: !!rest.open, // Ensure boolean prop behaviour
	});

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

/**
 * defineElement
 * @description Defines a customElement if running in browser and if not already registered
 */
export const defineElement = (
	name: string,
	instance: CustomElementConstructor,
) =>
	!isBrowser() ||
	window.customElements.get(name) ||
	window.customElements.define(name, instance);

/**
 * attachStyle
 * @param el The Element to scope styles for
 * @param css The css to inject
 */
export const SUPPORTS_CONSTRUCTED_CSS =
	typeof window !== "undefined" &&
	window.CSSStyleSheet &&
	document.adoptedStyleSheets;

export const attachStyle = (el: Element, css: string) => {
	if (!SUPPORTS_CONSTRUCTED_CSS) return;
	if (!el.shadowRoot) el.attachShadow({ mode: "open" }).append(tag("slot"));

	const sheet = new CSSStyleSheet();
	sheet.replaceSync(css);
	(el.shadowRoot as ShadowRoot).adoptedStyleSheets = [sheet];
};
