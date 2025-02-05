import type { Meta, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Divider",
	parameters: {
		layout: "padded",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators: Story["decorators"] = [
	(Story) => (
		<div className={styles.grid} data-grid="fit-sm">
			<Story />
		</div>
	),
];

export const Default: Story = {
	render: () => (
		<>
			Innhold før
			<hr />
			Innhold etter
		</>
	),
};

export const Gap: Story = {
	decorators,
	render: () => (
		<>
			<div>
				data-gap="none"
				<hr data-gap="none" />
				data-gap="none"
			</div>
			<div>
				data-gap="xs"
				<hr data-gap="xs" />
				data-gap="xs"
			</div>
			<div>
				data-gap="sm"
				<hr data-gap="sm" />
				data-gap="sm"
			</div>
			<div>
				data-gap="md"
				<hr data-gap="mg" />
				data-gap="md"
			</div>
			<div>
				data-gap="lg"
				<hr data-gap="lg" />
				data-gap="lg"
			</div>
		</>
	),
};
