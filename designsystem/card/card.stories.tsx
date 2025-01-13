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
			style={{ background: "var(--mt-gaasunge)", padding: "2em" }}
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
		<div className={styles.card}>
			<h2>PSC8CHE2023029471IN</h2>
			<div>
				<div>06.12.2024</div>
				<div>19:37</div>
			</div>
			<div>
				<div>GREENK</div>
				<div>Frankrike</div>
			</div>
			<div>Bama Gruppen AS, avd. Trading</div>
			<div>Daucus carota, Hydrangea paniculata, +4</div>
		</div>
	),
};
