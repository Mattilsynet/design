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

function toPhone(value = "", mobile = false) {
	let number = value.replace(/[^\d+]+/g, "").replace(/^(00|\+)47/, "");

	if (mobile) number = number.replace(/(\d{3})(\d{2})(\d{3})/, "$1 $2 $3");
	else number = number.replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4");

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
					/>
				</div>
				<div className={styles.field}>
					<label>
						<MapPinArea aria-hidden="true" /> Kontorsted
					</label>
					<input
						className={styles.input}
						name="office"
						type="text"
						autoComplete="off"
						value={data.office}
					/>
				</div>
				<div className={styles.field}>
					<label>
						<Graph aria-hidden="true" /> Seksjon
					</label>
					<input
						className={styles.input}
						name="section"
						type="text"
						autoComplete="off"
						value={data.section}
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
					/>
				</div>
				<div className={styles.field}>
					<div
						className={styles.flex}
						data-justify="space-between"
						style={{ width: "100%" }}
					>
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
					</div>
					<input
						className={styles.input}
						name="visit"
						type="text"
						autoComplete="off"
						value={data.visit}
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
						border: "1px solid var(--mt-divider)",
					}}
				>
					<div
						style={{
							fontFamily: "Avenir, Avenir Next, sans-serif",
							fontSize: 11,
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
						Mattilsynet, {data.office || "kontorsted"},{" "}
						{data.section || "seksjon"}
						<br />
						<br />
						Telefon:{" "}
						{[toPhone(data.phone), toPhone(data.mobile, true)]
							.filter(Boolean)
							.join(" / ") || "000 000 000"}
						<br />
						Besøksadresse: {data.visit || "Veigata 1, 2001 Byen"}
						<br />
						Felles postadresse: Mattilsynet, hovedkontoret, felles postmottak,
						postboks 383, 2381 Brumunddal
						<br />
						E-post:{" "}
						<a
							href="mailto:postmottak@mattilsynet.no"
							style={{ color: "inherit" }}
						>
							postmottak@mattilsynet.no
						</a>
						<br />
						<a href="https://mattilsynet.no" style={{ color: "inherit" }}>
							mattilsynet.no
						</a>
						<br />
						<br />
						<img alt="Mattilsynet" src="/docs/logo-epost.png" width="232" />
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
