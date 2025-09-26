import type { Meta, StoryObj } from "@storybook/react-vite";
import { Map as OpenLayersMap, View } from "ol";
import { fromLonLat } from "ol/proj";
import { useEffect, useRef } from "react";
import styles from "../styles.module.css";
import { MtdsTile, Zoom } from "./map";
import "../../node_modules/ol/ol.css";

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
		const mapRef = useRef<HTMLDivElement>(null);

		// Initialize the map when the component mounts
		useEffect(() => {
			const map = new OpenLayersMap({
				target: mapRef.current || undefined,
				layers: [
					new MtdsTile("color", { visible: false }),
					new MtdsTile("gray"),
				],
				view: new View({ center: fromLonLat([8.4689, 64]), zoom: 5 }),
				controls: [
					new Zoom(),
					// new Zoom({
					// 	zoomInTipLabel: "Zoom inn",
					// 	zoomOutTipLabel: "Zoom ut",
					// }),
					// new RotateNorthControl(),
				],
			});

			// Cleanup function when the component unmounts
			return () => map.setTarget(undefined);
		}, []);

		return (
			<div ref={mapRef} className={styles.map} style={{ aspectRatio: 2 }} />
		);
	},
};
