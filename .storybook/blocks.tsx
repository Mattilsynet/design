import {
	ArrowDownIcon,
	ArrowSquareOutIcon,
	ThumbsDownIcon,
	ThumbsUpIcon,
} from "@phosphor-icons/react";
import { Story } from "@storybook/addon-docs/blocks";
import { useEffect, useMemo, useState } from "react";
import {
	Button,
	Card,
	Field,
	Flex,
	type FlexProps,
	Grid,
	type GridProps,
	Heading,
	Select,
	Table,
	Tag,
} from "../designsystem/react";
import styles from "../designsystem/styles.module.css";
import css from "../designsystem/styles.module.css?inline";

type WideProps = React.ComponentPropsWithoutRef<"div">;
export const Wide = ({ style, ...rest }: WideProps) => {
	const css = { ...style, margin: "3rem calc(50% - min(900px, 50vw) + 4em)" };
	return <div style={css} {...rest} />;
};

// Jump to navigation
export const JumpTo = () => {
	const [links, setLinks] = useState<{ text: string; href: string }[]>([]);

	useEffect(() => {
		setLinks(
			Array.from(document.querySelectorAll("h2"), (h2) => ({
				text: h2.textContent || "",
				href: `#${h2.id}`,
			})),
		);
	}, []);

	return (
		<menu style={{ listStyle: "none", columns: "13em", marginBlock: "2em" }}>
			{links.map(({ text, href }) => (
				<li key={href}>
					<Button href={href} data-nowrap>
						<ArrowDownIcon />
						<span data-nowrap>{text}</span>
					</Button>
				</li>
			))}
		</menu>
	);
};

export const DoAndDont = (props: FlexProps) => <Flex data-gap="4" {...props} />;

export const Example = ({
	"data-color": color = "success",
	aspect: aspectRatio = "19/6",
	children,
	zoom = "100%",
	text = "",
}: {
	"data-color"?: "success" | "danger";
	aspect?: string;
	children: React.ReactNode;
	text: string;
	zoom?: string;
}) => {
	const scale = parseInt(zoom, 10) / 100;
	const width = `${100 / scale}%`;

	return (
		<div className="sbdocs-example">
			<div style={{ aspectRatio, scale, width }}>{children}</div>
			<p data-color={color}>
				{color === "danger" ? <ThumbsDownIcon /> : <ThumbsUpIcon />} {text}
			</p>
		</div>
	);
};

export const getPkgVersion = () =>
	(window as unknown as { VERSION: string }).VERSION;

type CssVariablesProps = { component: string; exclude?: string };
export function CssVariables({ component = "", exclude }: CssVariablesProps) {
	const [cssVars, setCssVars] = useState<ReturnType<typeof getCssVars>>({});
	const excludes = exclude?.split(",").map((ex) => ex.trim()) || [];
	const hasTokens = !!Object.keys(cssVars).length;
	useEffect(() => setCssVars(getCssVars(component)), [component]);

	return (
		<>
			<Heading data-size="lg" id="styling">
				Styling
			</Heading>
			<p>
				Alle{" "}
				<small>
					<code>@mattilsynet/design</code>
				</small>
				-komponenter kan kombineres med egen-laget styling, f.eks:{" "}
				<small>
					<code>{`.my-${component} { color: red }`}</code>
				</small>
				.{" "}
				{hasTokens && (
					<>
						Noen støtter også egne{" "}
						<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties">
							CSS custom properties
						</a>
						, som gjør justeringer enda enklere;{" "}
						<small>
							<code>{`.my-${component} { --mtdsc-${component}-TOKEN: VERDI; }`}</code>
						</small>
						.<br />
						Komponenten <strong>{component}</strong> støtter følende:
					</>
				)}
			</p>
			{hasTokens && (
				<Table data-fixed>
					<thead>
						<tr>
							<th>Name</th>
							<th>Value</th>
						</tr>
					</thead>
					<tbody>
						{Object.entries(cssVars).map(
							([name, { val }]) =>
								!excludes.some((exclude) => name.includes(exclude)) && (
									<tr key={name}>
										<td>{name}</td>
										<td>{val}</td>
									</tr>
								),
						)}
					</tbody>
				</Table>
			)}
		</>
	);
}

