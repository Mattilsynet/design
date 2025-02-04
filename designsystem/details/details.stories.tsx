import type { Meta, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";
import "@u-elements/u-details";

const meta = {
	title: "Designsystem/Details",
	parameters: {
		layout: "padded",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<u-details class={styles.details}>
			<u-summary>Åpne/lukk</u-summary>
			Innhold
		</u-details>
	),
};

export const DefaultOpen: Story = {
	render: () => (
		<u-details class={styles.details} open>
			<u-summary>Default open</u-summary>
			Innhold
		</u-details>
	),
};
