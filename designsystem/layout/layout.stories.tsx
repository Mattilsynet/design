import {
	Bell,
	Gear,
	ListChecks,
	MagnifyingGlass,
	Plant,
	SignOut,
	Signature,
	User,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Fragment } from "react";
import { Button, Flex, Grid } from "../react";
import styles from "../styles.module.css";

const gaps = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 22, 26, 30,
];
const meta = {
	title: "Designsystem/Layout",
	parameters: {
		layout: "padded",
	},
	decorators: [
		(Story) => (
			<div className="mt-story">
				<Story />
				<style>{`
					.mt-story:not(:has(.${styles.body.split(" ")[0]})) {
						display: grid;
						gap: 1rem;
						padding: 1px;
						
						& b { display: flex; align-items: center; padding: .5em 1em; border: 1px solid; border-radius: var(--mtds-border-radius-md) }
						& code { font-size: .875rem }
						& div:not([class*="box"]) { outline: 1px dashed color-mix(in hsl, currentcolor 50%, transparent) }
						& div[data-align-content] { height: 150px }
					}
				`}</style>
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FlexStory: Story = {
	name: "Flex",
	parameters: {
		showInOverview: true,
	},
	render: () => (
		<div className={styles.flex}>
			<button type="button" className={styles.button} data-variant="primary">
				Action 1
			</button>
			<button type="button" className={styles.button} data-variant="primary">
				Action som er lengre 2
			</button>
			<button type="button" className={styles.button} data-variant="primary">
				Action 3
			</button>
			<button type="button" className={styles.button} data-variant="primary">
				Action 4
			</button>
			<button type="button" className={styles.button} data-variant="primary">
				Action 5
			</button>
			<button type="button" className={styles.button} data-variant="primary">
				Action 6
			</button>
		</div>
	),
};

export const GridStory: Story = {
	name: "Grid",
	parameters: {
		showInOverview: true,
	},
	render: () => (
		<div className={styles.grid} data-gap="6">
			<div className={styles.grid} data-items="auto">
				<div>auto</div>
				<div>auto</div>
			</div>
			<div
				className={styles.grid}
				data-gap="6"
				style={{ gridTemplateColumns: "1fr 2fr" }}
			>
				<div>
					Custom
					<div className={styles.grid} data-items="100" data-gap="0">
						<div>100</div>
						<div>100</div>
					</div>
				</div>
				<div className={styles.grid} data-items="300" data-gap="4">
					<div>300</div>
					<div className={styles.grid} data-items="100">
						<div>100</div>
						<div>100</div>
						<div>100</div>
						<div>100</div>
						<div>100</div>
						<div>100</div>
					</div>
					<div>300</div>
					<div>300</div>
				</div>
			</div>
		</div>
	),
};

export const React: Story = {
	render: () => (
		<>
			<Flex>
				<Button data-variant="primary">Action 1</Button>
				<Button data-variant="primary">Action som er lengre 2</Button>
				<Button data-variant="primary">Action 3</Button>
				<Button data-variant="primary">Action 4</Button>
				<Button data-variant="primary">Action 5</Button>
				<Button data-variant="primary">Action 6</Button>
			</Flex>
			<Grid data-gap="6">
				<Grid data-items="auto">
					<div>auto</div>
					<div>auto</div>
				</Grid>
				<Grid style={{ gridTemplateColumns: "1fr 2fr" }} data-gap="6">
					<div>
						Custom
						<Grid data-items="100" data-gap="0">
							<div>100</div>
							<div>100</div>
						</Grid>
					</div>
					<Grid data-items="300" data-gap="4">
						<div>300</div>
						<Grid data-items="100">
							<div>100</div>
							<div>100</div>
							<div>100</div>
							<div>100</div>
							<div>100</div>
							<div>100</div>
						</Grid>
						<div>300</div>
						<div>300</div>
					</Grid>
				</Grid>
			</Grid>
		</>
	),
};

export const Gap: Story = {
	render: () => (
		<section className={styles.grid} style={{ gridTemplateColumns: "1fr 2fr" }}>
			{gaps.map((gap) => (
				<Fragment key={gap}>
					<code>data-gap="{gap}"</code>
					<div className={styles.flex} data-gap={gap}>
						<b>a</b>
						<b>b</b>
						<b>c</b>
					</div>
				</Fragment>
			))}
		</section>
	),
};

export const Center: Story = {
	parameters: {
		layout: "fullscreen",
	},
	render: () => (
		<>
			<div className={styles.grid} data-center="sm">
				sm (640px)
			</div>
			<div className={styles.grid} data-center="md">
				md (768px)
			</div>
			<div className={styles.grid} data-center="lg">
				lg (1024px)
			</div>
			<div className={styles.grid} data-center="xl">
				xl (1280px)
			</div>
			<div className={styles.grid} data-center="2xl">
				2xl (1536px)
			</div>
		</>
	),
};

export const ItemSizes: Story = {
	render: () => (
		<>
			<h2 className={styles.heading}>
				Minimumsstørrelser Grid og Flex data-items:
			</h2>
			{Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
				<div key={i}>
					<div className={styles.flex} key={i} data-gap="3" data-fixed>
						<div
							data-self={i * 50}
							style={{
								background: "var(--mtds-color-surface-tinted)",
								whiteSpace: "nowrap",
							}}
						>
							{i * 50}
						</div>
					</div>
				</div>
			))}
		</>
	),
};

export const ItemFixed: Story = {
	render: () => (
		<>
			<span>
				Flex <code>data-items="100"</code> with <code>data-fixed</code> (does
				not allow growing over <code>data-items</code> value):
			</span>
			<div className={styles.flex} data-items="100" data-fixed>
				<div>a</div>
				<div>b</div>
				<div>c</div>
				<div>d</div>
			</div>
			<span>
				Flex <code>data-items="100"</code> without <code>data-fixed</code>{" "}
				(allows items to grow):
			</span>
			<div className={styles.flex} data-items="100">
				<div>a</div>
				<div>b</div>
				<div>c</div>
				<div>d</div>
			</div>
			<span>
				Grid <code>data-items="100"</code> with <code>data-fixed</code> (repeats
				"fake" empty columns to align ish with <code>data-items</code>):
			</span>
			<div className={styles.grid} data-items="100" data-fixed>
				<div>a</div>
				<div>b</div>
				<div>c</div>
				<div>d</div>
			</div>
			<span>
				Grid <code>data-items="100"</code> without <code>data-fixed</code>
				(fills grid with actual columns):
			</span>
			<div className={styles.grid} data-items="100">
				<div>a</div>
				<div>b</div>
				<div>c</div>
				<div>d</div>
			</div>
		</>
	),
};

export const Align: Story = {
	render: () => (
		<section
			className={styles.grid}
			data-align="center"
			data-gap="6"
			style={{ gridTemplateColumns: "1fr 2fr" }}
		>
			<code>data-align="stretch"</code>
			<div className={styles.flex} data-align="stretch">
				<b data-size="sm">Small</b>
				<b data-size="md">Medium</b>
				<b data-size="lg">Large</b>
			</div>
			<code>data-align="start"</code>
			<div className={styles.flex} data-align="start">
				<b data-size="sm">Small</b>
				<b data-size="md">Medium</b>
				<b data-size="lg">Large</b>
			</div>
			<code>data-align="center"</code>
			<div className={styles.flex} data-align="center">
				<b data-size="sm">Small</b>
				<b data-size="md">Medium</b>
				<b data-size="lg">Large</b>
			</div>
			<code>data-align="end"</code>
			<div className={styles.flex} data-align="end">
				<b data-size="sm">Small</b>
				<b data-size="md">Medium</b>
				<b data-size="lg">Large</b>
			</div>
		</section>
	),
};

export const Justify: Story = {
	render: () => (
		<section
			className={styles.grid}
			data-align="center"
			data-gap="6"
			style={{ gridTemplateColumns: "1fr 2fr" }}
		>
			<code>data-justify="start"</code>
			<div className={styles.flex} data-justify="start">
				<b>Box</b>
				<b>Box</b>
				<b>Box</b>
			</div>
			<code>data-justify="center"</code>
			<div className={styles.flex} data-justify="center">
				<b>Box</b>
				<b>Box</b>
				<b>Box</b>
			</div>
			<code>data-justify="end"</code>
			<div className={styles.flex} data-justify="end">
				<b>Box</b>
				<b>Box</b>
				<b>Box</b>
			</div>
			<code>data-justify="space-between"</code>
			<div className={styles.flex} data-justify="space-between">
				<b>Box</b>
				<b>Box</b>
				<b>Box</b>
			</div>
			<code>data-justify="space-around"</code>
			<div className={styles.flex} data-justify="space-around">
				<b>Box</b>
				<b>Box</b>
				<b>Box</b>
			</div>
			<code>data-justify="space-evenly"</code>
			<div className={styles.flex} data-justify="space-evenly">
				<b>Box</b>
				<b>Box</b>
				<b>Box</b>
			</div>
		</section>
	),
};

export const AlignContent: Story = {
	render: () => (
		<section
			className={styles.grid}
			data-items="200"
			data-gap="6"
			style={{ maxWidth: 700 }}
		>
			<article>
				<code>start</code>
				<div className={styles.flex} data-align-content="start">
					<b>Box</b>
					<b>Box</b>
					<b>Box</b>
				</div>
			</article>
			<article>
				<code>center</code>
				<div className={styles.flex} data-align-content="center">
					<b>Box</b>
					<b>Box</b>
					<b>Box</b>
				</div>
			</article>
			<article>
				<code>end</code>
				<div className={styles.flex} data-align-content="end">
					<b>Box</b>
					<b>Box</b>
					<b>Box</b>
				</div>
			</article>
			<article>
				<code>space-between</code>
				<div className={styles.flex} data-align-content="space-between">
					<b>Box</b>
					<b>Box</b>
					<b>Box</b>
				</div>
			</article>
			<article>
				<code>space-around</code>
				<div className={styles.flex} data-align-content="space-around">
					<b>Box</b>
					<b>Box</b>
					<b>Box</b>
				</div>
			</article>
			<article>
				<code>space-evenly</code>
				<div className={styles.flex} data-align-content="space-evenly">
					<b>Box</b>
					<b>Box</b>
					<b>Box</b>
				</div>
			</article>
		</section>
	),
};

export const Prose: Story = {
	name: "Prose",
	parameters: {
		layout: "fullscreen",
		showInOverview: true,
	},
	render: () => (
		<div className={styles.body} style={{ paddingBlock: "5vw" }}>
			<div className={styles.grid} data-center="md">
				<div className={styles.prose}>
					<h1 className={styles.heading} data-size="xl">
						Her søker du om helsesertifikat for sjømat til Australia
					</h1>
					<p data-size="xl">
						Se hvilken løsning du skal bruke når du søker, hva sertifikatet
						koster og når sertifikatkontoret holder åpent.
					</p>
					<small>Publisert 14.01.2025</small>
					<h2 className={styles.heading} data-size="sm">
						Innhold på denne siden
					</h2>
					<ol>
						<li>Sertifikater i skjematjenesten</li>
						<li>
							Sertifikater som ikke ligger i eksportløsningen eller
							skjematjenesten
						</li>
						<li>Dette koster sertifikatet</li>
						<li>Åpningstider for utstedelse av helsesertifikater</li>
					</ol>
					<h2 className={styles.heading} data-size="md">
						Sertifikater i skjematjenesten
					</h2>
					<p>
						Hvis du skal søke om helsesertifikat for eksport av sjømat til
						Australia må du logge inn og fylle ut en søknad i Mattilsynets
						skjematjeneste.
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
						Mattilsynets skjematjeneste. Det eksisterer en tilhørende
						egenerklæring, som er en utfyllbar PDF. Denne egenerklæringen blir
						grunnlaget for behandlingen av søknaden. Det skal lages en ny
						egenerklæring for hver ny forhåndsmelding. Egenerklæringen lastes
						ned, fylles ut, signeres av hver enkelt virksomhet hvor varene
						produseres og lastes opp sammen med forhåndsmeldingen.
					</p>
					<div>
						<span className={styles.tag} data-color="info" data-size="sm">
							Alle feltene må fylles ut
						</span>
					</div>
					<h2 className={styles.heading} data-size="sm">
						Transportør
					</h2>
					<div className={styles.field}>
						<label>Ledetekst</label>
						<p>Beskrivelse</p>
						<input type="text" className={styles.input} required />
					</div>
					<div className={styles.field}>
						<label>Ledetekst</label>
						<p>Beskrivelse</p>
						<input type="text" className={styles.input} required />
					</div>
					<h2 className={styles.heading} data-size="md">
						Mottaker
					</h2>
					<div className={styles.field}>
						<label>Beskriv bekymringen din</label>
						<p>
							Skriv gjerne hva som har skjedd, hvor det skjedde, grunnen til
							problemet og hvorfor du mener at dyrene ikke har det bra.
						</p>
						<textarea className={styles.input} required />
					</div>
					<div className={styles.field}>
						<label>Antall dyr</label>
						<input type="text" className={styles.input} />
					</div>
					<hr className={styles.divider} data-gap="8" />
					<h2 className={styles.heading} data-size="lg">
						Helsesertifikat for sjømat
					</h2>
					<div className={styles.field}>
						<label>Velg dyr</label>
						<input type="text" className={styles.input} required />
					</div>
					<fieldset className={styles.fieldset}>
						<legend>Hovedårsak til bekymring</legend>
						<p>Fellesbeskrivelse</p>
						<div className={styles.field}>
							<input
								type="radio"
								className={styles.input}
								name="my-radio"
								required
								defaultChecked
							/>
							<label>Alternativ 1</label>
							<p>Beskrivelse</p>
						</div>
						<div className={styles.field}>
							<input
								type="radio"
								className={styles.input}
								name="my-radio"
								required
							/>
							<label>Alternativ 2</label>
							<p>Beskrivelse</p>
						</div>
					</fieldset>
					<h2 className={styles.heading} data-size="md">
						Litt informasjon
					</h2>
					<table
						className={styles.table}
						aria-label="Example table"
						data-border
					>
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
						egenerklæringen må forsikre seg om at varen er i henhold til
						Australias krav for import før signering.
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
						Som produsent og eksportør må du kjenne til hvordan
						helsesertifikatene for produktene dine skal fylles ut. Finn
						veiledning her:
					</p>
					<button
						type="button"
						className={styles.button}
						data-variant="primary"
						data-arrow
					>
						Krav til produsent
					</button>
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
						Utfylt erklæring må sendes inn sammen med forhåndsmeldingen. Du
						finner egenerklæringen som utfyllbar PDF-fil i linken over.
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
						Vi gjør oppmerksom på at det står i sertifikatet at det kun skal
						være et fiskeslag i forsendelsen. Det skal derfor utstedes et
						sertifikat per fiskeslag.
					</p>
					<h2 className={styles.heading} data-size="md">
						Reker
					</h2>
					<h3 className={styles.heading} data-size="sm">
						Helsesertifikat
					</h3>
					<ul>
						<li>
							<a href="#anchor">
								1.1.95 Australia sunnhetsattest, reker, engelsk
							</a>
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
						<u-details class={styles.details}>
							<u-summary>Hva sier regelverket om lakserogn?</u-summary>
							<div className={styles.prose}>
								<p>
									Sertifikatet kan utstedes for varmebehandlet rogn fra
									laksefisk, til konsum, som er produsert i Norge.
								</p>
								<p>
									Rognen kan komme fra hvilket som helst land, men den må være
									varmebehandlet, i henhold til over angitt krav, av produsent i
									Norge.
								</p>
							</div>
						</u-details>
						<u-details class={styles.details}>
							<u-summary>Hva sier regelverket om lakserogn?</u-summary>
							<div className={styles.prose}>
								<p>
									Sertifikatet kan utstedes for varmebehandlet rogn fra
									laksefisk, til konsum, som er produsert i Norge.
								</p>
								<p>
									Rognen kan komme fra hvilket som helst land, men den må være
									varmebehandlet, i henhold til over angitt krav, av produsent i
									Norge.
								</p>
							</div>
						</u-details>
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
						varmebehandlet, i henhold til over angitt krav, av produsent i
						Norge.
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
						Utfylt erklæring må sendes inn sammen med forhåndsmeldingen. Du
						finner egenerklæringen som utfyllbar PDF-fil i linken over.
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
						egenerklæringen må forsikre seg om at varen er i henhold til
						Australias krav for import før signering.
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
						import av lakseolje i bulk på 25 liter eller mer. Dersom du likevel
						har en australsk importør for dette produktet, anbefaler vi at du
						tar kontakt med et kontor som utsteder sjømatsertifikater, som vil
						ta dette videre med Mattilsynets Hovedkontor.
					</p>
					<p>
						I del III. «Destination of the fish oil» finnes en linje for
						«Consignments details». Her skal det refereres enten til
						containernummer, bill of lading, fakturanummer, batch/serienummer
						eller produksjonsdato.
					</p>
					<p>
						Ved alle forsendelser er produsenten selv ansvarlig for å fylle ut
						en «Manufacturer's declaration» på engelsk på eget brevpapir. Dette
						må avklares med importøren før eksporten starter opp.
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
								1.1.278 Australia helsesertifikat, ikke-salmonid fiskeolje
								humant konsum, engelsk
							</a>
						</li>
					</ul>
					<p>
						Helsesertifikat for ikke-salmonid fiskeolje til humant konsum ligger
						inne i Mattilsynets skjematjenester, men grunnet en feil i systemet
						må du for tiden likevel sende det inn som PDF. Du får sertifikatet
						som utfyllbar PDF-fil ved henvendelse til sertifikatkontoret.
					</p>
					<p>
						Australia krever i utgangspunktet garanti for at det ikke finnes
						salmonid materiale (dvs. fra laksefisk) i fiskeolje som de
						importerer. Siden en slik garanti ikke kan gis, krever Australia at
						fiskeoljen varmebehandles, og garanti for at fiskeoljen inneholder
						mindre enn 2 % salmonid materiale. For slik fiskeolje skal
						sertifikat nr. 1.1.278 benyttes.
					</p>
					<p>
						Australia krever ikke tilsvarende garantier for fiskeolje i
						forpakningsenheter mindre enn 25 L, dersom de går til en «approved
						arrangement class 4.1» for foredling i Australia.
					</p>
				</div>
			</div>
		</div>
	),
};

export const App: Story = {
	name: "App (Eksperimentell)",
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story) => (
			<div className={styles.body}>
				<Story />
			</div>
		),
	],
	render: () => (
		<div className={styles.app}>
			<header>
				<a href="#none" className={styles.logo}>
					<Plant weight="fill" />
					Digiplant
				</a>
				<button type="button" className={styles.button}>
					<Bell />
				</button>
				<button
					type="button"
					className={styles.button}
					aria-label="Meny"
					popoverTarget="menu"
				>
					<span className={styles.avatar} data-size="xs"></span>
				</button>
				<menu className={styles.popover} popover="auto" id="menu">
					<li>
						<a className={styles.button} href="#none">
							<User />
							Profil
						</a>
					</li>
					<li>
						<a className={styles.button} href="#none">
							<Gear />
							Innstillinger
						</a>
					</li>
					<li>
						<a className={styles.button} href="#none">
							<SignOut />
							Logg ut
						</a>
					</li>
				</menu>
			</header>
			<nav>
				<menu>
					<li>
						<a
							className={styles.button}
							href="#none"
							aria-current="page"
							data-tooltip="Søknader"
						>
							<Signature />
						</a>
					</li>
					<li>
						<a className={styles.button} href="#none" data-tooltip="Behandling">
							<ListChecks />
						</a>
					</li>
					<li>
						<a className={styles.button} href="#none" data-tooltip="Søk">
							<MagnifyingGlass />
						</a>
					</li>
				</menu>
				<hr className={styles.divider} data-gap="8" />
				<form className={styles.grid} data-app-expanded="true">
					<fieldset className={styles.fieldset}>
						<legend>Velg type iskrem</legend>
						<div className={styles.field}>
							<input type="checkbox" className={styles.input} />
							<label>Sjokolade</label>
						</div>
						<div className={styles.field}>
							<input type="checkbox" className={styles.input} />
							<label>Kokkos</label>
						</div>
						<div className={styles.field}>
							<input type="checkbox" className={styles.input} />
							<label>Jordbær</label>
						</div>
					</fieldset>
				</form>
				<div hidden>
					<hr className={styles.divider} data-gap="8" />
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
					velit orci, sagittis sodales viverra id, malesuada quis lacus. Nunc ac
					vulputate enim, et feugiat lorem. Suspendisse metus est, semper in
					tempor ut, ornare nec sapien. Maecenas dictum sodales leo, ut ultrices
					ex. Quisque in interdum nisl. Fusce non est finibus, imperdiet diam
					quis, sodales tellus. Maecenas vitae scelerisque ipsum. Maecenas
					tempor leo orci, a lacinia leo interdum et.
				</div>
			</nav>
			<button
				type="button"
				className={styles.button}
				data-command="toggle-app-expanded"
			></button>
			<main>
				<div className={styles.card}>
					<img
						style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover" }}
						src="https://mattilsynet-xp7prod.enonic.cloud/_/image/8fe5f0c4-49c2-4d27-9dca-764cdfc7e110:64ec235cca8f61e8e8e590ca1cf3a7fb28e132ba/width-1440/Forsidebanner.png"
						alt=""
					/>
					<fieldset className={styles.fieldset}>
						<legend>Hvilke foretrekker du?</legend>
						<p>Fellesbeskrivelse</p>
						<div className={styles.field}>
							<input
								type="checkbox"
								className={styles.input}
								name="my-check"
								defaultChecked
							/>
							<label>Alternativ 1</label>
						</div>
						<div className={styles.field}>
							<input type="checkbox" className={styles.input} name="my-check" />
							<label>Alternativ 2</label>
						</div>
					</fieldset>
				</div>
				<div className={styles.prose} hidden>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
						velit orci, sagittis sodales viverra id, malesuada quis lacus. Nunc
						ac vulputate enim, et feugiat lorem. Suspendisse metus est, semper
						in tempor ut, ornare nec sapien. Maecenas dictum sodales leo, ut
						ultrices ex. Quisque in interdum nisl. Fusce non est finibus,
						imperdiet diam quis, sodales tellus. Maecenas vitae scelerisque
						ipsum. Maecenas tempor leo orci, a lacinia leo interdum et. Maecenas
						dictum tortor ut nisi mollis, ac lobortis metus congue. Aliquam
						pharetra leo at nulla molestie sagittis. Aenean condimentum viverra
						blandit. Phasellus placerat imperdiet felis, vel mollis ante maximus
						at. Nam pretium mattis augue, quis vehicula nisl facilisis in. Fusce
						in dolor et enim sollicitudin lobortis. Etiam tincidunt eleifend
						felis, sed faucibus ligula iaculis at. Fusce a venenatis nunc.
					</p>
					<p>
						Quisque malesuada, tortor eget tempor rutrum, nunc diam volutpat
						ligula, id tempus massa neque a sem. Donec odio enim, porta non odio
						vel, sollicitudin facilisis tellus. Vestibulum eget mauris dictum,
						dictum enim sed, aliquet ante. Nunc dictum quam ac feugiat lacinia.
						Ut nec maximus nibh, in tristique orci. Suspendisse dolor metus,
						scelerisque vel massa eu, dignissim dictum purus. Maecenas iaculis
						in arcu sit amet tristique. Etiam ac neque rhoncus nibh laoreet
						efficitur.
					</p>
					<p>
						Quisque malesuada, tortor eget tempor rutrum, nunc diam volutpat
						ligula, id tempus massa neque a sem. Donec odio enim, porta non odio
						vel, sollicitudin facilisis tellus. Vestibulum eget mauris dictum,
						dictum enim sed, aliquet ante. Nunc dictum quam ac feugiat lacinia.
						Ut nec maximus nibh, in tristique orci. Suspendisse dolor metus,
						scelerisque vel massa eu, dignissim dictum purus. Maecenas iaculis
						in arcu sit amet tristique. Etiam ac neque rhoncus nibh laoreet
						efficitur.
					</p>
				</div>
			</main>
			<aside hidden>
				<form className={styles.grid} data-gap="4">
					<h2 className={styles.heading} data-size="xs">
						Filters
					</h2>
					<div className={styles.field}>
						<label>Search</label>
						<input type="text" className={styles.input} />
					</div>
					<fieldset className={styles.fieldset}>
						<legend>Velg type iskrem</legend>
						<div className={styles.field}>
							<input type="checkbox" className={styles.input} />
							<label>Sjokolade</label>
						</div>
						<div className={styles.field}>
							<input type="checkbox" className={styles.input} />
							<label>Kokkos</label>
						</div>
						<div className={styles.field}>
							<input type="checkbox" className={styles.input} />
							<label>Jordbær</label>
						</div>
					</fieldset>
				</form>
			</aside>
			<footer data-color="inverted" style={{ height: 300 }} hidden>
				<a href="#none" className={styles.logo}></a>
			</footer>
		</div>
	),
};
