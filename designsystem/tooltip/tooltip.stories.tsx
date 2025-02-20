import type { Meta, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Tooltip",
	decorators: [
		(Story) => (
			<span className={styles.flex}>
				<Story />
			</span>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <span data-tooltip="Innhold her">Hold over meg</span>,
};

export const React: Story = {
	render: () => <span data-tooltip="Innhold her">Hold over meg</span>,
};
