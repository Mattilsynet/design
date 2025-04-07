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
			<Chip data-removable>Bokmål</Chip>
		</>
	),
};

export const Sizes: Story = {
	render: () => (
		<>
			<label className={styles.chip} data-size="sm">
				<input
					className={styles.input}
					type="radio"
					value="sm"
					defaultChecked
					name="my-size"
				/>
				Small
			</label>
			<label className={styles.chip} data-size="md">
				<input
					className={styles.input}
					type="radio"
					value="md"
					defaultChecked
					name="my-size"
				/>
				Medium
			</label>
			<label className={styles.chip} data-size="lg">
				<input
					className={styles.input}
					type="radio"
					value="lg"
					defaultChecked
					name="my-size"
				/>
				Large
			</label>
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

export const Removable: Story = {
	render: () => (
		<>
			<button type="button" className={styles.chip} data-removable>
				Nynorsk
			</button>
		</>
	),
};

export const Nowrap: Story = {
	render: () => (
		<div className={styles.grid} data-items="auto" style={{ width: 250 }}>
			<div>
				<p>Med nowrap:</p>
				<button type="button" className={styles.chip} data-removable>
					<span data-nowrap>Mine favoritter</span>
				</button>
			</div>
			<div>
				<p>Uten nowrap:</p>
				<button type="button" className={styles.chip} data-removable>
					Mine favoritter
				</button>
			</div>
		</div>
	),
};
