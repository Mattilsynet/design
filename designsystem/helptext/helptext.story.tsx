import type { Meta, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";
import { HelpText } from "./helptext";

const meta = {
	title: "Designsystem/Help text",
	tags: ["!dev"],
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
			>
				Hva menes med mottaker
			</button>
			<div className={styles.popover} id="my-helptext-1" popover="auto">
				Tekst som forklarer hva som menes med mottaker
			</div>
		</>
	),
};

export const InField: Story = {
	render: () => (
		<div className={styles.field}>
			<div className={styles.flex}>
				<label>Ledetekst</label>
				<button
					type="button"
					className={styles.helptext}
					popoverTarget="my-helptext-1"
				>
					Hva menes med mottaker
				</button>
				<div className={styles.popover} id="my-helptext-1" popover="auto">
					Tekst som forklarer hva som menes med mottaker
				</div>
			</div>
			<p>Beskrivelse</p>
			<input type="text" className={styles.input} />
		</div>
	),
};

export const React: Story = {
	render: () => (
		<>
			<HelpText>Hva menes med mottaker</HelpText>
			<div>Tekst som forklarer hva som menes med mottaker</div>
		</>
	),
};
