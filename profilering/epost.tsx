import {
	ArrowSquareOut,
	DeviceMobile,
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
			data-gap="6"
			style={{
				width: "80vw",
				margin: "4rem calc(50% - 40vw)",
				gridTemplateColumns: "1fr 2fr",
			}}
		>
			<style>{"svg{vertical-align:-.175em}"}</style>
			<form
				onSubmit={(event) => event.preventDefault()}
				onInput={onInput}
				className={styles.grid}
				data-gap="5"
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
				<fieldset className={styles.fieldset}>
					<legend>
						<IdentificationBadge aria-hidden="true" /> Tilknytning
					</legend>
					<div className={styles.field}>
						<label>Mattilsynet, hovedkontoret</label>
						<input
							className={styles.input}
							name="connection"
							type="radio"
							value="hovedkontoret"
							defaultChecked={data.connection === "hovedkontoret"}
							required
						/>
					</div>
					<div className={styles.field}>
						<label>Mattilsynet, tilsynet</label>
						<input
							className={styles.input}
							name="connection"
							type="radio"
							value="tilsynet"
							defaultChecked={data.connection === "tilsynet"}
							required
						/>
					</div>
				</fieldset>
				<div className={styles.field}>
					<label>
						<MapPinArea aria-hidden="true" /> Seksjon/avdeling
					</label>
					<input
						className={styles.input}
						name="office"
						type="text"
						autoComplete="off"
						placeholder="Seksjon/avdeling"
						value={data.office}
					/>
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
					<p>
						<a
							href="https://www.mattilsynet.no/kontakt-oss/finn-ditt-naermeste-kontor"
							target="_blank"
							rel="noreferrer"
						>
							Se kontorsteder <ArrowSquareOut aria-hidden="true" />
						</a>
					</p>
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
					className={styles.card}
					style={{ marginTop: "1.875em" }}
				>
					<div
						style={{
							fontFamily: "Avenir, Avenir Next, Avenir Next LT Pro, sans-serif",
							fontSize: "11pt",
							lineHeight: 1.5,
						}}
					>
						Med vennlig hilsen
						<br />
						<br />
						<b>{data.name || "Navn"}</b>
						<br />
						{data.position?.toLowerCase() || "stillingstittel"}
						<br />
						<br />
						Mattilsynet, {data.connection || "-"}
						{data.office && <br />}
						{data.office?.toLowerCase()}
						<br />
						Telefon:{" "}
						{[toPhone(data.phone), toPhone(data.mobile)]
							.filter(Boolean)
							.join(" / ") || "+47 00 00 00 00"}
						<br />
						Besøksadresse:{" "}
						<a
							href={`https://maps.google.com/?q=${window.encodeURIComponent(data.visit || "Veigata 1, 2001 Byen")}`}
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
