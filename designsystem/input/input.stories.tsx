import type { Meta, StoryObj } from "@storybook/react-vite";
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
		<ds-field className={styles.field}>
			<label>Ledetekst</label>
			<input className={styles.input} />
		</ds-field>
	),
};

export const React: Story = {
	render: () => (
		<Field>
			<Field.Label>Ledetekst</Field.Label>
			<Input />
		</Field>
	),
};

export const Types: Story = {
	render: () => (
		<>
			<ds-field className={styles.field}>
				<label>Text</label>
				<input type="text" className={styles.input} />
			</ds-field>

			<ds-field className={styles.field}>
				<label>Select</label>
				<select className={styles.input}>
					<option>Option 1</option>
					<option>Option 2</option>
					<option>Option 3</option>
					<option>Option 4</option>
					<option>Option 5</option>
				</select>
			</ds-field>

			<ds-field className={styles.field}>
				<label>Checkbox</label>
				<input type="checkbox" className={styles.input} />
			</ds-field>

			<ds-field className={styles.field}>
				<label>Radio 1</label>
				<input
					type="radio"
					className={styles.input}
					name="my-radio"
					defaultChecked
				/>
			</ds-field>

			<ds-field className={styles.field}>
				<label>Radio 2</label>
				<input type="radio" className={styles.input} name="my-radio" />
			</ds-field>

			<ds-field className={styles.field}>
				<label>Switch</label>
				<input type="checkbox" role="switch" className={styles.input} />
			</ds-field>

			<ds-field className={styles.field}>
				<label>Textarea</label>
				<textarea className={styles.input} />
			</ds-field>
		</>
	),
};

export const Select: Story = {
	parameters: {
		showInOverview: true,
	},
	render: () => (
		<ds-field className={styles.field}>
			<label>Select</label>
			<select className={styles.input}>
				<option>Option 1</option>
				<option>Option 2</option>
				<option>Option 3</option>
				<option>Option 4</option>
				<option>Option 5</option>
			</select>
		</ds-field>
	),
};

export const Textarea: Story = {
	parameters: {
		showInOverview: true,
	},
	render: () => (
		<ds-field className={styles.field}>
			<label>Textarea</label>
			<textarea className={styles.input}></textarea>
		</ds-field>
	),
};

export const Checkbox: Story = {
	render: () => (
		<ds-field className={styles.field}>
			<label>Checkbox</label>
			<input type="checkbox" className={styles.input} />
		</ds-field>
	),
};

export const Radio: Story = {
	render: () => (
		<ds-field className={styles.field}>
			<label>Radio</label>
			<input type="radio" className={styles.input} />
		</ds-field>
	),
};

export const Switch: Story = {
	parameters: {
		showInOverview: true,
	},
	render: () => (
		<ds-field className={styles.field}>
			<label>Switch</label>
			<input type="checkbox" role="switch" className={styles.input} />
		</ds-field>
	),
};

export const Sizes: Story = {
	render: () => (
		<>
			<input
				aria-label="small"
				className={styles.input}
				data-size="sm"
				defaultValue="Small"
			/>
			<input
				aria-label="medium"
				className={styles.input}
				data-size="md"
				defaultValue="Medium"
			/>
			<input
				aria-label="large"
				className={styles.input}
				data-size="lg"
				defaultValue="Large"
			/>
			<input
				aria-label="size=20"
				className={styles.input}
				size={20}
				defaultValue="size=20"
			/>
		</>
	),
};

export const ReadOnly: Story = {
	render: () => (
		<>
			<ds-field className={styles.field}>
				<label>Read only text</label>
				<input className={styles.input} readOnly value="Value" />
			</ds-field>
			<ds-field className={styles.field}>
				<label>Read only checkbox</label>
				<input type="checkbox" className={styles.input} readOnly disabled />
			</ds-field>
			<ds-field className={styles.field}>
				<label>Read only radio</label>
				<input type="radio" className={styles.input} readOnly disabled />
			</ds-field>
			<ds-field className={styles.field}>
				<label>Read only switch</label>
				<input
					type="checkbox"
					role="switch"
					className={styles.input}
					readOnly
					disabled
				/>
			</ds-field>
		</>
	),
};

export const Disabled: Story = {
	render: () => (
		<>
			<ds-field className={styles.field}>
				<label>Disabled text</label>
				<input className={styles.input} disabled />
			</ds-field>
			<ds-field className={styles.field}>
				<label>Disabled checkbox</label>
				<input type="checkbox" className={styles.input} disabled />
			</ds-field>
			<ds-field className={styles.field}>
				<label>Disabled radio</label>
				<input type="radio" className={styles.input} disabled />
			</ds-field>
			<ds-field className={styles.field}>
				<label>Disabled switch</label>
				<input
					type="checkbox"
					role="switch"
					className={styles.input}
					disabled
				/>
			</ds-field>
		</>
	),
};

export const TypeSearch: Story = {
	parameters: {
		showInOverview: true,
	},
	render: () => (
		<>
			<ds-field className={styles.field}>
				<label>Søkefelt</label>
				<input
					className={styles.input}
					type="search"
					placeholder="Skriv for å søke"
				/>
			</ds-field>
			<ds-field className={styles.field}>
				<label>Søkefelt data-icon="none"</label>
				<input className={styles.input} type="search" data-icon="none" />
			</ds-field>
		</>
	),
};

export const TypeDate: Story = {
	parameters: {
		showInOverview: true,
	},
	render: () => (
		<ds-field className={styles.field}>
			<label>Datovelger</label>
			<input className={styles.input} type="date" />
		</ds-field>
	),
};

export const TypeNumber: Story = {
	render: () => (
		<div className={styles.grid} data-items="auto">
			<ds-field className={styles.field}>
				<label>Antall dyr</label>
				<input className={styles.input} type="number" />
			</ds-field>
			<ds-field className={styles.field}>
				<label>Referansenummer</label>
				<input className={styles.input} type="text" inputMode="numeric" />
			</ds-field>
		</div>
	),
};

export const VariantInline: Story = {
	name: "Variant Inline (Eksperimentell)",
	render: () => (
		<>
			<ds-field className={styles.field}>
				<label>Text</label>
				<input
					type="text"
					defaultValue="Content"
					className={styles.input}
					data-variant="inline"
				/>
			</ds-field>

			<ds-field className={styles.field}>
				<label>Select</label>
				<select
					className={styles.input}
					data-variant="inline"
					defaultValue="Option 1"
				>
					<option>Option 1</option>
					<option>Option 2</option>
					<option>Option 3</option>
					<option>Option 4</option>
					<option>Option 5</option>
				</select>
			</ds-field>

			<ds-field className={styles.field}>
				<label>Textarea</label>
				<textarea
					className={styles.input}
					data-variant="inline"
					defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod dui lacus, eget lacinia metus ullamcorper a. Nam id erat eu odio dignissim ornare ac eu erat. Maecenas bibendum cursus risus, sed tincidunt ipsum auctor id. Aliquam erat volutpat. Pellentesque mi sapien, ornare a iaculis ac, blandit in lectus. "
				/>
			</ds-field>
		</>
	),
};

// <Field
// 	as="input"
// 	label="Dato"
// 	onFocus={() =>
// 		document
// 			.querySelector<HTMLInputElement>('input[type="date"]')
// 			?.showPicker()
// 	}
// />
// <Input
// 	type="date"
// 	aria-hidden="true"
// 	tabIndex={-1}
// 	style={{ marginTop: -60, opacity: 0, pointerEvents: "none" }}
// />
