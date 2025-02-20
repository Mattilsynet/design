import { Shrimp } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Tag",
	decorators: [
		(Story) => (
			<span className={styles.flex}>
				<Story />
			</span>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<>
			<span className={styles.tag} data-color="neutral">
				Neutral
			</span>
			<span className={styles.tag} data-color="info">
				Info
			</span>
			<span className={styles.tag} data-color="success">
				Success
			</span>
			<span className={styles.tag} data-color="warning">
				Warning
			</span>
			<span className={styles.tag} data-color="danger">
				Danger
			</span>
		</>
	),
};

export const React: Story = {
	render: () => (
		<>
			<Tag data-color="neutral">Neutral</Tag>
			<Tag data-color="info">Info</Tag>
			<Tag data-color="success">Success</Tag>
			<Tag data-color="warning">Warning</Tag>
			<Tag data-color="danger">Danger</Tag>
		</>
	),
};

export const Sizes: Story = {
	render: () => (
		<>
			<span className={styles.tag} data-size="xs">
				Extra small
			</span>
			<span className={styles.tag} data-size="sm">
				Small
			</span>
			<span className={styles.tag} data-size="md">
				Medium
			</span>
			<span className={styles.tag} data-size="lg">
				Large
			</span>
		</>
	),
};

export const WithIcon: Story = {
	render: () => (
		<>
			<span className={styles.tag} data-color="info">
				Info
			</span>
			<span className={styles.tag} data-color="success">
				Success
			</span>
			<span className={styles.tag} data-color="warning">
				Warning
			</span>
			<span className={styles.tag} data-color="danger">
				Danger
			</span>
		</>
	),
};

export const WithIconOverwrite: Story = {
	render: () => (
		<>
			<span className={styles.tag} data-color="success">
				<Shrimp />
				Reke
			</span>
			<span className={styles.tag} data-color="info" data-icon="none">
				Alle felter må fylles ut
			</span>
		</>
	),
};

export const WithTooltip: Story = {
	render: () => (
		<>
			<span className={styles.tag} data-tooltip="Ikke original">
				Bekreftet kopi
			</span>
		</>
	),
};
