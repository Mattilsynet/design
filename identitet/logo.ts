export const encodeSVG = (data: string, color = '#054449') => {
  const [_, _x, _y, w, h] = data.match(/viewBox="(\d+)\s+(\d+)\s+(\d+)\s+(\d+)"/i) || [];

  return `data:image/svg+xml,${data
    .replace(/width="[^"]+"/gi, `width="${w}"`) // Use viewBox for width
    .replace(/height="[^"]+"/gi, `height="${h}"`) // Use viewBox for height
    .replace(/currentColor/gi, color) // Use color. @default granskog
    .replace(/"/g, `'`)
    .replace(/>\s{1,}</g, '><')
    .replace(/\s{2,}/g,' ')
    .replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent)}`;
}