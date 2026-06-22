import {
	DownloadSimpleIcon,
	HeartIcon,
	PaperPlaneRightIcon,
	WarningIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";
import inspektor from "../../profilering/arbeidstoy/inspektor.png";
import {
	Card,
	Field,
	Flex,
	Grid,
	Heading,
	Info,
	Ingress,
	Input,
	Muted,
	Tag,
} from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Typography",
	decorators: [
		(Story) => (
			<div className={styles.grid}>
				<Story />
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<>
			<p>Text default</p>
			<p>
				<small>Text muted</small>
			</p>
			<p>
				<span className={styles.ingress}>Text ingress</span>
			</p>
		</>
	),
};

export const IngressStory: Story = {
	name: "Ingress",
	parameters: { showInOverview: true },
	render: () => <span className={styles.ingress}>Text ingress</span>,
};

export const MutedStory: Story = {
	name: "Muted",
	parameters: { showInOverview: true },
	render: () => <small>Text muted</small>,
};

export const HeadingStory: Story = {
	name: "Heading",
	parameters: { showInOverview: true },
	render: () => (
		<>
			{/**
			 * Du kan bruke <h1>, <h2>, <h3>, <h4>, <h5>, <h6> og andre HTML-elementer
			 * <h2> er kun brukt til demo
			 */}
			<h2 className={styles.heading} data-size="2xl">
				Heading data-size="2xl"
			</h2>
			<h2 className={styles.heading} data-size="xl">
				Heading data-size="xl"
			</h2>
			<h2 className={styles.heading} data-size="lg">
				Heading data-size="lg"
			</h2>
			<h2 className={styles.heading} data-size="md">
				Heading data-size="md"
			</h2>
			<h2 className={styles.heading} data-size="sm">
				Heading data-size="sm"
			</h2>
			<h2 className={styles.heading} data-size="xs">
				Heading data-size="xs"
			</h2>
			<h2 className={styles.heading} data-size="2xs">
				Heading data-size="2xs"
			</h2>
			<h2 className={styles.heading} data-justify="center">
				Heading data-justify="center"
			</h2>
			<h2 className={styles.heading}>
				<HeartIcon /> Heading with icon
			</h2>
		</>
	),
};

export const React: Story = {
	render: () => (
		<>
			{/**
			 * Du kan bruke as="h1", as="h2", as="h3", as="h4", as="h5", as="h6".
			 */}
			<Heading data-size="2xl">Heading data-size="2xl"</Heading>
			<Heading data-size="xl">Heading data-size="xl"</Heading>
			<Heading data-size="lg">Heading data-size="lg"</Heading>
			<Heading data-size="md">Heading data-size="md"</Heading>
			<Heading data-size="sm">Heading data-size="sm"</Heading>
			<Heading data-size="xs">Heading data-size="xs"</Heading>
			<Heading data-size="2xs">Heading data-size="2xs"</Heading>
			<p>Text default</p>
			<p>
				<Muted>Muted</Muted>
			</p>
			<p>
				<Ingress>Ingress</Ingress>
			</p>
		</>
	),
};

const CSS_PROSE = styles.prose.split(" ")[0];
const proseDecorator: Story["decorators"] = (Story) => {
	useEffect(() => {
		const prose = document.querySelector<HTMLElement>(`.${CSS_PROSE}`);

		function draw() {
			if (!prose) return;
			const { offsetWidth: proseW } = prose;

			// Calculate the height of 1 unit
			prose.style.height = "var(--mtds-10)";
			const mtds1 = prose.getBoundingClientRect().height / 10;
			prose.removeAttribute("style");

			const getInt = (el: Element | null | undefined, prop: string) =>
				el
					? Number.parseInt(getComputedStyle(el).getPropertyValue(prop), 10)
					: 0;

			Array.from(prose.children).forEach((self, index) => {
				const selfStyle = getComputedStyle(self);
				const prev = getInt(prose.children[index - 1], "margin-bottom");
				const next = getInt(prose.children[index + 1], "margin-top");
				const before = Number.parseInt(selfStyle.marginTop, 10);
				const after = Number.parseInt(selfStyle.marginBottom, 10);
				const style = (self as HTMLElement).style;
				const font = getInt(self, "font-size");

				style.setProperty("--after", `${after}px`);
				style.setProperty("--before", `${before}px`);
				style.setProperty("--width", `${proseW}px`);

				if (before && before >= prev)
					self.setAttribute(
						"data-before",
						`${font === before ? "1 line height" : `${Math.round(before / mtds1)} size token`} (${before}px)`,
					);
				if (after && after > next)
					self.setAttribute(
						"data-after",
						`${font === after ? "1 line" : `${Math.round(after / mtds1)} size token`} (${after}px)`,
					);
			});
		}

		setTimeout(draw, 0); // Let sizing happen before drawing
		window.addEventListener("resize", draw);
		return () => window.removeEventListener("resize", draw);
	});

	return (
		<div className={styles.body} style={{ paddingBlock: "5vw" }}>
			<Grid data-center="md">
				<style>{`
				  body:has(input[role="switch"]:checked) { --checked: "" }
					body:has(input[role="switch"]:checked) .${CSS_PROSE} > :hover { --background: #88bbff4d }
					body:not(:has(.sbdocs-content)) {
						.${CSS_PROSE} { overflow: clip }
						.${CSS_PROSE} > * {
							position: relative;
							background: var(--background, transparent);
							box-shadow: 100px 0 var(--background, transparent), -100px 0 var(--background, transparent);
						}
						.${CSS_PROSE} > [data-before]::before,
						.${CSS_PROSE} > [data-after]::after {
							align-items: center;
							background: linear-gradient(to top, var(--background, rgba(255, 165, 0, .3)), var(--background, rgba(255, 165, 0, .3)));
							border-radius: 0 0 var(--ds-border-radius-lg) var(--ds-border-radius-lg);
							box-sizing: border-box;
							color: var(--mtds-color-text-default);
							content: attr(data-after);
							display: flex;
							font: bold .75rem monospace;
							height: var(--after);
							inset: 100% 0 auto;
							opacity: var(--checked,  0);
							padding-inline: var(--ds-size-4);
							position: absolute;
							width: var(--width);
						}
						.${CSS_PROSE} > [data-before]::before {
							background: linear-gradient(to bottom, var(--background, rgba(255, 165, 0, .3)), var(--background, rgba(255, 165, 0, .3)));
							content: attr(data-before);
							height: var(--before);
							inset: auto 0 100%;
							border-radius: var(--ds-border-radius-lg) var(--ds-border-radius-lg) 0 0;
						}
						.${CSS_PROSE} > [class*="heading"][data-before]::before {
							content: attr(data-before) " due to heading size \\"" attr(data-size) "\\"";
						}
						.${CSS_PROSE} > :hover::before,
						.${CSS_PROSE} > :hover::after {
							background: #8bf
						}
					}
				`}</style>
				<Field>
					<Field.Label>Vis avstander</Field.Label>
					<Input type="checkbox" role="switch" />
				</Field>
				<Story />
			</Grid>
		</div>
	);
};

export const Prose: Story = {
	name: "Prose",
	decorators: proseDecorator,
	parameters: {
		layout: "fullscreen",
		showInOverview: true,
	},
	render: () => (
		<div className={styles.prose}>
			<h1 className={styles.heading} data-size="xl">
				Her søker du om helsesertifikat for sjømat til Australia
			</h1>
			<p>
				<span className={styles.ingress}>
					Se hvilken løsning du skal bruke når du søker, hva sertifikatet koster
					og når sertifikatkontoret holder åpent.
				</span>
			</p>
			<p>
				<small>Publisert 14.01.2025</small>
			</p>
			<h2 className={styles.heading} data-size="xs">
				Innhold på denne siden
			</h2>
			<ol>
				<li>Sertifikater i skjematjenesten</li>
				<li>
					Sertifikater som ikke ligger i eksportløsningen eller skjematjenesten
				</li>
				<li>Dette koster sertifikatet</li>
				<li>Åpningstider for utstedelse av helsesertifikater</li>
			</ol>
			<h2 className={styles.heading} data-size="md">
				Sertifikater i skjematjenesten
			</h2>
			<p>
				Hvis du skal søke om helsesertifikat for eksport av sjømat til Australia
				må du logge inn og fylle ut en søknad i Mattilsynets skjematjeneste.
			</p>
			<p>Logg inn her:</p>
			<p>
				<button
					type="button"
					className={styles.button}
					data-variant="primary"
					data-arrow
				>
					Mattilsynets skjematjeneste
				</button>
			</p>
			<p>
				Noen av sertifikatene har også krav om forhåndsmelding, fordi det
				eksisterer noen fiskehelsekrav. Du søker også om forhåndsmelding i
				Mattilsynets skjematjeneste. Det eksisterer en tilhørende egenerklæring,
				som er en utfyllbar PDF. Denne egenerklæringen blir grunnlaget for
				behandlingen av søknaden. Det skal lages en ny egenerklæring for hver ny
				forhåndsmelding. Egenerklæringen lastes ned, fylles ut, signeres av hver
				enkelt virksomhet hvor varene produseres og lastes opp sammen med
				forhåndsmeldingen.
			</p>
			<div>
				<span className={styles.tag} data-color="info" data-size="sm">
					Alle feltene må fylles ut
				</span>
			</div>
			<h2 className={styles.heading} data-size="sm">
				Transportør
			</h2>
			<div className={styles.grid} data-gap="9">
				<ds-field className={styles.field}>
					<label>Ledetekst</label>
					<p data-field="desciption">Beskrivelse</p>
					<input type="text" className={styles.input} required />
				</ds-field>
				<ds-field className={styles.field}>
					<label>Ledetekst</label>
					<p data-field="desciption">Beskrivelse</p>
					<input type="text" className={styles.input} required />
				</ds-field>
			</div>
			<h2 className={styles.heading} data-size="md">
				Mottaker
			</h2>
			<div className={styles.grid} data-gap="9">
				<ds-field className={styles.field}>
					<label>Beskriv bekymringen din</label>
					<p data-field="desciption">
						Skriv gjerne hva som har skjedd, hvor det skjedde, grunnen til
						problemet og hvorfor du mener at dyrene ikke har det bra.
					</p>
					<textarea className={styles.input} required />
				</ds-field>
				<ds-field className={styles.field}>
					<label>Antall dyr</label>
					<input type="text" className={styles.input} />
				</ds-field>
			</div>
			<h2 className={styles.heading} data-size="lg">
				Helsesertifikat for sjømat
			</h2>
			<div className={styles.grid} data-gap="9">
				<ds-field className={styles.field}>
					<label>Velg dyr</label>
					<input type="text" className={styles.input} required />
				</ds-field>
				<fieldset className={styles.fieldset}>
					<legend>Hovedårsak til bekymring</legend>
					<p data-field="desciption">Fellesbeskrivelse</p>
					<ds-field className={styles.field}>
						<input
							type="radio"
							className={styles.input}
							name="my-radio"
							required
							defaultChecked
						/>
						<label>Alternativ 1</label>
						<p data-field="desciption">Beskrivelse</p>
					</ds-field>
					<ds-field className={styles.field}>
						<input
							type="radio"
							className={styles.input}
							name="my-radio"
							required
						/>
						<label>Alternativ 2</label>
						<p data-field="desciption">Beskrivelse</p>
					</ds-field>
				</fieldset>
			</div>
			<h2 className={styles.heading} data-size="md">
				Litt informasjon
			</h2>
			<table className={styles.table} aria-label="Example table" data-border>
				<thead>
					<tr>
						<th>First name</th>
						<th>Last name</th>
						<th>Age</th>
						<th>Visits</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Antoni</td>
						<td>Foyston</td>
						<td>74</td>
						<td>128</td>
					</tr>
					<tr>
						<td>Jenine</td>
						<td>Healey</td>
						<td>22</td>
						<td>194</td>
					</tr>
					<tr>
						<td>Leigh</td>
						<td>Klein</td>
						<td>26</td>
						<td>114</td>
					</tr>
					<tr>
						<td>Zara</td>
						<td>Greenrodd</td>
						<td>28</td>
						<td>36</td>
					</tr>
				</tbody>
			</table>
			<p>
				Fiskehelsekravene stilles av australske veterinærmyndigheter, og de
				kommer i tillegg til norske regelverkskrav. Den som underskriver
				egenerklæringen må forsikre seg om at varen er i henhold til Australias
				krav for import før signering.
			</p>
			<ul>
				<li>
					<a href="#anchor">
						Fiskehelsekrav for laksefiskprodukter til Australia
					</a>
				</li>
				<li>
					<a href="#anchor">
						Slik søker du om helsesertifikat med forhåndsmelding
					</a>
				</li>
			</ul>
			<h2 className={styles.heading} data-size="md">
				Oppdrettet laksefisk
			</h2>
			<h3 className={styles.heading} data-size="sm">
				Forhåndsmelding
			</h3>
			<p>
				Helsesertifikatene har krav om forhåndsmelding. Forhåndsmeldingen må
				godkjennes før sertifikatet kan utstedes.
			</p>
			<h3 className={styles.heading} data-size="sm">
				Helsesertifikater
			</h3>
			<ul>
				<li>
					<a href="#anchor">
						1.1.75 Australia helsesertifikat laksefisk, engelsk, specimen
					</a>
				</li>
				<li>
					<a href="#anchor">
						1.1.72 Australia helsesertifikat laksefisk for bearbeiding i
						utlandet, engelsk, specimen
					</a>
				</li>
			</ul>
			<p>
				Som produsent og eksportør må du kjenne til hvordan helsesertifikatene
				for produktene dine skal fylles ut. Finn veiledning her:
			</p>
			<p>
				<button
					type="button"
					className={styles.button}
					data-variant="primary"
					data-arrow
				>
					Krav til produsent
				</button>
			</p>
			<h3 className={styles.heading} data-size="sm">
				Egenerklæring
			</h3>
			<ul>
				<li>
					<a href="#anchor">
						1.3.76 Australia, egenerklæring, pakker av laksefisk
					</a>
				</li>
			</ul>
			<p>
				Utfylt erklæring må sendes inn sammen med forhåndsmeldingen. Du finner
				egenerklæringen som utfyllbar PDF-fil i linken over.
			</p>
			<h2 className={styles.heading} data-size="md">
				Villfanget fisk
			</h2>
			<h3 className={styles.heading} data-size="sm">
				Helsesertifikat
			</h3>
			<ul>
				<li>
					<a href="#anchor">
						1.1.94 Australia, sunnhetsattest, villfanget marin- og
						ferskvannsfisk, engelsk, specimen
					</a>
				</li>
			</ul>
			<p>
				Sertifikatet skal brukes på all villfanget fisk
				(marine/ferskvannsorganismer) som skal eksporteres til Australia.
			</p>
			<p>
				Vi gjør oppmerksom på at det står i sertifikatet at det kun skal være et
				fiskeslag i forsendelsen. Det skal derfor utstedes et sertifikat per
				fiskeslag.
			</p>
			<h2 className={styles.heading} data-size="md">
				Reker
			</h2>
			<h3 className={styles.heading} data-size="sm">
				Helsesertifikat
			</h3>
			<ul>
				<li>
					<a href="#anchor">1.1.95 Australia sunnhetsattest, reker, engelsk</a>
				</li>
				<li>
					<a href="#anchor">Veiledning for utfylling av attest 1.1.95</a>
				</li>
			</ul>
			<h2 className={styles.heading} data-size="md">
				Lakserogn
			</h2>
			<h3 className={styles.heading} data-size="sm">
				Helsesertifikater
			</h3>
			<div>
				<details className={styles.details}>
					<summary>Hva sier regelverket om lakserogn?</summary>
					<div className={styles.prose}>
						<p>
							Sertifikatet kan utstedes for varmebehandlet rogn fra laksefisk,
							til konsum, som er produsert i Norge.
						</p>
						<p>
							Rognen kan komme fra hvilket som helst land, men den må være
							varmebehandlet, i henhold til over angitt krav, av produsent i
							Norge.
						</p>
					</div>
				</details>
				<details className={styles.details}>
					<summary>Hva sier regelverket om lakserogn?</summary>
					<div className={styles.prose}>
						<p>
							Sertifikatet kan utstedes for varmebehandlet rogn fra laksefisk,
							til konsum, som er produsert i Norge.
						</p>
						<p>
							Rognen kan komme fra hvilket som helst land, men den må være
							varmebehandlet, i henhold til over angitt krav, av produsent i
							Norge.
						</p>
					</div>
				</details>
			</div>
			<h3 className={styles.heading} data-size="sm">
				Overskrift
			</h3>
			<p>
				Sertifikatet kan utstedes for varmebehandlet rogn fra laksefisk, til
				konsum, som er produsert i Norge.
			</p>
			<p>
				Sertifikatet krever at rognen må være varmebehandlet til en
				kjernetemperatur på minimum 65°C i minimum 30 minutter.
			</p>
			<p>
				Rognen kan komme fra hvilket som helst land, men den må være
				varmebehandlet, i henhold til over angitt krav, av produsent i Norge.
			</p>
			<p>The quick brown fox jumps over the lazy dog</p>
			<ul>
				<li>
					<a href="#anchor">
						1.1.75 Australia helsesertifikat laksefisk, engelsk, specimen
					</a>
				</li>
			</ul>
			<p>
				I så fall gjelder standard krav for 1.1.75 om opprinnelsesland,
				forhåndsmelding og egenerklæring.
			</p>
			<figure>
				<img src={inspektor} alt="" />
				<figcaption>
					Arbeidstøyet er en viktig del av vår visuelle identitet.
				</figcaption>
			</figure>
			<h2 className={styles.heading} data-size="md">
				Olje av laksefisk til humant konsum
			</h2>
			<h3 className={styles.heading} data-size="sm">
				Forhåndsmelding
			</h3>
			<p>
				Helsesertifikat har forhåndsmelding på grunn av fiskehelsekrav.
				Forhåndsmeldingen må godkjennes før sertifikatet kan utstedes.
			</p>
			<h3 className={styles.heading} data-size="sm">
				Helsesertifikat
			</h3>
			<ul>
				<li>
					<a href="#anchor">
						1.1.93 Australia, sunnhetsattest olje av laksefisk, engelsk
					</a>
				</li>
			</ul>
			<h3 className={styles.heading} data-size="sm">
				Egenerklæring
			</h3>
			<ul>
				<li>
					<a href="#anchor">
						1.3.76 Australia, egenerklæring pakker av laksefisk, engelsk
					</a>
				</li>
			</ul>
			<p>
				Utfylt erklæring må sendes inn sammen med forhåndsmeldingen. Du finner
				egenerklæringen som utfyllbar PDF-fil i linken over.
			</p>
			<p>
				Denne egenerklæringen blir grunnlaget for behandlingen av søknaden.
				Egenerklæringen fylles ut og signeres av hver enkelt virksomhet hvor
				varene produseres. Det skal lages en ny egenerklæring for hver ny
				forhåndsmelding.
			</p>
			<p>
				Fiskehelsekravene stilles av australske veterinærmyndigheter, og de
				kommer i tillegg til norske regelverkskrav. Den som underskriver
				egenerklæringen må forsikre seg om at varen er i henhold til Australias
				krav for import før signering.
			</p>
			<ul>
				<li>
					<a href="#anchor">
						Fiskehelsekrav for laksefiskprodukter til Australia
					</a>
				</li>
			</ul>
			<p>
				Australia har gitt beskjed om at de i utgangspunktet ikke tillater
				import av lakseolje i bulk på 25 liter eller mer. Dersom du likevel har
				en australsk importør for dette produktet, anbefaler vi at du tar
				kontakt med et kontor som utsteder sjømatsertifikater, som vil ta dette
				videre med Mattilsynets Hovedkontor.
			</p>
			<p>
				I del III. «Destination of the fish oil» finnes en linje for
				«Consignments details». Her skal det refereres enten til
				containernummer, bill of lading, fakturanummer, batch/serienummer eller
				produksjonsdato.
			</p>
			<p>
				Ved alle forsendelser er produsenten selv ansvarlig for å fylle ut en
				«Manufacturer's declaration» på engelsk på eget brevpapir. Dette må
				avklares med importøren før eksporten starter opp.
			</p>
			<h2 className={styles.heading} data-size="md">
				Ikke-salmonid fiskeolje for humant konsum
			</h2>
			<h3 className={styles.heading} data-size="sm">
				Helsesertifikat
			</h3>
			<ul>
				<li>
					<a href="#anchor">
						1.1.278 Australia helsesertifikat, ikke-salmonid fiskeolje humant
						konsum, engelsk
					</a>
				</li>
			</ul>
			<p>
				Helsesertifikat for ikke-salmonid fiskeolje til humant konsum ligger
				inne i Mattilsynets skjematjenester, men grunnet en feil i systemet må
				du for tiden likevel sende det inn som PDF. Du får sertifikatet som
				utfyllbar PDF-fil ved henvendelse til sertifikatkontoret.
			</p>
			<p>
				Australia krever i utgangspunktet garanti for at det ikke finnes
				salmonid materiale (dvs. fra laksefisk) i fiskeolje som de importerer.
				Siden en slik garanti ikke kan gis, krever Australia at fiskeoljen
				varmebehandles, og garanti for at fiskeoljen inneholder mindre enn 2 %
				salmonid materiale. For slik fiskeolje skal sertifikat nr. 1.1.278
				benyttes.
			</p>
			<p>
				Australia krever ikke tilsvarende garantier for fiskeolje i
				forpakningsenheter mindre enn 25 L, dersom de går til en «approved
				arrangement class 4.1» for foredling i Australia.
			</p>
			<ul>
				<li>
					Matliste
					<ul>
						<li>
							Pølse
							<ul>
								<li>Grill</li>
								<li>Wiener</li>
							</ul>
						</li>
						<li>
							Brød
							<ul>
								<li>Rug</li>
								<li>Knekk</li>
								<li>Loff</li>
								<li>Gull</li>
								<li>Hue</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	),
};

// <figure style={{ marginInline: 0 }}>
// 	<img
// 		src={henvisninger}
// 		alt=""
// 		style={{ display: "block", marginBottom: "var(--mtds-2)" }}
// 	/>
// 	<figcaption className={styles.muted}>
// 		Illustrasjon av hvordan du finner helsesertifikatene i Mattilsynets
// 		skjematjeneste.
// 	</figcaption>
// </figure>

export const InfoStory: Story = {
	name: "Info",
	parameters: { showInOverview: true },
	render: () => (
		<>
			<div className={styles.info}>Informasjon</div>
			<hr className={styles.divider} data-gap="5" />
			<div className={styles.info}>
				<strong>Fet ledetekst</strong>Og informasjon
			</div>
			<hr className={styles.divider} data-gap="5" />
			<div className={styles.info}>
				Ledetekst<strong>Og fet informasjon</strong>
			</div>
			<hr className={styles.divider} data-gap="5" />
			<div className={styles.info}>
				<HeartIcon />
				Ikon og informasjon
			</div>
			<hr className={styles.divider} data-gap="5" />
			<div className={styles.info}>
				<HeartIcon /> <strong>Ikon og ledetekst</strong>
				Og informasjon
			</div>
			<div className={styles.info}>
				<HeartIcon /> Ikon og ledetekst
				<strong>Og informasjon</strong>
			</div>
			<hr className={styles.divider} data-gap="5" />
			<div className={styles.info} data-variant="circle">
				<HeartIcon /> <strong>Sirkel og fet ledetekst</strong>
				Og informasjon
			</div>
			<hr className={styles.divider} data-gap="5" />
			<div className={styles.info} data-variant="circle">
				<HeartIcon /> Sirkel og ledetekst
				<strong>Og fet informasjon</strong>
			</div>
			<hr className={styles.divider} data-gap="5" />
			<div className={styles.info} data-variant="circle" data-color="warning">
				<WarningIcon /> Sirkel og ledetekst og farge
				<strong>Og fet informasjon</strong>
			</div>
			<hr className={styles.divider} data-gap="5" />
			<div className={styles.info}>
				<i>🇳🇴</i>
				Norge
			</div>
			<hr className={styles.divider} data-gap="5" />
			Info i card:
			<Card>
				<Flex data-align="start">
					<div data-self="300" data-fixed>
						<Heading data-size="xs">KY.KELLI.815.493.00</Heading>
					</div>
					<Flex data-self="500">
						<Flex data-self="500" data-align="start">
							<Grid data-self="200">
								<Info>
									<PaperPlaneRightIcon />
									Firmanavn AS
								</Info>
								<Info>
									<i>🇳🇱</i> Nederland
								</Info>
							</Grid>
							<Info data-self="300">
								<DownloadSimpleIcon />
								Bomsterlandet importerer bomster AS, Rogaland
							</Info>
						</Flex>
						<Tag data-fixed data-color="info" data-icon="none">
							Skal på tilsyn
						</Tag>
					</Flex>
				</Flex>
			</Card>
			<hr className={styles.divider} data-gap="5" />
			Info i flex:
			<Flex>
				<Info>
					<strong>Avsender:</strong>
					Firmanavn AS
				</Info>
				<Info>
					<strong>Land:</strong>
					Nederland
				</Info>
				<Info data-self="300">
					<DownloadSimpleIcon />
					<strong>Mottaker:</strong>
					Bomsterlandet importerer bomster AS, Rogaland
				</Info>
			</Flex>
		</>
	),
};
