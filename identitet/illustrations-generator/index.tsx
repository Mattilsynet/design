import { PersonArmsSpreadIcon, PlusIcon } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import Moveable from "react-moveable";
import { Button, Card, Flex, Grid, Popover } from "../../designsystem/react";
import svg from "./index.svg?raw";

// TODO: Flip
// TODO: Config
// TODO: Backward/forward
// TODO: Persist
// TODO: Remove
// TODO: Hudtone, fargepalett, objekt bak

const OBJECTS = isBrowser()
	? new Map(
			Object.entries(window.GRAPHICS)
				.filter(([key]) => key.startsWith("illustrations/"))
				.map(([_, value]) => [value.name, value]),
		)
	: null;

export function IllustrationsGenerator() {
	const moveableRef = useRef<Moveable>(null);
	const objects = OBJECTS;
	const [target, setTarget] = useState<HTMLElement | SVGElement>();
	const [items, setItems] = useState<{ name: string; x: number; y: number }[]>(
		[],
	);

	return (
		<Grid>
			<style>{`
					.canvas { aspect-ratio: 17 / 6; position: relative; padding: 0 }
					.canvas > figure { position: absolute; top: 0; left: 0; margin: 0 }
					.thumbnail > svg { aspect-ratio: 1 / 1; width: var(--mtds-icon-size); height: auto }

					@supports (pointer-events: visiblePainted) {
						.canvas > figure { pointer-events: none }
						.canvas > figure > svg > * { pointer-events: visiblePainted }
					}
				`}</style>
			<Flex>
				<Button popoverTarget="add" data-variant="primary">
					<PlusIcon /> Legg til
				</Button>
				<Popover id="add" as="menu" data-overscroll="contain">
					<li>
						<Button popoverTargetAction="hide">
							<PersonArmsSpreadIcon weight="fill" /> Person
						</Button>
					</li>
					{Array.from(OBJECTS?.values() || [], ({ name, svg }) => (
						<li key={name}>
							<Button
								popoverTargetAction="hide"
								onClick={() => setItems([...items, { name, x: 0, y: 0 }])}
							>
								<span
									className="thumbnail"
									dangerouslySetInnerHTML={{ __html: svg }}
								/>
								{/* <svg viewBox={`${x} ${y} ${w} ${h}`}>
										<use key={value} href={`#${value}`} />
									</svg> */}
								{name}
							</Button>
						</li>
					))}
				</Popover>
			</Flex>
			<div hidden dangerouslySetInnerHTML={{ __html: svg }} />
			<Card
				className="canvas"
				onPointerDown={({ target: el }) => {
					if (moveableRef.current?.getControlBoxElement().contains(el as Node))
						return;
					const figure = (el as Element).closest?.("figure") || undefined;
					if (target !== figure) setTarget(figure);
				}}
				// <svg key={`${id}-${index + 1}`} viewBox={`${x} ${y} ${w} ${h}`}>
				// 	<use href={`#${id}`} />
				// </svg>
			>
				{items.map(({ name }, index) => (
					<figure
						key={`${name}-${index + 1}`}
						dangerouslySetInnerHTML={{ __html: objects?.get(name)?.svg || "" }}
					/>
				))}
				<Moveable
					bounds={{ left: 0, top: 0, right: 0, bottom: 0, position: "css" }}
					draggable
					edge
					keepRatio
					origin={false}
					ref={moveableRef}
					rotatable
					scalable
					snappable
					target={target}
					throttleRotate={5}
					onDragEnd={console.log}
					onRotateEnd={console.log}
					onScaleEnd={console.log}
					onRender={(e) => {
						console.log(e);
						e.target.style.cssText += e.cssText;
					}}
				/>
			</Card>
			{/* <svg
				width="100%"
				viewBox="-1700 -200 3400 1200"
				// onKeyDown={() => {}}
				// onClick={handleCopySvg}
			>
				{Array.from(selects, ([key, { value }]) => (
					<use
						id={`use-${key}`}
						key={key}
						href={`#${hovers[0] === key ? hovers[1] : value}`}
						role="button"
					/>
				))}
			</svg> */}
		</Grid>
	);
}
// function svgToSelects(innerHTML: string) {
// 	const div = Object.assign(tag("div"), { innerHTML });
// 	const map = new Map<string, Select>();

// 	for (const el of div.querySelectorAll("svg > [id]")) {
// 		const label = el.querySelector("title")?.textContent || el.id;
// 		const options = new Map<string, Option>(
// 			Array.from(el.querySelectorAll<SVGSymbolElement>("symbol"), (symbol) => [
// 				symbol.id,
// 				{
// 					value: symbol.id,
// 					label: symbol.querySelector("title")?.textContent || symbol.id,
// 					h: Number(attr(symbol, "height") || "1"),
// 					w: Number(attr(symbol, "width") || "1"),
// 					x: Number(attr(symbol, "x") || "0"),
// 					y: Number(attr(symbol, "y") || "0"),
// 				},
// 			]),
// 		);
// 		map.set(el.id, {
// 			label,
// 			options,
// 			value: Array.from(options.values())[0]?.value || el.id,
// 		});
// 	}
// 	div.innerHTML = "";
// 	return map;
// }

