import { useState } from "react";
import { Card, Flex, Togglegroup } from "../../designsystem/react";

type Part = Svg & { [key: string]: Part };
type Svg = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
const Parts = {} as Part;
const Skins = ["#F8E0D8", "#F9C4AA", "#C58F79", "#7F433B"];
const Under = [
	"#153F7B",
	"#0C4FA1",
	"#9ECCED",
	"#054449",
	"#116E6B",
	"#68B096",
	"#f9cc76",
	"#da573b",
];
const Apron = ["#CDE5F2", "#054449", "#f9cc76"];
const Over = [
	"#054449",
	"#68B096",
	"#E2F1DF",
	"#f9cc76",
	"#F9C4AA",
	"#da573b",
	"#9ECCED",
	"#CDE5F2",
];

for (const [file, el] of Object.entries(
	import.meta.glob<React.ReactElement<{ id: string }>>("./*.svg", {
		eager: true,
		query: "react",
		import: "default",
	}),
))
	file
		.replace(/.*\/([^/.]+)\..*/, "$1")
		.split("-")
		.reduce((acc, key, i, path) => {
			const Key = key[0].toUpperCase() + key.slice(1); // Make PascalCase
			acc[Key] = acc[Key] || (path[i + 1] ? {} : el);
			return acc[Key] as unknown as Part;
		}, Parts);

