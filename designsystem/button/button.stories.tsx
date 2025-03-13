import { Heart, List, Star, X } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
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
		<>
			<button type="button" className={styles.button} data-variant="primary">
				Accent
			</button>
			<button
				type="button"
				className={styles.button}
				data-variant="primary"
				data-color="danger"
			>
				Danger
			</button>
			<button type="button" className={styles.button} data-variant="secondary">
				Accent
			</button>
			<button
				type="button"
				className={styles.button}
				data-variant="secondary"
				data-color="danger"
			>
				Danger
			</button>
			<button type="button" className={styles.button}>
				Accent
			</button>
			<button
				type="button"
				className={styles.button}
				data-color="danger"
				data-variant="tertiary"
			>
				Danger
			</button>
		</>
	),
};

export const Nowrap: Story = {
	render: () => (
		<div className={styles.grid} data-items="auto" style={{ width: 350 }}>
			<div>
				<p>Med nowrap:</p>
				<button
					type="button"
					className={styles.button}
					data-variant="secondary"
				>
					<Star />
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
					<Star />
					Lagre favoritt
				</button>
			</div>
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
					<Star data-pressed="false" />
					<span data-pressed="false">Lagre favoritt</span>
					<Star data-pressed="true" weight="fill" />
					<span data-pressed="true">Fjern favoritt</span>
				</button>
				<button
					className={styles.button}
					popoverTarget="pop-pressed"
					type="button"
				>
					With popover
					<List data-pressed="false" />
					<X data-pressed="true" />
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
				<Heart />
				Ikon før
			</button>
			<button type="button" className={styles.button} data-variant="secondary">
				Ikon etter
				<Star />
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

export const WithMenu: Story = {
	render: () => (
		<>
			<button
				aria-label="Handlinger"
				popoverTarget="pop-2"
				type="button"
				className={styles.button}
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
	render: () => (
		<button data-tooltip="Favoritt" type="button" className={styles.button}>
			<Star />
		</button>
	),
};

export const InMenu: Story = {
	render: () => (
		<menu>
			<li>
				<button type="button" className={styles.button}>
					Knapp 1
				</button>
			</li>
			<li>
				<button type="button" className={styles.button}>
					Knapp med veldig lang tekst
				</button>
			</li>
			<li>
				<button type="button" className={styles.button}>
					Knapp 3
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
		<div
			data-color-scheme="dark"
			className={styles.flex}
			style={{ padding: 15 }}
		>
			<p style={{ flex: "1 0 100%" }}>
				Use data-color-scheme="dark" on parent element or button itself to
				invert
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
