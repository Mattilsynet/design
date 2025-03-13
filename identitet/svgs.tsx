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
	const svgs = window.SVGS.filter((svg) => svg.file.startsWith(path));
	const allCategories = new Set(svgs.flatMap((svg) => svg.categories));
	const [showCategory, setCategory] = useState("");
	const [query, setQuery] = useState("");

	if (reverse) svgs.reverse();

	return (
		<div>
			{showSearch && (
				<div className={styles.grid} data-gap="md">
					<input
						aria-label="Søk"
						className={styles.input}
						onChange={({ target }) => setQuery(target.value.trim())}
						type="search"
					/>
					<fieldset className={styles.fieldset}>
						<legend>Kategori</legend>
						<div className={styles.flex} data-gap="md">
							<div className={styles.field}>
								<input
									checked={!showCategory}
									type="radio"
									className={styles.input}
									onChange={() => setCategory("")}
									name="category"
									value="all"
								/>
								<label>Alle</label>
							</div>
							{Array.from(allCategories, (category) => (
								<div key={category} className={styles.field}>
									<input
										type="radio"
										checked={showCategory === category}
										onChange={() => setCategory(category)}
										className={styles.input}
										name="category"
										value={category}
									/>
									<label>{category}</label>
								</div>
							))}
						</div>
					</fieldset>
				</div>
			)}
			<div className={`svgs ${styles.grid}`} data-items="200" {...rest}>
				{svgs
					.filter(
						(svg) =>
							(!showCategory ||
								svg.categories.some((cat) => showCategory === cat)) &&
							svg.file.includes(query),
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
