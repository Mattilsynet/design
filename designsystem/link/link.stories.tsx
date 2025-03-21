import { Heart } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "../react";

const meta = {
	title: "Designsystem/Link",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<>
			<a href="https://www.mattilsynet.no/">Mattilsynet</a> er et statlig tilsyn
			og direktorat som har som visjon å trygge framtiden for mennesker, dyr og
			natur.
		</>
	),
};

export const React: Story = {
	render: () => (
		<>
			<Link href="https://www.mattilsynet.no/">Mattilsynet</Link> er et statlig
			tilsyn og direktorat som har som visjon å trygge framtiden for mennesker,
			dyr og natur.
		</>
	),
};

export const WithIcon: Story = {
	render: () => (
		<>
			<a href="https://www.mattilsynet.no/">
				Mattilsynet <Heart />
			</a>{" "}
			trygger framtiden for mennesker, dyr og natur.
		</>
	),
};
