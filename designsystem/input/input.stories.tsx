import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Input",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators = [
	(Story: StoryFn) => (
		<div style={{ display: "grid", gap: "1rem" }}>
			<Story />
		</div>
	),
];

export const Default: Story = {
	decorators,
	render: () => (
		<div className={styles.field}>
			<label>Ledetekst</label>
			<input className={styles.input} />
		</div>
	),
};

export const Variants: Story = {
	decorators,
	render: () => (
		<>
			<div className={styles.field}>
				<label>Text</label>
				<input type="text" className={styles.input} />
			</div>

			<div className={styles.field}>
				<label>Select</label>
				<select className={styles.input}>
					<option>Option 1</option>
					<option>Option 2</option>
					<option>Option 3</option>
					<option>Option 4</option>
					<option>Option 5</option>
				</select>
			</div>

			<div className={styles.field}>
				<label>Checkbox</label>
				<input type="checkbox" className={styles.input} />
			</div>

			<div className={styles.field}>
				<label>Radio 1</label>
				<input
					type="radio"
					className={styles.input}
					name="my-radio"
					defaultChecked
				/>
			</div>

			<div className={styles.field}>
				<label>Radio 2</label>
				<input type="radio" className={styles.input} name="my-radio" />
			</div>

			<div className={styles.field}>
				<label>Switch</label>
				<input type="checkbox" role="switch" className={styles.input} />
			</div>

			<div className={styles.field}>
				<label>Textarea</label>
				<textarea className={styles.input} />
			</div>
		</>
	),
};

export const Sizes: Story = {
	decorators,
	render: () => (
		<>
			<input
				aria-label="small"
				className={styles.input}
				data-size="sm"
				value="Small"
			/>
			<input
				aria-label="medium"
				className={styles.input}
				data-size="md"
				value="Medium"
			/>
			<input
				aria-label="large"
				className={styles.input}
				data-size="lg"
				value="Large"
			/>
			<input
				aria-label="size=20"
				className={styles.input}
				size={20}
				value="size=20"
			/>
		</>
	),
};

export const ReadOnly: Story = {
	decorators,
	render: () => (
		<>
			<div className={styles.field}>
				<label>Read only text</label>
				<input className={styles.input} readOnly value="Value" />
			</div>
			<div className={styles.field}>
				<label>Read only checkbox</label>
				<input type="checkbox" className={styles.input} readOnly disabled />
			</div>
			<div className={styles.field}>
				<label>Read only radio</label>
				<input type="radio" className={styles.input} readOnly disabled />
			</div>
			<div className={styles.field}>
				<label>Read only switch</label>
				<input
					type="checkbox"
					role="switch"
					className={styles.input}
					readOnly
					disabled
				/>
			</div>
		</>
	),
};

export const Disabled: Story = {
	decorators,
	render: () => (
		<>
			<div className={styles.field}>
				<label>Disabled text</label>
				<input className={styles.input} disabled />
			</div>
			<div className={styles.field}>
				<label>Disabled checkbox</label>
				<input type="checkbox" className={styles.input} disabled />
			</div>
			<div className={styles.field}>
				<label>Disabled radio</label>
				<input type="radio" className={styles.input} disabled />
			</div>
			<div className={styles.field}>
				<label>Disabled switch</label>
				<input
					type="checkbox"
					role="switch"
					className={styles.input}
					disabled
				/>
			</div>
		</>
	),
};
