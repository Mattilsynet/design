import { QUICK_EVENT, attr, off, on } from '../utils';

const handleBackdropClick = ({ clientX: x, clientY: y, target }: MouseEvent) => {
  if (target instanceof HTMLDialogElement && attr(target, 'data-closedby') === 'any') {
    const { top, right, bottom, left } = target.getBoundingClientRect();
    const isInside = top <= y && y <= bottom && left <= x && x <= right;

    if (!isInside) target.close();
  }
};

export function observe(el: Element) {
  on(el, 'click', handleBackdropClick as EventListener, QUICK_EVENT);
}

export function unobserve(el: Element) {
  off(el, 'click', handleBackdropClick as EventListener, QUICK_EVENT);
}