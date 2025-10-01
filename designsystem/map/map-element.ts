import * as L from "leaflet";
import LeafletCSS from "leaflet/dist/leaflet.css?raw";
import LeafletClusterCSS from "leaflet.markercluster/dist/MarkerCluster.css?raw";
import "leaflet.markercluster";
import type * as ReactTypes from "react";
import { IS_BROWSER, MTDSElement, tag } from "../utils";
import MapCss from "./map.css?raw";

type JSXMapAttrs = ReactTypes.HTMLAttributes<MTDSMapElement>;
type JSXMapProps = ReactTypes.DetailedHTMLProps<JSXMapAttrs, MTDSMapElement>;
declare global {
	namespace React.JSX {
		interface IntrinsicElements {
			"mtds-map": JSXMapProps & { class?: string };
		}
	}
}

L.Marker.prototype.options.icon = L.divIcon({
	html: '<svg class="map-pin" viewBox="0 0 256 256"><rect x="78" y="50" width="100" height="100" /><path fill="var(--mtds-)" d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"/></svg>',
	iconAnchor: [15, 30],
	iconSize: [30, 30],
});

const KARTVERKET_GRAY =
	"https://cache.kartverket.no/v1/wmts/1.0.0/topograatone/default/webmercator/{z}/{y}/{x}.png";

export { L };
export class MTDSMapElement extends MTDSElement {
	map?: L.Map;
	markers: L.MarkerClusterGroup;

	constructor() {
		super();
		const sheet = new CSSStyleSheet();
		sheet.replaceSync(`${LeafletCSS}\n${LeafletClusterCSS}\n${MapCss}`);
		this.attachShadow({ mode: "open" }).adoptedStyleSheets = [sheet];
		this.shadowRoot?.append(tag("slot"), tag("div"));
		this.markers = L.markerClusterGroup();
	}
	connectedCallback() {
		this.map = L.map(this.shadowRoot?.lastElementChild as HTMLElement, {
			attributionControl: false,
			center: [63.43067801397488, 10.402166438219403],
			zoom: 13,
			layers: [L.tileLayer(KARTVERKET_GRAY, { maxZoom: 18 }), this.markers],
		});
	}
	addMarker(point: L.LatLngExpression) {
		return L.marker(point).addTo(this.markers);
	}
	disconnectedCallback() {
		this.map?.remove();
	}
}

if (IS_BROWSER && !window.customElements.get("mtds-map"))
	window.customElements.define("mtds-map", MTDSMapElement);

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
