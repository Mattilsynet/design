import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Field, Input } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Field",
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
			<p>Beskrivelse</p>
			<input type="text" className={styles.input} />
		</div>
	),
};

export const React: Story = {
	render: () => (
		<>
			<h2>
				Field uten <code>as</code> attributt lar deg bygge opp av bestanddeler:
			</h2>
			<Field>
				<label>Ledetekst</label>
				<p>Beskrivelse</p>
				<Input className={styles.input} />
			</Field>
			<br />
			<h2>
				Field med <code>as="input"</code> gir deg en komplett field med
				<small></small>
				<br />
				<code>label</code> + <code>description</code> + <code>input</code> +{" "}
				<code>error</code> + <code>prefix</code> + <code>suffix</code>:
			</h2>
			<Field
				as="input"
				label="Ledetekst"
				description="Beskrivelse"
				error="Feilmelding"
				prefix="Før"
				suffix="Etter"
			/>
			<br />
			<h2>
				Field med <code>as="input"</code> og <code>type="checkbox"</code>:
			</h2>
			<Field as="input" type="checkbox" label="Ledetekst" />
			<br />
			<h2>
				Field med <code>as="textarea"</code> og{" "}
				<code>count=&#x7B;15&#x7D;</code>:
			</h2>
			<Field
				as="textarea"
				label="Ledetekst"
				description="Beskrivelse"
				count={15}
			/>
			<br />
			<h2>
				Field med <code>as="select"</code>:
			</h2>
			<Field as="select" label="Ledetekst">
				<option>Option 1</option>
				<option>Option 2</option>
				<option>Option 3</option>
				<option>Option 4</option>
				<option>Option 5</option>
			</Field>
		</>
	),
};

export const Required: Story = {
	render: () => (
		<div className={styles.field}>
			<label>Ledetekst</label>
			<p>Beskrivelse</p>
			<input type="text" required className={styles.input} />
		</div>
	),
};

export const Toggles: Story = {
	render: () => (
		<>
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
				<p>Beskrivelse</p>
				<input type="radio" className={styles.input} name="my-radio" />
			</div>
			<div className={styles.field}>
				<label>Check</label>
				<input type="checkbox" className={styles.input} />
			</div>
			<div className={styles.field}>
				<label>Switch</label>
				<input type="checkbox" className={styles.input} role="switch" />
			</div>
		</>
	),
};

export const WithValidation: Story = {
	render: () => (
		<>
			<div className={styles.field}>
				<label>Ledetekst</label>
				<p>Beskrivelse</p>
				<input type="text" className={styles.input} />
				<div className={styles.validation}>Validation</div>
			</div>
		</>
	),
};

export const WithAffixes: Story = {
	parameters: {
		showInOverview: true,
	},
	render: () => (
		<>
			<div className={styles.field}>
				<label>Pris i NOK per måned</label>
				<div className={styles.affixes}>
					<span>NOK</span>
					<input type="text" className={styles.input} />
					<span>pr. mnd.</span>
				</div>
			</div>
		</>
	),
};

export const WithCharacterCount: Story = {
	parameters: {
		layout: "padded",
		showInOverview: true,
	},
	render: () => (
		<>
			<div className={styles.field}>
				<label>Ledetekst</label>
				<textarea className={styles.input} defaultValue="Noe innhold" />
				<p data-count="20" />
			</div>
		</>
	),
};

export const WithSuggestion: Story = {
	name: "With suggestion (Eksperimentell)",
	parameters: {
		layout: "padded",
		showInOverview: true,
	},
	render: () => (
		<div className={styles.field}>
			<label>With suggestion</label>
			<input type="search" className={styles.input} />
			<u-datalist>
				<u-option role="none">Tomt</u-option>
				<u-option value="Sogndal">Sogndal</u-option>
				<u-option value="Oslo">Oslo</u-option>
				<u-option value="Brønnøysund">Brønnøysund</u-option>
				<u-option value="Stavanger">Stavanger</u-option>
				<u-option value="Trondheim">Trondheim</u-option>
				<u-option value="Bergen">Bergen</u-option>
				<u-option value="Lillestrøm">Lillestrøm</u-option>
			</u-datalist>
		</div>
	),
};

export const WithMultiSuggestion: Story = {
	name: "With multi suggestion (Eksperimentell)",
	parameters: {
		layout: "padded",
		showInOverview: true,
	},
	render: () => (
		<div className={styles.field}>
			<label>With multi suggestion</label>
			<u-tags>
				<data value="Sogndal">Sogndal</data>
				<input type="search" className={styles.input} />
				<u-datalist>
					<u-option role="none">Tomt</u-option>
					<u-option value="Sogndal">Sogndal</u-option>
					<u-option value="Oslo">Oslo</u-option>
					<u-option value="Brønnøysund">Brønnøysund</u-option>
					<u-option value="Stavanger">Stavanger</u-option>
					<u-option value="Trondheim">Trondheim</u-option>
					<u-option value="Bergen">Bergen</u-option>
					<u-option value="Lillestrøm">Lillestrøm</u-option>
				</u-datalist>
			</u-tags>
		</div>
	),
};

export const ReactWithSuggestion: Story = {
	name: "React With suggestion (Eksperimentell)",
	parameters: {
		layout: "padded",
		showInOverview: true,
	},
	render: () => (
		<Field>
			<label>React With suggestion</label>
			<p>Beskrivelse</p>
			<Input className={styles.input} />
			<Field.Datalist>
				<Field.Option>Saft</Field.Option>
				<Field.Option>Suse</Field.Option>
			</Field.Datalist>
		</Field>
	),
};

export const ReactWithMultiSuggestion: Story = {
	name: "React With multi suggestion (Eksperimentell)",
	parameters: {
		layout: "padded",
		showInOverview: true,
	},
	render: () => {
		const [values] = useState<string[]>(["Saft"]);

		return (
			<Field>
				<label>React With suggestion</label>
				<p>Beskrivelse</p>
				<Field.Tags>
					{values.map((value) => (
						<data key={value}>{value}</data>
					))}
					<Input className={styles.input} />
					<Field.Datalist data-filter="false">
						<Field.Option>Saft</Field.Option>
						<Field.Option>Suse</Field.Option>
					</Field.Datalist>
				</Field.Tags>
			</Field>
		);
	},
};
