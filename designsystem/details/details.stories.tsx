import type { Meta, StoryObj } from "@storybook/react";
import { Details } from "../react";
import styles from "../styles.module.css";

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
		<>
			<u-details class={styles.details}>
				<u-summary>Åpne/lukk</u-summary>
				Innhold
			</u-details>
			<u-details class={styles.details}>
				<u-summary>Åpne/lukk</u-summary>
				Innhold
			</u-details>
			<u-details class={styles.details}>
				<u-summary>Åpne/lukk</u-summary>
				Innhold
			</u-details>
			<u-details class={styles.details}>
				<u-summary>Åpne/lukk</u-summary>
				Innhold
			</u-details>
			<u-details class={styles.details}>
				<u-summary>Åpne/lukk</u-summary>
				Innhold
			</u-details>
			<u-details class={styles.details}>
				<u-summary>Åpne/lukk</u-summary>
				Innhold
			</u-details>
		</>
	),
};

export const React: Story = {
	render: () => (
		<Details>
			<Details.Summary>Åpne/lukk</Details.Summary>
			Innhold
		</Details>
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
