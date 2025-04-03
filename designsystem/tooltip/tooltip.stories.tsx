import { Heart } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../react";
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
	render: () => (
		<button type="button" className={styles.button} data-tooltip="Innhold her">
			Hold over meg
		</button>
	),
};

export const React: Story = {
	render: () => <Button data-tooltip="Innhold her">Hold over meg</Button>,
};

export const Icon: Story = {
	render: () => <Heart data-tooltip="Innhold her" tabIndex={0} />,
};
