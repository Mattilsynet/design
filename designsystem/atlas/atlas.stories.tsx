import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useRef } from "react";
import type { MTDSAtlasElement } from "../atlas";
import "../atlas";
import { toast } from "..";

const meta = {
	title: "Designsystem/Atlas",
	parameters: {
		layout: "padded",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

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
		return <mtds-atlas data-view="63.43067801397488, 10.402166438219403, 12" />;
	},
};

export const WithColor: Story = {
	render: function Render() {
		return <mtds-atlas data-tiles="color" data-view="60.722, 10.985, 16" />;
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

export const WithClickToMarker: Story = {
	render: function Render() {
		const atlasRef = useRef<MTDSAtlasElement>(null);

		useEffect(() => {
			const atlas = atlasRef.current;
			atlas?.map?.on("click", (e) => {
				const marker = atlas.addMarker(e.latlng, { draggable: true });
				marker.on("click", () => marker.remove());
				toast(`<code>${e.latlng}</code>`);
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

export const WithClustering: Story = {
	render: function Render() {
		const atlasRef = useRef<MTDSAtlasElement>(null);

		useEffect(() => {
			if (!atlasRef.current) return;
			const atlas = atlasRef.current;
			const center = atlas?.map?.getCenter() || new atlas.leaflet.LatLng(0, 0);

			for (let i = 0; i < 100; i++) {
				const offsetLat = (Math.random() - 0.5) * 0.025;
				const offsetLng = (Math.random() - 0.5) * 0.1;
				atlas?.addMarker([center.lat + offsetLat, center.lng + offsetLng]);
			}
		}, []);

		return (
			<mtds-atlas
				data-view="60.722, 10.985, 12"
				data-cluster="15"
				ref={atlasRef}
			/>
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
