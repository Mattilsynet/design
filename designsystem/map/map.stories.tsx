import type { Meta, StoryObj } from "@storybook/react-vite";
import { Map as OpenLayersMap, View } from "ol";
import { useEffect, useRef } from "react";
import "../../node_modules/ol/ol.css";
import { getTilesColor, getTilesGrascale } from "./map";

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
			if (!mapRef.current) return;
			const map = new OpenLayersMap({
				target: mapRef.current,
				layers: [getTilesColor(), getTilesGrascale()],
				view: new View({ center: [0, 0], zoom: 2 }),
				controls: [
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

		return <div ref={mapRef} style={{ aspectRatio: 2 }} />;
	},
};
