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

/**
 * Speed up MutationObserver by debouncing and only running when page is visible
 * @return new MutaionObserver
 */
export function createOptimizedMutationObserver(callback: MutationCallback) {
  const queue: MutationRecord[] = [];
  const observer = new MutationObserver((mutations) => {
    if (!queue[0]) requestAnimationFrame(process);
    queue.push(...mutations);
  });

  const process = () => {
    callback(queue, observer);
    queue.length = 0; // Reset queue
  };

  return observer;
}

// Internal helper for on / off
const events = (
	action: "add" | "remove",
	element: Node | Window,
	rest: Parameters<typeof Element.prototype.addEventListener>,
): void => {
	for (const type of rest[0].split(",")) {
		rest[0] = type;
		Element.prototype[`${action}EventListener`].apply(element, rest);
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
 * Child added event inspired by:
 * https://davidwalsh.name/detect-node-insertion
 */
export function onAdd (animationName: string, callback: () => void) {
  let timer: ReturnType<typeof requestAnimationFrame> | number = 0;
  const onAnimation = (event: Event & { animationName?: string }) => {
    if (event.animationName === animationName) {
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(callback);
    }
  };

	return {
		observe: (el: Element | Document, ) => on(el, 'animationend', onAnimation, QUICK_EVENT),
		disconnect: (el: Element | Document, ) => off(el, 'animationstart', onAnimation, QUICK_EVENT)
	};
}

// Make React support popover=""target attribute
// https://github.com/facebook/react/issues/27479
declare global {
	namespace React.JSX {
		interface IntrinsicAttributes {
			popovertargetaction?: string;
			popovertarget?: string;
			popover?: string | boolean;
		}
	}
	namespace React {
		interface HTMLAttributes<T> {
			popovertargetaction?: string;
			popovertarget?: string;
			popover?: string | boolean;
		}
	}
}