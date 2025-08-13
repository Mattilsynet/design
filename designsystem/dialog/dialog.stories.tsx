import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button, Dialog, Heading, Prose } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Dialog",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: function Render() {
		const [open, setOpen] = useState(false);

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
					className={styles.dialog}
					onClose={() => setOpen(false)}
					open={open}
				>
					<button aria-label="Lukk" data-command="close" type="button"></button>
					<div className={styles.prose}>
						<h2 className={styles.heading}>Eksempeldialog</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Suspendisse malesuada eget risus nec viverra. Nam dapibus nec arcu
							in tristique. Fusce varius urna odio, vel bibendum odio imperdiet
							eget. Aliquam consectetur arcu mi, quis elementum mi convallis a.
							Sed venenatis nec enim vel molestie. Vestibulum nec auctor ligula.
							Nunc id sollicitudin ligula. Fusce interdum quam posuere augue
							fringilla, dignissim convallis ex suscipit.
						</p>
						<p>
							Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
							posuere cubilia curae; Aliquam commodo bibendum risus non luctus.
							Etiam molestie lectus commodo quam ornare posuere. Vestibulum
							aliquam viverra ligula non ultricies. Pellentesque eu bibendum
							nibh, vel vestibulum tortor. Duis rutrum metus sed dictum
							sagittis. Vivamus in arcu sed neque cursus condimentum. Praesent
							vel turpis malesuada, ullamcorper justo et, facilisis neque. In ex
							enim, semper sed sapien sit amet, mollis laoreet mi. Fusce vitae
							bibendum nulla, in condimentum tortor.
						</p>
					</div>
				</dialog>
			</>
		);
	},
};

export const React: Story = {
	render: function Render() {
		const [open, setOpen] = useState(false);

		return (
			<>
				<Button onClick={() => setOpen(true)}>Open</Button>
				<Dialog onClose={() => setOpen(false)} open={open}>
					<Button aria-label="Lukk" onClick={() => setOpen(false)} />
					<Prose>
						<Heading>Eksempeldialog</Heading>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Suspendisse malesuada eget risus nec viverra. Nam dapibus nec arcu
							in tristique. Fusce varius urna odio, vel bibendum odio imperdiet
							eget. Aliquam consectetur arcu mi, quis elementum mi convallis a.
							Sed venenatis nec enim vel molestie. Vestibulum nec auctor ligula.
							Nunc id sollicitudin ligula. Fusce interdum quam posuere augue
							fringilla, dignissim convallis ex suscipit.
						</p>
						<p>
							Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
							posuere cubilia curae; Aliquam commodo bibendum risus non luctus.
							Etiam molestie lectus commodo quam ornare posuere. Vestibulum
							aliquam viverra ligula non ultricies. Pellentesque eu bibendum
							nibh, vel vestibulum tortor. Duis rutrum metus sed dictum
							sagittis. Vivamus in arcu sed neque cursus condimentum. Praesent
							vel turpis malesuada, ullamcorper justo et, facilisis neque. In ex
							enim, semper sed sapien sit amet, mollis laoreet mi. Fusce vitae
							bibendum nulla, in condimentum tortor.
						</p>
					</Prose>
				</Dialog>
			</>
		);
	},
};

export const WithClose: Story = {
	render: function Render() {
		const [open, setOpen] = useState(false);

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
					className={styles.dialog}
					onClose={() => setOpen(false)}
					open={open}
				>
					<button type="button" data-command="close" aria-label="Lukk"></button>
					<div className={styles.prose}>
						<h2 className={styles.heading}>Eksempeldialog</h2>
						<p>Dialog content here</p>
						<div className={styles.flex}>
							<button
								type="button"
								data-variant="primary"
								className={styles.button}
							>
								Lagre
							</button>
							<button
								className={styles.button}
								data-command="close"
								type="button"
							>
								Avbryt
							</button>
						</div>
					</div>
				</dialog>
			</>
		);
	},
};

export const WithBackdropClose: Story = {
	render: function Render() {
		const [open, setOpen] = useState(false);

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
					className={styles.dialog}
					data-closedby="any"
					onClose={() => setOpen(false)}
					open={open}
				>
					<h2 className={styles.heading}>Eksempeldialog</h2>
					Klikk på utsiden for å lukke
				</dialog>
			</>
		);
	},
};

export const WithoutBackdrop: Story = {
	render: function Render() {
		const [open, setOpen] = useState(false);

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
					className={styles.dialog}
					data-modal="false"
					onClose={() => setOpen(false)}
					open={open}
				>
					<button type="button" aria-label="Lukk" data-command="close" />
					<div className={styles.prose}>
						<h2 className={styles.heading}>Eksempeldialog</h2>
						<p>Uten backdrop</p>
					</div>
				</dialog>
			</>
		);
	},
};

export const AsDrawer: Story = {
	render: function Render() {
		const [open, setOpen] = useState(false);

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
					className={styles.dialog}
					data-variant="drawer"
					onClose={() => setOpen(false)}
					open={open}
				>
					<button type="button" aria-label="Lukk" data-command="close" />
					<div className={styles.prose}>
						<h2 className={styles.heading}>Eksempelskuff</h2>
						<p>Kan brukes med og uten backdrop</p>
					</div>
				</dialog>
			</>
		);
	},
};
