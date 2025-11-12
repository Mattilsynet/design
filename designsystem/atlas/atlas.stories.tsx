import { MagnifyingGlassMinusIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useRef, useState } from "react";
import type { L, MTDSAtlasElement } from "../atlas";
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
import "../atlas";

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
	render: function Render() {
		return <mtds-atlas />;
	},
};

export const WithView: Story = {
	render: function Render() {
		return <mtds-atlas data-view="63.431958, 10.397461, 12" />;
	},
};

export const WithViewAdvanced: Story = {
	render: function Render() {
		const [open, setOpen] = useState<(typeof markers)[number]>();
		const atlasRef = useRef<MTDSAtlasElement>(null);
		const markers: {
			latlng: [number, number];
			summary: string;
			content: React.ReactNode;
		}[] = [
			{
				latlng: [59.910815, 10.754078],
				summary: "Oslo",
				content: "Informasjon om Oslo",
			},
			{
				latlng: [63.431958, 10.397461],
				summary: "Trondheim",
				content: "Informasjon om Trondheim",
			},
			{
				latlng: [60.391449, 5.324119],
				summary: "Bergen",
				content: "Informasjon om Bergen",
			},
		];

		// Add markers
		useEffect(() => {
			markers.forEach((marker) => {
				atlasRef.current
					?.addMarker(marker.latlng)
					.on("click", () => setOpen(marker));
			});
		}, []);

		return (
			<Flex data-items="400" data-nowrap>
				<mtds-atlas
					data-view={open ? [...open.latlng, 14] : "fit"}
					ref={atlasRef}
				/>
				<Group data-items="200" data-fixed>
					<Prose>
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
					</Prose>
				</Group>
			</Flex>
		);
	},
};

export const WithColor: Story = {
	render: function Render() {
		return (
			<mtds-atlas data-tiles="color" data-view="63.431958, 10.397461, 12" />
		);
	},
};

export const WithCustomSize: Story = {
	render: function Render() {
		return (
			<mtds-atlas style={{ width: "100%", height: "calc(100vh - 30px)" }} />
		);
	},
};

export const WithMarker: Story = {
	render: function Render() {
		const atlasRef = useRef<MTDSAtlasElement>(null);

		useEffect(() => {
			const atlas = atlasRef.current;
			atlas?.addMarker([60.722, 10.985]);
		}, []);

		return <mtds-atlas data-view="60.722, 10.985, 16" ref={atlasRef} />;
	},
};

export const WithClickToAddMarker: Story = {
	render: function Render() {
		const atlasRef = useRef<MTDSAtlasElement>(null);

		useEffect(() => {
			const atlas = atlasRef.current;
			atlas?.map?.on("click", (e) => {
				const marker = atlas.addMarker(e.latlng, { draggable: true });
				marker.on("click", () => marker.remove());
				toast(<code>{`${e.latlng}`}</code>);
			});
		}, []);

		return (
			<>
				<mtds-atlas
					data-cursor="pointer"
					data-view="60.722, 10.985, 16"
					ref={atlasRef}
				/>
				<ol>
					<li>Klikk på kartet for å legge til markør</li>
					<li>Dra markør for å flytte</li>
					<li>Klikk på markør for å fjerne</li>
				</ol>
			</>
		);
	},
};

const getRandomCoordinates = (view: number[]): L.LatLngTuple[] =>
	Array.from({ length: 100 }, () => {
		const offsetLat = (Math.random() - 0.5) * 0.025;
		const offsetLng = (Math.random() - 0.5) * 0.1;
		return [view[0] + offsetLat, view[1] + offsetLng];
	});

export const WithClustering: Story = {
	render: function Render() {
		const atlasRef = useRef<MTDSAtlasElement>(null);
		const view = [60.722, 10.985, 12];

		useEffect(() => {
			const atlas = atlasRef.current;
			getRandomCoordinates(view).map((latlng) => atlas?.addMarker(latlng));
		}, []);

		return <mtds-atlas data-view={view} data-cluster="15" ref={atlasRef} />;
	},
};

