import {
	CalendarDots,
	Clock,
	DownloadSimple,
	ListChecks,
	UploadSimple,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Card",
	parameters: {
		layout: "padded",
	},
	decorators: [
		(Story) => (
			<div className={`${styles.body} ${styles.grid}`}>
				<style>{"body{background:var(--mtds-color-gaasunge)}"}</style>
				<Story />
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <div className={styles.card}>Hei</div>,
};

export const Sizes: Story = {
	render: () => (
		<>
			<div className={styles.card} data-size="md">
				Hei
			</div>
			<div className={styles.card} data-size="lg">
				Hei
			</div>
		</>
	),
};

export const AsLink: Story = {
	render: () => (
		<a href="#anchor" className={styles.card}>
			Hei
		</a>
	),
};

export const Tableish: Story = {
	tags: ["!dev"],
	render: () => (
		<div role="table">
			<div className={styles.card} role="row">
				<h2 role="cell" data-size="md">
					PSC8CHE2023029471IN
				</h2>
				<dl className={styles.info} role="cell">
					<dt>
						<CalendarDots />
					</dt>
					<dd>06.12.2024</dd>
					<dt>
						<Clock />
					</dt>
					<dd>19:37</dd>
				</dl>
				<dl role="cell" className={styles.info}>
					<dt>
						<UploadSimple />
					</dt>
					<dd>GREENK</dd>
					<dt>🇫🇷</dt>
					<dd>Frankrike</dd>
				</dl>
				<dl role="cell" className={styles.info} style={{ maxWidth: "10em" }}>
					<dt>
						<DownloadSimple />
					</dt>
					<dd>Bama Gruppen AS, avd. Trading</dd>
				</dl>
				<dl role="cell" className={styles.info}>
					<dt>
						<ListChecks />
					</dt>
					<dd>Daucus carota, Hydrangea paniculata, +4</dd>
				</dl>
			</div>
		</div>
	),
};
