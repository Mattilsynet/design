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
				<button
					popoverTarget={popId}
					type="button"
					className={styles.button}
					data-variant="secondary"
					data-arrow
				>
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
			<button
				popoverTarget="pop-2"
				type="button"
				className={styles.button}
				data-variant="primary"
			>
				Knapp
			</button>
			<div
				popover=""
				id="pop-2"
				className={styles.popover}
				data-position="over"
			>
				<div className={styles.grid}>
					<p>Er du sikker på at du vil avslutte uten å lagre?</p>
					<div className={styles.flex}>
						<button
							type="button"
							className={styles.button}
							data-variant="primary"
						>
							Lagre
						</button>
						<button
							popoverTarget="pop-2"
							popoverTargetAction="hide"
							type="button"
							className={styles.button}
							data-variant="secondary"
						>
							Avbryt
						</button>
					</div>
				</div>
			</div>
		</>
	),
};

export const WithClose: Story = {
	render: () => (
		<>
			<button
				popoverTarget="pop-3"
				type="button"
				className={styles.button}
				data-variant="primary"
			>
				Knapp
			</button>
			<div popover="" id="pop-3" className={styles.popover}>
				<button
					popoverTarget="pop-3"
					popoverTargetAction="hide"
					type="button"
					className={styles.button}
					data-variant="secondary"
				>
					Lukk
				</button>
			</div>
		</>
	),
};

export const WithArrow: Story = {
	render: () => (
		<>
			<button
				data-arrow
				popoverTarget="pop-4"
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

export const WithDivider: Story = {
	render: function Render() {
		const popId = useId();

		return (
			<>
				<button
					popoverTarget={popId}
					type="button"
					className={styles.button}
					data-variant="secondary"
					data-arrow
				>
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
						<hr />
					</li>
					<li>
						<button type="button" className={styles.button}>
							Knapp 3
						</button>
					</li>
					<li>
						<button type="button" className={styles.button}>
							Knapp 4
						</button>
					</li>
				</menu>
			</>
		);
	},
};
