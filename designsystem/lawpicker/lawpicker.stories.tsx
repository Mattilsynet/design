import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { Field, type FieldComboboxSelected, Flex, toast } from "../react";
import { attr, tag } from "../utils";
import "./lawpicker.css";

// sikre etterlevelse av regelverket for mat https://lovdata.no/forskrift/2020-03-03-704/ARTIKKEL_138 - EU-forordning
// Forskrift om dyrehelse https://lovdata.no/forskrift/2022-04-06-631/ARTIKKEL_1
// Lov om dyrevelferd https://lovdata.no/lov/2009-06-19-97/§30
// Forskrift om drift av akvakulturanlegg https://lovdata.no/forskrift/2008-06-17-822/§6 (både bokstavinndeling OG tallinndeling underordnet en av bokstavene)
// Forskrifter om internasjonal transport av lett bedervelige næringsmidler https://lovdata.no/dokument/SF/forskrift/1980-06-27-9645 (har numberedLegalP)
// https://lovdata.no/forskrift/2020-03-03-704/ARTIKKEL_21 - forskrift (nummererte ledd, der ett av leddene (3. ledd) har et nytt unummerert avsnitt inne i leddet. Man ville vel trolig omtalte det som "Artikkel 21 tredje ledd, andre avsnitt")
// https://lovdata.no/dokument/SF/forskrift/1980-06-27-9645/KAPITTEL_1-1#KAPITTEL_1-1 punkt 5 under punkt 4
// Forskrift om avliving av dyr (Forskrift om avliving av dyr) - mye kluss inkl. .marginIdArticle
// Forskrifter om pelsing av pelsdyr - .listAritcle med flere .legalP + .legalP

// TODO: Ottar: "INSTRUKSER FOR UTARBEIDING OG BRUK AV FØLGEDOKUMENTER" Vinforskriften - hva vil den hete
// TODO: Ottar: "M1 Vedlegg IXa" Vinforskriften - flere språk
// TODO: Ottar: "Kategorier vinprodukter" Vinforskriften - se på path
// TODO: Ottar: "Nr. 1, 3 og 5 i denne artikkel gjelder for slike forsendelser." i "sikre etterlevelse av regelverket for mat" = Ledd + Ledd
// TODO: Ottar: Artikkel 22. i Forskrifter om pelsing av pelsdyr
// TODO: Ottar: defaultP har ikke noe data-absoluteaddress (Forslag: ikke gjøre defaultP valgbar, se "fôranalyseforskriften", Artikkel 1 = underlegg konsekvens)
// TODO: Ottar: Artikkel 108, Gebyrer i vinforskriften - ikke noe "Ledd 1"
// TODO: Ottar: Hva heter "Angivelsene som angår vindyrkingssonen og de behandlinger som er utført, skal gis i tillegg til angivelsene som angår produktbetegnelsen og skal plasseres i samme synsfelt som disse." i vinforskriften?
// TODO: Ottar: "Kilde til omega-3-fettsyrer" i Forskrift om ernærings- og helsepåstander om næringsmidler (defaultP brukt feil)
// TODO: "Henvisninger til artikler, numre og bokstaver i EØS-rettsakter settes opp slik: «artikkel 1 nr. 1 bokstav a» Det skal altså ikke være parenteser eller halvparenteser. Ved henvisninger til tredjenivået, det vil si et avsnitt i et nr. eller en bokstav, brukes «første avsnitt», «andre avsnitt», osv."

