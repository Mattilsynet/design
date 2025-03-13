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
		<div className={styles.grid} data-items="200">
			<div>
				none
				<hr data-gap="none" />
				none
			</div>
			<div>
				xs (4px)
				<hr data-gap="xs" />
				xs
			</div>
			<div>
				sm (8px)
				<hr data-gap="sm" />
				sm
			</div>
			<div>
				md (16px)
				<hr data-gap="mg" />
				md
			</div>
			<div>
				lg (24px)
				<hr data-gap="lg" />
				lg
			</div>
			<div>
				xl (32px)
				<hr data-gap="xl" />
				xl
			</div>
		</div>
	),
};
