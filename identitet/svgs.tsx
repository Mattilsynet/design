import { useMemo, useState } from "react";
import { Svg2Png } from "svg2png-converter";
import {
	Card,
	Field,
	Flex,
	Grid,
	type GridProps,
	Select,
} from "../designsystem/react";
import { anchorPosition } from "../designsystem/utils";

declare global {
	interface Window {
		SVGS: {
			categories: string[];
			file: string;
			name: string;
			svg: string;
			tags: string[];
		}[];
	}
}

type SvgsProps = {
	mode?: "light" | "dark" | boolean;
	path: string;
	named?: boolean;
	reverse?: boolean;
	searchable?: boolean | string;
} & GridProps;

export const Svgs = ({
	path,
	reverse,
	mode: _mode = false,
	searchable = false,
	...rest
}: SvgsProps) => {
	const isPhosphor = path.startsWith("@phosphor-icons");
	const [mode, setMode] = useState(_mode === true ? "light" : _mode);
	const svgs = useMemo(
		() => window.SVGS.filter((svg) => svg.file.startsWith(path)),
		[path],
	);
	const categories = useMemo(
		() => new Set(svgs.flatMap((svg) => svg.categories).sort()),
		[svgs],
	);
	const [category, setCategory] = useState("");
	const [query, setQuery] = useState("");

	if (reverse) svgs.reverse();

	return (
		<Grid
			data-gap="8"
			onChange={({ target }) => {
				if (target instanceof HTMLSelectElement)
					setMode(target.value as typeof mode);
			}}
		>
			<style>
				{`.svgs svg { aspect-ratio: 1 / 1; margin: auto; display: block; box-sizing: border-box; padding: 10% 20%; width: 100%; height: auto }
					.svgs-bar { background: linear-gradient(to top, transparent 0%, var(--mtds-color-surface-default) 75%); padding-top: var(--mtds-4); position: sticky; top: 0; z-index: 2; }
					.svgs-bar:empty { display: none }`}
			</style>
			<Flex data-gap="4" className="svgs-bar">
				{!!searchable && (
					<Field
						aria-label="Søk!!"
						as="input"
						data-tooltip={
							typeof searchable === "string" ? searchable : undefined
						}
						onChange={({ target }) => setQuery(target.value.trim())}
						placeholder="Søk"
						type="search"
					/>
				)}
				{_mode === true && (
					<Field data-self="200" data-fixed={!!searchable || undefined}>
						<Select aria-label="Dark modus" name="mode">
							<option value="light">Mørk strek</option>
							<option value="dark">Lys strek</option>
						</Select>
					</Field>
				)}
				{!!searchable && (
					<Field data-self="300" data-fixed>
						<Select
							name="category"
							aria-label="Kategori"
							onChange={({ target }) => setCategory(target.value)}
							value={category}
						>
							<option value="">Alle kategorier</option>
							{Array.from(categories, (cat) => (
								<option key={cat} value={cat}>
									{cat[0].toUpperCase() + cat.slice(1).toLowerCase()}
								</option>
							))}
						</Select>
					</Field>
				)}
			</Flex>
			<Grid className="svgs" data-items="250" data-fixed {...rest}>
				{svgs.map(({ categories, tags, name, svg }) => {
					const show =
						(!category || categories.some((cat) => category === cat)) &&
						(!query ||
							name.toLowerCase().includes(query) ||
							tags.some((tag) => tag.includes(query)));

					if (!show) return null;

					const light = mode === "light" && "#054449";
					const dark = mode === "dark" && "#E2F1DF";
					const html = svg.replace(
						/currentColor/g,
						light || dark || "currentColor",
					);

					return (
						<Card
							dangerouslySetInnerHTML={{ __html: html }}
							data-color-scheme={mode || undefined}
							data-tooltip={`Trykk for å kopiere${isPhosphor ? ` "${name}"` : ""}`}
							download={`${name}${dark ? "-dark" : ""}.svg`}
							href={encodeSVG(html)}
							key={name}
							onClick={copyToImage}
						/>
					);
				})}
			</Grid>
		</Grid>
	);
};

const copyToImage = async (event: React.MouseEvent<HTMLAnchorElement>) => {
	event.preventDefault();
	const card = event.currentTarget;
	const tooltip = document.getElementById("mtds-tooltip");
	const svg = card?.querySelector("svg") as SVGSVGElement;
	svg.style.color = window.getComputedStyle(svg).color; // Make color explicit

	const png = await Svg2Png.toDataURL(svg, {
		scaleX: 10,
		scaleY: 10,
	});

	navigator.clipboard.write([
		new ClipboardItem({
			"text/plain": new Blob([svg.outerHTML], {
				type: "text/plain",
			}),
			"image/png": await fetch(png).then((r) => r.blob()),
		}),
	]);

	tooltip?.replaceChildren("Kopiert!");
	svg.removeAttribute("style"); // Restore
	if (tooltip) anchorPosition(tooltip, card, 0);
};

const encodeSVG = (data: string) =>
	`data:image/svg+xml,${data
		.replace(/"/g, `'`)
		.replace(/>\s{1,}</g, "><")
		.replace(/\s{2,}/g, " ")
		.replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent)}`;
