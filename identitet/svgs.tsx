declare global {
	interface Window {
		SVGS: string[][];
	}
}

type SvgsProps = {
	path: string;
	reverse?: boolean;
	fill?: string;
} & React.ComponentPropsWithoutRef<"div">;

export const Svgs = ({ path, reverse, fill, ...rest }: SvgsProps) => {
	const files = window.SVGS.filter(([file]) => file.startsWith(path));
	if (reverse) files.reverse();

	return (
		<div className="svgs" {...rest}>
			{files.map(([file, svg]) => {
				const style = fill === "#E2F1DF" ? { color: fill } : undefined;
				const href = fill ? encodeSVG(svg, fill) : file;
				const name = file.split("/").pop();

				return (
					<a key={file} href={href} download={name} style={style}>
						<span dangerouslySetInnerHTML={{ __html: svg }} />
						{name}
					</a>
				);
			})}
			<style>{`
        .svgs { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-block: 2rem }
				.svgs a[style] { background: #054449 }
        .svgs a {
					align-items: center;
					background: color-mix(in hsl, currentcolor 5%, transparent);
					border-radius: 5px;
					display: grid;
					gap: 1em;
					grid-template-rows: 1fr max-content;
					padding: 2rem;
					text-align: center;
				}
        .svgs svg {
					height: auto;
					max-height: 100px;
					width: 100%;
				}
      `}</style>
		</div>
	);
};

const encodeSVG = (data: string, fill = "currentcolor") => {
	const [_, _x, _y, w, h] =
		data.match(/viewBox="(\d+)\s+(\d+)\s+(\d+)\s+(\d+)"/i) || [];

	return `data:image/svg+xml,${data
		.replace(/width="[^"]+"/gi, `width="${w}"`) // Use viewBox for width
		.replace(/height="[^"]+"/gi, `height="${h}"`) // Use viewBox for height
		.replace(/currentColor/gi, fill) // Use color. @default granskog
		.replace(/"/g, `'`)
		.replace(/>\s{1,}</g, "><")
		.replace(/\s{2,}/g, " ")
		.replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent)}`;
};
