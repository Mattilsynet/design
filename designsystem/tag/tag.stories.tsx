import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Tag",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators = [
	(Story: StoryFn) => (
		<div className={styles.flex}>
			<Story />
		</div>
	),
];

export const Default: Story = {
	decorators,
	render: () => (
		<>
			<div className={styles.tag} data-color="neural">
				Neutral
			</div>
			<div className={styles.tag} data-color="info">
				Info
			</div>
			<div className={styles.tag} data-color="success">
				Success
			</div>
			<div className={styles.tag} data-color="warning">
				Warning
			</div>
			<div className={styles.tag} data-color="danger">
				Danger
			</div>
		</>
	),
};

export const Sizes: Story = {
	decorators,
	render: () => (
		<>
			<div className={styles.tag} data-size="xs">
				Extra small
			</div>
			<div className={styles.tag} data-size="sm">
				Small
			</div>
			<div className={styles.tag} data-size="md">
				Medium
			</div>
			<div className={styles.tag} data-size="lg">
				Large
			</div>
		</>
	),
};
