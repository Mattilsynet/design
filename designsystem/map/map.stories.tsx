import type { Meta, StoryObj } from "@storybook/react-vite";
import type { MTDSMapElement } from "../map";
import { Button, Divider, Field } from "../react";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";

const meta = {
	title: "Designsystem/Map",
	parameters: {
		layout: "padded",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	tags: ["!dev"],
	render: function Render() {
		const mapRef = useRef<MTDSMapElement>(null);
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
		
		useEffect(() => console.log(mapRef.current), []);

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

		return (
			<mtds-map style={{ aspectRatio: 2 }} ref={mapRef}>
				<Field
					aria-label="Søk i kart"
					as="input"
					style={{ placeSelf: "start start" }}
					type="search"
				/>
				<div style={{ width: "fit-content", placeSelf: "end end" }}>
					<Button data-command="zoom-in">
						<PlusIcon />
					</Button>
					<Divider data-gap="0" />
					<Button data-command="zoom-out">
						<MinusIcon />
					</Button>
				</div>
			</mtds-map>
		);
	},
};

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
