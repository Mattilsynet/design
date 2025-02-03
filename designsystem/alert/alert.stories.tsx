import type { Meta, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Alert",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators: Story["decorators"] = [
	(Story) => (
		<div className={styles.grid}>
			<Story />
		</div>
	),
];

export const Default: Story = {
	decorators,
	render: () => (
		<output className={styles.alert}>
			Info ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in
			tincidunt ipsum. Morbi et consequat felis, quis finibus quam.
		</output>
	),
};

export const Colors: Story = {
	decorators,
	render: () => (
		<>
			<output className={styles.alert}>
				Info ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in
				tincidunt ipsum. Morbi et consequat felis, quis finibus quam.
			</output>
			<output className={styles.alert} data-color="success">
				Success ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in
				tincidunt ipsum. Morbi et consequat felis, quis finibus quam.
			</output>
			<output className={styles.alert} data-color="warning">
				Warning ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in
				tincidunt ipsum. Morbi et consequat felis, quis finibus quam.
			</output>
			<div className={styles.alert} data-color="danger" role="alert">
				Danger ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in
				tincidunt ipsum. Morbi et consequat felis, quis finibus quam.
			</div>
		</>
	),
};

export const Sizes: Story = {
	decorators,
	render: () => (
		<>
			<output className={styles.alert} data-size="sm">
				Info ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in
				tincidunt ipsum. Morbi et consequat felis, quis finibus quam.
			</output>
			<output className={styles.alert} data-size="md">
				Info ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in
				tincidunt ipsum. Morbi et consequat felis, quis finibus quam.
			</output>
			<output className={styles.alert} data-size="lg">
				Info ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in
				tincidunt ipsum. Morbi et consequat felis, quis finibus quam.
			</output>
		</>
	),
};

export const WithTitle: Story = {
	decorators,
	render: () => (
		<output className={styles.alert}>
			<h2>Har du husket å bestille passtime?</h2>
			<p>
				Det er lange køer for å bestille pass om dagen, det kan være lurt å
				bestille i god tid før du skal reise.
			</p>
		</output>
	),
};

export const WithClose: Story = {
	decorators,
	render: () => (
		<output className={styles.alert}>
			<h2>Har du husket å bestille passtime?</h2>
			<p>
				Det er lange køer for å bestille pass om dagen, det kan være lurt å
				bestille i god tid før du skal reise.
			</p>
			<button type="button" aria-label="Lukk"></button>
		</output>
	),
};

export const WithButtons: Story = {
	decorators,
	render: () => (
		<output className={styles.alert}>
			<h2>Har du husket å bestille passtime?</h2>
			<p>
				Det er lange køer for å bestille pass om dagen, det kan være lurt å
				bestille i god tid før du skal reise.
			</p>
			<div className={styles.flex}>
				<a href="#none" className={styles.button} data-variant="secondary">
					Prøv igjen
				</a>
				<a href="#none" className={styles.button}>
					Kontakt oss
				</a>
			</div>
		</output>
	),
};
