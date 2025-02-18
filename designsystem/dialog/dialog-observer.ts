import { QUICK_EVENT, attr, off, on } from '../utils';

const handleClick = ({ clientX: x, clientY: y, target: el }: MouseEvent) => {
  if (el instanceof HTMLDialogElement && attr(el, 'data-closedby') === 'any') {
    const { top, right, bottom, left } = el.getBoundingClientRect();
    const isInside = top <= y && y <= bottom && left <= x && x <= right;
    
    if (!isInside) el.close();
  } else if (el instanceof Element && el.closest('button[data-command="close"]')) {
    el?.closest('dialog')?.close();
  }
};

export function observe(el: Element) {
  on(el, 'click', handleClick as EventListener, QUICK_EVENT);
}

export function unobserve(el: Element) {
  off(el, 'click', handleClick as EventListener, QUICK_EVENT);
}