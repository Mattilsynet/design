import { HotTable, type HotTableRef } from "@handsontable/react-wrapper";
import type { ChangeSource } from "handsontable/common";
import { nbNO, registerLanguageDictionary } from "handsontable/i18n";
import { registerAllModules } from "handsontable/registry";
import { useCallback, useRef, useState } from "react";
import {
	Button,
	Card,
	Chart,
	Flex,
	Grid,
	Group,
	Popover,
} from "../../designsystem/react";
import styles from "../../designsystem/styles.module.css";
import css from "../../designsystem/styles.module.css?inline";
import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-main.min.css";
import "./infografikk-generator.css";
import { CopyIcon } from "@phosphor-icons/react";
import { toast } from "../../designsystem";
import type { MTDSChartElement } from "../../designsystem/chart/chart-element";
import { tag } from "../../designsystem/utils";

registerAllModules();
registerLanguageDictionary(nbNO);

type Data = {
	chart: typeof DEMO;
	ratio: (typeof RATIOS)[number];
	type: (typeof TYPES)[number][0];
};

const STORE_ID = "chart-generator";
const DEMO = [
	["", "Q1", "Q2"],
	["Dataset 1", 10, 20],
	["Dataset 2", 40, 30],
];
const TYPES = [
	["column", "Stående"],
	["column-stacked", "Stående stablet"],
	["bar", "Liggende"],
	["bar-stacked", "Liggende stablet"],
	["line", "Linje"],
	["area", "Område"],
	["pie", "Pai"],
	["doughnut", "Smultring"],
] as const;
const RATIOS = [
	"2:1",
	"1:2",
	"16:9",
	"9:16",
	"3:2",
	"2:3",
	"4:3",
	"3:4",
	"5:4",
	"4:5",
	"1:1",
] as const;

export const InfografikkGenerator = () => {
	const debounce = useRef<ReturnType<typeof setTimeout> | number>(0);
	const jsonRef = useRef<string>(null);
	const tableRef = useRef<HotTableRef>(null);
	const [{ chart, ratio, type }, setData] = useState<Data>({
		chart: DEMO,
		ratio: RATIOS[0],
		type: TYPES[0][0],
	});

	const handleLoad = useCallback((_: unknown, source: ChangeSource) => {
		if (source !== "loadData") return;
		setData((prev) => {
			jsonRef.current = localStorage.getItem(STORE_ID) || JSON.stringify(prev);
			const data = JSON.parse(jsonRef.current);
			tableRef.current?.hotInstance?.loadData(data.chart);
			return data;
		});
	}, []);

	const handleSave = useCallback(() => {
		clearTimeout(debounce.current);
		debounce.current = setTimeout(() => {
			setData((prev) => {
				const chart = tableRef.current?.hotInstance?.getData() as typeof DEMO;
				const next = { ...prev, chart };
				const json = JSON.stringify(next);
				const isChanged = chart && jsonRef.current !== json;

				if (!isChanged) return prev; // Skips update sinces we return previous value
				jsonRef.current = json;
				localStorage.setItem(STORE_ID, json);
				return next;
			});
		}, 300);
	}, []);

	return (
		<Flex className="chart-generator">
			{/* Must be outside Chart so it doesn't get exported */}
			<Card data-pad="8" data-self="350">
				<div style={{ maxWidth: 400, marginInline: "auto" }}>
					<Chart
						data-variant={type}
						data-aspect={ratio.replace(":", "/")}
						data={chart.slice(0, -1).map((row) => row.slice(0, -1))}
					/>
				</div>
			</Card>
			<Grid
				as={Group}
				style={{ flexBasis: 600 }}
				data-align-content="start"
				data-gap="5"
				data-pad="8"
			>
				<Flex data-self="400" data-align="center">
					<Button data-variant="secondary" data-arrow popoverTarget="type-pop">
						Diagramtype
					</Button>
					<Popover
						id="type-pop"
						data-position="bottom-start"
						style={{ width: 500 }}
					>
						<Grid data-items="200">
							{TYPES.map(([value, label]) => (
								<Button
									aria-pressed={type === value}
									data-justify="start"
									key={value}
									onClick={() => setData((prev) => ({ ...prev, type: value }))}
								>
									<div style={{ flex: "0 0 70px", pointerEvents: "none" }}>
										<Chart
											data-legend={false}
											data-variant={value}
											data={DEMO}
											style={{
												width: 200,
												height: 100,
												scale: 0.35,
												margin: "-25px -70px",
											}}
										/>
									</div>
									{label}
								</Button>
							))}
						</Grid>
					</Popover>
					<Button data-variant="secondary" data-arrow popoverTarget="size-pop">
						Størrelse
					</Button>
					<Popover id="size-pop" style={{ width: 400 }}>
						<Grid data-items="150">
							{RATIOS.map((value) => {
								const [width, height] = value.split(":").map(Number);
								const size = 25 / Math.max(width, height);

								return (
									<Button
										aria-pressed={value === ratio}
										data-justify="start"
										key={value}
										onClick={() =>
											setData((prev) => ({ ...prev, ratio: value }))
										}
									>
										<div
											style={{
												background: "var(--mtds-color-surface-tinted)",
												border: "1px solid var(--mtds-color-border-default)",
												borderRadius: "var(--mtds-border-radius-sm)",
												boxSizing: "border-box",
												height: size * height,
												marginInline: 25 - (size * width) / 2,
												width: size * width,
											}}
										/>
										{value}
									</Button>
								);
							})}
						</Grid>
					</Popover>
					<Button
						data-tooltip="Kan limes inn i PowerPoint, Word, Figma, etc."
						data-variant="primary"
						onClick={handleExport}
						style={{ marginLeft: "auto" }}
					>
						<CopyIcon /> Kopier infografikk
					</Button>
				</Flex>
				<HotTable
					afterChange={handleLoad}
					afterViewRender={handleSave}
					colHeaders
					fixedRowsTop={1}
					height="auto"
					language="nb-NO"
					licenseKey="non-commercial-and-evaluation"
					manualColumnMove
					manualRowMove
					minSpareCols={1}
					minSpareRows={1}
					navigableHeaders
					ref={tableRef}
					rowHeaders
					stretchH="all"
					tabNavigation
					themeName="ht-theme-main"
					width="100%"
					contextMenu={[
						"col_left",
						"col_right",
						"remove_col",
						"---------",
						"row_above",
						"row_below",
						"remove_row",
						"---------",
						"undo",
						"redo",
					]}
				/>
			</Grid>
		</Flex>
	);
};

