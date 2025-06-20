import css from "../design-tokens-build/mattilsynet.css?raw";
import { Card, Table } from "./react";
import { anchorPosition } from "./utils";

const toUpper = (str: string) => str.replace(/\b./g, (m) => m.toUpperCase());
const toUnique = <T,>(arr: T[]): T[] => [...new Set(arr)];

const RADIUS = ["sm", "md", "lg", "full"] as const;
const SIZES = toUnique(
	Array.from(css.matchAll(/--mtds-(\d+)/g), ([, d]) => Number(d)),
);
const COLORS = toUnique(
	Array.from(
		css.matchAll(/--mtds-color-([^-]+)(-[^-:)]+){3}/g), // Match minium 3 variants to avoid dynamic tokens without color name
		([, name]) => name,
	),
);

const GROUPS = [
	["background", [["default"], ["tinted", "Grupper"]]],
	["surface", [["default", "Flater"], ["tinted"], ["hover"], ["active"]]],
	[
		"border",
		[
			["subtle", "Flater og skillelinjer"],
			["default", "F.eks. knapper"],
			["strong", "F.eks. i skjema"],
		],
	],
	[
		"text",
		[
			["subtle", "F.eks store ikon"],
			["default", "Tekst og ikoner"],
		],
	],
	[
		"base",
		[
			["default", "Til f.eks. knapper"],
			["hover"],
			["active"],
			["contrast-subtle", "På base"],
			["contrast-default", "På base"],
		],
	],
] as const;

export const Colors = () => (
	<>
		<style>{`
      .tokens { font-size: 0.875rem }
			.tokens table { min-width: 1140px } /* Prevent squeeze */
      .tokens :is(th, td):has(+ [data-i="0"]) { padding-right: var(--mtds-2) }
      .tokens :is(th, td)[data-i="0"] { padding-left: var(--mtds-2); border-left: 1px solid var(--mtds-color-border-subtle) }
      .tokens thead small { font-weight: normal; display: block }
      .tokens thead tr:first-child { text-align: center }
      .tokens thead th { vertical-align: top }
      .tokens tbody th { vertical-align: middle }
      .tokens tbody td { padding-inline: 1px }
      .tokens button { width: 100%; border-radius: var(--mtds-border-radius-sm) }
      .tokens button::before { display: none }
    `}</style>
		<figure className="tokens">
			<Table data-fixed>
				<thead>
					<tr>
						<th aria-label="Farger" />
						{GROUPS.map(([name, variants]) => (
							<th colSpan={variants.length} key={name}>
								{toUpper(name)}
							</th>
						))}
					</tr>
					<tr>
						<th />
						{GROUPS.flatMap(([name, variants]) =>
							variants.map(([variant, desc], i) => (
								<th key={`${name}-${variant}`} data-i={i}>
									{toUpper(variant)}
									{!!desc && <small>{desc}</small>}
								</th>
							)),
						)}
					</tr>
				</thead>
				<tbody>
					{COLORS.map((color) => (
						<tr key={color}>
							<th>{toUpper(color)}</th>
							{GROUPS.map(([name, variants]) =>
								variants.map(([variant], i) => {
									const token = `var(--mtds-color-${color === "main" ? "" : `${color}-`}${name}-${variant})`;

									return (
										<td key={`${name}-${variant}`} data-i={i}>
											<Card
												as="button"
												type="button"
												data-tooltip={token}
												onClick={({ currentTarget: el }) => {
													const tooltip =
														document.getElementById("mtds-tooltip");
													navigator.clipboard.writeText(token);
													tooltip?.replaceChildren("Kopiert!");
													if (tooltip) anchorPosition(tooltip, el, 0);
												}}
												style={{
													background: `var(--mtds-color-${color}-${name}-${variant})`,
												}}
											/>
										</td>
									);
								}),
							)}
						</tr>
					))}
				</tbody>
			</Table>
		</figure>
	</>
);

export const Sizes = () => (
	<Table data-fixed data-align="center">
		<thead>
			<tr>
				<th>Tall</th>
				<th>CSS</th>
				<th>Tailwind</th>
				<th>PX når md</th>
			</tr>
		</thead>
		<tbody>
			{SIZES.map((size) => (
				<tr key={size}>
					<td>
						<div
							style={{
								background: "var(--mtds-color-surface-tinted)",
								whiteSpace: "nowrap",
								width: `var(--mtds-${size})`,
							}}
						>
							{size}
						</div>
					</td>
					<td>
						<code data-size="sm">{`var(--mtds-${size})`}</code>
					</td>
					<td>
						<code data-size="sm">{`[p|m]-${size}`}</code>
					</td>
					<td>{size * 4}px</td>
				</tr>
			))}
		</tbody>
	</Table>
);

export const Radius = () => (
	<Table data-fixed data-align="center">
		<thead>
			<tr>
				<th style={{ width: "5em" }}>Navn</th>
				<th>CSS</th>
				<th>Tailwind</th>
			</tr>
		</thead>
		<tbody>
			{RADIUS.map((name) => (
				<tr key={name}>
					<td>
						<div
							style={{
								background: "var(--mtds-color-surface-tinted)",
								borderRadius: `var(--mtds-border-radius-${name})`,
								padding: 20,
								textAlign: "center",
							}}
						>
							{name}
						</div>
					</td>
					<td>
						<code data-size="sm">{`var(--mtds-border-radius-${name})`}</code>
					</td>
					<td>
						<code data-size="sm">{`rounded-${name}`}</code>
					</td>
				</tr>
			))}
		</tbody>
	</Table>
);
