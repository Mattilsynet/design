import type { Meta, StoryObj } from "@storybook/react";
import { Field, Input } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Input",
	decorators: [
		(Story) => (
			<div className={styles.grid}>
				<Story />
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className={styles.field}>
			<label>Ledetekst</label>
			<input className={styles.input} />
		</div>
	),
};

export const React: Story = {
	render: () => (
		<Field>
			<label>Ledetekst</label>
			<Input />
		</Field>
	),
};

export const Variants: Story = {
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

export const Select: Story = {
	render: () => (
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
	),
};

export const Textarea: Story = {
	render: () => (
		<div className={styles.field}>
			<label>Textarea</label>
			<textarea className={styles.input}></textarea>
		</div>
	),
};

export const Checkbox: Story = {
	render: () => (
		<div className={styles.field}>
			<label>Checkbox</label>
			<input type="checkbox" className={styles.input} />
		</div>
	),
};

export const Radio: Story = {
	render: () => (
		<div className={styles.field}>
			<label>Radio</label>
			<input type="radio" className={styles.input} />
		</div>
	),
};

export const Switch: Story = {
	render: () => (
		<div className={styles.field}>
			<label>Switch</label>
			<input type="checkbox" role="switch" className={styles.input} />
		</div>
	),
};

export const Sizes: Story = {
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

export const TypeSearch: Story = {
	render: () => (
		<div className={styles.field}>
			<label>Søkefelt</label>
			<input className={styles.input} type="search" />
		</div>
	),
};

export const TypeDate: Story = {
	render: () => (
		<div className={styles.field}>
			<label>Datovelger</label>
			<input className={styles.input} type="date" />
		</div>
	),
};

export const TypeNumber: Story = {
	render: () => (
		<div className={styles.grid} data-items="lg">
			<div className={styles.field}>
				<label>Antall dyr</label>
				<input className={styles.input} type="number" />
			</div>
			<div className={styles.field}>
				<label>Referansenummer</label>
				<input className={styles.input} type="text" inputMode="numeric" />
			</div>
		</div>
	),
};
