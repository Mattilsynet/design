import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Chip",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators = [
	(Story: StoryFn) => (
		<div className={styles.grid}>
			<Story />
		</div>
	),
];

export const Default: Story = {
	decorators,
	render: () => <div className={styles.chip}>Hei</div>,
};