export const WithPopover: Story = {
	render: function Render() {
		const atlasRef = useRef<MTDSAtlasElement>(null);
		const [content, setContent] = useState<React.ReactNode>();
		const markers: { latlng: L.LatLngTuple; content: React.ReactNode }[] = [
			{ latlng: [60.722, 10.985], content: "Min nydelige popover" },
			{
				latlng: [60.721, 10.982],
				content: (
					<Prose>
						<Heading>Avansert popover</Heading>
						<p>Innhold</p>
						<Button data-variant="secondary" popoverTargetAction="hide">
							Lukk
						</Button>
					</Prose>
				),
			},
		];

		useEffect(() => {
			const atlas = atlasRef.current;

			markers.forEach(({ latlng, content }) => {
				atlas
					?.addMarker(latlng)
					.bindPopup("#my-popover")
					.on("popupopen", () => setContent(content));
			});
		}, []);

		return (
			<Prose>
				<mtds-atlas data-view="60.722, 10.985, 16" ref={atlasRef}>
					<Popover id="my-popover">{content}</Popover>
				</mtds-atlas>
			</Prose>
		);
	},
};

export const WithoutScrollZoom: Story = {
	render: function Render() {
		return (
			<Prose>
				<p>{LOREM_IPSUM}</p>
				<mtds-atlas data-scrollzoom="false" />
				<p>{LOREM_IPSUM}</p>
			</Prose>
		);
	},
};

// data-layers="bydd,slam,https://url.no" // Ting fra matgeo
// data-view="63.43067801397488, 10.402166438219403, 13" // Trondheim
// useEffect(() => {
// 	const map = mapCanvasRef.current?.map;

// 	map?.on("moveend", () => {
// 		const bounds = map.getBounds();
// 		const minLon = bounds.getWest(); // left (longitude)
// 		const minLat = bounds.getSouth(); // bottom (latitude)
// 		const maxLon = bounds.getEast(); // right (longitude)
// 		const maxLat = bounds.getNorth(); // top (latitude)
// 		const bbox = [minLon, minLat, maxLon, maxLat].join(",");

// 		fetch(
// 			`https://matgeoservice-256616427209.europe-north1.run.app/ogc/features/collections/bygg/items?bbox=${bbox}`,
// 		)
// 			.then((response) => response.json())
// 			.then(console.log);
// 	});
// }, []);

// const [options, setOptions] = useState<string[] | string>("Name a country"); // Store results
// const timer = useRef<ReturnType<typeof setTimeout> | number>(0);

// const getCountries = async (value: string) => {
// 	if (!value) return setOptions("Name a country");
// 	const adresser = await getPunktFraAdresse(value);
// 	console.log(adresser);
// };

// const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
// 	const value = encodeURIComponent(event.target.value.trim());

// 	setOptions(value ? "Loading..." : "Name a country");
// 	clearTimeout(timer.current);
// 	timer.current = setTimeout(getCountries, 500, value); // Debounce API call
// };

// for (let i = 0; i < addressPoints.length; i++) {
// 	const [lat, lng, title] = addressPoints[i];
// 	map?.cluster.addLayer(L.marker([lat, lng], { title }));
// }
// map?.map?.addLayer(
// 	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
// 		maxZoom: 18,
// 	}),
// );
// map?.map?.setView([-37.82, 175.24]);

// const handleSearch = async () => {
// 	try {
// 		setAdresser([]);
// 		const hentetAdresser = await getPunktFraAdresse(searchInput);
// 		setAdresser(hentetAdresser);

// 		if (hentetAdresser.length === 0) {
// 			setFinnerAdresse(false);
// 		}

