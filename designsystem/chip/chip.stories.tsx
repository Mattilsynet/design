import type { Meta, StoryObj } from "@storybook/react";
import { Chip, Input } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Chip",
	decorators: [
		(Story) => (
			<div className={styles.flex}>
				<Story />
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const React: Story = {
	render: () => (
		<>
			<Chip>
				<Input type="radio" value="nynorsk" defaultChecked name="my-radio" />
				Nynorsk
			</Chip>
			<Chip>
				<Input type="radio" value="bokmål" name="my-radio" />
				Bokmål
			</Chip>
		</>
	),
};

export const Radio: Story = {
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
