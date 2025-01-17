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
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators: Story["decorators"] = [
	(Story) => (
		<div
			className={styles.grid}
			style={{ background: "var(--mtds-color-gaasunge)", padding: "2em" }}
		>
			<Story />
		</div>
	),
];

export const Default: Story = {
	decorators,
	render: () => <div className={styles.card}>Hei</div>,
};

export const Tableish: Story = {
	decorators,
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
