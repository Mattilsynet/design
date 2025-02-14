import { Shrimp } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Tag",
	decorators: [
		(Story) => (
			<div className={styles.flex}>
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
			<div className={styles.tag} data-color="neutral">
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

export const WithIcon: Story = {
	render: () => (
		<>
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

export const WithIconOverwrite: Story = {
	render: () => (
		<>
			<div className={styles.tag} data-color="success">
				<Shrimp />
				Reke
			</div>
			<div className={styles.tag} data-color="info" data-icon="none">
				Alle felter må fylles ut
			</div>
		</>
	),
};

export const WithTooltip: Story = {
	render: () => (
		<>
			<div className={styles.tag} data-tooltip="Ikke original">
				Bekreftet kopi
			</div>
		</>
	),
};
