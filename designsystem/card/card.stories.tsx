import {
	CalendarDotsIcon,
	ClockIcon,
	DownloadSimpleIcon,
	HourglassHighIcon,
	ListChecksIcon,
	MapPinIcon,
	PaperPlaneRightIcon,
	SmileyMehIcon,
	UploadSimpleIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, Flex, Grid, Group, Heading, Info, Tag } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Card og Group",
	id: "designsystem-card",
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story) => (
			<div
				className={`${styles.body} ${styles.grid}`}
				style={{ padding: "2em" }}
			>
				<style>
					{
						"body:not(:has(.sbdocs-content)) { background: var(--ds-color-background-default) }"
					}
				</style>
				<Story />
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const paddings = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 22, 26, 30,
];

export const Default: Story = {
	render: () => <div className={styles.card}>Card</div>,
};

export const React: Story = {
	render: () => (
		<>
			<Card>Card</Card>
			<Card href="#">Lenke</Card>
			<Card as="button" onClick={() => alert("Click!")}>
				Knapp
			</Card>
			<Group>
				<Grid data-gap="1">
					<Card>Card in group</Card>
					<Card>Card in group</Card>
					<Card>Card in group</Card>
				</Grid>
			</Group>
		</>
	),
};

export const Padding: Story = {
	render: () => (
		<>
			{paddings.map((pad) => (
				<div key={pad} className={styles.card} data-pad={pad}>
					data-pad="{pad}"
				</div>
			))}
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
						123456789
					</h2>
					<div className={styles.flex} data-self="500" data-items="100">
						<div className={styles.grid} data-items="100">
							<div className={styles.info}>
								<CalendarDotsIcon />
								<span>06.12.2024</span>
							</div>
							<div className={styles.info}>
								<ClockIcon />
								19:37
							</div>
						</div>
						<div className={styles.grid} data-items="100">
							<div className={styles.info}>
								<UploadSimpleIcon />
								Groene Tuin
							</div>
							<div className={styles.info}>
								<i>🇫🇷</i>
								Frankrike
							</div>
						</div>
						<div className={styles.grid} data-self="500" data-items="250">
							<div className={styles.info}>
								<DownloadSimpleIcon />
								Blomquist Blomster AS
							</div>
							<div className={styles.info}>
								<ListChecksIcon />
								Daucus carota, Hydrangea paniculata, +4
							</div>
						</div>
					</div>
				</div>
			</a>
			<Card>
				<Flex data-align="start">
					<Info data-self="250" data-fixed>
						<small>Opprettet 01.01.1970</small>
						<Heading data-size="2xs">KY.KELLI.815.493.00</Heading>
					</Info>
					<Flex data-self="500">
						<Flex data-self="500" data-align="start">
							<Grid data-self="200">
								<Info>
									<PaperPlaneRightIcon />
									Firmanavn AS
								</Info>
								<Info>
									<i>🇳🇱</i> Nederland
								</Info>
							</Grid>
							<Info data-self="300">
								<DownloadSimpleIcon />
								Bomsterlandet importerer bomster AS, Rogaland
							</Info>
						</Flex>
						<Tag data-fixed data-color="info" data-icon="false">
							Skal på tilsyn
						</Tag>
					</Flex>
				</Flex>
			</Card>
			<div className={styles.card}>
				<div className={styles.flex} data-align="center">
					<h2 data-size="md" data-self="250" data-fixed>
						Bambus
					</h2>
					<div
						className={styles.flex}
						data-self="500"
						data-items="150"
						data-align="center"
					>
						<div className={styles.grid} data-items="150">
							<div className={styles.info}>
								<MapPinIcon />
								Grunerlokka, Oslo
							</div>
							<div className={styles.info}>
								<ClockIcon />
								12.00 - 22.00
							</div>
						</div>
						<div className={styles.grid} data-items="150">
							<div className={styles.info}>
								<SmileyMehIcon />
								06.01.2024
							</div>
							<div className={styles.info}>
								<HourglassHighIcon />
								107.02.2020
							</div>
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
					<h2 data-size="md" data-self="250" data-fixed>
						Burgern
					</h2>
					<div
						className={styles.flex}
						data-self="500"
						data-items="150"
						data-align="center"
					>
						<div className={styles.grid} data-items="150">
							<div className={styles.info}>
								<MapPinIcon />
								Sentrum, Oslo
							</div>
							<div className={styles.info}>
								<ClockIcon />
								14.00 - 22.00{" "}
								<span
									className={styles.tag}
									data-size="sm"
									data-color="info"
									data-icon="false"
								>
									Kveld
								</span>
							</div>
						</div>
						<div className={styles.grid} data-items="150">
							<div className={styles.info}>
								<SmileyMehIcon />
								14.06.2022
							</div>
							<div className={styles.info}>
								<HourglassHighIcon />
								13.02.2023
							</div>
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
					<h2 data-size="md" data-self="250" data-fixed>
						Den lekke tomat
					</h2>
					<div
						className={styles.flex}
						data-self="500"
						data-items="150"
						data-align="center"
					>
						<div className={styles.grid} data-items="150">
							<div className={styles.info}>
								<MapPinIcon />
								Sagene, Oslo
							</div>
							<div className={styles.info}>
								<ClockIcon />
								11.00 - 22.00
							</div>
						</div>
						<div className={styles.grid} data-items="150">
							<div className={styles.info}>
								<SmileyMehIcon />
								08.01.2024
							</div>
							<div className={styles.info}>
								<HourglassHighIcon />
								23.03.2025
							</div>
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
					<div className={styles.info}>
						<MapPinIcon />
						Loren, Oslo
					</div>
					<div className={styles.info}>
						<ClockIcon />
						13.00 - 22.00
					</div>
					<div className={styles.info}>
						<SmileyMehIcon />
						06.01.2023
					</div>
					<div className={styles.info}>
						<HourglassHighIcon />
						07.04.2025
					</div>
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

// export const Expandable: Story = {
// 	render: () => (
// 		<u-details className={styles.card}>
// 			<u-summary className={styles.flex} data-align="center">
// 				<h2 data-size="md" data-self="250" data-fixed>
// 					123456789
// 				</h2>
// 				<span className={styles.flex} data-self="500" data-items="100">
// 					<span className={styles.grid} data-items="100">
// 						<div className={styles.info}>
// 							<CalendarDotsIcon />
// 							06.12.2024
// 						</span>
// 						<div className={styles.info}>
// 							<ClockIcon />
// 							19:37
// 						</span>
// 					</span>
// 					<span className={styles.grid} data-items="100">
// 						<div className={styles.info}>
// 							<UploadSimpleIcon />
// 							Groene Tuin
// 						</span>
// 						<div className={styles.info}>
// 							<i>🇫🇷</i>
// 							Frankrike
// 						</span>
// 					</span>
// 					<span className={styles.grid} data-self="500" data-items="250">
// 						<div className={styles.info}>
// 							<DownloadSimpleIcon />
// 							Blomquist Blomster AS
// 						</span>
// 						<div className={styles.info}>
// 							<ListChecksIcon />
// 							Daucus carota, Hydrangea paniculata, +4
// 						</span>
// 					</span>
// 				</span>
// 			</u-summary>
// 			<div>Hei</div>
// 		</u-details>
// 	),
// };

export const GroupStory: Story = {
	name: "Group",
	parameters: { showInOverview: true },
	render: () => (
		<div className={styles.group}>
			<div className={styles.grid} data-gap="1">
				<div className={styles.card}>Card</div>
				<div className={styles.card}>Card</div>
				<div className={styles.card}>Card</div>
			</div>
		</div>
	),
};