/* get variables and its value from css file */
function getCssVars(component: string) {
	// temporarily remove inline strings, as they may contain ; and } characters
	// and thus ruin the matching for property declarations
	const res: Record<string, { val: string; mtds: boolean }> = {};
	const clean = css.replace(/"[^"]*"/g, encodeURIComponent);
	const regex = new RegExp(`(?<!var\\()--(mt)?dsc-${component}-[^;}]+`, "g");
	const mtdsIndex = clean.indexOf("@layer mt.");

	// Choose the earliest declaration of the property.
	// We assume later declarations are part of a sub-selector.
	// Return the original inline string from the value, if it was removed earlier
	for (const delc of clean.matchAll(regex)) {
		const [key, val] = delc[0].split(":");
		const isMTDS = delc.index > mtdsIndex; // Is a token set by us a not Designsystemet
		const isDSC = styles[component]?.includes(" "); // Is composed by from Designsystemet

		if (isMTDS ? !res[key]?.mtds : isDSC && !res[key])
			res[key] = { val: decodeURIComponent(val), mtds: isMTDS };
	}

	return res;
}

type OverviewProps = {
	fullWidth?: boolean;
	showAll?: boolean;
	scale?: number | string;
	items: Record<
		string,
		{
			title: string;
			parameters: { tag?: string; showInOverview: boolean };
		}
	>[];
};

export const Overview = ({
	items,
	scale = 0.5,
	showAll = false,
}: OverviewProps) => {
	const [filter, setFilter] = useState("");
	const ts = Date.now(); // Used to create keys to run CSS animations
	const baseUrl = window.top?.location.href.replace(/-[^-]+--[^-]+$/, ""); // -page--about from url
	const filters = useMemo(() => {
		const tags = items.map((stories) => stories.default?.parameters?.tag || "");
		return Array.from(new Set(tags)).filter(Boolean).sort();
	}, [items]);

	return (
		<>
			<style>{`
        .component { animation: component backwards .5s; position: relative; transition: scale .2s }
        .component:nth-of-type(n+2) { animation-delay: 75ms }
        .component:nth-of-type(n+4) { animation-delay: 125ms }
        .component > div { padding: 0; aspect-ratio: 4 / 3; overflow: hidden; display: flex; align-items: center; justify-content: center }
        .component > div > div { transform: scale(${scale}) }
				.component > a::before { content: ''; position: absolute; inset: 0; z-index: 2 }
				.component:hover > div { border-color: var(--mtds-color-border-default) }
				.component:active { scale: .95 }
        @keyframes component { from { opacity: 0; transform: translateY(1rem) } }
      `}</style>
			{!!filters.length && (
				<>
					<button type="button" value="">
						All
					</button>
					{filters.map((tag) => (
						<button
							type="button"
							onClick={() => setFilter(tag)}
							value={tag}
							key={tag}
						>
							{tag[0].toUpperCase()}
							{tag.slice(1)}
						</button>
					))}
					<br />
					<br />
				</>
			)}
			<Grid data-align="stretch" data-items="200" data-gap="10">
				{items
					.filter((s) => !filter || s.default?.parameters?.tag === filter)
					.map((stories, key) => {
						const name = stories.default.title.split("/").pop() || "";
						const file = name.toLowerCase().replace(/[^a-z]+/g, "-"); // Convert to safe url like storybook does
						const exports = (stories.__namedExportsOrder ||
							Object.keys(stories)) as unknown as string[];
						const variants = exports.filter(
							(key) =>
								key === "Default" ||
								(showAll && key !== "default" && !key.startsWith("__")) ||
								stories[key as keyof typeof stories]?.parameters
									?.showInOverview,
						);

						return variants.map((variant) => {
							const of = stories[variant as keyof typeof stories];
							const variantPath = variant
								.replace(/([a-z])([A-Z])/g, "$1-$2")
								.toLowerCase(); // Split on camelcase and hyphenate
							const href = `${baseUrl}-${file}--${variant === "Default" ? "docs" : variantPath}`;

							return (
								<Grid
									className="component"
									data-gap="2"
									key={key + variant + ts}
								>
									<Card>
										<div>
											<Story of={of} />
										</div>
									</Card>
									<Grid as="a" href={href}>
										<h2 data-size="md">
											{items.length > 1 && name}
											{items.length > 1 && variants.length > 1 && ": "}
											{variants.length > 1 && variant.replace(/Story$/, "")}
										</h2>
									</Grid>
								</Grid>
							);
						});
					})}
			</Grid>
		</>
	);
};

declare global {
	interface Window {
		GRAPHICS: Record<
			string,
			{
				categories: string[];
				name: string;
				svg: string | false;
				tags: string[];
				label?: string;
			}
		>;
	}
}

type GraphicsProps = {
	children?: React.ReactNode;
	mode?: "light" | "dark" | boolean;
	path: string;
	named?: boolean;
	reverse?: boolean;
	searchable?: boolean | string;
} & GridProps;

