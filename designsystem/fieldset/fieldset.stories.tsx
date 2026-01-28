import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, Fieldset } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Fieldset",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const React: Story = {
	render: () => (
		<Fieldset>
			<Fieldset.Legend>Hva foretrekker du?</Fieldset.Legend>
			<Fieldset.Description>Fellesbeskrivelse</Fieldset.Description>
			<Field
				as="input"
				defaultChecked
				description="Beskrivelse"
				label="Alternativ 1"
				name="my-react-radio"
				required
				type="radio"
			/>
			<Field
				as="input"
				label="Alternativ 2"
				name="my-react-radio"
				required
				type="radio"
			/>
		</Fieldset>
	),
};

export const Radios: Story = {
	parameters: {
		showInOverview: true,
	},
	render: () => (
		<fieldset className={styles.fieldset}>
			<legend>Hva foretrekker du?</legend>
			<p data-field="description">Fellesbeskrivelse</p>
			<ds-field className={styles.field}>
				<input
					type="radio"
					className={styles.input}
					name="my-radio"
					required
					defaultChecked
				/>
				<label>Alternativ 1</label>
				<p data-field="description">Beskrivelse</p>
			</ds-field>
			<ds-field className={styles.field}>
				<input type="radio" className={styles.input} name="my-radio" required />
				<label>Alternativ 2</label>
				<p data-field="description">Beskrivelse</p>
			</ds-field>
		</fieldset>
	),
};

export const Checkboxes: Story = {
	parameters: {
		showInOverview: true,
	},
	render: () => (
		<fieldset className={styles.fieldset}>
			<legend>Hvilke foretrekker du?</legend>
			<p data-field="description">Fellesbeskrivelse</p>
			<ds-field className={styles.field}>
				<input
					type="checkbox"
					className={styles.input}
					name="my-check"
					defaultChecked
				/>
				<label>Alternativ 1</label>
			</ds-field>
			<ds-field className={styles.field}>
				<input type="checkbox" className={styles.input} name="my-check" />
				<label>Alternativ 2</label>
			</ds-field>
		</fieldset>
	),
};

export const Disabled: Story = {
	render: () => (
		<fieldset className={styles.fieldset} disabled>
			<legend>Hvilke foretrekker du?</legend>
			<p data-field="description">Fellesbeskrivelse</p>
			<ds-field className={styles.field}>
				<input
					type="checkbox"
					className={styles.input}
					name="my-check"
					defaultChecked
				/>
				<label>Alternativ 1</label>
			</ds-field>
			<ds-field className={styles.field}>
				<input type="checkbox" className={styles.input} name="my-check" />
				<label>Alternativ 2</label>
			</ds-field>
		</fieldset>
	),
};

export const ReadOnly: Story = {
	render: () => (
		<fieldset className={styles.fieldset}>
			<legend>Hvilke foretrekker du?</legend>
			<p data-field="description">Fellesbeskrivelse</p>
			<ds-field className={styles.field}>
				<input
					type="checkbox"
					className={styles.input}
					name="my-check"
					defaultChecked
					readOnly
					disabled
				/>
				<label>Alternativ 1</label>
			</ds-field>
			<ds-field className={styles.field}>
				<input
					type="checkbox"
					className={styles.input}
					name="my-check"
					readOnly
					disabled
				/>
				<label>Alternativ 2</label>
			</ds-field>
		</fieldset>
	),
};

export const Horizontal: Story = {
	render: () => (
		<fieldset className={styles.fieldset}>
			<legend>Hvilke foretrekker du?</legend>
			<p data-field="description">Fellesbeskrivelse</p>
			<div className={styles.flex} data-gap="9">
				<ds-field className={styles.field}>
					<input
						type="checkbox"
						className={styles.input}
						name="my-check"
						defaultChecked
					/>
					<label>Alternativ 1</label>
				</ds-field>
				<ds-field className={styles.field}>
					<input type="checkbox" className={styles.input} name="my-check" />
					<label>Alternativ 2</label>
				</ds-field>
			</div>
		</fieldset>
	),
};

export const WithValidation: Story = {
	parameters: {
		showInOverview: true,
	},
	render: () => (
		<fieldset className={styles.fieldset}>
			<legend>Hvilke foretrekker du?</legend>
			<p data-field="description">Fellesbeskrivelse</p>
			<ds-field className={styles.field}>
				<input
					type="checkbox"
					className={styles.input}
					name="my-check"
					defaultChecked
				/>
				<label>Alternativ 1</label>
				<p data-field="description">Beskrivelse</p>
			</ds-field>
			<ds-field className={styles.field}>
				<input type="checkbox" className={styles.input} name="my-check" />
				<label>Alternativ 2</label>
			</ds-field>
			<div className={styles.validation} data-field="validation">
				Feilmelding
			</div>
		</fieldset>
	),
};

export const WithValidationForm: Story = {
	parameters: {
		showInOverview: true,
	},
	render: () => (
		<form action="#" className={styles.prose} data-validation="form">
			<fieldset className={styles.fieldset}>
				<legend>Hvilke foretrekker du?</legend>
				<ds-field className={styles.field}>
					<input
						type="checkbox"
						className={styles.input}
						name="my-check-validation"
						required
					/>
					<label>Checkbox 1</label>
				</ds-field>
				<ds-field className={styles.field}>
					<input
						type="checkbox"
						className={styles.input}
						name="my-check-validation"
						required
					/>
					<label>Checkbox 2</label>
				</ds-field>
				<div className={styles.validation} data-field="validation" hidden>
					Feilmelding
				</div>
			</fieldset>
			<fieldset className={styles.fieldset}>
				<legend>Hvilke foretrekker du?</legend>
				<ds-field className={styles.field}>
					<input
						type="radio"
						className={styles.input}
						name="my-radio-validation"
						required
					/>
					<label>Radio 1</label>
					<div className={styles.validation} data-field="validation" hidden>
						Feilmelding 1
					</div>
				</ds-field>
				<ds-field className={styles.field}>
					<input
						type="radio"
						className={styles.input}
						name="my-radio-validation"
						required
					/>
					<label>Radio 2</label>
					<div className={styles.validation} data-field="validation" hidden>
						Feilmelding 2
					</div>
				</ds-field>
				<div className={styles.validation} data-field="validation" hidden>
					Feilmelding
				</div>
			</fieldset>

			<button type="submit" className={styles.button} data-variant="primary">
				Send inn
			</button>
		</form>
	),
};

export const WithTexts: Story = {
	parameters: {
		showInOverview: true,
	},
	render: () => (
		<fieldset className={styles.fieldset}>
			<legend>Hva heter du?</legend>
			<div className={styles.grid} data-items="200" data-fixed>
				<ds-field className={styles.field}>
					<input
						aria-label="Fornavn"
						placeholder="Fornavn"
						className={styles.input}
						name="fornavn"
						type="text"
					/>
				</ds-field>
				<ds-field className={styles.field}>
					<input
						aria-label="Etternavn"
						placeholder="Etternavn"
						className={styles.input}
						name="etternavn"
						type="text"
					/>
				</ds-field>
			</div>
		</fieldset>
	),
};
