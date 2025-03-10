import {
	CalendarDots,
	Clock,
	DownloadSimple,
	HourglassHigh,
	ListChecks,
	MapPin,
	SmileyMeh,
	UploadSimple,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Card",
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story) => (
			<div
				className={`${styles.body} ${styles.grid}`}
				style={{ padding: "2em" }}
			>
				<style>{"body{background:var(--mtds-color-gaasunge)}"}</style>
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
			<div className={styles.card}>Hei</div>
		</>
	),
};

export const React: Story = {
	render: () => (
		<>
			<Card>Hei</Card>
			<Card href="#">Lenke</Card>
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

export const AsTable: Story = {
	render: () => (
		<>
			<div className={styles.card}>
				<div className={styles.flex}>
					<h2 data-size="md" data-self="20ch" data-breakup="40">
						PSC8CHE2023029471IN
					</h2>
					<div className={styles.grid} data-self="40ch" data-items="20ch">
						<div className={styles.grid} data-items="10ch">
							<span className={styles.info}>
								<CalendarDots />
								06.12.2024
							</span>
							<span className={styles.info}>
								<Clock />
								19:37
							</span>
						</div>
						<div className={styles.grid} data-items="10ch">
							<span className={styles.info}>
								<UploadSimple />
								GREENK
							</span>
							<span className={styles.info}>
								<svg width={20} height={20}>
									<text
										dominantBaseline="central"
										textAnchor="middle"
										x="50%"
										y="50%"
									>
										🇫🇷
									</text>
								</svg>
								Frankrike
							</span>
						</div>
					</div>
					<div className={styles.grid} data-self="50ch" data-items="25ch">
						<span className={styles.info}>
							<DownloadSimple />
							Bama Gruppen AS, avd. Trading
						</span>
						<span className={styles.info}>
							<ListChecks />
							Daucus carota, Hydrangea paniculata, +4
						</span>
					</div>
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.flex} data-items="20ch">
					<h2 data-size="md" data-breakout>
						Bambus
					</h2>
					<div className={styles.grid} data-items="15ch">
						<span className={styles.info}>
							<MapPin />
							Grunerlokka, Oslo
						</span>
						<span className={styles.info}>
							<Clock />
							12.00 - 22.00
						</span>
					</div>
					<div className={styles.grid} data-items="15ch">
						<span className={styles.info}>
							<SmileyMeh />
							06.01.2024
						</span>
						<span className={styles.info}>
							<HourglassHigh />
							107.02.2020
						</span>
					</div>
					<strong data-self="10ch" data-fixed>
						Planlegg tur*
					</strong>
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.flex} data-items="20ch">
					<h2 data-size="md" data-breakout>
						Burgern
					</h2>
					<div className={styles.grid} data-items="15ch">
						<span className={styles.info}>
							<MapPin />
							Sentrum, Oslo
						</span>
						<span className={styles.info}>
							<Clock />
							14.00 - 22.00{" "}
							<span
								className={styles.tag}
								data-size="sm"
								data-color="info"
								data-icon="false"
							>
								Kveld
							</span>
						</span>
					</div>
					<div className={styles.grid} data-items="15ch">
						<span className={styles.info}>
							<SmileyMeh />
							14.06.2022
						</span>
						<span className={styles.info}>
							<HourglassHigh />
							13.02.2023
						</span>
					</div>
					<strong data-self="10ch" data-fixed>
						Planlegg tur*
					</strong>
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.flex} data-items="20ch">
					<h2 data-size="md" data-breakout>
						Den lekke tomat
					</h2>
					<div className={styles.grid} data-items="15ch">
						<span className={styles.info}>
							<MapPin />
							Sagene, Oslo
						</span>
						<span className={styles.info}>
							<Clock />
							11.00 - 22.00
						</span>
					</div>
					<div className={styles.grid} data-items="15ch">
						<span className={styles.info}>
							<SmileyMeh />
							08.01.2024
						</span>
						<span className={styles.info}>
							<HourglassHigh />
							23.03.2025
						</span>
					</div>
					<strong data-self="10ch" data-fixed>
						Planlegg tur*
					</strong>
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.flex} data-items="20ch">
					<h2 data-size="md" data-breakout>
						Ananasen
					</h2>
					<div className={styles.grid} data-items="10ch">
						<span className={styles.info}>
							<MapPin />
							Loren, Oslo
						</span>
						<span className={styles.info}>
							<Clock />
							13.00 - 22.00
						</span>
					</div>
					<div className={styles.grid} data-items="10ch">
						<span className={styles.info}>
							<SmileyMeh />
							06.01.2023
						</span>
						<span className={styles.info}>
							<HourglassHigh />
							07.04.2025
						</span>
					</div>
					<strong data-self="10ch" data-fixed>
						Planlegg tur*
					</strong>
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.flex} data-items="15ch">
					<h2 data-size="md">Ananasen</h2>
					<span className={styles.info}>
						<MapPin />
						Loren, Oslo
					</span>
					<span className={styles.info}>
						<Clock />
						13.00 - 22.00
					</span>
					<span className={styles.info}>
						<SmileyMeh />
						06.01.2023
					</span>
					<span className={styles.info}>
						<HourglassHigh />
						07.04.2025
					</span>
					<strong data-self="10ch" data-fixed>
						Planlegg tur*
					</strong>
				</div>
			</div>
		</>
	),
};
