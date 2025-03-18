import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "../react";
import styles from "../styles.module.css";

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
		<div className={styles.grid} data-items="50">
			<div>
				0
				<hr data-gap="0" />0
			</div>
			<div>
				1 (4px)
				<hr data-gap="1" />1
			</div>
			<div>
				2 (8px)
				<hr data-gap="2" />2
			</div>
			<div>
				3 (12px)
				<hr data-gap="3" />3
			</div>
			<div>
				4 (16px)
				<hr data-gap="4" />4
			</div>
			<div>
				5 (20px)
				<hr data-gap="5" />5
			</div>
			<div>
				6 (24px)
				<hr data-gap="6" />6
			</div>
			<div>
				7 (28px)
				<hr data-gap="7" />7
			</div>
			<div>
				8 (32px)
				<hr data-gap="8" />8
			</div>
		</div>
	),
};
