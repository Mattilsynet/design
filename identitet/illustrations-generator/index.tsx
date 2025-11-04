import {
	ArrowBendLeftDownIcon,
	HandSwipeLeftIcon,
	HandSwipeRightIcon,
	LegoSmileyIcon,
	PaintBucketIcon,
	PersonIcon,
	SelectionBackgroundIcon,
	TShirtIcon,
} from "@phosphor-icons/react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Button, Card, Flex, Popover, Tag } from "../../designsystem/react";
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

const ICONS = {
	head: <LegoSmileyIcon />,
	antrekk: <TShirtIcon />,
	"hand-venstre": <HandSwipeRightIcon />,
	"hand-hoyre": <HandSwipeLeftIcon />,
	venstre: <ArrowBendLeftDownIcon />,
	hoyre: <SelectionBackgroundIcon />,
};

const SKINS = ["#F8E0D8", "#F9C4AA", "#C58F79", "#7F433B"];
const SWATCHES = [
	["#054449", "#153F7B", "#CDE5F2"],
	["#054449", "#0C4FA1", "#CDE5F2"],
	["#054449", "#da573b", "#CDE5F2"],
	["#054449", "#68B096", "#CDE5F2"],
	["#68B096", "#da573b", "#CDE5F2"],
	["#f9cc76", "#054449", "#CDE5F2"],
	["#f9cc76", "#da573b", "#CDE5F2"],
	["#f9cc76", "#68B096", "#054449"],
	["#f9cc76", "#153F7B", "#CDE5F2"],
	["#da573b", "#153F7B", "#CDE5F2"],
	["#9ECCED", "#054449", "#CDE5F2"],
	["#68B096", "#054449", "#CDE5F2"],
	// ["#f9c4aa", "#054449", "#CDE5F2"], // Removed to avoid "nakedness"
	// ["#f9c4aa", "#153F7B", "#CDE5F2"], // Removed to avoid "nakedness"
];

// TODO: Hudtone, fargepalett, objekt bak

export function IllustrationsGenerator() {
	const ref = useRef<HTMLDivElement>(null);
	const [selects, setSelects] = useState(new Map<string, Select>());
	const [hovers, setHovers] = useState<string[]>([]);
	const [swatchHover, setSwatchHover] = useState<number | null>(null);
	const [skinHover, setSkinHover] = useState<number | null>(null);
	const [swatch, setSwatch] = useState(0);
	const [skin, setSkin] = useState(0);
	const dragging = useSvgDraggable();

	useEffect(() => setSelects(svgToSelects(svg)), []); // Parse selects
	useEffect(() => {
		const hoyre = hovers[0] === "hoyre" && document.getElementById("use-hoyre");
		if (hoyre instanceof SVGUseElement) svgKeepInView(hoyre);
	}, [hovers]);

	return (
		<Card>
			<style>{`
				use[href^="#hoyre-"] { user-select: none; cursor: grab }
				use[href^="#hoyre-"]:hover { filter:${" drop-shadow(0 0 2px black)".repeat(5)} }
				use[href^="#hoyre-"]:active { cursor: grabbing }
			`}</style>
			<div hidden dangerouslySetInnerHTML={{ __html: svg }} />
			<Flex ref={ref} data-gap="1">
				<Button
					data-variant="secondary"
					data-tooltip="Farger"
					popoverTarget="pop-colors"
				>
					<PaintBucketIcon />
				</Button>
				<Popover as="menu" id="pop-colors" data-overscroll="contain">
					{SWATCHES.map((colors, index) => (
						<li key={colors.join(",")}>
							<Button
								onMouseEnter={() => setSwatchHover(index)}
								onMouseLeave={() => setSwatchHover(null)}
								onClick={() => setSwatch(index)}
							>
								{colors.map((color) => (
									<Tag
										key={color}
										style={{ background: color, aspectRatio: 1 }}
										data-icon="none"
									/>
								))}
							</Button>
						</li>
					))}
				</Popover>
				<Button
					data-variant="secondary"
					data-tooltip="Hudtone"
					popoverTarget="pop-skin"
				>
					<PersonIcon />
				</Button>
				<Popover as="menu" id="pop-skin" data-overscroll="contain">
					{SKINS.map((skin, index) => (
						<li key={skin}>
							<Button
								onMouseEnter={() => setSkinHover(index)}
								onMouseLeave={() => setSkinHover(null)}
								onClick={() => setSkin(index)}
							>
								<Tag
									style={{ background: skin, aspectRatio: 1 }}
									data-icon="none"
								/>
							</Button>
						</li>
					))}
				</Popover>
				{Array.from(selects)
					.filter(([, { options }]) => options.length)
					.map(([key, select]) => (
						<Fragment key={key}>
							<Button
								data-variant="secondary"
								data-tooltip={select.label}
								popoverTarget={`pop-${key}`}
							>
								{ICONS[key as keyof typeof ICONS] || <LegoSmileyIcon />}
							</Button>
							<Popover as="menu" id={`pop-${key}`} data-overscroll="contain">
								{select.options.map(({ value, label, x, y, w, h }) => (
									<li key={value}>
										<Button
											aria-current={select.value === value}
											onMouseEnter={() => setHovers([key, value])}
											onMouseLeave={() => setHovers([])}
											value={value}
											popoverTargetAction="hide"
											onClick={() =>
												setSelects(selects.set(key, { ...select, value }))
											}
										>
											<svg viewBox={`${x} ${y} ${w} ${h}`}>
												<use key={value} href={`#${value}`} />
											</svg>
											{label}
										</Button>
									</li>
								))}
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
					--color-apron: ${SWATCHES[swatchHover ?? swatch][2]};
					--color-hair: #1E1A28;
					--color-skin: ${SKINS[skinHover ?? skin]};
					--color-over: ${SWATCHES[swatchHover ?? swatch][0]};
					--color-under: ${SWATCHES[swatchHover ?? swatch][1]};
					--color-shoes: #1E1A28;
					--color-caps: #DA573B;
					--color-hat: #9ECCED;
				}`}</style>
				{Array.from(selects, ([key, { value }]) => (
					<use
						id={`use-${key}`}
						key={key}
						href={`#${hovers[0] === key ? hovers[1] : value}`}
						role="button"
						{...(key === "hoyre" ? dragging : null)}
					/>
				))}
			</svg>
		</Card>
	);
}

const svgX = (x: number, matrix: DOMMatrix) =>
	new DOMPoint(x, 0).matrixTransform(matrix).x;

const svgKeepInView = (el: SVGUseElement) => {
	const view = el.ownerSVGElement?.viewBox.baseVal as DOMRect;
	const rect = el.getBBox();
	const x = el.x.baseVal.value;
	const min = view.x - rect.x + x;
	const max = min + view.width - rect.width;

	if (x < min) el.x.baseVal.value = min;
	if (x > max) el.x.baseVal.value = max;
};

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
			const owner = el.ownerSVGElement;
			const view = owner?.viewBox.baseVal as DOMRect;
			const rect = el.getBBox();
			const x = el.x.baseVal.value;
			drag.matrix = owner?.getScreenCTM()?.inverse() as DOMMatrix; // Convert to SVG coordinates
			drag.min = view.x - rect.x + x;
			drag.max = drag.min + view.width - rect.width;
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
				h: Number(symbol.getAttribute("height") || "1"),
				w: Number(symbol.getAttribute("width") || "1"),
				x: Number(symbol.getAttribute("x") || "0"),
				y: Number(symbol.getAttribute("y") || "0"),
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
				{ type: "text/plain" }, // TODO
			),
		}),
	]);
}