const svgToCanvas = async (svg: SVGSVGElement) => {
	// Convert SVG to Image
	const img = await new Promise<HTMLImageElement>((resolve) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(svg))}`;
	});

	// Convert Image to Canvas
	const canvas = tag("canvas");
	const context = canvas.getContext("2d") as CanvasRenderingContext2D;
	const ratio = window.devicePixelRatio || 1;
	canvas.width = svg.width.baseVal.value * ratio;
	canvas.height = svg.height.baseVal.value * ratio;
	context.imageSmoothingEnabled = false;
	context.drawImage(img, 0, 0, canvas.width, canvas.height);

	return canvas;
};

const handleExport = async () => {
	const chart = document.querySelector("mtds-chart") as MTDSChartElement;
	const extend = 20; // Extend size to avoid cropping text at edges
	const width = chart.offsetWidth + extend;
	const height = chart.offsetHeight + extend; // Extra space for number in axis

	// Convert shadow DOM to light DOM with all styles inlined
	const html = `<div${chart.outerHTML.match(/<mtds-chart([^>]*)/)?.[1] || ""} class="${styles.body} chart" style="box-sizing:border-box;width:${width}px;height:${height}px;padding:${extend}px"><style>${css.replace(/mtds-chart/g, ".chart")}.${styles.body}{background:none}</style>${chart?.shadowRoot?.innerHTML.replace(/:host\(([^)]+)\)/g, ".chart$1")}</div>`;

	// Convert HTML to SVG url using <foreignObject>
	const div = tag("div");
	div.innerHTML = `<svg width="${width}" height="${height}"><foreignObject x="0" y="0" width="${width}" height="${height}">${html.replace(/[\n\t]/g, "")}</foreignObject></svg>`;
	const svg = div.firstElementChild as SVGSVGElement;

	navigator.clipboard.write([
		new ClipboardItem({
			// For PowerPoint, Word, etc. (PNG is more widely supported than SVG) - Note: must be placed first for PowerPoint to prefer it
			"image/png": new Promise((resolve) => {
				svgToCanvas(svg).then((canvas) => {
					canvas.toBlob((blob) => resolve(blob || ""), "image/png");
				});
			}),
			// For Figma, put in SVG so it is correctly sized
			"text/plain": svgToCanvas(svg).then((canvas) => {
				toast.success("Infografikk kopiert til utklippstavlen");
				const svg = `<svg id="Infografikk" title="Infografikk" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><image width="${width}" height="${height}" href="${canvas.toDataURL("image/png")}" /></svg>`;
				return new Blob([svg], { type: "text/plain" });
			}),
		}),
	]);
};
