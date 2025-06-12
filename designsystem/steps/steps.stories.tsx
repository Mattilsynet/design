import { HeartIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Steps } from "../react";
import styles from "../styles.module.css";

const meta = {
	id: "designsystem-steps--docs",
	title: "Designsystem/Steps (Eksperimentell)",
	parameters: {
		layout: "padded",
	},
	decorators: [
		(Story) => (
			<div className={styles.grid} data-gap="14">
				<Story />
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className={styles.steps}>
			<a href="#none">
				<mark>
					<HeartIcon />
				</mark>
				<strong>Steg 1</strong>
				<br />
				<small>Beskrivelse</small>
			</a>
			<a href="#none">
				<mark />
				<strong>Steg 2</strong>
				<br />
				<small>Donec et odio</small>
			</a>
			<a href="#none" aria-current="step" data-color="danger">
				<mark />
				<strong>Steg 3</strong>
			</a>
			<a href="#none">
				<mark />
				<strong>Steg 4</strong>
			</a>
			<a href="#none">
				<mark />
				<strong>Steg 5</strong>
			</a>
		</div>
	),
};

export const WithDirectionDown: Story = {
	render: () => (
		<div className={styles.steps} data-size="sm" data-direction="down">
			<a href="#none">
				<mark>
					<HeartIcon />
				</mark>
				<strong>Steg 1</strong> Beskrivelse
			</a>
			<a href="#none" data-color="danger">
				<mark />
				<strong>Steg 2</strong>
				<br />
				Donec sagittis et odio in consequat. Nullam rutrum erat in euismod
				scelerisque. Nullam imperdiet lorem mauris, ut dapibus sem efficitur a.
				Proin nec vulputate erat. Proin venenatis aliquam justo at venenatis.
				Proin pharetra turpis sem, et consectetur nunc fringilla vitae. Morbi
				molestie eleifend libero, et posuere magna semper non. Nullam dictum
				massa non nibh sagittis vestibulum.
			</a>
			<a href="#none" aria-current="step">
				<mark />
				<strong>Steg 3</strong>
			</a>
			<a href="#none">
				<mark />
				<strong>Steg 4</strong>
			</a>
			<a href="#none">
				<mark />
				<strong>Steg 5</strong>
			</a>
		</div>
	),
};

export const WithDirectionUp: Story = {
	render: () => (
		<div className={styles.steps} data-size="sm" data-direction="up">
			<a href="#none">
				<mark>
					<HeartIcon />
				</mark>
				<strong>Steg 5</strong> Beskrivelse
			</a>
			<a href="#none">
				<mark />
				<strong>Steg 4</strong>
				<br />
				Donec sagittis et odio in consequat. Nullam rutrum erat in euismod
				scelerisque. Nullam imperdiet lorem mauris, ut dapibus sem efficitur a.
				Proin nec vulputate erat. Proin venenatis aliquam justo at venenatis.
				Proin pharetra turpis sem, et consectetur nunc fringilla vitae. Morbi
				molestie eleifend libero, et posuere magna semper non. Nullam dictum
				massa non nibh sagittis vestibulum.
			</a>
			<a href="#none" aria-current="step">
				<mark />
				<strong>Steg 3</strong>
			</a>
			<a href="#none">
				<mark />
				<strong>Steg 2</strong>
			</a>
			<a href="#none">
				<mark />
				<strong>Steg 1</strong>
			</a>
		</div>
	),
};

export const WithFade: Story = {
	render: () => (
		<>
			<strong>
				No <code>data-fade</code>:
			</strong>
			<div className={styles.steps}>
				<a href="#none">
					<mark />
					<strong>Steg 1</strong>
				</a>
				<a href="#none" aria-current="step">
					<mark />
					<strong>Steg 2</strong>
				</a>
				<a href="#none">
					<mark />
					<strong>Steg 3</strong>
				</a>
			</div>
			<strong>
				With <code>data-fade</code>:
			</strong>
			<div className={styles.steps} data-fade>
				<a href="#none">
					<mark />
					<strong>Steg 1</strong>
				</a>
				<a href="#none" aria-current="step">
					<mark />
					<strong>Steg 2</strong>
				</a>
				<a href="#none">
					<mark />
					<strong>Steg 3</strong>
				</a>
			</div>
			<strong>
				With <code>data-fade="start"</code>:
			</strong>
			<div className={styles.steps} data-fade="start">
				<a href="#none">
					<mark />
					<strong>Steg 1</strong>
				</a>
				<a href="#none" aria-current="step">
					<mark />
					<strong>Steg 2</strong>
				</a>
				<a href="#none">
					<mark />
					<strong>Steg 3</strong>
				</a>
			</div>
			<strong>
				With <code>data-fade="end"</code>:
			</strong>
			<div className={styles.steps} data-fade="end">
				<a href="#none">
					<mark />
					<strong>Steg 1</strong>
				</a>
				<a href="#none" aria-current="step">
					<mark />
					<strong>Steg 2</strong>
				</a>
				<a href="#none">
					<mark />
					<strong>Steg 3</strong>
				</a>
			</div>
		</>
	),
};

export const WithFadeDirectionDown: Story = {
	render: () => (
		<>
			<strong>
				No <code>data-fade</code>:
			</strong>
			<div className={styles.steps} data-direction="down">
				<a href="#none">
					<mark />
					<strong>Steg 1</strong>
				</a>
				<a href="#none" aria-current="step">
					<mark />
					<strong>Steg 2</strong>
				</a>
				<a href="#none">
					<mark />
					<strong>Steg 3</strong>
				</a>
			</div>
			<strong>
				With <code>data-fade</code>:
			</strong>
			<div className={styles.steps} data-fade data-direction="down">
				<a href="#none">
					<mark />
					<strong>Steg 1</strong>
				</a>
				<a href="#none" aria-current="step">
					<mark />
					<strong>Steg 2</strong>
				</a>
				<a href="#none">
					<mark />
					<strong>Steg 3</strong>
				</a>
			</div>
			<strong>
				With <code>data-fade="start"</code>:
			</strong>
			<div className={styles.steps} data-fade="start" data-direction="down">
				<a href="#none">
					<mark />
					<strong>Steg 1</strong>
				</a>
				<a href="#none" aria-current="step">
					<mark />
					<strong>Steg 2</strong>
				</a>
				<a href="#none">
					<mark />
					<strong>Steg 3</strong>
				</a>
			</div>
			<strong>
				With <code>data-fade="end"</code>:
			</strong>
			<div className={styles.steps} data-fade="end" data-direction="down">
				<a href="#none">
					<mark />
					<strong>Steg 1</strong>
				</a>
				<a href="#none" aria-current="step">
					<mark />
					<strong>Steg 2</strong>
				</a>
				<a href="#none">
					<mark />
					<strong>Steg 3</strong>
				</a>
			</div>
		</>
	),
};

export const WithFadeDirectionUp: Story = {
	render: () => (
		<>
			<strong>
				No <code>data-fade</code>:
			</strong>
			<div className={styles.steps} data-direction="up">
				<a href="#none">
					<mark />
					<strong>Steg 1</strong>
				</a>
				<a href="#none" aria-current="step">
					<mark />
					<strong>Steg 2</strong>
				</a>
				<a href="#none">
					<mark />
					<strong>Steg 3</strong>
				</a>
			</div>
			<strong>
				With <code>data-fade</code>:
			</strong>
			<div className={styles.steps} data-fade data-direction="up">
				<a href="#none">
					<mark />
					<strong>Steg 1</strong>
				</a>
				<a href="#none" aria-current="step">
					<mark />
					<strong>Steg 2</strong>
				</a>
				<a href="#none">
					<mark />
					<strong>Steg 3</strong>
				</a>
			</div>
			<strong>
				With <code>data-fade="start"</code>:
			</strong>
			<div className={styles.steps} data-fade="start" data-direction="up">
				<a href="#none">
					<mark />
					<strong>Steg 1</strong>
				</a>
				<a href="#none" aria-current="step">
					<mark />
					<strong>Steg 2</strong>
				</a>
				<a href="#none">
					<mark />
					<strong>Steg 3</strong>
				</a>
			</div>
			<strong>
				With <code>data-fade="end"</code>:
			</strong>
			<div className={styles.steps} data-fade="end" data-direction="up">
				<a href="#none">
					<mark />
					<strong>Steg 1</strong>
				</a>
				<a href="#none" aria-current="step">
					<mark />
					<strong>Steg 2</strong>
				</a>
				<a href="#none">
					<mark />
					<strong>Steg 3</strong>
				</a>
			</div>
		</>
	),
};

export const Timeline: Story = {
	render: () => (
		<div className={styles.steps} data-size="sm" data-direction="up">
			<a href="#none" data-color="main">
				<mark>
					<HeartIcon />
				</mark>
				<strong>Steg 5</strong> Beskrivelse
			</a>
			<a href="#none" data-color="main">
				<mark />
				<strong>Steg 4</strong>
				<br />
				Donec sagittis et odio in consequat. Nullam rutrum erat in euismod
				scelerisque. Nullam imperdiet lorem mauris, ut dapibus sem efficitur a.
				Proin nec vulputate erat. Proin venenatis aliquam justo at venenatis.
				Proin pharetra turpis sem, et consectetur nunc fringilla vitae. Morbi
				molestie eleifend libero, et posuere magna semper non. Nullam dictum
				massa non nibh sagittis vestibulum.
			</a>
			<a href="#none" data-color="main">
				<mark />
				<strong>Steg 3</strong>
			</a>
			<a href="#none" data-color="main">
				<mark />
				<strong>Steg 2</strong>
			</a>
			<a href="#none" data-color="main">
				<mark />
				<strong>Steg 1</strong>
			</a>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={styles.steps}>
			<a href="#none">
				<mark />
				<strong>Steg 1</strong>
				<br />
				<small>Beskrivelse</small>
			</a>
			<a href="#none" data-color="danger">
				<mark />
				<strong>Steg 2</strong>
				<br />
				<small>Donec et odio</small>
			</a>
			<a href="#none" aria-current="step">
				<mark />
				<strong>Steg 3</strong>
			</a>
			<a href="#none" data-color="warning">
				<mark />
				<strong>Steg 4</strong>
			</a>
			<a href="#none">
				<mark />
				<strong>Steg 5</strong>
			</a>
		</div>
	),
};

export const React: Story = {
	render: () => (
		<Steps as="ul">
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