// 		const coordinates = [0, 0];
// 		if (coordinates && hentetAdresser.length === 1) {
// 			const adresse = hentetAdresser[0];
// 			const coordinates = [
// 				adresse.representasjonspunkt.lon,
// 				adresse.representasjonspunkt.lat,
// 			];
// 			setSearchInput(
// 				`${adresse.adressetekst}, ${adresse.postnummer} ${adresse.poststed}`,
// 			);
// 			mapInstance.current?.getView().animate({
// 				center: coordinates,
// 				zoom: 18,
// 			});
// 		}
// 	} catch (error) {
// 		console.log("Feilet i å hente adresse fra punkt: " + error);
// 	}
// };

/* <Field
				aria-label="Søk i kart"
				as="input"
				style={{ placeSelf: "start start" }}
				type="search"
				hidden
			/>
			<div style={{ width: "fit-content", placeSelf: "end end" }} hidden>
				<Button data-command="zoom-in">
					<PlusIcon />
				</Button>
				<Divider data-gap="0" />
				<Button data-command="zoom-out">
					<MinusIcon />
				</Button>
			</div> */

// export const SearchInput = ({ mapInstance }) => {
// 	const [searchInput, setSearchInput] = useState("");
// 	const [adresser, setAdresser] = useState<Adresse[]>([]);
// 	const [finnerAdresse, setFinnerAdresse] = useState(false);
// 	const [selectedIndex, setSelectedIndex] = useState(-1);

// 	const listRef = useRef<HTMLUListElement>(null);

// 	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		setFinnerAdresse(true);
// 		setSearchInput(e.target.value);
// 	};

// 	const handleSelectAdresse = (adresse: Adresse) => {
// 		const coordinates = [
// 			adresse.representasjonspunkt.lon,
// 			adresse.representasjonspunkt.lat,
// 		];
// 		setSearchInput(
// 			`${adresse.adressetekst}, ${adresse.postnummer} ${adresse.poststed}`,
// 		);
// 		setAdresser([]);
// 		mapInstance.current?.getView().animate({
// 			center: coordinates,
// 			zoom: 18,
// 		});
// 	};

// 	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
// 		if (e.key === "Enter") {
// 			selectedIndex >= 0 && selectedIndex < adresser.length
// 				? handleSelectAdresse(adresser[selectedIndex])
// 				: handleSearch();
// 		} else if (e.key === "ArrowDown") {
// 			setSelectedIndex(() => (selectedIndex + 1) % adresser.length);
// 		} else if (e.key === "ArrowUp") {
// 			setSelectedIndex(
// 				() => (selectedIndex - 1 + adresser.length) % adresser.length,
// 			);
// 		} else if (e.key === "Escape") {
// 			setAdresser([]);
// 			setSelectedIndex(-1);
// 		}
// 	};

// 	useEffect(() => {
// 		if (listRef.current && selectedIndex >= 0) {
// 			const selectedElement = listRef.current.children[
// 				selectedIndex
// 			] as HTMLElement;
// 			selectedElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
// 		}
// 	}, [selectedIndex]);

// 	const hasAdresser = adresser.length > 0;
// 	const ingenAdresse = adresser.length === 0 && searchInput && !finnerAdresse;

// 	return (
// 		<div className="absolute z-20 min-w-[300px] p-4 text-sm">
// 			<div className="relative flex items-center rounded bg-white">
// 				<input
// 					type="text"
// 					value={searchInput}
// 					onChange={handleInputChange}
// 					placeholder="Søk etter adresse"
// 					className="w-full flex-grow rounded border p-3 pr-10"
// 				/>
// 				<button
// 					className="absolute right-2 cursor-pointer border-none pr-3 pl-2 shadow-none outline-none"
// 					onClick={handleSearch}
// 				/>
// 			</div>
// 			{ingenAdresse && (
// 				<div className="bg-mt-white border-mt-furu z-20 max-h-64 w-full max-w-2xl rounded-b-xl border-2 border-t-0 shadow-lg transition-all">
// 					<p className="bg-white px-2 py-4 text-sm">
// 						Fant ingen adresse for {searchInput}
// 					</p>
// 				</div>
// 			)}
// 		</div>
// 	);
// };
