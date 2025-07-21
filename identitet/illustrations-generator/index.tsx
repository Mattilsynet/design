import { useEffect, useRef, useState } from "react";
import type { UHTMLComboboxElement } from "../../designsystem";
import { Card, Field, Flex, Input, Prose } from "../../designsystem/react";
import svg from "./index.svg?raw"; // Assuming all parts are exported from this file

type Select = { value?: string; label: string; options: Option[] };
type Option = {
	value: string;
	label: string;
	h: number;
	w: number;
	x: number;
	y: number;
};

const Skins = ["#F8E0D8", "#F9C4AA", "#C58F79", "#7F433B"];
const Apron = ["#CDE5F2", "#054449", "#f9cc76"];
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

// TODO: Hudtone, fargepalett, høyre og venstre objekt

export function IllustrationsGenerator() {
	const ref = useRef<HTMLDivElement>(null);
	const [selects, setSelects] = useState(new Map<string, Select>());
	const [hovers, setHovers] = useState<Record<string, string>>({});
	const [apron] = useState(Apron[0]);
	const [skin] = useState(Skins[2]);
	const [over] = useState(Over[0]);
	const [under] = useState(Under[0]);

	useEffect(() => setSelects(svgToSelects(svg)), []); // Parse selects

	const handleChange = (event: CustomEvent<HTMLDataElement>) => {
		const key = (event.target as UHTMLComboboxElement).control?.name || "";
		const { value } = event.detail;

		setSelects((prev) =>
			new Map(prev).set(key, { ...prev.get(key), value } as Select),
		);
	};

	return (
		<>
			<div hidden dangerouslySetInnerHTML={{ __html: svg }} />
			<Card>
				<Flex>
					<Prose data-self="300" data-fixed ref={ref}>
						{Array.from(selects)
							.filter(([, { options }]) => options.length)
							.map(([key, { options, label }]) => (
								<Field key={key}>
									<label>{label}</label>
									<Field.Combobox onAfterChange={handleChange}>
										<data value={options[0]?.value}>{options[0]?.label}</data>
										<Input name={key} />
										<Flex as={Field.Datalist} data-nofilter>
											{options.map(({ value, label, x, y, w, h }) => (
												<Field.Option
													key={value}
													value={value}
													label={label}
													data-tooltip={label}
													onMouseEnter={() => setHovers({ key, value })}
													onMouseLeave={() => setHovers({})}
													style={{ outline: "1px solid" }}
												>
													<svg
														style={{ width: 50, height: 50 }}
														viewBox={`${x} ${y} ${w} ${h}`}
													>
														<use key={value} href={`#${value}`} />
													</svg>
												</Field.Option>
											))}
										</Flex>
									</Field.Combobox>
								</Field>
							))}
					</Prose>
					<svg
						width="100%"
						height="500"
						viewBox="-200 -200 400 1200"
						onKeyDown={() => {}}
						onClick={handleCopySvg}
					>
						<style>{`:root {
							--color-apron: ${apron};
							--color-hair: #1E1A28;
							--color-skin: ${skin};
							--color-over: ${over};
							--color-under: ${under};
							--color-shoes: #1E1A28;
							--color-caps: #DA573B;
							--color-hat: #9ECCED;
						}
						`}</style>
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
		const options = Array.from(
			el.querySelectorAll<SVGSymbolElement>("symbol"),
			(symbol) => ({
				value: symbol.id,
				label: symbol.querySelector("title")?.textContent || symbol.id,
				h: Number.parseFloat(symbol.getAttribute("height") || "1"),
				w: Number.parseFloat(symbol.getAttribute("width") || "1"),
				x: Number.parseFloat(symbol.getAttribute("x") || "0"),
				y: Number.parseFloat(symbol.getAttribute("y") || "0"),
			}),
		);
		map.set(el.id, { label, options, value: options[0]?.value || el.id });
	}
	div.innerHTML = "";
	return map;
}

function handleCopySvg(event: React.MouseEvent<SVGSVGElement>) {
	const { currentTarget: svg } = event;
	const css = window.getComputedStyle(svg);

	window.navigator.clipboard.write([
		new ClipboardItem({
			"text/plain": new Blob(
				[
					svg.outerHTML
						.replace(
							/<use[^>]+href="#([^"]+)"[^>]*>(<\/use>?)/g,
							(_, id) => document.getElementById(id)?.outerHTML || "", // Replace <use> with the actual <svg> content
						)
						.replace(/(<\/?)symbol/g, "$1svg") // Replace <symbol> with <svg>
						.replace(/var\(([^)]+)\)/g, (_, key) => css.getPropertyValue(key)), // Replace CSS variables with their computed values
				],
				{ type: "text/plain" },
			),
		}),
	]);
}
