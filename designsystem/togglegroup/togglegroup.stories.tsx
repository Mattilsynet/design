import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Togglegroup } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Togglegroup",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<fieldset className={styles.togglegroup} aria-label="Mappe">
			<label>
				<input type="radio" name="my-toggles" value="inboks" />
				Inboks
			</label>
			<label>
				<input type="radio" name="my-toggles" value="utkast" defaultChecked />
				Utkast
			</label>
			<label>
				<input type="radio" name="my-toggles" value="arkiv" />
				Arkiv
			</label>
			<label>
				<input type="radio" name="my-toggles" value="sendt" />
				Sendt
			</label>
		</fieldset>
	),
};

export const React: Story = {
	render: () => {
		const items = ["Inboks", "Utkast", "Arkiv", "Sendt"];
		const [value, setValue] = useState(items[1]);

		return (
			<Togglegroup>
				{items.map((item) => (
					<Togglegroup.Item
						checked={value === item}
						key={item}
						name="react-toggles"
						onChange={() => setValue(item)}
						value={item}
					>
						{item}
					</Togglegroup.Item>
				))}
			</Togglegroup>
		);
	},
};
