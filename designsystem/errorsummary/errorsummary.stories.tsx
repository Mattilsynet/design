import type { Meta, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Error summary",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className={styles.errorsummary} role="alert">
			<h2>For å gå videre må du rette opp følgende feil:</h2>
			<ul>
				<li>
					<a href="#anchor">Fødselsdato kan ikke være etter år 2005</a>
				</li>
				<li>
					<a href="#anchor">Telefonnummer kan kun inneholde siffer</a>
				</li>
				<li>
					<a href="#anchor">E-post må være gyldig</a>
				</li>
			</ul>
		</div>
	),
};
