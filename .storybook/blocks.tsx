import { Story } from "@storybook/blocks";
import { useEffect, useMemo, useState } from "react";
import { Button, Card, Grid, Table } from "../designsystem/react";
import styles from "../designsystem/styles.module.css";
import css from "../designsystem/styles.module.css?inline";

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
		<Grid
			as="menu"
			data-items="250"
			data-gap="0"
			style={{ marginBlock: "2em" }}
		>
			{links.map(({ text, href }) => (
				<li key={href}>
					<Button href={href} data-nowrap>
						<svg aria-hidden="true" viewBox="0 40 256 256">
							<path d="m221.66 181.66-48 48a8 8 0 0 1-11.32-11.32L196.69 184H72a8 8 0 0 1-8-8V32a8 8 0 0 1 16 0v136h116.69l-34.35-34.34a8 8 0 0 1 11.32-11.32l48 48a8 8 0 0 1 0 11.32Z" />
						</svg>
						<span data-nowrap>{text}</span>
					</Button>
				</li>
			))}
		</Grid>
	);
};

export const getPkgVersion = () =>
	(window as unknown as { VERSION: string }).VERSION;

type CssVariablesProps = { component: string; exclude?: string };
export function CssVariables({ component = "", exclude }: CssVariablesProps) {
	const [cssVars, setCssVars] = useState<ReturnType<typeof getCssVars>>({});
	const excludes = exclude?.split(",").map((ex) => ex.trim()) || [];
	useEffect(() => setCssVars(getCssVars(component)), [component]);

	return (
		<>
			<h2
				id="komponenttokens"
				className="sbdocs-h2"
				style={{ marginTop: "2em" }}
			>
				Komponenttokens
			</h2>
			{Object.keys(cssVars).length ? (
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
			) : (
				"Ingen"
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
	const regex = new RegExp(`(?<!var\\\()--(mt)?dsc-${component}-[^;}]+`, "g");
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
			<Grid data-align="stretch" data-items="200">
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
								<Grid className="component" key={key + variant + ts}>
									<Card>
										<div>
											<Story of={of} />
										</div>
									</Card>
									<a href={href}>
										<h2 data-size="md">
											{items.length > 1 && name}
											{items.length > 1 && variants.length > 1 && ": "}
											{variants.length > 1 && variant.replace(/Story$/, "")}
										</h2>
									</a>
								</Grid>
							);
						});
					})}
			</Grid>
		</>
	);
};
