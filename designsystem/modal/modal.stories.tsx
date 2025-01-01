import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { useEffect, useRef, useState } from "react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Modal",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators = [
	(Story: StoryFn) => (
		<div style={{ display: "grid", gap: ".5rem" }}>
			<Story />
		</div>
	),
];

export const Default: Story = {
	decorators,
	render: function Render() {
		const [open, setOpen] = useState(false);
		const modal = useRef<HTMLDialogElement>(null);

		useEffect(() => {
			if (open) modal.current?.showModal();
			else modal.current?.close();
		}, [open]);

		return (
			<>
				<button
					className={styles.button}
					onClick={() => setOpen(true)}
					type="button"
				>
					Open
				</button>
				<dialog
					className={styles.modal}
					onClose={() => setOpen(false)}
					ref={modal}
				>
					<form method="dialog">
						<button
							type="submit"
							className={styles.button}
							aria-label="Lukk"
						></button>
					</form>
					Modal content here
				</dialog>
			</>
		);
	},
};

export const Close: Story = {
	decorators,
	render: function Render() {
		const [open, setOpen] = useState(false);
		const modal = useRef<HTMLDialogElement>(null);

		useEffect(() => {
			if (open) modal.current?.showModal();
			else modal.current?.close();
		}, [open]);

		return (
			<>
				<button
					className={styles.button}
					type="button"
					onClick={() => setOpen(true)}
				>
					Open
				</button>
				<dialog
					className={styles.modal}
					onClose={() => setOpen(false)}
					ref={modal}
				>
					<form method="dialog">
						<button
							type="submit"
							className={styles.button}
							aria-label="Lukk"
						></button>
					</form>
					Modal content here
					<br />
					<br />
					<div style={{ display: "flex", gap: ".5rem" }}>
						<form method="dialog">
							<button
								type="submit"
								className={styles.button}
								data-variant="secondary"
							>
								Avbryt
							</button>
						</form>
						<button type="button" className={styles.button}>
							Lagre
						</button>
					</div>
				</dialog>
			</>
		);
	},
};
