import type { Meta, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

type ButtonProps = {
	primary?: boolean;
	onClick?: () => void;
};

const Button = (_: ButtonProps) => <div className={styles.button}>Hei</div>;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Designsystem/Button",
	component: Button,
	tags: ["autodocs"], // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	args: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		primary: true,
	},
};