export function IllustrationGenerator() {
	const overdeler = Object.keys(Parts.Overdel);
	const handerVenstre = Object.keys(Parts.Hand.Venstre);
	const handerHoyre = Object.keys(Parts.Hand.Hoyre);

	const [apron, setApron] = useState(Apron[0]);
	const [skin, setSkin] = useState(Skins[0]);
	const [over, setOver] = useState(Over[0]);
	const [under, setUnder] = useState(Under[0]);
	const [overdel, setOverdel] = useState(overdeler[0]);
	const [handVenstre, setHandVenstre] = useState(handerVenstre[0]);
	const [handHoyre, setHandHoyre] = useState(handerHoyre[0]);

	const [hoverApron, setHoverApron] = useState("");
	const [hoverSkin, setHoverSkin] = useState("");
	const [hoverOver, setHoverOver] = useState("");
	const [hoverUnder, setHoverUnder] = useState("");
	const [hoverOverdel, setHoverOverdel] = useState("");
	const [hoverHandVenstre, setHoverHandVenstre] = useState("");
	const [hoverHandHoyre, setHoverHandHoyre] = useState("");

	const Overdel = Parts.Overdel[hoverOverdel || overdel];
	const HandVenstre = Parts.Hand.Venstre[hoverHandVenstre || handVenstre];
	const HandHoyre = Parts.Hand.Hoyre[hoverHandHoyre || handHoyre];

	return (
		<Flex data-gap="8">
			<div data-self="300" data-fixed>
				<legend>Hudtone</legend>
				<Togglegroup>
					{Skins.map((name) => (
						<Togglegroup.Item
							checked={skin === name}
							key={name}
							name="skin"
							onChange={() => setSkin(name)}
							onMouseEnter={() => setHoverSkin(name)}
							onMouseLeave={() => setHoverSkin("")}
							value={name}
						>
							<span
								style={{
									background: name,
									width: 20,
									height: 20,
									borderRadius: 99,
								}}
							/>
						</Togglegroup.Item>
					))}
				</Togglegroup>
				<legend>Farge overdel</legend>
				<Togglegroup>
					{Over.map((name) => (
						<Togglegroup.Item
							checked={over === name}
							key={name}
							name="over"
							onChange={() => setOver(name)}
							onMouseEnter={() => setHoverOver(name)}
							onMouseLeave={() => setHoverOver("")}
							value={name}
						>
							<span
								style={{
									background: name,
									width: 20,
									height: 20,
									borderRadius: 99,
								}}
							/>
						</Togglegroup.Item>
					))}
				</Togglegroup>
				<legend>Farge forkle</legend>
				<Togglegroup>
					{Apron.map((name) => (
						<Togglegroup.Item
							checked={apron === name}
							key={name}
							name="apron"
							onChange={() => setApron(name)}
							onMouseEnter={() => setHoverApron(name)}
							onMouseLeave={() => setHoverApron("")}
							value={name}
						>
							<span
								style={{
									background: name,
									width: 20,
									height: 20,
									borderRadius: 99,
								}}
							/>
						</Togglegroup.Item>
					))}
				</Togglegroup>
				<legend>Farge underdel</legend>
				<Togglegroup>
					{Under.map((name) => (
						<Togglegroup.Item
							checked={under === name}
							key={name}
							name="under"
							onChange={() => setUnder(name)}
							onMouseEnter={() => setHoverUnder(name)}
							onMouseLeave={() => setHoverUnder("")}
							value={name}
						>
							<span
								style={{
									background: name,
									width: 20,
									height: 20,
									borderRadius: 99,
								}}
							/>
						</Togglegroup.Item>
					))}
				</Togglegroup>
				<legend>Overdel</legend>
				<Togglegroup style={{ fontSize: "1.5em" }}>
					{overdeler.map((name) => {
						const Part = Parts.Overdel[name];
						return (
							<Togglegroup.Item
								checked={overdel === name}
								data-tooltip={name}
								key={name}
								name="overdel"
								onChange={() => setOverdel(name)}
								onMouseEnter={() => setHoverOverdel(name)}
								onMouseLeave={() => setHoverOverdel("")}
								value={name}
							>
								<Part x="0" y="0" width="100%" height="80%" />
							</Togglegroup.Item>
						);
					})}
				</Togglegroup>
				<legend>Hånd venstre</legend>
				<Togglegroup style={{ fontSize: "2em" }}>
					{handerVenstre.map((name) => {
						const Part = Parts.Hand.Venstre[name];
						return (
							<Togglegroup.Item
								checked={handVenstre === name}
								data-tooltip={name}
								key={name}
								name="hand-venstre"
								onChange={() => setHandVenstre(name)}
								onMouseEnter={() => setHoverHandVenstre(name)}
								onMouseLeave={() => setHoverHandVenstre("")}
								value={name}
							>
								<Part x="0" y="0" width="100%" height="80%" />
							</Togglegroup.Item>
						);
					})}
				</Togglegroup>
				<legend>Hånd høyre</legend>
				<Togglegroup style={{ fontSize: "2em" }}>
					{handerHoyre.map((name) => {
						const Part = Parts.Hand.Hoyre[name];
						return (
							<Togglegroup.Item
								checked={handHoyre === name}
								data-tooltip={name}
								key={name}
								name="hand-hoyre"
								onChange={() => setHandHoyre(name)}
								onMouseEnter={() => setHoverHandHoyre(name)}
								onMouseLeave={() => setHoverHandHoyre("")}
								value={name}
							>
								<Part x="0" y="0" width="100%" height="80%" />
							</Togglegroup.Item>
						);
					})}
				</Togglegroup>
			</div>
			<Card
				onClick={({ currentTarget: self }) => {
					navigator.clipboard.write([
						new ClipboardItem({
							"text/plain": self.innerHTML,
						}),
					]);
				}}
			>
				<style>{`
					:root {
						--color-apron: ${hoverApron || apron};
						--color-skin: ${hoverSkin || skin};
						--color-over: ${hoverOver || over};
						--color-under: ${hoverUnder || under};
						--color-shoes: #1E1A28;
					}
				`}</style>
				<svg viewBox="-1000 -500 2000 2000" width="100%" height="100%">
					<Parts.Bukse id="bukse" />
					<Overdel id="overdel" />
					<HandHoyre id="hand-hoyre" />
					<HandVenstre id="hand-venstre" />
					<Parts.Hode id="hode" />
				</svg>
			</Card>
		</Flex>
	);
}

// dangerouslySetInnerHTML={{
// 	__html: `
// 	<g id="underdel">
// 		${bukse}
// 	</g>
// 	<g id="overdel">
// 		${genser.replace("<svg", "<svg hidden")}
// 		${seletop.replace("<svg", "<svg hidden")}
// 	</g>
// 	${hode}
// 	`,
// }}
// />
