import { MagnifyingGlassMinusIcon, StarIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import type { MTDSAtlasElement } from "../atlas";
import {
	Button,
	Details,
	Flex,
	Group,
	Heading,
	Popover,
	Prose,
	toast,
} from "../react";
import { Atlas } from "../react-atlas";

const meta = {
	title: "Designsystem/Atlas",
	parameters: {
		layout: "padded",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const LOREM_IPSUM =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque finibus dui id efficitur lobortis. Aliquam erat volutpat. Pellentesque imperdiet consectetur posuere. Donec ultrices libero eu velit egestas tincidunt. Suspendisse placerat risus non tellus faucibus, eu ultricies augue tempus. Donec vestibulum arcu diam, efficitur auctor lectus placerat vel. Nullam aliquam turpis vel mollis pharetra. Etiam eget pulvinar dui, imperdiet congue nisi. Nullam vel finibus risus. Ut sodales luctus odio quis interdum. Donec ligula quam, viverra vitae finibus a, bibendum quis odio. Quisque sodales erat volutpat condimentum maximus. Sed eget augue sed ligula congue hendrerit id sed turpis. Fusce nec leo fringilla, faucibus turpis a, tristique est. In ac semper libero, nec lacinia tellus.";

export const Default: Story = {
	parameters: {
		showInOverview: false,
	},
	render: () => <mtds-atlas />,
};

export const React: Story = {
	parameters: {
		showInOverview: false,
	},
	render: () => <Atlas />,
};

export const WithView: Story = {
	render: () => <Atlas data-view="63.431958, 10.397461, 12" />,
};

export const WithViewAdvanced: Story = {
	render: function Render() {
		const atlasRef = useRef<MTDSAtlasElement>(null);
		const [open, setOpen] = useState<(typeof markers)[number]>();
		const markers = [
			{
				latlng: "59.910815, 10.754078",
				summary: "Oslo",
				content: "Informasjon om Oslo",
			},
			{
				latlng: "63.431958, 10.397461",
				summary: "Trondheim",
				content: "Informasjon om Trondheim",
			},
			{
				latlng: "60.391449, 5.324119",
				summary: "Bergen",
				content: "Informasjon om Bergen",
			},
		];

		// TODO: Typing click events
		// useEffect(() => {
		// 	const self = atlasRef.current;
		// 	const handleClick = (event: L.LeafletMouseEvent) => {
		// 		toast(<code>{JSON.stringify(event.latlng)}</code>);
		// 	};

		// 	self?.addEventListener("click", handleClick);
		// 	return () => self?.removeEventListener("click", handleClick);
		// }, []);

		return (
			<Flex data-items="400" data-nowrap>
				<Atlas ref={atlasRef} data-view={open ? `${open.latlng}, 14` : "fit"}>
					{markers.map((marker) => (
						<Atlas.Marker
							key={marker.summary}
							data-tooltip={marker.summary}
							data-latlng={marker.latlng}
							onClick={() => setOpen(marker)}
						/>
					))}
				</Atlas>
				<Group as={Prose} data-items="200" data-fixed>
					{markers.map((marker) => (
						<Details
							key={marker.summary}
							open={open?.summary === marker.summary}
							name="place"
						>
							<Details.Summary onClick={() => setOpen(marker)}>
								{marker.summary}
							</Details.Summary>
							<div>{marker.content}</div>
						</Details>
					))}
					<Button onClick={() => setOpen(undefined)}>
						<MagnifyingGlassMinusIcon /> Zoom ut
					</Button>
				</Group>
			</Flex>
		);
	},
};

export const WithColor: Story = {
	render: () => (
		<mtds-atlas data-tiles="color" data-view="63.431958, 10.397461, 12" />
	),
};

export const WithCustomSize: Story = {
	render: () => (
		<mtds-atlas style={{ width: "100%", height: "calc(100vh - 30px)" }} />
	),
};

export const WithMarker: Story = {
	render: () => (
		<Atlas data-view="60.722, 10.989, 16">
			<Atlas.Marker data-latlng="60.7223, 10.9861" aria-label="Min markør" />
			<Atlas.Marker
				data-latlng="60.72235, 10.9837"
				aria-label="Min markør med stjerne"
			>
				<StarIcon weight="fill" />
			</Atlas.Marker>
			<Atlas.Marker
				data-latlng="60.7222, 10.988"
				aria-label="Min markør med tekst"
			>
				A
			</Atlas.Marker>
		</Atlas>
	),
};
export const WithMarkerStyling: Story = {
	render: () => (
		<Atlas data-view="60.722, 10.989, 16">
			<Atlas.Marker
				data-latlng="60.72235, 10.9837"
				aria-label="Min markør rød"
				data-color="danger"
			/>
			<Atlas.Marker
				data-latlng="60.7223, 10.9861"
				aria-label="Min markør styled"
				style={
					{
						"--mtdsc-atlas-marker-size": "var(--mtds-10)",
						"--mtdsc-atlas-marker-inset": "var(--mtds-2)",
						"--mtdsc-atlas-marker-color": "var(--mtds-color-info-base-default)",
						"--mtdsc-atlas-marker-border": "2px solid",
						"--mtdsc-atlas-marker-background":
							"var(--mtds-color-info-base-contrast-default)",
					} as React.CSSProperties
				}
			/>
		</Atlas>
	),
};

const getRandomCoordinates = (lat = 60.722, lng = 10.985) =>
	Array.from({ length: 100 }, () => {
		return `${lat + (Math.random() - 0.5) * 0.025}, ${lng + (Math.random() - 0.5) * 0.1}`;
	});

export const WithClustering: Story = {
	render: () => (
		<Atlas data-view={"60.722, 10.985, 12"} data-cluster="true">
			{getRandomCoordinates().map((latlng, index) => (
				<Atlas.Marker
					aria-label={`Markør ${index + 1}`}
					key={`${index + 1}`}
					data-latlng={latlng}
					popoverTarget="my-cluster-popover"
				/>
			))}
			<Popover id="my-cluster-popover">Popover</Popover>
		</Atlas>
	),
};

export const WithPopover: Story = {
	render: function Render() {
		return (
			<Atlas data-view="60.722, 10.985, 16">
				<Atlas.Marker
					aria-label="Markør 1"
					data-latlng="60.722, 10.985"
					popoverTarget="popover-1"
				/>
				<Atlas.Marker
					aria-label="Markør 2"
					data-latlng="60.721, 10.980"
					popoverTarget="popover-2"
				/>
				<Popover id="popover-1">Popover 1</Popover>
				<Popover id="popover-2">Popover 2</Popover>
			</Atlas>
		);
	},
};

export const WithPopoverDynamic: Story = {
	render: function Render() {
		const [open, setOpen] = useState(-1);
		const markers = [
			{ latlng: "60.722, 10.985", popover: "Min nydelige popover" },
			{
				latlng: "60.721, 10.980",
				popover: (
					<Prose>
						<Heading>Avansert popover</Heading>
						<p>Innhold</p>
					</Prose>
				),
			},
		];

		return (
			<Atlas data-view="60.722, 10.985, 16">
				{markers.map((marker, index) => (
					<Atlas.Marker
						aria-label={`Markør ${index + 1}`}
						data-latlng={marker.latlng}
						key={`${index + 1}`}
						onClick={() => setOpen(index)}
						popoverTarget="my-popover"
					/>
				))}
				<Popover id="my-popover">{markers[open]?.popover}</Popover>
			</Atlas>
		);
	},
};

export const WithMatgeo: Story = {
	render: () => {
		const [content, setContent] = useState("");

		return (
			<Atlas data-view="60.722, 10.985, 16">
				<Atlas.Matgeo
					data-collection="bygg"
					popoverTarget="my-matgeo-popover"
					onFeatureClick={(event) => {
						setContent(
							JSON.stringify(event.detail.feature?.properties, null, " "),
						);
					}}
				/>
				<Popover as={Prose} id="my-matgeo-popover">
					<pre data-size="sm">{content}</pre>
				</Popover>
			</Atlas>
		);
	},
};

export const WithTooltip: Story = {
	render: () => (
		<Atlas data-view="60.722, 10.985, 16">
			<Atlas.Marker data-latlng="60.722, 10.985" data-tooltip="Mitt tooltip" />
		</Atlas>
	),
};

export const WithClickToAddMarker: Story = {
	render: function Render() {
		const atlasRef = useRef<MTDSAtlasElement>(null);
		const [markers, setMarkers] = useState<string[]>([]);

		return (
			<>
				<Atlas
					role="application"
					ref={atlasRef}
					data-cursor="pointer"
					data-view="60.722, 10.985, 16"
					onClick={({ currentTarget: atlas, clientX, clientY, target }) => {
						if (atlas !== target) return; // Only add if clicking directly on map
						const latlng = atlas.latLngFromPoint(clientX, clientY);
						setMarkers([...markers, `${latlng?.lat}, ${latlng?.lng}`]);
						toast(<code>{`${latlng}`}</code>);
					}}
				>
					{markers.map((latlng, index) => (
						<Atlas.Marker
							key={`${index + 1}`}
							data-latlng={latlng}
							aria-label={`Markør ${index + 1}`}
							draggable
							onClick={() => {
								const clone = [...markers];
								clone.splice(index, 1); // Remove marker
								setMarkers(clone);
							}}
							onDragEnd={(event) => {
								const clone = [...markers];
								clone[index] = event.currentTarget.latlng;
								setMarkers(clone);
							}}
						>
							{index + 1}
						</Atlas.Marker>
					))}
				</Atlas>
				<ol>
					<li>Klikk på kartet for å legge til markør</li>
					<li>Dra markør for å flytte</li>
					<li>Klikk på markør for å fjerne</li>
				</ol>
			</>
		);
	},
};

export const WithoutScrollZoom: Story = {
	render: () => (
		<Prose>
			<p>{LOREM_IPSUM}</p>
			<Atlas data-scrollzoom="false" />
			<p>{LOREM_IPSUM}</p>
		</Prose>
	),
};
