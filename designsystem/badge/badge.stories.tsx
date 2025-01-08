import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Badge",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators = [
	(Story: StoryFn) => (
		<div className={styles.flex}>
			<Story />
		</div>
	),
];

export const Default: Story = {
	decorators,
	render: () => <span className={styles.badge}>2</span>,
};
