import type { FieldComboboxSelected } from "@mattilsynet/design/react";
import { Field, Flex } from "@mattilsynet/design/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import "./lawpicker.css";
import { tag } from "../utils";

// sikre etterlevelse av regelverket for mat https://lovdata.no/forskrift/2020-03-03-704/ARTIKKEL_138 - EU-forordning
// Forskrift om dyrehelse https://lovdata.no/forskrift/2022-04-06-631/ARTIKKEL_1
// Lov om dyrevelferd https://lovdata.no/lov/2009-06-19-97/§30
// Forskrift om drift av akvakulturanlegg https://lovdata.no/forskrift/2008-06-17-822/§6 (både bokstavinndeling OG tallinndeling underordnet en av bokstavene)
// Forskrifter om internasjonal transport av lett bedervelige næringsmidler https://lovdata.no/dokument/SF/forskrift/1980-06-27-9645 (har numberedLegalP)
// https://lovdata.no/forskrift/2020-03-03-704/ARTIKKEL_21 - forskrift (nummererte ledd, der ett av leddene (3. ledd) har et nytt unummerert avsnitt inne i leddet. Man ville vel trolig omtalte det som "Artikkel 21 tredje ledd, andre avsnitt")
// https://lovdata.no/dokument/SF/forskrift/1980-06-27-9645/KAPITTEL_1-1#KAPITTEL_1-1 punkt 5 under punkt 4
// Forskrift om avliving av dyr (Forskrift om avliving av dyr) - mye kluss inkl. .marginIdArticle
// Forskrifter om pelsing av pelsdyr - .listAritcle med flere .legalP + .legalP

// TODO Ottar: tall 1 eller i. når romertall?
// TODO Ottar "Nr. 1, 3 og 5 i denne artikkel gjelder for slike forsendelser." i "sikre etterlevelse av regelverket for mat" = Ledd + Ledd
// TODO Ottar: Artikkel 22. i Forskrifter om pelsing av pelsdyr
// TODO: liste defaultP under ledd, selv om de i praksis ikke er der, og "gjett" avsnittsnummer
// TODO: ✅ lag en "scan" som henter _alle_ regelverk og finner _alle_ instanser av klasser som f.eks defaultP

// del II nr. 1 og andre setning i nr. 3, nr. 6, 7 og 8 og den første setningen i nr. 9, = Artikkel 28.1 a.ii. hilsen Øyvind

const FIRST_HEADING = ':is(h1,h2,h3,h4,h5,h6,[role="heading"]):first-child';