// const svgKeepInView = (el: SVGUseElement) => {
// 	const view = el.ownerSVGElement?.viewBox.baseVal as DOMRect;
// 	const rect = el.getBBox();
// 	const x = el.x.baseVal.value;
// 	const min = view.x - rect.x + x;
// 	const max = min + view.width - rect.width;

// 	if (x < min) el.x.baseVal.value = min;
// 	if (x > max) el.x.baseVal.value = max;
// };

// function handleCopySvg(event: React.MouseEvent<SVGSVGElement>) {
// 	const { currentTarget: svg } = event;
// 	const css = window.getComputedStyle(svg);

// 	window.navigator.clipboard.write([
// 		new ClipboardItem({
// 			"text/plain": new Blob(
// 				[
// 					svg.outerHTML
// 						.replace(
// 							/<use[^>]+href="#([^"]+)"[^>]*>(<\/use>?)/g,
// 							(_, id) => document.getElementById(id)?.outerHTML || "", // Replace <use> with the actual <svg> content
// 						)
// 						.replace(/(<\/?)symbol/g, "$1svg") // Replace <symbol> with <svg>
// 						.replace(/var\(([^)]+)\)/g, (_, key) => css.getPropertyValue(key)), // Replace CSS variables with their computed values
// 				],
// 				{ type: "text/plain" }, // TODO
// 			),
// 		}),
// 	]);
// }

// --color-apron: ${SWATCHES[swatchHover ?? swatch][2]};
// --color-hair: #1E1A28;
// --color-skin: ${SKINS[skinHover ?? skin]};
// --color-over: ${SWATCHES[swatchHover ?? swatch][0]};
// --color-under: ${SWATCHES[swatchHover ?? swatch][1]};
// --color-shoes: #1E1A28;
// --color-caps: #DA573B;
// --color-hat: #9ECCED;

/* <Flex ref={ref} data-gap="1">
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
			</Flex> */

// const [hovers, setHovers] = useState<string[]>([]);
// const [swatchHover, setSwatchHover] = useState<number | null>(null);
// const [skinHover, setSkinHover] = useState<number | null>(null);
// const [swatch, setSwatch] = useState(0);
// const [skin, setSkin] = useState(0);

// useEffect(() => {
// 	const hoyre = hovers[0] === "hoyre" && document.getElementById("use-hoyre");
// 	if (hoyre instanceof SVGUseElement) svgKeepInView(hoyre);
// }, [hovers]);

// const ICONS = {
// 	head: <LegoSmileyIcon />,
// 	antrekk: <TShirtIcon />,
// 	"hand-venstre": <HandSwipeRightIcon />,
// 	"hand-hoyre": <HandSwipeLeftIcon />,
// 	venstre: <ArrowBendLeftDownIcon />,
// 	hoyre: <SelectionBackgroundIcon />,
// };

// const SKINS = ["#F8E0D8", "#F9C4AA", "#C58F79", "#7F433B"];
// const SWATCHES = [
// 	["#054449", "#153F7B", "#CDE5F2"],
// 	["#054449", "#0C4FA1", "#CDE5F2"],
// 	["#054449", "#da573b", "#CDE5F2"],
// 	["#054449", "#68B096", "#CDE5F2"],
// 	["#68B096", "#da573b", "#CDE5F2"],
// 	["#f9cc76", "#054449", "#CDE5F2"],
// 	["#f9cc76", "#da573b", "#CDE5F2"],
// 	["#f9cc76", "#68B096", "#054449"],
// 	["#f9cc76", "#153F7B", "#CDE5F2"],
// 	["#da573b", "#153F7B", "#CDE5F2"],
// 	["#9ECCED", "#054449", "#CDE5F2"],
// 	["#68B096", "#054449", "#CDE5F2"],
// 	// ["#f9c4aa", "#054449", "#CDE5F2"], // Removed to avoid "nakedness"
// 	// ["#f9c4aa", "#153F7B", "#CDE5F2"], // Removed to avoid "nakedness"
// ];

// import { attr, isBrowser, tag } from "../../designsystem/utils";
// type Select = { value?: string; label: string; options: Map<string, Option> };
// type Option = {
// 	value: string;
// 	label: string;
// 	h: number;
// 	w: number;
// 	x: number;
// 	y: number;
// };
// const SVGS = isBrowser() ? svgToSelects(svg) : null;
// ArrowBendLeftDownIcon,
// HandSwipeLeftIcon,
// HandSwipeRightIcon,
// LegoSmileyIcon,
// SelectionBackgroundIcon,
// TShirtIcon,
