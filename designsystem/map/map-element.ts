import L, { type LatLngExpression } from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import LCSS from "leaflet/dist/leaflet.css?raw";
import type * as ReactTypes from "react";
import { IS_BROWSER, MTDSElement, off, on, tag } from "../utils";
import css from "./map.css?raw";

declare global {
	namespace React.JSX {
		interface IntrinsicElements {
			"mtds-map": ReactTypes.DetailedHTMLProps<
				ReactTypes.HTMLAttributes<MTDSMapElement>,
				MTDSMapElement
			> & { class?: string };
		}
	}
}

const KARTVERKET_GRAY = 'https://cache.kartverket.no/v1/wmts/1.0.0/topograatone/default/webmercator/{z}/{y}/{x}.png';

export class MTDSMapElement extends MTDSElement {
	map?: L.Map;

	constructor() {
		super();
		const sheet = new CSSStyleSheet();
		sheet.replaceSync(`${LCSS}\n${css}`);
		this.attachShadow({ mode: "open" }).adoptedStyleSheets = [sheet];
		this.shadowRoot?.append(tag("slot"), tag("div"));

		L.Marker.prototype.options.icon = L.icon({
			iconAnchor: [12, 41],
			iconUrl: icon,
			shadowUrl: iconShadow
		});
	}
	connectedCallback() {
		const center: LatLngExpression = [63.43067801397488, 10.402166438219403];
		this.map = L.map(this.shadowRoot?.lastElementChild as HTMLElement, { attributionControl: false });
		this.map.addLayer(L.tileLayer(KARTVERKET_GRAY, { maxZoom: 19 }));
		this.map.addLayer(L.marker(center));
		this.map.setView(center, 13)

		on(this, "click", this);
	}
	handleEvent({ target }: Event) {
		console.log(target);
	}
	disconnectedCallback() {
		off(this, "click", this);
		this.map?.remove();
	}
}

if (IS_BROWSER && !window.customElements.get("mtds-map")) {
	window.customElements.define("mtds-map", MTDSMapElement);
}

export type Adresse = {
	adressekode: number;
	adressetekst: string;
	bokstav: string;
	bruksenhetsnummer: string[];
	bruksnummer: number;
	festenummer: number;
	gardsnummer: number;
	kommunenavn: string;
	kommunenummer: string;
	nummer: number;
	objtype: string;
	oppdateringsdato: string;
	postnummer: string;
	poststed: string;
	representasjonspunkt: {
		epsg: string;
		lat: number;
		lon: number;
	};
	stedfestingverifisert: boolean;
	undernummer: string | null;
};

// Hent punkt for adresse fra GeoNorge
export async function getPunktFraAdresse(
	adresseSoek: string,
): Promise<Adresse[]> {
	try {
		const response = await fetch(
			`https://ws.geonorge.no/adresser/v1/sok?sok=${adresseSoek}&fuzzy=false&utkoordsys=3857&treffPerSide=100&asciiKompatibel=true`,
		);
		const jsonresponse = await response.json();
		if (jsonresponse.adresser.length > 0) {
			return jsonresponse.adresser.map((adresse: Adresse) => ({
				adressekode: adresse.adressekode,
				adressetekst: adresse.adressetekst,
				bokstav: adresse.bokstav,
				bruksenhetsnummer: adresse.bruksenhetsnummer,
				bruksnummer: adresse.bruksnummer,
				festenummer: adresse.festenummer,
				gardsnummer: adresse.gardsnummer,
				kommunenavn: adresse.kommunenavn,
				kommunenummer: adresse.kommunenummer,
				nummer: adresse.nummer,
				objtype: adresse.objtype,
				oppdateringsdato: adresse.oppdateringsdato,
				postnummer: adresse.postnummer,
				poststed: adresse.poststed,
				representasjonspunkt: {
					epsg: adresse.representasjonspunkt.epsg,
					lat: adresse.representasjonspunkt.lat,
					lon: adresse.representasjonspunkt.lon,
				},
			}));
		} else {
			return [];
		}
	} catch (error) {
		console.log(`Feilet i å hente adresse fra punkt: ${error}`);
		return [];
	}
}
