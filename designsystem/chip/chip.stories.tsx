import type { Meta, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Chip",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators: Story["decorators"] = [
	(Story) => (
		<div className={styles.flex}>
			<Story />
		</div>
	),
];

export const Radio: Story = {
	decorators,
	render: () => (
		<>
			<label className={styles.chip}>
				<input
					className={styles.input}
					type="radio"
					value="nynorsk"
					defaultChecked
					name="my-radio"
				/>
				Nynorsk
			</label>
			<label className={styles.chip}>
				<input
					className={styles.input}
					type="radio"
					value="bokmål"
					name="my-radio"
				/>
				Bokmål
			</label>
		</>
	),
};

export const Checkbox: Story = {
	decorators,
	render: () => (
		<>
			<label className={styles.chip}>
				<input
					className={styles.input}
					type="checkbox"
					value="nynorsk"
					defaultChecked
					name="my-checkbox"
				/>
				Nynorsk
			</label>
			<label className={styles.chip}>
				<input
					className={styles.input}
					type="checkbox"
					value="bokmål"
					name="my-checkbox"
				/>
				Bokmål
			</label>
		</>
	),
};
