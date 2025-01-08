import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useRef, useState } from "react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Modal",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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

export const WithClose: Story = {
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
						<button type="submit" aria-label="Lukk"></button>
					</form>
					<div className={styles.grid}>
						Modal content here
						<div className={styles.flex}>
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
					</div>
				</dialog>
			</>
		);
	},
};
