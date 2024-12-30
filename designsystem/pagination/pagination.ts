const getSteps = (now: number, max: number, show: number) => {
  const offset = (show - 1) / 2;
  const start = Math.min(Math.max(now - Math.floor(offset), 1), max - show + 1);
  const end = Math.min(Math.max(now + Math.ceil(offset), show), max);
  const pages = Array.from({ length: end + 1 - start }, (_, i) => i + start);

  if (show > 4 && start > 1) pages.splice(0, 2, 1, 0);
  if (show > 3 && end < max) pages.splice(-2, 2, 0, max);
  return pages;
};

export const pagination = ({
  current = 1,
  total = 10,
  show = 7,
}) => ({
  prev: current > 1 ? current - 1 : false,
  next: current < total ? current + 1 : false,
  pages: getSteps(current, total, show).map((page, index) => ({
    current: page === current && 'page' as const,
    key: `key-${page}-${index}`,
    page: `${page || ''}`,
  })),
});
