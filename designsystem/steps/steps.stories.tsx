import { FilePlusIcon, HandshakeIcon, HeartIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Flex, Grid, Steps } from "../react";
import styles from "../styles.module.css";

const meta = {
	id: "designsystem-steps--docs",
	title: "Designsystem/Steps (Eksperimentell)",
	parameters: {
		layout: "padded",
	},
	decorators: [
		(Story) => (
			<Grid data-gap="14">
				<Story />
			</Grid>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<ol className={styles.steps}>
			<li>
				<mark>
					<HeartIcon />
				</mark>
				<strong>Steg 1</strong>
				<br />
				<small>Beskrivelse</small>
			</li>
			<li>
				<mark />
				<strong>Steg 2</strong>
				<br />
				<small>Donec et odio</small>
			</li>
			<li aria-current="step" data-color="danger">
				<mark />
				<strong>Steg 3</strong>
			</li>
			<li>
				<mark />
				<strong>Steg 4</strong>
			</li>
			<li>
				<mark />
				<strong>Steg 5</strong>
			</li>
		</ol>
	),
};

export const React: Story = {
	render: () => (
		<Steps>
			<li>
				<mark />
				<strong>Steg 1</strong>
			</li>
			<li>
				<mark />
				<strong>Steg 2</strong>
			</li>
			<li aria-current="step">
				<mark />
				<strong>Steg 3</strong>
			</li>
			<li>
				<mark />
				<strong>Steg 4</strong>
			</li>
		</Steps>
	),
};

export const WithDirection: Story = {
	render: () => (
		<Flex data-items="500" data-gap="14">
			<Grid style={{ flexBasis: "100%" }}>
				<strong>
					With <code>data-direction="right"</code>:
				</strong>
				<ol className={styles.steps} data-size="sm" data-direction="right">
					<li>
						<mark>
							<HeartIcon />
						</mark>
						<strong>Steg 1</strong> Beskrivelse
					</li>
					<li data-color="danger">
						<mark />
						<strong>Steg 2</strong>
					</li>
					<li aria-current="step">
						<mark />
						<strong>Steg 3</strong>
					</li>
					<li>
						<mark />
						<strong>Steg 4</strong>
					</li>
					<li>
						<mark />
						<strong>Steg 5</strong>
					</li>
				</ol>
			</Grid>
			<Grid>
				<strong>
					With <code>data-direction="down"</code>:
				</strong>
				<ol className={styles.steps} data-size="sm" data-direction="down">
					<li>
						<mark>
							<HeartIcon />
						</mark>
						<strong>Steg 1</strong> Beskrivelse
					</li>
					<li data-color="danger">
						<mark />
						<strong>Steg 2</strong>
						<br />
						Donec sagittis et odio in consequat. Nullam rutrum erat in euismod
						scelerisque. Nullam imperdiet lorem mauris, ut dapibus sem efficitur
						a. Proin nec vulputate erat. Proin venenatis aliquam justo at
						venenatis. Proin pharetra turpis sem, et consectetur nunc fringilla
						vitae. Morbi molestie eleifend libero, et posuere magna semper non.
						Nullam dictum massa non nibh sagittis vestibulum.
					</li>
					<li aria-current="step">
						<mark />
						<strong>Steg 3</strong>
					</li>
					<li>
						<mark />
						<strong>Steg 4</strong>
					</li>
					<li>
						<mark />
						<strong>Steg 5</strong>
					</li>
				</ol>
			</Grid>
			<Grid>
				<strong>
					With <code>data-direction="up"</code>:
				</strong>
				<ol className={styles.steps} data-size="sm" data-direction="up">
					<li>
						<mark>
							<HeartIcon />
						</mark>
						<strong>Steg 5</strong> Beskrivelse
					</li>
					<li>
						<mark />
						<strong>Steg 4</strong>
						<br />
						Donec sagittis et odio in consequat. Nullam rutrum erat in euismod
						scelerisque. Nullam imperdiet lorem mauris, ut dapibus sem efficitur
						a. Proin nec vulputate erat. Proin venenatis aliquam justo at
						venenatis. Proin pharetra turpis sem, et consectetur nunc fringilla
						vitae. Morbi molestie eleifend libero, et posuere magna semper non.
						Nullam dictum massa non nibh sagittis vestibulum.
					</li>
					<li aria-current="step">
						<mark />
						<strong>Steg 3</strong>
					</li>
					<li>
						<mark />
						<strong>Steg 2</strong>
					</li>
					<li>
						<mark />
						<strong>Steg 1</strong>
					</li>
				</ol>
			</Grid>
		</Flex>
	),
};

export const WithFade: Story = {
	render: () => (
		<>
			<strong>
				No <code>data-fade</code>:
			</strong>
			<ol className={styles.steps}>
				<li>
					<mark />
					<strong>Steg 1</strong>
				</li>
				<li aria-current="step">
					<mark />
					<strong>Steg 2</strong>
				</li>
				<li>
					<mark />
					<strong>Steg 3</strong>
				</li>
			</ol>
			<strong>
				With <code>data-fade</code>:
			</strong>
			<ol className={styles.steps} data-fade>
				<li>
					<mark />
					<strong>Steg 1</strong>
				</li>
				<li aria-current="step">
					<mark />
					<strong>Steg 2</strong>
				</li>
				<li>
					<mark />
					<strong>Steg 3</strong>
				</li>
			</ol>
			<strong>
				With <code>data-fade="start"</code>:
			</strong>
			<ol className={styles.steps} data-fade="start">
				<li>
					<mark />
					<strong>Steg 1</strong>
				</li>
				<li aria-current="step">
					<mark />
					<strong>Steg 2</strong>
				</li>
				<li>
					<mark />
					<strong>Steg 3</strong>
				</li>
			</ol>
			<strong>
				With <code>data-fade="end"</code>:
			</strong>
			<ol className={styles.steps} data-fade="end">
				<li>
					<mark />
					<strong>Steg 1</strong>
				</li>
				<li aria-current="step">
					<mark />
					<strong>Steg 2</strong>
				</li>
				<li>
					<mark />
					<strong>Steg 3</strong>
				</li>
			</ol>
		</>
	),
};

export const WithFadeAndDirection: Story = {
	render: () => (
		<Flex data-items="500" data-gap="14">
			<Grid data-gap="14">
				<strong>
					With <code>data-direction="down"</code> and <code>data-fade</code>:
				</strong>
				<ol className={styles.steps} data-fade data-direction="down">
					<li>
						<mark />
						<strong>Steg 1</strong>
					</li>
					<li aria-current="step">
						<mark />
						<strong>Steg 2</strong>
					</li>
					<li>
						<mark />
						<strong>Steg 3</strong>
					</li>
				</ol>
				<strong>
					With <code>data-direction="down"</code> and{" "}
					<code>data-fade="start"</code>:
				</strong>
				<ol className={styles.steps} data-fade="start" data-direction="down">
					<li>
						<mark />
						<strong>Steg 1</strong>
					</li>
					<li aria-current="step">
						<mark />
						<strong>Steg 2</strong>
					</li>
					<li>
						<mark />
						<strong>Steg 3</strong>
					</li>
				</ol>
				<strong>
					With <code>data-direction="down"</code> and{" "}
					<code>data-fade="end"</code>:
				</strong>
				<ol className={styles.steps} data-fade="end" data-direction="down">
					<li>
						<mark />
						<strong>Steg 1</strong>
					</li>
					<li aria-current="step">
						<mark />
						<strong>Steg 2</strong>
					</li>
					<li>
						<mark />
						<strong>Steg 3</strong>
					</li>
				</ol>
			</Grid>
			<Grid data-gap="14">
				<strong>
					With <code>data-direction="up"</code> and <code>data-fade</code>:
				</strong>
				<ol className={styles.steps} data-fade data-direction="up">
					<li>
						<mark />
						<strong>Steg 1</strong>
					</li>
					<li aria-current="step">
						<mark />
						<strong>Steg 2</strong>
					</li>
					<li>
						<mark />
						<strong>Steg 3</strong>
					</li>
				</ol>
				<strong>
					With <code>data-direction="up"</code> and{" "}
					<code>data-fade="start"</code>:
				</strong>
				<ol className={styles.steps} data-fade="start" data-direction="up">
					<li>
						<mark />
						<strong>Steg 1</strong>
					</li>
					<li aria-current="step">
						<mark />
						<strong>Steg 2</strong>
					</li>
					<li>
						<mark />
						<strong>Steg 3</strong>
					</li>
				</ol>
				<strong>
					With <code>data-direction="up"</code> and <code>data-fade="end"</code>
					:
				</strong>
				<ol className={styles.steps} data-fade="end" data-direction="up">
					<li>
						<mark />
						<strong>Steg 1</strong>
					</li>
					<li aria-current="step">
						<mark />
						<strong>Steg 2</strong>
					</li>
					<li>
						<mark />
						<strong>Steg 3</strong>
					</li>
				</ol>
			</Grid>
		</Flex>
	),
};

export const WithColors: Story = {
	render: () => (
		<ol className={styles.steps}>
			<li>
				<mark />
				<strong>Steg 1</strong>
				<br />
				<small>Beskrivelse</small>
			</li>
			<li data-color="danger">
				<mark />
				<strong>Steg 2</strong>
				<br />
				<small>Donec et odio</small>
			</li>
			<li aria-current="step">
				<mark />
				<strong>Steg 3</strong>
			</li>
			<li data-color="warning">
				<mark />
				<strong>Steg 4</strong>
			</li>
			<li>
				<mark />
				<strong>Steg 5</strong>
			</li>
		</ol>
	),
};

export const WithInteraction: Story = {
	render: () => (
		<ol className={styles.steps}>
			<li>
				<a href="#none">
					<mark />
					<strong>Steg 1</strong>
					<br />
					<small>Beskrivelse</small>
				</a>
			</li>
			<li>
				<a href="#none">
					<mark />
					<strong>Steg 2</strong>
					<br />
					<small>Donec et odio</small>
				</a>
			</li>
			<li aria-current="step">
				<button type="button">
					<mark />
					<strong>Steg 3</strong>
				</button>
			</li>
			<li>
				<button type="button">
					<mark />
					<strong>Steg 4</strong>
				</button>
			</li>
		</ol>
	),
};

export const Timeline: Story = {
	render: () => (
		<ol className={styles.steps} data-direction="up">
			<li data-color="main">
				<mark>
					<HeartIcon />
				</mark>
				<strong>06.04.2025</strong> Enighet om løsning
			</li>
			<li data-color="main">
				<mark>
					<HandshakeIcon />
				</mark>
				<strong>05.04.2025</strong> Oppfølgingsmøte gjennomført
				<br />
				Donec sagittis et odio in consequat. Nullam rutrum erat in euismod
				scelerisque. Nullam imperdiet lorem mauris, ut dapibus sem efficitur a.
				Proin nec vulputate erat. Proin venenatis aliquam justo at venenatis.
				Proin pharetra turpis sem, et consectetur nunc fringilla vitae. Morbi
				molestie eleifend libero, et posuere magna semper non. Nullam dictum
				massa non nibh sagittis vestibulum.
			</li>
			<li data-color="main">
				<mark>
					<FilePlusIcon />
				</mark>
				<strong>01.02.2025</strong> Sak opprettet
			</li>
		</ol>
	),
};
