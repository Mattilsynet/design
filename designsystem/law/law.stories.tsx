import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useMemo, useRef, useState } from "react";
import { fixLawHtml, parseLawIds, setLawChecked } from "../";
import { Flex, Law } from "../react";
import styles from "../styles.module.css";
import { vinforskriften } from "./vinforskriften-new";

// TODO: Søkefunksjon
// TODO: Kommentar/tilbakemeldingsfunksjon
// TODO: Må finnes kommentarfelt med fritekst i alle systemer uansett, for å kunne utbrodere
// ? defaultP eksempel Artikkel 9, Nr. 1, Avsnitt 2, https://lovdata.no/dokument/SF/forskrift/2013-01-13-60/ARTIKKEL_9#ARTIKKEL_9

const meta = {
	title: "Designsystem/Law",
	parameters: {
		layout: "padded",
		showInOverview: false,
	},
	decorators: [
		(Story) => {
			return (
				<Flex
					data-center="2xl"
					data-gap="8"
					data-items="300"
					data-nowrap
					id="flex"
				>
					<style>{`#flex:has([data-variant="view"]) pre strong { display: none }`}</style>
					<Story />
					<pre data-self="300" data-fixed style={SIDEBAR_STYLE}>
						<strong>Valgte:</strong>
						<div id="log"></div>
						{}
					</pre>
				</Flex>
			);
		},
	],
} satisfies Meta;

const CSS_LAW = `.${styles.law.split(" ")[0]}`;
const log = (checked: string[]) => {
	const log = document.getElementById("log") as HTMLElement;
	const html = document.querySelector(CSS_LAW)?.innerHTML || "";
	log.textContent = parseLawIds(checked, html)
		.map(({ label }) => `\n- ${label}`)
		.join("");
};

export default meta;
type Story = StoryObj<typeof meta>;

const SIDEBAR_STYLE: React.CSSProperties = {
	maxHeight: "calc(100vh - 32px)",
	overflow: "auto",
	fontFamily: "monospace",
	whiteSpace: "pre-wrap",
	position: "sticky",
	fontSize: 14,
	top: 16,
};

export const Default: Story = {
	parameters: {
		showInOverview: false,
	},
	render: () => {
		const [checkedIds, setCheckedIds] = useState<string[]>([]);
		const lawElement = useRef<HTMLDivElement>(null);

		// Avoid re-processing on every render:
		const html = useMemo(() => ({ __html: fixLawHtml(vinforskriften) }), []);

		// Sync checked state to Law component:
		useEffect(() => {
			setLawChecked(checkedIds, lawElement.current);
		}, [checkedIds]);

		// Render:
		return (
			<div
				className={styles.law}
				dangerouslySetInnerHTML={html}
				ref={lawElement}
				onClickCapture={(event) => {
					if (event.target instanceof HTMLButtonElement) {
						const id = event.target.value;
						const next = checkedIds.includes(id)
							? checkedIds.filter((cid) => cid !== id)
							: [...checkedIds, id];

						setCheckedIds(next);
						log(next); // Only for demo purposes
					}
				}}
			/>
		);
	},
};

export const React: Story = {
	render: () => {
		const [checkedIds, setCheckedIds] = useState<string[]>([]);
		const lawElement = useRef<HTMLDivElement>(null);

		// Avoid re-processing on every render:
		const html = useMemo(() => ({ __html: fixLawHtml(vinforskriften) }), []);

		// Sync checked state to Law component:
		useEffect(() => {
			setLawChecked(checkedIds, lawElement.current);
		}, [checkedIds]);

		// Render:
		return (
			<Law
				dangerouslySetInnerHTML={html}
				ref={lawElement}
				onClickCapture={(event) => {
					if (event.target instanceof HTMLButtonElement) {
						const id = event.target.value;
						const next = checkedIds.includes(id)
							? checkedIds.filter((cid) => cid !== id)
							: [...checkedIds, id];

						setCheckedIds(next);
						log(next); // Only for demo purposes
					}
				}}
			/>
		);
	},
};

export const VariantView: Story = {
	render: () => {
		// Avoid re-processing on every render:
		const html = useMemo(() => ({ __html: fixLawHtml(vinforskriften) }), []);

		// Render:
		return (
			<div
				data-variant="view"
				className={styles.law}
				dangerouslySetInnerHTML={html}
			/>
		);
	},
};
