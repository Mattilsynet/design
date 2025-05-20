import {
	CheckCircleIcon,
	CopyIcon,
	DownloadSimpleIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Svg2Png } from "svg2png-converter";
import { Button, Card, Field, Flex, Grid, Select } from "../designsystem/react";
declare global {
	interface Window {
		SVGS: { file: string; categories: string[]; tags: string[]; svg: string }[];
	}
}

type SvgsProps = {
	path: string;
	showSearch?: boolean;
	reverse?: boolean;
	mode?: "light" | "dark" | null;
} & React.ComponentPropsWithoutRef<"div">;

export const Svgs = ({
	path,
	reverse,
	mode = null,
	showSearch = false,
	...rest
}: SvgsProps) => {
	const svgs = window.SVGS.filter((svg) => svg.file.startsWith(path));
	const allCategories = new Set(svgs.flatMap((svg) => svg.categories));
	const [showCategory, setCategory] = useState("");
	const [query, setQuery] = useState("");
	const toUTF8 = (str: string) =>
		encodeURIComponent(str).replace(/%([a-f0-9]{2})/gi, (_, $1) =>
			String.fromCharCode(Number.parseInt($1, 16)),
		);

	if (reverse) svgs.reverse();

	return (
		<Grid data-gap="8">
			{showSearch && (
				<Flex
					data-gap="4"
					style={{
						background:
							"linear-gradient(to top, transparent 0%, var(--mtds-color-surface-default) 75%)",
						paddingTop: "var(--mtds-4)",
						position: "sticky",
						top: 0,
						zIndex: 2,
					}}
				>
					<Field
						aria-label="Søk"
						as="input"
						onChange={({ target }) => setQuery(target.value.trim())}
						placeholder="Søk etter illustasjon"
						type="search"
					/>
					<Field data-self="200" data-fixed>
						<Select
							name="category"
							aria-label="Kategori"
							onChange={({ target }) => setCategory(target.value)}
							value={showCategory}
						>
							<option value="">Alle kategorier</option>
							{Array.from(allCategories, (cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</Select>
					</Field>
				</Flex>
			)}
			<Grid className="svgs" data-items="250" data-fixed {...rest}>
				{svgs
					.filter(
						({ categories, tags }) =>
							(!showCategory ||
								categories.some((cat) => showCategory === cat)) &&
							(!query || tags.some((tag) => tag.includes(query))),
					)
					.map(({ file, svg }) => {
						const light = mode === "light" && "#054449";
						const dark = mode === "dark" && "#E2F1DF";
						const html = toUTF8(
							svg.replace(/currentColor/g, light || dark || "currentColor"),
						);
						const name = file
							.split("/")
							.pop()
							?.replace(/\.[^.]+$/, `${dark ? "-dark" : ""}$&`);

						return (
							<div key={file}>
								<Card
									className="svg-card"
									data-color-scheme={mode === "dark" ? "dark" : undefined}
								>
									<div
										data-color="main"
										dangerouslySetInnerHTML={{ __html: html }}
									/>
									<Flex data-justify="center" data-size="sm">
										<Button
											aria-pressed="false"
											data-variant="secondary"
											data-tooltip="...til PowerPoint / Word etc."
											onClick={async ({ currentTarget: self }) => {
												const card = self?.closest(".svg-card");
												const svgEl = card?.querySelector(
													"svg",
												) as SVGSVGElement;
												const png = await Svg2Png.toDataURL(svgEl, {
													scaleX: 3,
													scaleY: 3,
												});

												navigator.clipboard.write([
													new ClipboardItem({
														"text/plain": new Blob([svg], {
															type: "text/plain",
														}),
														"image/png": await fetch(png).then((r) => r.blob()),
													}),
												]);

												// Show confirmation
												self.setAttribute("aria-pressed", "true");
												setTimeout(
													() => self.setAttribute("aria-pressed", "false"),
													2000,
												);
											}}
										>
											<CopyIcon data-pressed="false" />
											<CheckCircleIcon data-pressed="true" />
											<span data-pressed="false">Kopiér</span>
											<span data-pressed="true">Kopiert!</span>
										</Button>
										<Button
											data-tooltip={`Last ned ${name}`}
											download={name}
											href={encodeSVG(html)}
										>
											<DownloadSimpleIcon />
										</Button>
									</Flex>
								</Card>
							</div>
						);
					})}
				<style>{`
				.svg-card div > svg { aspect-ratio: 1; box-sizing: border-box; width: 100%; height: auto; padding: var(--mtds-12); transition: scale .2s }
      `}</style>
			</Grid>
		</Grid>
	);
};

const encodeSVG = (data: string) => {
	return `data:image/svg+xml,${data
		.replace(/"/g, `'`)
		.replace(/>\s{1,}</g, "><")
		.replace(/\s{2,}/g, " ")
		.replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent)}`;
};
