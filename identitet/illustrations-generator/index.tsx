import { useEffect, useRef, useState } from "react";
import type { UHTMLComboboxElement } from "../../designsystem";
import { Card, Field, Flex, Input, Prose } from "../../designsystem/react";
import svg from "./index.svg?raw"; // Assuming all parts are exported from this file

type Option = { value: string; label: string };
type Select = { value?: string; label: string; options: Option[] };
const VOID = () => {};
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

export function IllustrationsGenerator() {
	const ref = useRef<HTMLDivElement>(null);
	const [selects, setSelects] = useState(new Map<string, Select>());
	const [hovers, setHovers] = useState<Record<string, string>>({});
	const [apron] = useState(Apron[0]);
	const [skin] = useState(Skins[2]);
	const [over] = useState(Over[0]);
	const [under] = useState(Under[0]);

	useEffect(() => {
		const self = ref.current;
		const onChange = ({ detail, target }: CustomEvent<HTMLDataElement>) => {
			const key = (target as UHTMLComboboxElement).control?.name || "";
			const { value } = detail;

			setSelects((prev) =>
				new Map(prev).set(key, { ...(prev.get(key) as Select), value }),
			);
		};

		setSelects(svgToSelects(svg));
		self?.addEventListener("afterchange", onChange);
		return () => self?.removeEventListener("afterchange", onChange);
	}, []);

	return (
		<>
			<div hidden dangerouslySetInnerHTML={{ __html: svg }} />
			<style>{`:root {
				--color-apron: ${apron};
				--color-hair: #1E1A28;
				--color-skin: ${skin};
				--color-over: ${over};
				--color-under: ${under};
				--color-shoes: #1E1A28;
				--color-caps: #DA573B;
				--color-hat: #9ECCED;
			}`}</style>
			<Card>
				<Flex>
					<Prose data-self="300" data-fixed ref={ref}>
						{Array.from(selects)
							.filter(([, { options }]) => options.length)
							.map(([key, { options, label }]) => (
								<Field key={key}>
									<label>{label}</label>
									<Field.Combobox>
										<data value={options[0]?.value}>{options[0]?.label}</data>
										<Input name={key} />
										<Field.Datalist data-nofilter>
											{options.map(({ value, label }) => (
												<Field.Option
													key={value}
													value={value}
													onMouseEnter={() => setHovers({ key, value })}
													onMouseLeave={() => setHovers({})}
												>
													<svg>
														<use key={value} href={`#${value}`} />
													</svg>
													{label}
												</Field.Option>
											))}
										</Field.Datalist>
									</Field.Combobox>
								</Field>
							))}
					</Prose>
					<svg
						width="100%"
						height="500"
						viewBox="-200 -200 400 1200"
						onKeyDown={VOID}
						onClick={({ currentTarget: svg }) => {
							const css = window.getComputedStyle(svg);
							navigator.clipboard.write([
								new ClipboardItem({
									"text/plain": new Blob(
										[
											svg.outerHTML
												.replace(
													/<use[^>]+href="#([^"]+)"[^>]*>(<\/use>?)/g,
													(_, id) =>
														document.getElementById(id)?.outerHTML || "",
												)
												.replace(/(<\/?)symbol/g, "$1svg")
												.replace(/var\(([^\)]+)\)/g, (_, prop) =>
													css.getPropertyValue(prop),
												),
										],
										{ type: "text/plain" },
									),
								}),
							]);
						}}
					>
						{Array.from(selects, ([key, { value }]) => (
							<use
								key={key}
								href={`#${hovers.key === key ? hovers.value : value}`}
							/>
						))}
					</svg>
				</Flex>
			</Card>
		</>
	);
}

function svgToSelects(innerHTML: string) {
	const div = Object.assign(document.createElement("div"), { innerHTML });
	const map = new Map();

	for (const el of div.querySelectorAll("svg > [id]")) {
		const label = el.querySelector("title")?.textContent || el.id;
		const options = Array.from(el.querySelectorAll("symbol"), (symbol) => ({
			value: symbol.id,
			label: symbol.querySelector("title")?.textContent || symbol.id,
		}));
		map.set(el.id, { label, options, value: options[0]?.value || el.id });
	}
	div.innerHTML = "";
	return map;
}