const meta = {
	title: "Designsystem/Lovvelger",
	parameters: {
		layout: "padded",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const NAME = "data-mtds-name";
const PATH = "data-mtds-path";
const TYPE = "data-mtds-type";
const UUID = "data-absoluteaddress";
const CHECK = "aria-checked";
const TOAST = "lov-toast";
const text = (el?: Node | null) => el?.textContent?.trim() || "";
const queryUntil = (parent: Element | null, selector: string): Node[] => {
	const nodes = [...(parent?.childNodes || [])];
	const child = parent?.querySelector(`:scope > ${selector}`);
	return nodes.slice(0, child ? nodes.indexOf(child) : undefined);
};

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
				.then((rawHTML) => {
					const parser = new DOMParser();
					const html = rawHTML.replace(/<(\/?)article/g, "<$1div"); // Too many <article> tags for a11y
					const doc = parser.parseFromString(html, "text/html");
					const url = doc.querySelector("base")?.href || "";

					// doc.querySelectorAll("h1").forEach((el) => {
					// 	const sf = el.querySelector('[data-lovdata-url^="SF"]');
					// 	const type = sf ? "Forskrift" : "Lov";
					// 	attr(el, TYPE, type);
					// 	attr(el, NAME, type);
					// 	attr(el, PATH, text(el));
					// });

					doc.querySelectorAll(".numberedLegalP").forEach((el) => {
						el.innerHTML = el.innerHTML.replace(/\d+\./, ""); // Remove number first ledd sentence
						const count = `${attr(el, "data-numerator")}.`;
						const id = tag("span", { class: "data-originalId" }, count);
						const div = tag("div", { class: "legalP", [UUID]: attr(el, UUID) }); // Create "fake" legalP as numberedLegalP always starts with text

						div.append(...queryUntil(el, ":is(ol, ul, div)")); // Move all nodes before list/div to new legalP
						el.prepend(id, div);
						attr(el, TYPE, `Numerert ledd`);
						attr(el, NAME, `Nr. ${count}`);
					});

					doc.querySelectorAll(".listArticle").forEach((el) => {
						const id = el.querySelector(":scope > .data-originalId");
						const item = el.parentElement as Element;
						const list = item.parentElement;
						const name = text(id).replace(/^-$/, ""); // Some .listArticle have .data-originalId...
						const count = [...(list?.children || [])].indexOf(item) + 1; // ...if no .data-originalId, we use index in list
						const type = list ? attr(list, "type")?.toLowerCase() : "";
						const unit =
							(type?.startsWith("a") && "Bokstav") ||
							(type?.startsWith("1") && "Nummer") ||
							(type?.startsWith("i") && "Tall") ||
							"Punkt";

						attr(el, TYPE, "Listepunkt");
						attr(el, NAME, `${unit} ${name || count}`);
					});

					doc.querySelectorAll(".section").forEach((el) => {
						const name = attr(el, "data-name") || "";
						const head = el.querySelector("h2,h3,h4,h5,h6,[role='heading']");
						const path = queryUntil(head, "br").map(text).join(" ");
						const unit =
							(name.startsWith("del") && ["Del", name.slice(3)]) ||
							(name.startsWith("kap") && ["Kapittel", name.slice(3)]) ||
							(name.startsWith("vedlegg") && ["Vedlegg", name.slice(7)]) ||
							[];

						attr(el, TYPE, unit[0] || "Seksjon");
						attr(el, NAME, unit.join(" ") || null);
						attr(el, PATH, name ? null : path);
					});

					doc.querySelectorAll(".legalP").forEach((el) => {
						const items = el.parentNode?.querySelectorAll(":scope > .legalP");
						const count = `${[...(items || [])].indexOf(el) + 1}`; // Must run after .numberedLegalP processing for correct count
						attr(el, TYPE, "Ledd");
						attr(el, NAME, `Avsnitt ${count}`);
					});

					doc.querySelectorAll(".legalArticle").forEach((el) => {
						const id = el.querySelector(".legalArticleValue");
						const name = text(id);
						const type = name.startsWith("§") ? "Paragraf" : "";
						attr(el, TYPE, type || "Artikkel");
						attr(el, NAME, `${type} ${name}`.trim());
					});

					doc.querySelectorAll(".marginIdArticle").forEach((el) => {
						const id = el.querySelector(":scope > .data-marginOriginalId");
						attr(el, TYPE, "Artikkelliste");
						attr(el, NAME, `Nr. ${text(id)}`);
					});

					doc.querySelectorAll(`[${NAME}]`).forEach((el) => {
						el.insertAdjacentHTML(
							"afterbegin",
							`<button type="button" role="checkbox" ${CHECK}="false">${attr(el, NAME)}</button>`,
						);
					});

					// Fix URLs for links and images to be absolute
					doc.querySelectorAll("a").forEach((a) => {
						a.href = `${url}${attr(a, "href")}`;
						a.rel = "noreferrer noopener";
						a.target = "_blank";
					});

					doc.querySelectorAll("img").forEach((img) => {
						img.src = `${url}${attr(img, "src")}`;
					});

					setLovHTML(doc.querySelector("main")?.innerHTML || "");
				});
		}, [key, domain, lovId]);

		const handleClick = (event: React.SyntheticEvent) => {
			if ((event.target as Element)?.nodeName !== "BUTTON") return; // Only accept clicks on mark elements

			const path = event.nativeEvent
				.composedPath()
				.filter((el) => el instanceof Element)
				.filter((el) => el.hasAttribute?.(TYPE))
				.map((el, index) => {
					const btn = el.querySelector(`[${CHECK}]`) as Element;
					let check = `${attr(btn, CHECK) !== "true"}`;
					if (index) {
						const on = el.querySelector(`[${CHECK}="true"]`);
						const off = el.querySelector(`[${CHECK}]:not([${CHECK}="true"])`);
						check = on ? (off ? "mixed" : "true") : "false";
					} else
						el.querySelectorAll(`[${CHECK}]`).forEach((sub) => {
							attr(sub, CHECK, check);
						});

					attr(btn, CHECK, check);

					return {
						name: attr(el, NAME),
						path: attr(el, PATH),
						type: attr(el, TYPE),
						uuid: attr(el, UUID),
						check,
					};
				})
				.reverse();

			const named = path.find(({ name }) => name) || path[0]; // Sections does not have name, so we want to find the first named element
			const slice = path.indexOf(named) - (named?.type === "Ledd" ? 1 : 0); // If a ledd is the first named element, include the parent section for reference

			console.log(path);

			toast(
				path
					.slice(Math.max(0, slice)) // If a section contains a article, start from the article
					.map(({ name, path }) => `${path || name}`.trim())
					.join(" > "),
				{ timeout: false, id: TOAST },
			);
		};

		return (
			<>
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
				<div
					className="lovdata"
					onClickCapture={handleClick}
					dangerouslySetInnerHTML={{ __html: lovHTML }}
				/>
			</>
		);
	},
};
