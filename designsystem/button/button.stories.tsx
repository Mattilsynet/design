import { HeartIcon, ListIcon, StarIcon, XIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Button",
	decorators: [
		(Story) => (
			<div className={styles.flex} data-align="center">
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
			<button type="button" className={styles.button} data-variant="primary">
				Primary
			</button>
			<button type="button" className={styles.button} data-variant="secondary">
				Secondary
			</button>
			<button type="button" className={styles.button}>
				Tertiary (default)
			</button>
		</>
	),
};

export const React: Story = {
	render: () => (
		<>
			<Button data-variant="primary">Primary</Button>
			<Button data-variant="secondary">Secondary</Button>
			<Button>Tertiary as button</Button>
			<Button href="#">Tertiary as link</Button>
		</>
	),
};

export const Sizes: Story = {
	render: () => (
		<>
			<button
				type="button"
				className={styles.button}
				data-variant="primary"
				data-size="sm"
			>
				Small
			</button>
			<button
				type="button"
				className={styles.button}
				data-variant="primary"
				data-size="md"
			>
				Medium
			</button>
			<button
				type="button"
				className={styles.button}
				data-variant="primary"
				data-size="lg"
			>
				Large
			</button>
		</>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={styles.grid}>
			<button type="button" className={styles.button} data-variant="primary">
				Main primary
			</button>
			<button
				type="button"
				className={styles.button}
				data-variant="primary"
				data-color="danger"
			>
				Danger primary
			</button>
			<button type="button" className={styles.button} data-variant="secondary">
				Main secondary
			</button>
			<button
				type="button"
				className={styles.button}
				data-variant="secondary"
				data-color="danger"
			>
				Danger secondary
			</button>
			<button type="button" className={styles.button}>
				Main tertiary
			</button>
			<button type="button" className={styles.button} data-color="danger">
				Danger tertiary
			</button>
		</div>
	),
};

export const Nowrap: Story = {
	render: () => (
		<div className={styles.grid} data-items="auto" style={{ width: 250 }}>
			<div>
				<p>Med nowrap:</p>
				<button
					type="button"
					className={styles.button}
					data-variant="secondary"
				>
					<StarIcon />
					<span data-nowrap>Lagre favoritt</span>
				</button>
			</div>
			<div>
				<p>Uten nowrap:</p>
				<button
					type="button"
					className={styles.button}
					data-variant="secondary"
				>
					<StarIcon />
					Lagre favoritt
				</button>
			</div>
		</div>
	),
};

export const Justify: Story = {
	render: () => (
		<div className={styles.grid} style={{ width: 350 }}>
			<button
				className={styles.button}
				data-justify="center"
				data-variant="secondary"
				type="button"
			>
				<StarIcon />
				Center
			</button>
			<button
				className={styles.button}
				data-arrow="left"
				data-justify="start"
				data-variant="secondary"
				type="button"
			>
				Start
			</button>
			<button
				className={styles.button}
				data-arrow="right"
				data-justify="end"
				data-variant="secondary"
				type="button"
			>
				End
			</button>
		</div>
	),
};

export const Pressed: Story = {
	render: function Render() {
		const [pressed, setPressed] = useState(false);

		return (
			<>
				<button
					aria-pressed={pressed}
					type="button"
					className={styles.button}
					onClick={() => setPressed(!pressed)}
				>
					<StarIcon data-pressed="false" />
					<span data-pressed="false">Lagre favoritt</span>
					<StarIcon data-pressed="true" weight="fill" />
					<span data-pressed="true">Fjern favoritt</span>
				</button>
				<button
					className={styles.button}
					popoverTarget="pop-pressed"
					type="button"
				>
					With popover
					<ListIcon data-pressed="false" />
					<XIcon data-pressed="true" />
				</button>
				<menu className={styles.popover} id="pop-pressed" popover="auto">
					<li>
						<button type="button" className={styles.button}>
							Knapp 1
						</button>
					</li>
					<li>
						<button type="button" className={styles.button}>
							Knapp 2
						</button>
					</li>
				</menu>
			</>
		);
	},
};

export const WithArrows: Story = {
	render: () => (
		<>
			<button type="button" className={styles.button} data-arrow>
				Knapp
			</button>
			<button type="button" className={styles.button} data-arrow="left">
				Knapp
			</button>
			<a className={styles.button} data-arrow="right" href="#none">
				Lenkeknapp
			</a>
			<button
				data-arrow
				popoverTarget="pop-1"
				type="button"
				className={styles.button}
			>
				Popover
			</button>

			<menu className={styles.popover} id="pop-1" popover="auto">
				<li>
					<button type="button" className={styles.button}>
						Knapp 1
					</button>
				</li>
				<li>
					<button type="button" className={styles.button}>
						Knapp 2
					</button>
				</li>
				<li>
					<button type="button" className={styles.button}>
						Knapp 3
					</button>
				</li>
			</menu>
		</>
	),
};

export const WithIcons: Story = {
	render: () => (
		<>
			<button type="button" className={styles.button} data-variant="secondary">
				<HeartIcon />
				Ikon før
			</button>
			<button type="button" className={styles.button} data-variant="secondary">
				Ikon etter
				<StarIcon />
			</button>
		</>
	),
};

export const WithSpinner: Story = {
	render: () => (
		<>
			<button
				aria-busy="true"
				className={styles.button}
				data-variant="primary"
				disabled
				type="button"
			>
				Knapp
			</button>
			<a
				aria-busy="true"
				className={styles.button}
				data-variant="primary"
				href="#none"
				tabIndex={-1}
			>
				Lenkeknapp
			</a>
			<button
				aria-busy="true"
				className={styles.button}
				data-arrow="right"
				data-variant="primary"
				disabled
				type="button"
			>
				Knapp med høyrepil
			</button>
		</>
	),
};

export const WithFullWidth: Story = {
	render: () => (
		<button
			className={styles.button}
			data-self="full"
			data-variant="primary"
			type="button"
		>
			Knapp
		</button>
	),
};

export const WithMenu: Story = {
	render: () => (
		<>
			<button
				aria-label="Handlinger"
				className={styles.button}
				popoverTarget="pop-2"
				type="button"
			/>
			<menu popover="auto" id="pop-2" className={styles.popover}>
				<li>
					<button type="button" className={styles.button}>
						Knapp 1
					</button>
				</li>
				<li>
					<button type="button" className={styles.button}>
						Knapp 2
					</button>
				</li>
				<li>
					<button type="button" className={styles.button}>
						Knapp 3
					</button>
				</li>
			</menu>
		</>
	),
};

export const WithTooltip: Story = {
	render: function Render() {
		const [pressed, setPressed] = useState(false);

		return (
			<button
				data-tooltip="Favoritt"
				aria-pressed={pressed}
				className={styles.button}
				onClick={() => setPressed(!pressed)}
				type="button"
			>
				<StarIcon data-pressed="false" />
				<StarIcon data-pressed="true" weight="fill" />
			</button>
		);
	},
};

export const InMenu: Story = {
	render: () => (
		<menu>
			<li>
				<button type="button" className={styles.button} aria-pressed="true">
					Valgt knapp
				</button>
			</li>
			<li>
				<button type="button" className={styles.button}>
					Knapp med veldig lang tekst
				</button>
			</li>
			<li>
				<button type="button" className={styles.button} aria-current="page">
					Nåværende side
				</button>
			</li>
			<li>
				<button type="button" className={styles.button}>
					Knapp 4
				</button>
			</li>
		</menu>
	),
};

export const Invert: Story = {
	name: "Invert",
	render: () => (
		<div data-color="inverted" className={`${styles.card} ${styles.flex}`}>
			<p style={{ flex: "1 0 100%" }}>
				Use data-color="inverted" on parent element or button itself to invert
			</p>
			<button type="button" className={styles.button} data-variant="primary">
				Primary
			</button>
			<button type="button" className={styles.button} data-variant="secondary">
				Secondary
			</button>
			<button type="button" className={styles.button} data-variant="tertiary">
				Tertiary
			</button>
			<button aria-current="page" type="button" className={styles.button}>
				aria-current="page"
			</button>
		</div>
	),
};
