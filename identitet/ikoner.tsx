import { icons } from "@phosphor-icons/core";
import * as all from "@phosphor-icons/react";
import { Fragment, useMemo, useState } from "react";
import { Svg2Png } from "svg2png-converter";
import { Card, Field, Flex, Grid, Select } from "../designsystem/react";
import { anchorPosition } from "../designsystem/utils";

type IconsProps = {
	path: string;
	showSearch?: boolean;
	reverse?: boolean;
	mode?: "light" | "dark" | null;
} & React.ComponentPropsWithoutRef<"div">;

const toUpper = (str: string) => str[0].toUpperCase() + str.slice(1);
export const Icons = (rest: IconsProps) => {
	console.log(icons);
	const categories = useMemo(
		() => new Set(icons.flatMap((icon) => icon.categories).map(toUpper)),
		[],
	);
	const [showCategory, setCategory] = useState("");
	const [query, setQuery] = useState("");
	console.log(categories);

	return (
		<Grid data-gap="8">
			<Flex
				data-gap="4"
				style={{
					background:
						"linear-gradient(to top, transparent 0%, var(--mtds-color-surface-default) 75%)",
					paddingTop: "var(--mtds-4)",
					position: "sticky",
					top: 0,
					zIndex: 2,
				}}
			>
				<Field
					aria-label="Søk"
					as="input"
					onChange={({ target }) => setQuery(target.value.trim())}
					placeholder="Search for icon"
					data-tooltip="💡 Søket er på engelsk"
					type="search"
				/>
				<Field data-self="200" data-fixed>
					<Select
						name="category"
						aria-label="Kategori"
						onChange={({ target }) => setCategory(target.value)}
						value={showCategory}
					>
						<option value="">All categories</option>
						{Array.from(categories, (cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</Select>
				</Field>
			</Flex>
			<Grid data-items="100" data-fixed {...rest}>
				{icons.map((icon) => {
					const Tag = all[`${icon.pascal_name}Icon`];
					const show =
						(!showCategory ||
							icon.categories.some((cat) => showCategory === cat)) &&
						(!query ||
							icon.pascal_name.toLowerCase().includes(query) ||
							icon.tags.some((tag) => tag.includes(query)));

					if (!show) return null;

					return (
						<Fragment key={icon.name}>
							<Card
								as="button"
								className="card"
								popoverTarget={`pop-${icon.name}`}
								data-tooltip={`${icon.pascal_name} - Trykk for å kopiere`}
								onClick={copyToImage}
							>
								<Tag />
							</Card>
						</Fragment>
					);
				})}
				<style>{`
				.card svg { width: 100%; height: 30px; display: block }
      `}</style>
			</Grid>
		</Grid>
	);
};

const copyToImage = async (event: React.MouseEvent<HTMLButtonElement>) => {
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
