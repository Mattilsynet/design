import {
	ArrowBendLeftDownIcon,
	ArrowBendRightDownIcon,
	HandSwipeLeftIcon,
	HandSwipeRightIcon,
	LegoSmileyIcon,
	TShirtIcon,
} from "@phosphor-icons/react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Button, Card, Flex, Popover } from "../../designsystem/react";
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
// const DOTS = {
// 	head: [0, -50],
// 	overdel: [0, 150],
// 	"hand-venstre": [-150, 150],
// 	"hand-hoyre": [150, 150],
// 	venstre: [-500, 600],
// 	hoyre: [500, 600],
// };

const ICONS = {
	head: <LegoSmileyIcon />,
	overdel: <TShirtIcon />,
	"hand-venstre": <HandSwipeRightIcon />,
	"hand-hoyre": <HandSwipeLeftIcon />,
	venstre: <ArrowBendLeftDownIcon />,
	hoyre: <ArrowBendRightDownIcon />,
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
	const dragging = useSvgDraggable();

	useEffect(() => setSelects(svgToSelects(svg)), []); // Parse selects

	return (
		<Card>
			<div hidden dangerouslySetInnerHTML={{ __html: svg }} />
			<Flex ref={ref} data-gap="1">
				{Array.from(selects)
					.filter(([, { options }]) => options.length)
					.map(([key, select]) => (
						<Fragment key={key}>
							<Button
								data-variant="secondary"
								data-tooltip={select.label}
								popoverTarget={`popover-${key}`}
								onPointerEnter={({ currentTarget: el }) =>
									el.matches(":has(+ :popover-open)") || el.click()
								}
							>
								{ICONS[key as keyof typeof ICONS] || <LegoSmileyIcon />}
							</Button>
							<Popover
								as="menu"
								id={`popover-${key}`}
								style={{ width: 300 }}
								data-overscroll="contain"
							>
								{select.options.map(({ value, label }) => (
									<li key={value}>
										<Button
											// data-tooltip={label}
											data-variant={
												select.value === value ? "secondary" : "tertiary"
											}
											aria-current={select.value === value}
											onMouseEnter={() => setHovers({ key, value })}
											onMouseLeave={() => setHovers({})}
											onClick={() =>
												setSelects(selects.set(key, { ...select, value }))
											}
											value={value}
										>
											{label}
											{/* <svg
												style={{ width: "100%", height: 40 }}
												viewBox={`${x} ${y} ${w} ${h}`}
											>
												<use key={value} href={`#${value}`} />
											</svg> */}
										</Button>
									</li>
								))}
								{/* <Grid data-items="100" data-gap="1" data-fixed>
								</Grid> */}
							</Popover>
						</Fragment>
					))}
			</Flex>
			<svg
				width="100%"
				viewBox="-1700 -200 3400 1200"
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
				}`}</style>
				{Array.from(selects, ([key, { value }]) => (
					<use
						key={key}
						href={`#${hovers.key === key ? hovers.value : value}`}
						style={{ userSelect: "none" }}
						role="button"
						{...(key === "hoyre" ? dragging : null)}
					/>
				))}
				{/* {Array.from(selects)
					.filter(([, { options }]) => options.length)
					.map(([key, select]) => (
						<circle
							opacity={0}
							cx={DOTS[key as keyof typeof DOTS]?.[0] || 0}
							cy={DOTS[key as keyof typeof DOTS]?.[1] || 0}
							data-tooltip={select.label}
							fill="rgba(0,0,0,.1)"
							key={key}
							r="70"
							stroke="rgba(0,0,0,.5)"
							strokeOpacity={1}
							strokeWidth={10}
						/>
					))} */}
			</svg>
		</Card>
	);
}

const svgX = (x: number, matrix: DOMMatrix) =>
	new DOMPoint(x, 0).matrixTransform(matrix).x;

function useSvgDraggable() {
	const dragging = useRef({ x: 0, max: 0, min: 0, matrix: new DOMMatrix() });
	const [x, setX] = useState(0);

	const onDrag = useCallback(({ clientX }: MouseEvent) => {
		const { min, max, x, matrix } = dragging.current;
		setX(Math.max(min, Math.min(max, svgX(clientX, matrix) - x)));
	}, []);

	const onDrop = useCallback(() => {
		document.removeEventListener("pointermove", onDrag);
	}, [onDrag]);

	const onPointerDown = useCallback(
		({ currentTarget: el, clientX }: React.MouseEvent<SVGUseElement>) => {
			const drag = dragging.current;
			const view = el.ownerSVGElement?.viewBox.baseVal as DOMRect;
			const rect = el.getBBox();
			const x = el.x.baseVal.value;
			drag.matrix = el.closest("svg")?.getScreenCTM()?.inverse() as DOMMatrix; // Convert to SVG coordinates
			drag.min = view.x - rect.x + x;
			drag.max = view.x + view.width - rect.width - rect.x + x;
			drag.x = svgX(clientX, drag.matrix) - x;
			document.addEventListener("pointermove", onDrag);
			document.addEventListener("pointerup", onDrop, { once: true });
		},
		[onDrag, onDrop],
	);

	return { x, onPointerDown };
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
