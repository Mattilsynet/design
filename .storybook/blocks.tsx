import { Story, useOf } from "@storybook/blocks";
import { useEffect, useMemo, useState } from "react";
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
		<menu
			className={styles.grid}
			data-items="250"
			data-gap="0"
			style={{ marginBlock: "2em" }}
		>
			{links.map(({ text, href }) => (
				<li key={href}>
					<a href={href} className={styles.button} data-nowrap>
						<svg aria-hidden="true" viewBox="0 40 256 256">
							<path d="m221.66 181.66-48 48a8 8 0 0 1-11.32-11.32L196.69 184H72a8 8 0 0 1-8-8V32a8 8 0 0 1 16 0v136h116.69l-34.35-34.34a8 8 0 0 1 11.32-11.32l48 48a8 8 0 0 1 0 11.32Z" />
						</svg>
						<span data-nowrap>{text}</span>
					</a>
				</li>
			))}
		</menu>
	);
};

export const getPkgVersion = () =>
	(window as unknown as { VERSION: string }).VERSION;

export const PkgInfo = () => {
	const story = useOf<"story">("story")?.story;
	const github = `https://github.com/Mattilsynet/design/tree/next/designsystem/badge${story?.parameters.fileName.replace(/^\.|[^/]+$/g, "")}`;
	const name = story?.title.split("/").pop();

	return (
		<div className={styles.flex} data-justify="end" hidden>
			<a
				className={styles.button}
				data-size="sm"
				href="https://www.npmjs.com/package/@mattilsynet/design"
			>
				@mattilsynet/design@{getPkgVersion()}
			</a>
			{story?.parameters.figma && (
				<a
					href={story?.parameters.figma}
					target="_blank"
					rel="noreferrer noopener"
					aria-label="Figma"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 38 57"
						aria-hidden="true"
						focusable="false"
					>
						<path
							fill="#1ABCFE"
							d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z"
						/>
						<path
							fill="#0ACF83"
							d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0Z"
						/>
						<path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19Z" />
						<path
							fill="#F24E1E"
							d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z"
						/>
						<path
							fill="#A259FF"
							d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z"
						/>
					</svg>{" "}
					Open in Figma
				</a>
			)}
			<a
				className={styles.button}
				data-size="sm"
				href={github}
				target="_blank"
				rel="noreferrer noopener"
				aria-label="Github"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 98 96"
					aria-hidden="true"
					focusable="false"
				>
					<path
						fill="currentcolor"
						fillRule="evenodd"
						d="M48.85 0C21.84 0 0 22 0 49.22 0 70.97 14 89.39 33.4 95.9c2.43.49 3.32-1.06 3.32-2.37 0-1.14-.08-5.05-.08-9.12-13.59 2.93-16.42-5.87-16.42-5.87-2.18-5.7-5.42-7.17-5.42-7.17-4.45-3.01.33-3.01.33-3.01 4.93.32 7.52 5.05 7.52 5.05 4.37 7.5 11.4 5.38 14.23 4.07.4-3.18 1.7-5.38 3.08-6.6-10.84-1.14-22.25-5.38-22.25-24.28 0-5.38 1.94-9.78 5.02-13.2-.49-1.22-2.19-6.28.48-13.04 0 0 4.13-1.3 13.43 5.05a46.97 46.97 0 0 1 12.21-1.63 47 47 0 0 1 12.22 1.63c9.3-6.35 13.42-5.05 13.42-5.05 2.67 6.76.97 11.82.49 13.04a18.9 18.9 0 0 1 5.01 13.2c0 18.9-11.4 23.06-22.32 24.28 1.78 1.55 3.32 4.48 3.32 9.13 0 6.6-.08 11.9-.08 13.52 0 1.3.89 2.86 3.31 2.37a49.18 49.18 0 0 0 33.4-46.7C97.72 22 75.8 0 48.86 0z"
						clipRule="evenodd"
					/>
				</svg>{" "}
				Open {name} in Github
			</a>
		</div>
	);
};

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
				<table className={styles.table} data-fixed>
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
				</table>
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
			<div
				className={styles.grid}
				data-align="stretch"
				data-gap="md"
				data-items="200"
			>
				{items
					.filter((stories) => {
						return !filter || stories.default?.parameters?.tag === filter;
					})
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
								<div
									className={`${styles.grid} component`}
									key={key + variant + ts}
								>
									<div className={styles.card}>
										<div>
											<Story of={of} />
										</div>
									</div>
									<a href={href}>
										<h2 data-size="md">
											{items.length > 1 && name}
											{items.length > 1 && variants.length > 1 && ": "}
											{variants.length > 1 && variant.replace(/Story$/, "")}
										</h2>
									</a>
								</div>
							);
						});
					})}
			</div>
		</>
	);
};
