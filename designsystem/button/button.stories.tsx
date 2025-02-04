import { Heart, Star } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Button",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators: Story["decorators"] = [
	(Story) => (
		<div className={styles.flex} data-align="center">
			<Story />
		</div>
	),
];

export const Default: Story = {
	decorators,
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

export const Sizes: Story = {
	decorators,
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
	decorators,
	render: () => (
		<div className={styles.grid} data-grid="2">
			<button
				type="button"
				className={styles.button}
				data-variant="primary"
				data-color="accent"
			>
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
			<button
				type="button"
				className={styles.button}
				data-variant="secondary"
				data-color="accent"
			>
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
			<button
				type="button"
				className={styles.button}
				data-variant="tertiary"
				data-color="accent"
			>
				Accent
			</button>
			<button
				type="button"
				className={styles.button}
				data-variant="tertiary"
				data-color="danger"
			>
				Danger
			</button>
		</div>
	),
};

export const Nowrap: Story = {
	decorators,
	render: () => (
		<div className={styles.grid} data-grid="sm" style={{ width: 300 }}>
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
	decorators,
	render: function Render() {
		const [pressed, setPressed] = useState(false);

		return (
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
		);
	},
};

export const WithArrows: Story = {
	decorators,
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
				data-arrow="popover"
				popoverTarget="pop-1"
				type="button"
				className={styles.button}
			>
				Popover
			</button>

			<menu className={styles.popover} id="pop-1" popover="">
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
	decorators,
	render: () => (
		<>
			<button type="button" className={styles.button}>
				<Heart />
				Ikon før
			</button>
			<button type="button" className={styles.button}>
				Ikon etter
				<Star />
			</button>
		</>
	),
};

export const WithLoading: Story = {
	decorators,
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
	decorators,
	render: () => (
		<>
			<button
				aria-label="Handlinger"
				popoverTarget="pop-2"
				type="button"
				className={styles.button}
			/>
			<menu popover="" id="pop-2" className={styles.popover}>
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
	decorators,
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
	render: () => (
		<div
			className={styles.flex}
			style={{ backgroundColor: "#054449", color: "#fff", padding: 15 }}
		>
			<p style={{ flex: "1 0 100%" }}>
				Temporary data-color="invert" added while waiting for final
				Designsystemet color tokens:
			</p>
			<button
				data-color="invert"
				type="button"
				className={styles.button}
				data-variant="primary"
			>
				Primary
			</button>
			<button
				data-color="invert"
				type="button"
				className={styles.button}
				data-variant="secondary"
			>
				Secondary
			</button>
			<button
				data-color="invert"
				type="button"
				className={styles.button}
				data-variant="tertiary"
			>
				Tertiary
			</button>
		</div>
	),
};
