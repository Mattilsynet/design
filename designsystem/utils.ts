export const IS_BROWSER = typeof window !== 'undefined' && typeof document !== 'undefined';
export const QUICK_EVENT = { capture: true, passive: true };

/**
 * useId
 * @return A generated unique ID
 */
let id = 0;
const UUID = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
export function useId (el: Element) {
  if (!el.id) el.id = `${UUID}${++id}`;
	return el.id;
};

// Internal helper for on / off
const events = (
	action: "add" | "remove",
	element: Node | Window,
	rest: Parameters<typeof Element.prototype.addEventListener>,
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
): void => events("add", element, rest);

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

/**
 * Speed up MutationObserver by debouncing and only running when page is visible
 * @return new MutaionObserver
 */
export function createOptimizedMutationObserver(callback: MutationCallback) {
  let queue = 0;

	const onFrame = () => setTimeout(onTimer, 200); // Use both requestAnimationFrame and setTimeout to debounce and only run when visible
	const onTimer = () => {
		callback([], observer);
		queue = 0;
	};
  const observer = new MutationObserver(() => {
    if (!queue) queue = requestAnimationFrame(onFrame);
  });

  return observer;
}

type Mutator = { observer: MutationObserver, collections: Map<string, () => void> };
const MUTATORS = new WeakMap<Element, Mutator>();
const MUTATORS_CALLBACK = (element: Element) => {
	const mutator = MUTATORS.get(element);

	if (!mutator || !element.isConnected) {
		mutator?.observer?.disconnect();
		MUTATORS.delete(element);
	} else for(const [, callback] of mutator.collections) callback();
};

export const onMutation = (
	element: Element,
	className: string,
	callback: ((collection: HTMLCollection) => void) | false
) => {
	const collection = element.getElementsByClassName(className);
	let mutator = MUTATORS.get(element);

	if (!mutator) {
		mutator = { collections: new Map(), observer: createOptimizedMutationObserver(() => MUTATORS_CALLBACK(element)) };
		mutator.observer.observe(element, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
		MUTATORS.set(element, mutator);
	}
	if (callback) mutator.collections.set(className, () => callback(collection));
	else mutator.collections.delete(className);
}

export const isInputLike = (el: unknown): el is HTMLInputElement =>
	el instanceof HTMLElement && 'validity' in el && !(el instanceof HTMLButtonElement);

// Make React support popover=""target attribute
// https://github.com/facebook/react/issues/27479
type Popover = "" | "auto" | "manual" | undefined;
declare global {
	namespace React.JSX {
		interface IntrinsicAttributes {
			popovertargetaction?: string;
			popovertarget?: string;
			popover?: Popover;
		}
	}
	namespace React {
		interface HTMLAttributes<T> {
			popovertargetaction?: string;
			popovertarget?: string;
			popover?: Popover;
		}
	}
}