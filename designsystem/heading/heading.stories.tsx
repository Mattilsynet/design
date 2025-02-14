import type { Meta, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Heading",
	decorators: [
		(Story) => (
			<div className={styles.grid}>
				<Story />
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<>
			{/**
			 * Du kan bruke <h1>, <h2>, <h3>, <h4>, <h5>, <h6>.
			 * <h2> er kun brukt til demo
			 */}
			<h2 className={styles.heading} data-size="2xl">
				Heading data-size="2xl"
			</h2>
			<h2 className={styles.heading} data-size="xl">
				Heading data-size="xl"
			</h2>
			<h2 className={styles.heading} data-size="lg">
				Heading data-size="lg"
			</h2>
			<h2 className={styles.heading} data-size="md">
				Heading data-size="md"
			</h2>
			<h2 className={styles.heading} data-size="sm">
				Heading data-size="sm"
			</h2>
			<h2 className={styles.heading} data-size="xs">
				Heading data-size="xs"
			</h2>
			<h2 className={styles.heading} data-size="2xs">
				Heading data-size="2xs"
			</h2>
		</>
	),
};

export const Center: Story = {
	render: () => (
		<h2 className={styles.heading} data-justify="center">
			Heading data-justify="center"
		</h2>
	),
};
