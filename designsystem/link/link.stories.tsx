import type { Meta, StoryObj } from "@storybook/react";

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
