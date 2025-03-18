import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "../react";
import styles from "../styles.module.css";

const gaps = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 22, 26, 30,
];
const meta = {
	title: "Designsystem/Divider",
	parameters: {
		layout: "padded",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<>
			Innhold før
			<hr />
			Innhold etter
		</>
	),
};

export const React: Story = {
	render: () => (
		<>
			Innhold før
			<Divider />
			Innhold etter
		</>
	),
};

export const Gap: Story = {
	render: () => (
		<div className={styles.grid} data-items="150">
			{gaps.map((gap) => (
				<div key={gap} className={styles.card}>
					data-gap="{gap}"
					<hr data-gap={gap} />
					data-gap="{gap}"
				</div>
			))}
		</div>
	),
};
