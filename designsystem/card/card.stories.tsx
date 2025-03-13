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
				<style>{"body{background:var(--ds-color-background-default)}"}</style>
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
			<div className={styles.card}>Card</div>
		</>
	),
};

export const React: Story = {
	render: () => (
		<>
			<Card>Card</Card>
			<Card href="#">Lenke</Card>
			<Card as="button" onClick={() => alert("Click!")}>
				Knapp
			</Card>
		</>
	),
};

export const Interactive: Story = {
	render: () => (
		<>
			<a href="#anchor" className={styles.card}>
				As link
			</a>
			<button type="button" className={styles.card}>
				As button
			</button>
		</>
	),
};

export const Responsive: Story = {
	render: () => (
		<>
			Grupperte eksempler:
			<a href="#anchor" className={styles.card}>
				<div className={styles.flex}>
					<h2 data-size="md" data-self="250" data-fixed>
						PSC8CHE2023029471IN
					</h2>
					<div className={styles.flex} data-self="500" data-items="100">
						<div className={styles.grid} data-items="100">
							<span className={styles.info}>
								<CalendarDots />
								06.12.2024
							</span>
							<span className={styles.info}>
								<Clock />
								19:37
							</span>
						</div>
						<div className={styles.grid} data-items="100">
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
						<div className={styles.grid} data-self="500" data-items="250">
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
			</a>
			<div className={styles.card}>
				<div className={styles.flex} data-align="center">
					<h2 data-size="md" data-self="250" data-fixed="md">
						Bambus
					</h2>
					<div
						className={styles.flex}
						data-self="500"
						data-items="150"
						data-align="center"
					>
						<div className={styles.grid} data-items="150">
							<span className={styles.info}>
								<MapPin />
								Grunerlokka, Oslo
							</span>
							<span className={styles.info}>
								<Clock />
								12.00 - 22.00
							</span>
						</div>
						<div className={styles.grid} data-items="150">
							<span className={styles.info}>
								<SmileyMeh />
								06.01.2024
							</span>
							<span className={styles.info}>
								<HourglassHigh />
								107.02.2020
							</span>
						</div>
						<button
							type="button"
							className={styles.button}
							data-variant="secondary"
							data-nowrap
							data-fixed
							data-arrow
						>
							Planlegg tur
						</button>
					</div>
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.flex} data-align="center">
					<h2 data-size="md" data-self="250" data-fixed="md">
						Burgern
					</h2>
					<div
						className={styles.flex}
						data-self="500"
						data-items="150"
						data-align="center"
					>
						<div className={styles.grid} data-items="150">
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
						<div className={styles.grid} data-items="150">
							<span className={styles.info}>
								<SmileyMeh />
								14.06.2022
							</span>
							<span className={styles.info}>
								<HourglassHigh />
								13.02.2023
							</span>
						</div>
						<button
							type="button"
							className={styles.button}
							data-variant="secondary"
							data-nowrap
							data-fixed
							data-arrow
						>
							Planlegg tur
						</button>
					</div>
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.flex} data-align="center">
					<h2 data-size="md" data-self="250" data-fixed="md">
						Den lekke tomat
					</h2>
					<div
						className={styles.flex}
						data-self="500"
						data-items="150"
						data-align="center"
					>
						<div className={styles.grid} data-items="150">
							<span className={styles.info}>
								<MapPin />
								Sagene, Oslo
							</span>
							<span className={styles.info}>
								<Clock />
								11.00 - 22.00
							</span>
						</div>
						<div className={styles.grid} data-items="150">
							<span className={styles.info}>
								<SmileyMeh />
								08.01.2024
							</span>
							<span className={styles.info}>
								<HourglassHigh />
								23.03.2025
							</span>
						</div>
						<button
							type="button"
							className={styles.button}
							data-variant="secondary"
							data-nowrap
							data-fixed
							data-arrow
						>
							Planlegg tur
						</button>
					</div>
				</div>
			</div>
			Ikke gruppert eksempel:
			<div className={styles.card}>
				<div className={styles.flex} data-items="150">
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
					<button
						type="button"
						className={styles.button}
						data-variant="secondary"
						data-arrow
					>
						Planlegg tur
					</button>
				</div>
			</div>
		</>
	),
};

export const Group: Story = {
	render: () => (
		<>
			<div className={styles.group}>
				<div className={styles.grid}>
					<div className={styles.card}>Card</div>
					<div className={styles.card}>Card</div>
					<div className={styles.card}>Card</div>
				</div>
			</div>
		</>
	),
};
