import type { Meta, StoryObj } from "@storybook/react";
import { Button, Flex, toast } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Toast",
	parameters: {
		layout: "padded",
	},
	decorators: [
		(Story) => (
			<div style={{ minHeight: 200 }}>
				<Story />
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

let count = 1;
export const Default: Story = {
	render: () => (
		<button
			type="button"
			className={styles.button}
			data-variant="secondary"
			onClick={() => toast(`Toast #${++count}`)}
		>
			Vis en toast
		</button>
	),
};

export const React: Story = {
	render: () => (
		<Button
			data-variant="secondary"
			onClick={() => toast(<span>Toast #{++count}</span>)}
		>
			Vis en toast
		</Button>
	),
};

export const Colors: Story = {
	render: () => (
		<Flex>
			<button
				type="button"
				className={styles.button}
				data-variant="secondary"
				onClick={() => toast(<span>Toast default</span>)}
			>
				Vis default
			</button>
			<button
				type="button"
				className={styles.button}
				data-variant="secondary"
				data-color="info"
				onClick={() => toast(<span>Toast info</span>, { color: "info" })}
			>
				Vis info
			</button>
			<button
				type="button"
				className={styles.button}
				data-variant="secondary"
				data-color="success"
				onClick={() => toast(<span>Toast success</span>, { color: "success" })}
			>
				Vis success
			</button>
			<button
				type="button"
				className={styles.button}
				data-variant="secondary"
				data-color="warning"
				onClick={() => toast(<span>Toast warning</span>, { color: "warning" })}
			>
				Vis warning
			</button>
			<button
				type="button"
				className={styles.button}
				data-variant="secondary"
				data-color="danger"
				onClick={() => toast(<span>Toast danger</span>, { color: "danger" })}
			>
				Vis danger
			</button>
			<button
				type="button"
				className={styles.button}
				data-variant="secondary"
				data-color="neutral"
				onClick={() => toast(<span>Toast neutral</span>, { color: "neutral" })}
			>
				Vis neutral
			</button>
		</Flex>
	),
};

const someApiCall = () => new Promise((resolve) => setTimeout(resolve, 2000));
export const WithLoading: Story = {
	render: () => (
		<button
			type="button"
			className={styles.button}
			data-variant="secondary"
			onClick={() => {
				const id = toast(<span>Toast loading</span>, { busy: true });
				someApiCall()
					.then(() => toast("Ferdig!", { id, busy: false, color: "success" }))
					.catch(() => toast("Feil!", { id, busy: false, color: "danger" }));
			}}
		>
			Vis laster
		</button>
	),
};

export const WithNoTimeout: Story = {
	render: () => (
		<button
			type="button"
			className={styles.button}
			data-variant="secondary"
			onClick={() => toast("Blir stående åpen", { timeout: false })}
		>
			Vis uten automatisk lukking
		</button>
	),
};

export const WithCustomClose: Story = {
	render: () => (
		<div className={styles.prose}>
			<button
				type="button"
				className={styles.button}
				data-variant="secondary"
				onClick={() => toast("Ingen lukke-kryss", { closedby: "none" })}
			>
				Vis uten lukke-kryss
			</button>
			<button
				type="button"
				className={styles.button}
				data-variant="secondary"
				onClick={() =>
					toast(
						<div className={styles.prose}>
							<p>Pellentesque scelerisque urna orci in placerat.</p>
							<button
								className={styles.button}
								data-command="close"
								data-variant="primary"
								type="button"
							>
								Ok
							</button>
						</div>,
						{ closedby: "none", timeout: false, color: "info" },
					)
				}
			>
				Vis egen lukk knapp
			</button>
		</div>
	),
};

export const HTML: Story = {
	render: () => (
		<>
			<button
				type="button"
				className={styles.button}
				data-variant="secondary"
				onClick={() =>
					document.querySelector<HTMLDialogElement>("#my-toast")?.show()
				}
			>
				Vis en toast
			</button>
			<dialog id="my-toast" className={styles.toast}>
				Toasten
			</dialog>
		</>
	),
};
