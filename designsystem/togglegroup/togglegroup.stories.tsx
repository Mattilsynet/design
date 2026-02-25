import {
	TextAlignCenterIcon,
	TextAlignLeftIcon,
	TextAlignRightIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
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
		<div className={styles.grid}>
			<fieldset className={styles.togglegroup} data-toggle-group="Mappe">
				<label className={styles.button}>
					<input type="radio" name="my-toggles" value="innboks" />
					Innboks
				</label>
				<label className={styles.button}>
					<input type="radio" name="my-toggles" value="utkast" defaultChecked />
					Utkast
				</label>
				<label className={styles.button}>
					<input type="radio" name="my-toggles" value="arkiv" />
					Arkiv
				</label>
				<label className={styles.button}>
					<input type="radio" name="my-toggles" value="sendt" />
					Sendt
				</label>
			</fieldset>
			<fieldset className={styles.togglegroup} data-toggle-group="Mappe">
				<label className={styles.button}>
					<input type="radio" name="my-icon-toggle" value="left" />
					<TextAlignLeftIcon />
				</label>
				<label className={styles.button}>
					<input
						type="radio"
						name="my-icon-toggle"
						value="center"
						defaultChecked
					/>
					<TextAlignCenterIcon />
				</label>
				<label className={styles.button}>
					<input type="radio" name="my-icon-toggle" value="right" />
					<TextAlignRightIcon />
				</label>
			</fieldset>
		</div>
	),
};

export const React: Story = {
	render: () => {
		const items = ["Innboks", "Utkast", "Arkiv", "Sendt"];
		const [value, setValue] = useState(items[1]);

		return (
			<Togglegroup data-toggle-group="Mappe">
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

export const AsLinks: Story = {
	render: () => (
		<fieldset
			data-size="sm"
			className={styles.togglegroup}
			data-toggle-group="Valgknapper"
			aria-label="Valgknapper"
		>
			<a href="#liste" className={styles.button} aria-current="true">
				Liste
			</a>
			<a href="#tidslinje" className={styles.button}>
				Tidslinje
			</a>
		</fieldset>
	),
};
