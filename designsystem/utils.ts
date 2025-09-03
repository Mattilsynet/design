import { autoUpdate, computePosition } from "@floating-ui/dom";

export const QUICK_EVENT = { capture: true, passive: true };
export const IS_BROWSER =
	typeof window !== "undefined" && typeof document !== "undefined";

// TODO: Documentation for prettyNumber
let INTL_NUM: Intl.NumberFormat | undefined;
export function prettyNumber(number: number | string) {
	if (!INTL_NUM)
		INTL_NUM = new Intl.NumberFormat(
			(IS_BROWSER && attr(document.documentElement, "lang")) || "no",
		);
	return INTL_NUM.format(Number(number));
}

export function debounce<T extends unknown[]>(
	callback: (...args: T) => void,
	delay: number,
) {
	let timer: ReturnType<typeof setTimeout>;

	return (...args: T) => {
		clearTimeout(timer);
		timer = setTimeout(() => callback(...args), delay);
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
): void => {
	if (UNBIND && (element === window || element === document))
		UNBIND.push(() => off(element, ...rest));
	events("add", element, rest);
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
		_mtdsUnbindEvents?: Map<string, Array<() => void>>;
	}
}

/**
 * onLoaded
 * @description Runs a callback when window is loaded in browser, and ensures events are unbound if hot reloading
 * @param callback The callback to run when the page is ready
 */
let UNBIND: Array<() => void> | null = null;
export const onLoaded = (callback: () => void) => {
	if (!IS_BROWSER || !window.requestAnimationFrame) return; // Skip if not in browser environment
	if (!window._mtdsUnbindEvents) window._mtdsUnbindEvents = new Map();

	const run = () =>
		requestAnimationFrame(() => {
			const key = String(callback).replace(/(\n|\s)/g, "");
			window._mtdsUnbindEvents?.get(key)?.forEach((unbind) => {
				unbind(); // Unbind previous events
			});
			UNBIND = []; // Prepare to listen for newly bound events
			callback(); // Run binding
			window._mtdsUnbindEvents?.set(key, UNBIND?.slice(0)); // Store for later unbinding
			UNBIND = null; // Stop listening for newly bound events
		});

	if (document.readyState === "complete") run();
	else on(window, "load", run);
};

const ANCHORED = new WeakMap<Element, ReturnType<typeof autoUpdate>>();
export function anchorPosition(
	target: HTMLElement,
	anchor: false | Element,
	options?: Parameters<typeof computePosition>[2],
) {
	ANCHORED.get(target)?.(); // Unbind previous anchor position
	ANCHORED.delete(target);

	if (anchor)
		ANCHORED.set(
			target,
			autoUpdate(anchor, target, () => {
				if (!target.isConnected || !anchor.isConnected || target.hidden)
					return anchorPosition(target, false);
				computePosition(anchor, target, options).then(({ x, y }) => {
					target.style.left = `${x}px`;
					target.style.top = `${y}px`;
				});
			}),
		);
}

/**
 * Speed up MutationObserver by debouncing and only running when page is visible
 * @return new MutaionObserver
 */
export function createOptimizedMutationObserver(callback: MutationCallback) {
	let queue = 0;

	const onFrame = () => setTimeout(onTimer, 200); // Use both requestAnimationFrame and setTimeout to debounce and only run when visible
	const onTimer = () => {
		callback([], observer);
		observer.takeRecords(); // Clear records to avoid running callback multiple times
		queue = 0;
	};
	const observer = new MutationObserver(() => {
		if (!queue) queue = requestAnimationFrame(onFrame);
	});

	return observer;
}

/**
 * onMutation
 * @description Utility to quickly observe mutations on a specific class name
 * @param el The Element to use as EventTarget
 * @param className The class name to observe
 * @param callback The callback to run when mutations are detected
 */
const MUTATORS = new WeakMap<Element, Array<() => void>>();
export const onMutation = <T extends Element>(
	el: Element,
	className: string,
	callback: (elems: HTMLCollectionOf<T>) => void,
) => {
	if (!IS_BROWSER || !window.requestAnimationFrame) return; // Skip if not in browser environment
	const elems = el.getElementsByClassName(className);
	const mutator = MUTATORS.get(el) || [];

	if (!mutator.length) {
		MUTATORS.set(el, mutator);
		createOptimizedMutationObserver((_, observer) => {
			if (el.isConnected && mutator?.length) {
				for (const callback of mutator) callback();
			} else {
				observer?.disconnect();
				MUTATORS.delete(el);
			}
		}).observe(el, {
			attributeFilter: ["class", "hidden"],
			attributes: true,
			childList: true,
			subtree: true,
		});
	}
	mutator.push(() => callback(elems as HTMLCollectionOf<T>));
};

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
	if (className || klass) rest.class = `${klass} ${className}`.trim(); // Use class instead of className
	if (hidden) rest.hidden = true; // Ensure boolean prop behaviour
	if (open) rest.open = true; // Ensure boolean prop behaviour
	return rest;
};
