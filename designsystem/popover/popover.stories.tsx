import type { Meta, StoryObj } from "@storybook/react";
import { useId } from "react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Popover",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dropdown: Story = {
	render: function Render() {
		const popId = useId();

		return (
			<>
				<button popovertarget={popId} type="button" className={styles.button}>
					Knapp
				</button>
				<menu popover="" id={popId} className={styles.popover}>
					<li>
						<button type="button" className={styles.button}>
							Knapp 1
						</button>
					</li>
					<li>
						<button type="button" className={styles.button}>
							Knapp 2
						</button>
					</li>
					<li>
						<button type="button" className={styles.button}>
							Knapp 3
						</button>
					</li>
				</menu>
			</>
		);
	},
};

export const Position: Story = {
	render: () => (
		<>
			<button popovertarget="pop-2" type="button" className={styles.button}>
				Knapp
			</button>
			<div
				popover=""
				id="pop-2"
				className={styles.popover}
				data-position="top-end"
			>
				Er du sikker på at du vil avslutte uten å lagre?
				<div>
					<button type="button" className={styles.button}>
						Lagre
					</button>
					<button
						popovertarget="pop-2"
						popovertargetaction="hide"
						type="button"
						className={styles.button}
						data-variant="secondary"
					>
						Avbryt
					</button>
				</div>
			</div>
		</>
	),
};

export const Close: Story = {
	render: () => (
		<>
			<button popovertarget="pop-3" type="button" className={styles.button}>
				Knapp
			</button>
			<div popover="" id="pop-3" className={styles.popover}>
				<button
					popovertarget="pop-3"
					popovertargetaction="hide"
					type="button"
					className={styles.button}
				>
					Lukk
				</button>
			</div>
		</>
	),
};

export const Arrow: Story = {
	render: () => (
		<>
			<button
				data-arrow
				popovertarget="pop-4"
				type="button"
				className={styles.button}
			>
				Knapp
			</button>
			<div popover="" id="pop-4" className={styles.popover}>
				Innhold
			</div>
		</>
	),
};
