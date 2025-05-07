import type { Meta, StoryObj } from "@storybook/react";
import { Togglegroup } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Togglegroup",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className={styles.togglegroup}>
			<input type="hidden" name="togglegroup" value="inboks" />
			<button type="button" value="inboks" aria-checked="true">
				Inboks
			</button>
			<button type="button" value="utkast" aria-checked="false">
				Utkast
			</button>
			<button type="button" value="arkiv" aria-checked="false">
				Arkiv
			</button>
			<button type="button" value="sendt" aria-checked="false">
				Sendt
			</button>
		</div>
	),
};

export const React: Story = {
	render: () => <Togglegroup />,
};
