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
	mode?: "light" | "dark";
} & React.ComponentPropsWithoutRef<"div">;

export const Svgs = ({
	path,
	reverse,
	mode = "light",
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
						const href = mode === "dark" ? encodeSVG(svg, mode) : file;
						const name = file
							.split("/")
							.pop()
							?.replace(/\.[^.]+$/, `${mode === "dark" ? "-dark" : ""}$&`);

						return (
							<a
								data-color-scheme={mode === "dark" ? "dark" : undefined}
								className={styles.card}
								key={file}
								href={href}
								download={name}
							>
								<span
									data-color="main"
									dangerouslySetInnerHTML={{ __html: svg }}
								/>
								{name}
							</a>
						);
					})}
				<style>{`
        .svgs { margin-block: 2rem }
				.svgs a[data-mode="dark"] { color: var(--ds-color-text-subtle) }
        .svgs a { display: grid; align-items: center; grid-template-rows: 1fr max-content; gap: 1em; text-align: center }
        .svgs svg { height: auto; max-height: 100px; width: 100% }
      `}</style>
			</div>
		</div>
	);
};

const encodeSVG = (data: string, mode = "light") => {
	const [_, _x, _y, w, h] =
		data.match(/viewBox="(\d+)\s+(\d+)\s+(\d+)\s+(\d+)"/i) || [];

	return `data:image/svg+xml,${data
		.replace(/width="[^"]+"/gi, `width="${w}"`) // Use viewBox for width
		.replace(/height="[^"]+"/gi, `height="${h}"`) // Use viewBox for height
		.replace(/currentColor/gi, mode === "light" ? "#054449" : "#E2F1DF") // Use color. @default granskog
		.replace(/"/g, `'`)
		.replace(/>\s{1,}</g, "><")
		.replace(/\s{2,}/g, " ")
		.replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent)}`;
};
