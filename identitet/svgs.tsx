import { useState } from "react";
import styles from "../designsystem/styles.module.css";
declare global {
	interface Window {
		SVGS: { file: string; categories: string[]; svg: string }[];
	}
}

type SvgsProps = {
	path: string;
	showSearch?: boolean;
	reverse?: boolean;
	fill?: string;
} & React.ComponentPropsWithoutRef<"div">;

export const Svgs = ({
	path,
	reverse,
	fill,
	showSearch = false,
	...rest
}: SvgsProps) => {
	const [search, setSearch] = useState("");
	const svgs = window.SVGS.filter((svg) => svg.file.startsWith(path));
	const allCategories = svgs.reduce((categories: string[], svg) => {
		for (const category of svg.categories) {
			if (!categories.includes(category)) {
				categories.push(category);
			}
		}
		return categories;
	}, []);
	if (reverse) svgs.reverse();

	return (
		<div>
			{showSearch && (
				<>
					<input
						list="illustration-categories"
						className={styles.input}
						type="search"
						onChange={(e) => setSearch(e.target.value)}
					/>
					<datalist id="illustration-categories">
						{allCategories.map((category) => (
							<option key={category} value={category}></option>
						))}
					</datalist>
				</>
			)}
			<div className={`svgs ${styles.grid}`} data-grid="lg" {...rest}>
				{svgs
					.filter(
						(svg) =>
							!showSearch ||
							svg.categories.some((category) => category.includes(search)) ||
							svg.file.includes(search) ||
							!search,
					)
					.map(({ file, svg }) => {
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
        .svgs { margin-block: 2rem }
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
