export const IS_BROWSER = typeof window !== 'undefined' && typeof document !== 'undefined';
export const QUICK_EVENT = { capture: true, passive: true };

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


const TARGETS = new Map<Element, () => void>(); // Store current open poppers and their update functions
const SCROLLER = IS_BROWSER ? document.createElement('div') : null // Used to ensure we have scrollability under
if (SCROLLER) attr(SCROLLER, 'style', 'position:absolute;padding:1px;top:0;left:0px');

if (IS_BROWSER){
	on(window, 'load,resize,scroll', () => {
		for (const [_, update] of TARGETS) update();
	}, QUICK_EVENT);}
	
/**
 * anchorPosition
 * @param target The Element to position
 * @param anchor The Element to use as anchor
 */
const ANCHOR = { top: 0, right: 1, bottom: 2, left: 3, none: 4 }; // Speed up by using a const map

export function anchorPosition (target: HTMLElement, anchor: HTMLElement | null | false, position?: string | number) {
	if (anchor === false || !anchor?.isConnected || !target?.isConnected) return TARGETS.delete(target); // Stop watchning if anchor is removed from DOM
	if (!SCROLLER?.isConnected) document.body.append(SCROLLER || ''); // Ensure we have t´he scroller
	if (!TARGETS.has(target)) {
		const key = anchor.getAttribute('data-anchor') || window.getComputedStyle(anchor).getPropertyValue('--mtds-anchor') || position;
		const val = ANCHOR[key as keyof typeof ANCHOR] ?? ANCHOR.bottom; // Use CSS property to store position for more flexibility
		return TARGETS.set(target, () => anchorPosition(target, anchor, val)).get(target)?.(); // Start watching if not already watching
	}
	if (position === ANCHOR.none) return target.style.setProperty('left', '-100vw'); // Hide target if anchor is set to none

  const { offsetWidth: targetW, offsetHeight: targetH } = target;
  const { offsetWidth: anchorW, offsetHeight: anchorH } = anchor;
  const { width, height, left, top } = anchor.getBoundingClientRect();
	const anchorX = Math.round(left - (anchorW - width) / 2); // Correct for CSS transform scale
  const anchorY = Math.round(top - (anchorH - height) / 2); // Correct for CSS transform scale

	const hasSpaceLeft = anchorX - targetW > 0
	const hasSpaceRight = anchorW + anchorW + targetW < window.innerWidth;
	const hasSpaceOver = anchorY - targetH > 0
	const hasSpaceUnder = anchorY + anchorH + targetH < window.innerHeight;
	const positionRight = (position === ANCHOR.bottom && hasSpaceRight) || !hasSpaceLeft // Always position under when no hasSpaceOver, as no OS can scroll further up than 0
	const positionUnder = (position === ANCHOR.bottom && hasSpaceUnder) || !hasSpaceOver // Always position under when no hasSpaceOver, as no OS can scroll further up than 0
	const isVertical = position === ANCHOR.top || position === ANCHOR.bottom;

	target.style.left = `${Math.round(isVertical ? Math.min(Math.max(10, anchorX - (targetW - anchorW) / 2), window.innerWidth - targetW - 10) : (positionRight ? anchorX + anchorW : anchorX - targetW))}px`
  target.style.top = `${Math.round(isVertical ? (positionUnder ? anchorY + anchorH : anchorY - targetH) : Math.min(Math.max(10, anchorY - (targetH - anchorH) / 2), window.innerHeight - targetH - 10))}px`
  SCROLLER?.style.setProperty('translate', `${Math.round(window.scrollX + anchorX + anchorW + targetW + 30)} ${Math.round(window.scrollY + anchorY + anchorH + targetH + 30)}px`);
}

// 	const {
// 		position,
// 		variantFlipOrder,
// 		positionFlipOrder
// } = {
// 		...defaults,
// 		...opt
// };

// const refBox = reference.getBoundingClientRect();
// const popBox = popper.getBoundingClientRect();

// /**
//  * Holds coordinates of top, left, bottom and right alignment
//  */
// const positionStore: AvailablePositions = {
// 		t: refBox.top - popBox.height,
// 		b: refBox.bottom,
// 		r: refBox.right,
// 		l: refBox.left - popBox.width
// };

// /**
//  * Holds corresponding variants (start, middle, end).
//  * The values depend on horizontal / vertical orientation
//  */
// const variantStore: AvailableVariants = {
// 		vs: refBox.left,
// 		vm: refBox.left + refBox.width / 2 - popBox.width / 2,
// 		ve: refBox.left + refBox.width - popBox.width,
// 		hs: refBox.top,
// 		hm: refBox.bottom - refBox.height / 2 - popBox.height / 2,
// 		he: refBox.bottom - popBox.height
// };

// // Extract position and variant
// // Top-start -> top is "position" and "start" is the variant
// const [posKey, varKey = 'middle'] = position.split('-');
// const positions = positionFlipOrder[posKey as keyof PositionFlipOrder];
// const variants = variantFlipOrder[varKey as keyof VariantFlipOrder];

// // Try out all possible combinations, starting with the preferred one.
// const {top, left, bottom, right} = window;

// for (const p of positions) {
// 		const vertical = (p === 't' || p === 'b');

// 		// The position-value
// 		let positionVal = positionStore[p as keyof AvailablePositions];

// 		// Which property has to be changes.
// 		const [positionKey, variantKey] = (vertical ? ['top', 'left'] : ['left', 'top']) as PositionPairs;

// 		/**
// 		 * box refers to the size of the popper element. Depending on the orientation this is width or height.
// 		 * The limit is the corresponding, maximum value for this position.
// 		 */
// 		const [positionSize, variantSize] = vertical ? [popBox.height, popBox.width] : [popBox.width, popBox.height];

// 		const [positionMaximum, variantMaximum] = vertical ? [bottom, right] : [right, bottom];
// 		const [positionMinimum, variantMinimum] = vertical ? [top, left] : [left, top];

// 		// Skip pre-clipped values
// 		if (positionVal < positionMinimum || (positionVal + positionSize) > positionMaximum) {
// 				continue;
// 		}

// 		for (const v of variants) {

// 				// The position-value, the related size value of the popper and the limit
// 				let variantVal = variantStore[((vertical ? 'v' : 'h') + v) as keyof AvailableVariants];

// 				if (variantVal < variantMinimum || (variantVal + variantSize) > variantMaximum) {
// 						continue;
// 				}

// 				// Subtract popBox's initial position
// 				variantVal -= popBox[variantKey];
// 				positionVal -= popBox[positionKey];

// 				// Apply styles and normalize viewport
// 				popper.style[variantKey] = `${variantVal}px`;
// 				popper.style[positionKey] = `${positionVal}px`;

// 				return (p + v) as PositionMatch;
// 		}
// }

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

/**
 * onMutation
 * @description Utility to quickly observe mutations on a specific class name
 * @param element The Element to use as EventTarget
 * @param className The class name to observe
 * @param callback The callback to run when mutations are detected or false to stop observing
 */
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