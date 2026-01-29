import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, Grid, HelpText, Input } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Help text",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<>
			<button
				type="button"
				className={styles.helptext}
				popoverTarget="my-helptext"
				aria-label="Hva menes med mottaker"
			></button>
			<div className={styles.popover} id="my-helptext" popover="auto">
				Tekst som forklarer hva som menes med mottaker
			</div>
		</>
	),
};

export const InField: Story = {
	render: () => (
		<div className={styles.grid}>
			<ds-field className={styles.field}>
				<label>Ledetekst</label>
				<button
					type="button"
					className={styles.helptext}
					aria-label="Hva menes med mottaker"
					popoverTarget="my-helptext-field"
				></button>
				<div className={styles.popover} id="my-helptext-field" popover="auto">
					Tekst som forklarer hva som menes med mottaker
				</div>
				<p data-field="desciption">Beskrivelse</p>
				<input type="text" className={styles.input} />
			</ds-field>
			<ds-field className={styles.field}>
				<label>Ledetekst</label>
				<button
					type="button"
					className={styles.helptext}
					aria-label="Hva menes med mottaker"
					popoverTarget="my-helptext-field"
				></button>
				<div className={styles.popover} id="my-helptext-field" popover="auto">
					Tekst som forklarer hva som menes med mottaker
				</div>
				<p data-field="desciption">Beskrivelse</p>
				<input type="text" className={styles.input} readOnly disabled />
			</ds-field>
		</div>
	),
};

export const InFieldset: Story = {
	render: () => (
		<fieldset className={styles.fieldset}>
			<legend>Legendtekst</legend>
			<button
				type="button"
				className={styles.helptext}
				aria-label="Hva menes med mottaker"
				popoverTarget="my-helptext-fieldset"
			></button>
			<div className={styles.popover} id="my-helptext-fieldset" popover="auto">
				Tekst som forklarer hva som menes med mottaker
			</div>
			<ds-field className={styles.field}>
				<label>Labeltekst</label>
				<input type="checkbox" className={styles.input} />
			</ds-field>
		</fieldset>
	),
};

export const React: Story = {
	render: () => (
		<Grid data-gap="10">
			<HelpText aria-label="Hva menes med mottaker">
				Tekst som forklarer hva som menes med mottaker
			</HelpText>
			<Field>
				<Field.Label>Ledetekst</Field.Label>
				<HelpText aria-label="Hva menes med mottaker">
					Tekst som forklarer hva som menes med mottaker
				</HelpText>
				<Field.Description>Beskrivelse</Field.Description>
				<Input />
			</Field>
			<Field
				as="input"
				label="Ledetekst"
				helpText="Tekst som forklarer hva som menes med mottaker"
				helpTextLabel="Hva menes med mottaker"
			/>
		</Grid>
	),
};
