import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useRef, useState } from "react";
import type { FieldComboboxSelected } from "../react";
import { Card, Field, Flex, Grid } from "../react";
import { Law } from "./law";

// TODO: Søkefunksjon
// TODO: Kommentar/tilbakemeldingsfunksjon
// TODO: Må finnes kommentarfelt med fritekst i alle systemer uansett, for å kunne utbrodere
// ? defaultP eksempel Artikkel 9, Nr. 1, Avsnitt 2, https://lovdata.no/dokument/SF/forskrift/2013-01-13-60/ARTIKKEL_9#ARTIKKEL_9

const meta = {
	title: "Designsystem/Lovvelger",
	parameters: {
		layout: "padded",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	tags: ["!dev"],
	render: () => {
		const lawRef = useRef<HTMLDivElement>(null);
		const [key, setKey] = useState("");
		const [domain, setDomain] = useState("SF");
		const [checked, setChecked] = useState([
			{ id: "paragraf-2-ledd-1", label: "§ 2, avsnitt 1" },
		]);
		const [lovHTML, setLovHTML] = useState<string>("");
		const [lover, setLover] = useState<FieldComboboxSelected>([]);
		const [lovId, setLovId] = useState("");

		useEffect(() => {
			const params = new URLSearchParams(window.top?.location.search);
			const key = window.localStorage.getItem("lovdata-api-key") || "";
			document.querySelector('input[name="key"]')?.setAttribute("value", key);
			setDomain(params.get("domain") || "SF");
			setLovId(params.get("lovId") || "");
			setKey(key);
		}, []);

		useEffect(() => {
			if (!key) return;
			window.localStorage.setItem("lovdata-api-key", key);
			fetch(`https://api.lovdata.no/v1/structuredRules/list/${domain}`, {
				headers: { Accept: "application/json", "X-API-key": key },
			})
				.then((res) => res.json())
				.then(({ documents }) => {
					const lover = documents.map((lov: Record<string, string>) => ({
						label: `${lov.title} (${lov.shortTitle})`,
						value: lov.filenameHTML.replace(/\.html$/, ""),
					}));
					setLover(lover);
				});
		}, [key, domain]);

		useEffect(() => {
			if (!key || !lovId) return;
			const src = `https://api.lovdata.no/v1/structuredRules/get/${domain}/${lovId}.html`;
			const url = new URL(window.top?.location.href || "");
			url.searchParams.set("lovId", lovId);
			url.searchParams.set("domain", domain);
			window.top?.history.pushState(null, "", url.toString());

			fetch(src, {
				headers: { Accept: "text/html", "X-API-key": key },
			})
				.then((res) => res.text())
				.then(setLovHTML);
		}, [key, domain, lovId]);

		return (
			<Grid data-center="xl">
				<Flex data-items="250">
					<div data-fixed>
						<Field
							as="input"
							name="key"
							label="API-nøkkel"
							onBlur={({ currentTarget: { value } }) => setKey(value)}
							onKeyDown={({ currentTarget: { value }, key }) =>
								key === "Enter" && setKey(value)
							}
						/>
					</div>
					<div data-fixed>
						<Field
							as="select"
							label="Domene"
							value={domain}
							onChange={({ target }) => setDomain(target.value)}
							options={[
								{ value: "SF", label: "Stortingsforordning" },
								{ value: "NL", label: "Norsk Lov" },
							]}
						/>
					</div>
					<Field
						as={Field.Combobox}
						label="Lovverk"
						onSelectedChange={([{ value }]) => setLovId(value)}
						selected={lover.filter(({ value }) => value === lovId)}
						options={lover}
					/>
				</Flex>
				<Flex data-align="start" data-nowrap>
					<Law
						checked={checked.map((unit) => unit.id)}
						data-self="500"
						html={lovHTML}
						onCheckedChange={(checked) => setChecked(checked)}
						ref={lawRef}
					/>
					<Card
						data-color="inverted"
						as="pre"
						data-self="350"
						data-fixed
						style={{
							maxHeight: "calc(100vh - 32px)",
							overflow: "auto",
							fontFamily: "monospace",
							whiteSpace: "pre-wrap",
							position: "sticky",
							fontSize: 14,
							top: 16,
						}}
					>
						<strong>Valgte:</strong>
						<ul>
							{checked.map(({ label }) => (
								<li
									key={label}
									// onClickCapture={() => lawRef.current?.scrollToId(id)}
								>
									{label}
								</li>
							))}
						</ul>
					</Card>
				</Flex>
			</Grid>
		);
	},
};
