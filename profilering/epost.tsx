import {
	ArrowSquareOutIcon,
	DeviceMobileIcon,
	IdentificationBadgeIcon,
	MapPinAreaIcon,
	MapTrifoldIcon,
	PhoneIcon,
	UserIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Button, Field, Fieldset, Flex, Grid } from "../designsystem/react";
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
		<Flex data-items="500" data-gap="6">
			<Grid
				as="form"
				data-self="200"
				onSubmit={(event) => event.preventDefault()}
				onInput={onInput}
				data-gap="5"
			>
				<Field
					as="input"
					label={
						<>
							<UserIcon /> Fullt navn
						</>
					}
					name="name"
					value={data.name}
				/>
				<Field
					as="input"
					label={
						<>
							<IdentificationBadgeIcon /> Stillingstittel
						</>
					}
					name="position"
					value={data.position}
				/>
				<Fieldset>
					<legend>
						<IdentificationBadgeIcon aria-hidden="true" /> Tilknytning
					</legend>
					<Flex>
						<Field
							as="input"
							label="Hovedkontoret"
							name="connection"
							type="radio"
							value="hovedkontoret"
							onChange={() => setData({ ...data, connection: "hovedkontoret" })}
							checked={data.connection === "hovedkontoret"}
						/>
						<Field
							as="input"
							label="Tilsynet"
							name="connection"
							type="radio"
							value="tilsynet"
							onChange={() => setData({ ...data, connection: "tilsynet" })}
							checked={data.connection === "tilsynet"}
						/>
					</Flex>
				</Fieldset>
				<Field
					as="input"
					label={
						<>
							<MapPinAreaIcon aria-hidden="true" /> Seksjon/avdeling
						</>
					}
					name="office"
					placeholder="Seksjon/avdeling"
					value={data.office}
				/>
				<Field
					as="input"
					label={
						<>
							<PhoneIcon /> Telefon
						</>
					}
					name="phone"
					value={data.phone}
				/>
				<Field
					as="input"
					label={
						<>
							<DeviceMobileIcon /> Mobil
						</>
					}
					name="mobile"
					value={data.mobile}
				/>
				<Field
					as="input"
					label={
						<>
							<MapTrifoldIcon /> Besøksadresse
						</>
					}
					description={
						<a
							href="https://www.mattilsynet.no/kontakt-oss/finn-kontorsted"
							target="_blank"
							rel="noreferrer"
						>
							Se kontorsteder <ArrowSquareOutIcon />
						</a>
					}
					name="visit"
					value={data.visit}
				/>
			</Grid>
			<Grid data-gap="md" data-align-content="start">
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
							href="https://www.mattilsynet.no/kontakt-oss"
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
				<style>{".sbdocs-content a img { margin: 0 }"}</style>
				<Button
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
				</Button>
			</Grid>
		</Flex>
	);
}
