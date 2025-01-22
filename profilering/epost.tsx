import {
	ArrowSquareOut,
	DeviceMobile,
	Graph,
	IdentificationBadge,
	MapPinArea,
	MapTrifold,
	Phone,
	User,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import styles from "../designsystem/styles.module.css";

type Data = Record<string, string>;

function toPhone(value = "") {
	const number = value
		.replace(/(\+|00)\s*47/, "") // Remove +47 or 0047
		.replace(/\D+/g, "") // Remove non-digits
		.match(/.{1,2}/g) // Split into groups of two
		?.join(" ") // Join with space
		.trim(); // Remove leading/trailing spaces
	return number && `+47 ${number}`;
}

export function Epost() {
	const [data, setData] = useState<Data>({});
	const onInput = (event: React.KeyboardEvent<HTMLFormElement>) => {
		const form = event.currentTarget;
		const data = Object.fromEntries(new FormData(form).entries()) as Data;
		setData(data);
		localStorage.setItem("epost", JSON.stringify(data));
	};

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("epost") || "null");
		if (data && typeof data === "object") setData(data);
	}, []);

	return (
		<div
			className={styles.grid}
			data-grid="sidebar"
			data-gap="lg"
			style={{ width: "80vw", margin: "4rem calc(50% - 40vw)" }}
		>
			<style>{"svg{vertical-align:-.175em}"}</style>
			<form
				onSubmit={(event) => event.preventDefault()}
				onInput={onInput}
				className={styles.grid}
				data-gap="md"
			>
				<div className={styles.field}>
					<label>
						<User aria-hidden="true" /> Fullt navn
					</label>
					<input
						className={styles.input}
						name="name"
						type="text"
						autoComplete="off"
						value={data.name}
						required
					/>
				</div>
				<div className={styles.field}>
					<label>
						<IdentificationBadge aria-hidden="true" /> Stillingstittel
					</label>
					<input
						className={styles.input}
						name="position"
						type="text"
						autoComplete="off"
						value={data.position}
						required
					/>
				</div>
				<div className={styles.field}>
					<label>
						<MapPinArea aria-hidden="true" /> Tilknytning
					</label>
					<input
						className={styles.input}
						name="office"
						type="text"
						autoComplete="off"
						placeholder="kontorsted, seksjon"
						value={data.office}
						list="office-list"
						required
					/>
					<datalist id="office-list">
						<option>Hovedkontoret</option>
						<option>Agder</option>
						<option>Bergen og omland</option>
						<option>Finnmark</option>
						<option>Gauldal</option>
						<option>Glåmdal og Østerdal</option>
						<option>Grensekontroll og import</option>
						<option>Gudbrandsdal</option>
						<option>Helgeland</option>
						<option>Innherred og Fosen</option>
						<option>Mat</option>
						<option>Midtre Hålogaland</option>
						<option>Mjøsområdet</option>
						<option>Namdal</option>
						<option>Nasjonale godkjenninger</option>
						<option>Nasjonale oppgaver</option>
						<option>Nordfjord</option>
						<option>Nordmøre og Romsdal</option>
						<option>Nordre Buskerud, Hadeland og Valdres</option>
						<option>Romerike</option>
						<option>Salten</option>
						<option>Slakteritilsyn</option>
						<option>Styring og administrasjon</option>
						<option>Sunnfjord og Sogn</option>
						<option>Sunnhordland og Haugalandet</option>
						<option>Sunnmøre</option>
						<option>Søndre Buskerud</option>
						<option>Sør-Innherred</option>
						<option>Sør-Rogaland, Sirdal og Flekkefjord</option>
						<option>Telemark</option>
						<option>Troms og Svalbard</option>
						<option>Trondheim og omland</option>
						<option>Vestfold</option>
						<option>Østfold og Follo</option>
					</datalist>
				</div>
				<div className={styles.field}>
					<label>
						<Phone aria-hidden="true" /> Telefon
					</label>
					<input
						className={styles.input}
						name="phone"
						type="text"
						autoComplete="off"
						value={data.phone}
					/>
				</div>
				<div className={styles.field}>
					<label>
						<DeviceMobile aria-hidden="true" /> Mobil
					</label>
					<input
						className={styles.input}
						name="mobile"
						type="text"
						autoComplete="off"
						value={data.mobile}
						required
					/>
				</div>
				<div className={styles.field}>
					<label>
						<MapTrifold aria-hidden="true" /> Besøksadresse
					</label>
					<a
						href="https://www.mattilsynet.no/kontakt-oss/finn-ditt-naermeste-kontor"
						target="_blank"
						rel="noreferrer"
					>
						Se kontorsteder <ArrowSquareOut aria-hidden="true" />
					</a>
					<input
						className={styles.input}
						name="visit"
						type="text"
						autoComplete="off"
						value={data.visit}
						required
					/>
				</div>
			</form>
			<div className={styles.grid} data-gap="md" data-align-content="start">
				<div
					id="email-preview"
					style={{
						marginTop: "1.875em",
						background: "white",
						padding: 40,
						borderRadius: 10,
						border: "1px solid var(--mtds-color-200)",
					}}
				>
					<div
						style={{
							fontFamily: "Avenir, Avenir Next, sans-serif",
							fontSize: "11pt",
							lineHeight: 1.5,
						}}
					>
						Med vennlig hilsen
						<br />
						<br />
						<b>{data.name || "Navn"}</b>
						<br />
						{data.position || "stillingstittel"}
						<br />
						Mattilsynet, {data.office || "kontorsted, seksjon"}
						<br />
						Telefon:{" "}
						{[toPhone(data.phone), toPhone(data.mobile)]
							.filter(Boolean)
							.join(" / ") || "+47 00 00 00 00"}
						<br />
						Besøksadresse:{" "}
						<a
							href={`https://maps.google.com/?q=${window.encodeURIComponent(data.visit)}`}
						>
							{data.visit || "Veigata 1, 2001 Byen"}
						</a>
						<br />
						<a
							href="https://www.mattilsynet.no/kontakt-oss/finn-ditt-naermeste-kontor"
							style={{ color: "inherit" }}
						>
							Kontakt Mattilsynet
						</a>
						<br />
						<br />
						<a href="https://www.mattilsynet.no/" style={{ color: "inherit" }}>
							<img alt="Mattilsynet" src="/docs/logo-epost.png" width="200" />
						</a>
					</div>
				</div>
				<button
					type="button"
					className={styles.button}
					data-variant="primary"
					onClick={({ currentTarget: button }) => {
						const html = document.getElementById("email-preview")?.innerHTML;
						const type = "text/html";
						const blob = new Blob([html || ""], { type });
						const data = [new ClipboardItem({ [type]: blob })];
						navigator.clipboard.write(data);

						button.replaceChildren("Kopiert!");
						setTimeout(() => button.replaceChildren("Kopier signatur"), 2000);
					}}
				>
					Kopier signatur
				</button>
			</div>
		</div>
	);
}