export const Graphics = ({
	path,
	reverse,
	children,
	mode: _mode = false,
	searchable = false,
	...rest
}: GraphicsProps) => {
	const [mode, setMode] = useState(_mode === true ? "light" : _mode);
	const isPhosphor = path.startsWith("@phosphor-icons");
	const graphics = useMemo(() => {
		return Object.entries(window.GRAPHICS)
			.filter(([file]) => file.startsWith(path))
			.map(([file, data]) => ({
				file,
				href: data.svg ? encodeSVG(data.svg) : `/${file}`,
				...data,
			}))
			.sort((a, b) => a.name.localeCompare(b.name));
	}, [path]);
	const categories = useMemo(() => {
		return new Set(
			graphics
				.flatMap(({ categories }) => categories)
				.filter(Boolean)
				.sort(),
		);
	}, [graphics]);
	const [category, setCategory] = useState("");
	const [query, setQuery] = useState("");

	if (reverse) graphics.reverse();

	return (
		<Grid
			data-gap="8"
			onChange={({ target }) => {
				if (target instanceof HTMLSelectElement)
					setMode(target.value as typeof mode);
			}}
		>
			<style>
				{`
					.graphics mark { position: absolute }
					.graphics svg { aspect-ratio: 1 / 1; margin: auto; display: block; box-sizing: border-box; padding: 10% 20%; width: 100%; height: auto }
					.graphics img { aspect-ratio: 12 / 8; display: block; min-width: calc(100% + 1em); object-fit: cover; margin: -.5em }
					.graphics-bar { background: linear-gradient(to top, transparent 0%, var(--mtds-color-surface-default) 75%); padding-top: var(--mtds-4); position: sticky; top: 0; z-index: 2; }
					.graphics-bar:empty { display: none }`}
			</style>
			<Flex data-gap="4" className="graphics-bar">
				{!!searchable && (
					<Field
						aria-label="Søk"
						as="input"
						data-tooltip={
							typeof searchable === "string" ? searchable : undefined
						}
						onInput={({ currentTarget: el }) => setQuery(el.value.trim())}
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
				{children}
			</Flex>
			<Grid className="graphics" data-items="250" data-fixed {...rest}>
				{graphics.map(({ file, categories, tags, name, svg, label, href }) => {
					const show =
						(!category || categories.some((cat) => category === cat)) &&
						(!query ||
							name.toLowerCase().includes(query) ||
							tags.some((tag) => tag.includes(query)));

					if (!show) return null;

					return (
						<Card
							data-color-scheme={mode || undefined}
							data-tooltip={`Trykk for å kopiere${isPhosphor ? ` "${name}"` : ""}`}
							download={name.replace(".", mode === "dark" ? "-dark." : ".")}
							href={href}
							key={name}
							onClick={copyToImage}
						>
							{label && (
								<Tag as="mark" data-color="info" data-size="sm">
									{label}
								</Tag>
							)}
							{svg ? (
								<span dangerouslySetInnerHTML={{ __html: svg }} />
							) : (
								<img src={`/${file}`} alt={name} />
							)}
						</Card>
					);
				})}
			</Grid>
		</Grid>
	);
};

let CANVAS: HTMLCanvasElement;
const copyToImage = async (event: React.MouseEvent<HTMLAnchorElement>) => {
	event.preventDefault();
	const tooltip = document.getElementById("mtds-tooltip");
	const card = event.currentTarget;
	const img = card.querySelector("svg,img") as SVGSVGElement | HTMLImageElement;
	const svg = img instanceof SVGSVGElement;

	if (!CANVAS)
		CANVAS = document.body.appendChild(
			Object.assign(document.createElement("canvas"), { hidden: true }),
		);

	const w = svg ? img.viewBox.baseVal.width : img.naturalWidth;
	const h = svg ? img.viewBox.baseVal.height : img.naturalHeight;
	const ratio = svg ? 900 / Math.max(w, h) : 1;

	CANVAS.width = Math.round(w * ratio);
	CANVAS.height = Math.round(h * ratio);

	const ctx = CANVAS.getContext("2d");
	const loaded = await new Promise<HTMLImageElement>((resolve) => {
		const hex = encodeURIComponent(window.getComputedStyle(img).color);
		const tmp = new Image();
		tmp.onload = () => resolve(tmp);
		tmp.src = card.href.replace(/currentColor/g, hex); // Make color explicit
	});

	ctx?.drawImage(loaded, 0, 0, CANVAS.width, CANVAS.height);

	navigator.clipboard.write([
		new ClipboardItem({
			"image/png": await fetch(CANVAS.toDataURL("image/png")).then((r) =>
				r.blob(),
			),
			"text/plain": svg
				? new Blob([img.outerHTML], { type: "text/plain" })
				: card.href,
		}),
	]);

	tooltip?.replaceChildren("Kopiert!");
};

const encodeSVG = (data: string) =>
	`data:image/svg+xml,${data
		.replace(/"/g, `'`)
		.replace(/>\s{1,}</g, "><")
		.replace(/\s{2,}/g, " ")
		.replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent)}`;
