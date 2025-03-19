import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "../react";
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

export const HeadingStory: Story = {
	name: "Heading",
	render: () => <h2 className={styles.heading}>Heading</h2>,
};
export const Sizes: Story = {
	render: () => (
		<>
			{/**
			 * Du kan bruke <h1>, <h2>, <h3>, <h4>, <h5>, <h6>.
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
		</>
	),
};

export const React: Story = {
	render: () => (
		<>
			{/**
			 * Du kan bruke as="h1", as="h2", as="h3", as="h4", as="h5", as="h6".
			 * as="h2" er kun brukt til demo
			 */}
			<Heading as="h2" data-size="2xl">
				Heading data-size="2xl"
			</Heading>
			<Heading as="h2" data-size="xl">
				Heading data-size="xl"
			</Heading>
			<Heading as="h2" data-size="lg">
				Heading data-size="lg"
			</Heading>
			<Heading as="h2" data-size="md">
				Heading data-size="md"
			</Heading>
			<Heading as="h2" data-size="sm">
				Heading data-size="sm"
			</Heading>
			<Heading as="h2" data-size="xs">
				Heading data-size="xs"
			</Heading>
			<Heading as="h2" data-size="2xs">
				Heading data-size="2xs"
			</Heading>
		</>
	),
};

export const Center: Story = {
	render: () => (
		<h2 className={styles.heading} data-justify="center">
			Heading data-justify="center"
		</h2>
	),
};

export const Prose: Story = {
	name: "Prose - typografisk stack (Eksperimentell)",
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
					<div>
						<div style={{ fontSize: "1.45em", marginBottom: 5 }}>
							Se hvilken løsning du skal bruke når du søker, hva sertifikatet
							koster og når sertifikatkontoret holder åpent.
						</div>
						<small>Publisert 14.01.2025</small>
					</div>
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
					<ul>
						<li>
							<a href="#anchor">
								1.1.302 Australia helsesertifikat, varmebehandlet rogn av
								laksefisk, engelsk, specimen
							</a>
						</li>
					</ul>
					<p>The quick brown fox jumps over the lazy dog</p>
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
