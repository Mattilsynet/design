import type { Meta, StoryObj } from "@storybook/react";
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
				popoverTarget="my-helptext-1"
				aria-label="Hva menes med mottaker"
			></button>
			<div className={styles.popover} id="my-helptext-1" popover="auto">
				Tekst som forklarer hva som menes med mottaker
			</div>
		</>
	),
};

export const InField: Story = {
	render: () => (
		<div className={styles.field}>
			<label>Ledetekst</label>
			<button
				type="button"
				className={styles.helptext}
				aria-label="Hva menes med mottaker"
				popoverTarget="my-helptext-1"
			></button>
			<div className={styles.popover} id="my-helptext-1" popover="auto">
				Tekst som forklarer hva som menes med mottaker
			</div>
			<p>Beskrivelse</p>
			<input type="text" className={styles.input} />
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
				popoverTarget="my-helptext-1"
			></button>
			<div className={styles.popover} id="my-helptext-1" popover="auto">
				Tekst som forklarer hva som menes med mottaker
			</div>
			<div className={styles.field}>
				<label>Labeltekst</label>
				<input type="checkbox" className={styles.input} />
			</div>
		</fieldset>
	),
};

export const React: Story = {
	render: () => (
		<Grid data-gap="10">
			<HelpText>Hva menes med mottaker</HelpText>
			<Field>
				<label>Ledetekst</label>
				<HelpText aria-label="Hva menes med mottaker">
					Tekst som forklarer hva som menes med mottaker
				</HelpText>
				<p>Beskrivelse</p>
				<Input />
			</Field>
		</Grid>
	),
};
