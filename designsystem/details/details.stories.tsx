import { ShrimpIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
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
			<details className={styles.details}>
				<summary>Åpne/lukk</summary>
				Innhold
			</details>
			<details className={styles.details}>
				<summary>Åpne/lukk</summary>
				Innhold
			</details>
			<details className={styles.details}>
				<summary>Åpne/lukk</summary>
				Innhold
			</details>
			<details className={styles.details}>
				<summary>Åpne/lukk</summary>
				Innhold
			</details>
			<details className={styles.details}>
				<summary>Åpne/lukk</summary>
				Innhold
			</details>
			<details className={styles.details}>
				<summary>Åpne/lukk</summary>
				Innhold
			</details>
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
		<details className={styles.details} open>
			<summary>Default open</summary>
			Innhold
		</details>
	),
};

export const VariantCard: Story = {
	render: () => (
		<div className={styles.grid}>
			<details className={styles.details} data-variant="card">
				<summary>Details with data-variant="card"</summary>
				Innhold
			</details>
			<details className={styles.details} data-variant="card">
				<summary>
					<ShrimpIcon /> Details with data-variant="card" and icon
				</summary>
				Innhold
			</details>
			<details
				className={styles.details}
				data-variant="card"
				data-color="neutral"
			>
				<summary>
					<ShrimpIcon /> Details with data-variant="card" and icon and
					data-color="neutral"
				</summary>
				Innhold
			</details>
		</div>
	),
};
