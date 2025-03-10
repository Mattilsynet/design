import { List, X } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import { useId } from "react";
import { Button, Popover } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Popover",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const range = Array.from(Array(10), (_, num) => num + 1);

export const Default: Story = {
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
				<menu popover="auto" id={popId} className={styles.popover}>
					{range.map((num) => (
						<li key={num}>
							<button type="button" className={styles.button}>
								Knapp {num}
							</button>
						</li>
					))}
				</menu>
			</>
		);
	},
};

export const React: Story = {
	render: function Render() {
		const popId = useId();

		return (
			<>
				<Button popoverTarget={popId} data-variant="secondary" data-arrow>
					Knapp
				</Button>
				<Popover as="menu" id={popId} className={styles.popover}>
					{range.map((num) => (
						<li key={num}>
							<button type="button" className={styles.button}>
								Knapp {num}
							</button>
						</li>
					))}
				</Popover>
			</>
		);
	},
};

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
				<menu popover="auto" id={popId} className={styles.popover}>
					<li>
						<a href="#none" className={styles.button}>
							Knapp 1
						</a>
					</li>
					<li>
						<a href="#none" className={styles.button}>
							Knapp 2
						</a>
					</li>
					<li>
						<a
							href="#none"
							className={styles.button}
							popoverTargetAction="show"
						>
							Knapp 3
						</a>
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
				className={styles.popover}
				data-position="top"
				id="pop-2"
				popover="auto"
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
			<div popover="auto" id="pop-3" className={styles.popover}>
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
				className={styles.button}
				data-arrow
				popoverTarget="pop-4"
				type="button"
			>
				Knapp
			</button>
			<div popover="auto" id="pop-4" className={styles.popover}>
				Innhold
			</div>
		</>
	),
};

export const WithIcon: Story = {
	render: () => (
		<>
			<button className={styles.button} popoverTarget="pop-icon" type="button">
				Knapp
				<List data-pressed="false" />
				<X data-pressed="true" />
			</button>
			<div popover="auto" id="pop-icon" className={styles.popover}>
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
				<menu popover="auto" id={popId} className={styles.popover}>
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
