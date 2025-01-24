import type { Meta, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Heading",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators: Story["decorators"] = [
	(Story) => (
		<div className={styles.grid}>
			<Story />
		</div>
	),
];

export const Default: Story = {
	decorators,
	render: () => (
		<>
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