const meta = {
	title: "Designsystem/Lovvelger",
	parameters: {
		layout: "padded",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// const IS_FETCHING = false;

const isCheckable = (el: unknown): el is Element =>
	el instanceof Element && el.matches(":has(> input:first-child)");
const hasHeading = (el: unknown): el is Element =>
	el instanceof Element && el.matches(`:has(> ${FIRST_HEADING})`);

export const Default: Story = {
	tags: ["!dev"],
	render: () => {
		const [key, setKey] = useState("");
		const [domain, setDomain] = useState("SF");
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

			// if (!IS_FETCHING) {
			// 	IS_FETCHING = true;
			// 	fetch(`/docs/laws.json`)
			// 		.then((res) => res.json())
			// 		.then((all: Array<{ file: string; title: string; html: string }>) => {
			// 			console.log(all.filter(({ html }) => html.includes("defaultP")));
			// 		});
			// }
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
			const url = new URL(window.top?.location.href || "");
			url.searchParams.set("lovId", lovId);
			url.searchParams.set("domain", domain);
			window.top?.history.replaceState(null, "", url.toString());
			fetch(
				`https://api.lovdata.no/v1/structuredRules/get/${domain}/${lovId}.html`,
				{
					headers: { Accept: "text/html", "X-API-key": key },
				},
			)
				.then((res) => res.text())
				.then((html) => {
					const htmlA11Y = html.replace(/<(\/?)article/g, "<$1div"); // Too many <article> tags for a11y
					const parser = new DOMParser();
					const doc = parser.parseFromString(htmlA11Y, "text/html");
					const base = doc.querySelector("base")?.href || "";

					doc.querySelectorAll("a").forEach((a) => {
						a.target = "_blank";
						a.rel = "noreferrer noopener";
						a.href = `${base}${a.getAttribute("href")}`;
					});

					// doc
					// 	.querySelectorAll(`main > .section:has(> ${FIRST_HEADING})`)
					// 	.forEach((el) => {
					// 		const details = Object.assign(
					// 			document.createElement("u-details"),
					// 			{ className: styles.details, open: true },
					// 		);
					// 		const summary = details.appendChild(
					// 			document.createElement("u-summary"),
					// 		);
					// 		summary.append(el.querySelector(FIRST_HEADING) || "");
					// 		el.replaceWith(details);
					// 		details.append(el);
					// 	});
					// doc.querySelectorAll('main > .legalArticle:has(.legalArticleHeader:first-child)').forEach((el) => {
					//   const details = Object.assign(document.createElement('u-details'), { className: styles.details, open: true });
					//   const summary = details.appendChild(document.createElement('u-summary'));
					//   summary.append(el.querySelector('.legalArticleHeader') || '')
					//   el.replaceWith(details);
					//   details.append(el);
					// })

					// doc
					// 	.querySelectorAll(
					// 		[
					// 			// '.listDefaultP',
					// 			// '.listLegalP',
					// 			".defaultList > li",
					// 			".defaultP",
					// 			".listeitemNummer",
					// 			".numberedLegalP",
					// 			".legalP",
					// 			".legalArticle",
					// 			// ":not(.listArticle) > .legalP", // .listArticle always contains .legalP
					// 			// ":not(u-summary) > .legalArticleHeader",
					// 		].join(","),
					// 	)
					// 	.forEach((el) => {
					// 		el.prepend(
					// 			Object.assign(document.createElement("input"), {
					// 				type: "checkbox",
					// 				className: styles.input,
					// 			}),
					// 		);
					// 	});

					doc
						.querySelectorAll(`
							.defaultP,
							.legalArticle,
							.legalP,
							.marginIdArticle,
							.numberedLegalP
						`)
						.forEach((el) => {
							el.prepend(
								tag("input", { type: "checkbox", class: styles.input }),
							);
						});

					setLovHTML(doc.querySelector("main")?.innerHTML || "");
				});
		}, [key, domain, lovId]);

		const handleChange = (event: React.ChangeEvent<HTMLDivElement>) => {
			const { target: el } = event;

			if (el instanceof HTMLInputElement) {
				// const elements: ((
				// 	el: HTMLElement,
				// ) => false | null | undefined | string)[] = [
				// 	(el) => {
				// 		const li = el.parentElement;
				// 		const name = li?.getAttribute("data-name")?.replace(/\.$/, "");
				// 		const value = li?.getAttribute("value");
				// 		const type = li?.parentElement?.getAttribute("type");
				// 		if (li instanceof HTMLLIElement && name)
				// 			return `${type === "a" ? "Bokstav" : name === "-" ? "Punkt" : "Nummer"} ${name === "-" ? value : name}`;
				// 	},
				// 	// (el) => el.classList.contains('section') && el.querySelector(`:scope > ${FIRST_HEADING}`)?.textContent,
				// 	(el) =>
				// 		el.classList.contains("legalArticle") &&
				// 		el
				// 			.querySelector<HTMLElement>(".legalArticleValue")
				// 			?.innerText.replace(/§\s+/, "§")
				// 			.replace(/\s+/g, " "),
				// 	(el) =>
				// 		(el.classList.contains("legalP") ||
				// 			el.classList.contains("numberedLegalP")) &&
				// 		!(
				// 			el.parentElement?.classList.contains("listArticle") &&
				// 			el.parentElement.querySelectorAll(
				// 				":scope > :is(.legalP,.numberedLegalP)",
				// 			).length === 1
				// 		) && // Unngå ledd paragraf dersom dette er en listArticle med kun et ledd
				// 		`Ledd ${Array.from(el.parentElement?.querySelectorAll(":scope > :is(.legalP,.numberedLegalP)") || []).indexOf(el) + 1}`, // Ledd paragraf
				// 	// (el) =>
				// 	// 	el.classList.contains("defaultP") &&
				// 	// 	!(
				// 	// 		el.parentElement?.classList.contains("listArticle") &&
				// 	// 		el.parentElement.querySelectorAll(":scope > .defaultP").length ===
				// 	// 			1
				// 	// 	) && // Unngå ledd paragraf dersom dette er en listArticle med kun et ledd
				// 	// 	`Avsnitt ${Array.from(el.parentElement?.querySelectorAll(":scope > .defaultP") || []).indexOf(el) + 1}`, // Ledd paragraf

				// 	(el) =>
				// 		el.classList.contains("listArticle") &&
				// 		el.innerText.replace(/\s+/g, " "),
				// 	(el) =>
				// 		el.classList.contains("numberedLegalP") &&
				// 		`Ledd ${el.getAttribute("data-numerator")}`,
				// ];

				// const path = event.nativeEvent
				// 	.composedPath()
				// 	.map(
				// 		(el) =>
				// 			el instanceof HTMLElement &&
				// 			elements.map((fn) => fn(el)).filter(Boolean)[0],
				// 	)
				// 	.filter(Boolean);

				// const ids = ":scope > .data-originalId";
				// Forskrifter om pelsing av pelsdyr.
				const lovdata = event.currentTarget;
				const eventPath = event.nativeEvent.composedPath().reverse();
				const path = eventPath
					.slice(eventPath.indexOf(lovdata))
					.filter((el) => isCheckable(el) || hasHeading(el));

				const text = path.flatMap((el) => {
					if (hasHeading(el))
						return el.querySelector(`:scope > ${FIRST_HEADING}`)?.textContent;

					const parent = (el as Element).parentElement;
					const li = parent?.parentElement;
					const name = li?.getAttribute("data-name");
					const type = li?.parentElement?.getAttribute("type")?.toLowerCase();
					// const id = parent?.querySelector(ids)?.textContent;
					const items = Array.from(parent?.children || []).filter(isCheckable);
					const number = items.indexOf(el) + 1;

					if (name) {
						return [
							`${type === "a" ? "Bokstav" : name === "-" ? "Punkt" : "Nummer"} ${name === "-" ? number : name}`,
						].concat(items.length > 1 ? [`Avsnitt ${number}`] : []);
					}

					return `Ledd ${number}`;
				});

				console.log(text, path);

				// console.log(path.reverse());
			}
		};

		// useEffect(() => {
		// 	console.log(
		// 		document.querySelectorAll(".listArticle:has(.legalP + .legalP)"),
		// 	);
		// });

		return (
			<>
				<Flex data-items="250">
					<div data-fixed>
						<Field
							as="input"
							name="key"
							label="API-nøkkel"
							onKeyDown={({ currentTarget: el, key }) =>
								key === "Enter" && setKey(el.value)
							}
							onBlur={({ currentTarget: el }) => setKey(el.value)}
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
						options={lover}
						selected={lover.filter(({ value }) => value === lovId)}
					/>
				</Flex>
				<div
					className="lovdata"
					onInput={handleChange}
					dangerouslySetInnerHTML={{ __html: lovHTML }}
				/>
			</>
		);
	},
};

/*
<Button data-variant="secondary" onClick={() => setOpen(true)}>
	<PlusIcon />
	Legg til regelverk
</Button> 
<Dialog
	open={open}
	data-closedby="any"
	onClose={() => setOpen(false)}
	style={{
		width: 1400,
		padding: 0,
		height: "90vh",
		maxWidth: "calc(100vw - 2em)",
	}}
>
	<Button
		data-command="close"
		style={{ position: "absolute", right: 20, top: 20, zIndex: 9 }}
	/>
	<Grid
		data-gap="0"
		style={{ height: "100%", gridTemplateColumns: "350px 1fr" }}
	>
		<Group
			data-self="350"
			data-fixed
			style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
		>
			<Heading>Valge bestemmelser</Heading>
		</Group>
		<Card style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}></Card>
		</Grid>
</Dialog> */
