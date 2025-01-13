import type { Meta, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Avatar",
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
	render: () => <div className={styles.avatar}>Hei</div>,
};
