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
			onClick={() => toast(`Toast #${++count}`)}
			type="button"
			className={styles.button}
			data-variant="secondary"
		>
			Vis en toast
		</button>
	),
};

export const React: Story = {
	render: () => (
		<Button
			onClick={() => toast(<span>Toast #{++count}</span>)}
			data-variant="secondary"
		>
			Vis en toast
		</Button>
	),
};

export const Colors: Story = {
	render: () => (
		<Flex>
			<button
				onClick={() => toast("Toast default")}
				type="button"
				className={styles.button}
				data-variant="secondary"
			>
				Vis default
			</button>
			<button
				onClick={() => toast.info("Toast info")}
				type="button"
				className={styles.button}
				data-variant="secondary"
				data-color="info"
			>
				Vis info
			</button>
			<button
				onClick={() => toast.success("Toast success")}
				type="button"
				className={styles.button}
				data-variant="secondary"
				data-color="success"
			>
				Vis success
			</button>
			<button
				onClick={() => toast.warning("Toast warning")}
				type="button"
				className={styles.button}
				data-variant="secondary"
				data-color="warning"
			>
				Vis warning
			</button>
			<button
				onClick={() => toast.danger("Toast danger")}
				type="button"
				className={styles.button}
				data-variant="secondary"
				data-color="danger"
			>
				Vis danger
			</button>
			<button
				onClick={() => toast.neutral("Toast neutral")}
				type="button"
				className={styles.button}
				data-variant="secondary"
				data-color="neutral"
			>
				Vis neutral
			</button>
		</Flex>
	),
};

const someApiCall = () => new Promise((resolve) => setTimeout(resolve, 2000));
export const WithUpdates: Story = {
	render: () => (
		<button
			onClick={() => {
				const id = toast.info(<span>Toast loading</span>, { busy: true });
				someApiCall()
					.then(() => toast.success("Ferdig!", { id, busy: false }))
					.catch(() => toast.danger("Feil!", { id, busy: false }));
			}}
			type="button"
			className={styles.button}
			data-variant="secondary"
		>
			Vis laster
		</button>
	),
};

export const WithPromise: Story = {
	render: () => (
		<button
			onClick={() =>
				toast.promise(someApiCall, {
					loading: <span>Toast loading</span>,
					success: "Handlingen ble fullført",
					error: "Noe gikk galt under utføring",
				})
			}
			type="button"
			className={styles.button}
			data-variant="secondary"
		>
			Vis promise
		</button>
	),
};

export const WithNoTimeout: Story = {
	render: () => (
		<button
			onClick={() => toast("Blir stående åpen", { timeout: false })}
			type="button"
			className={styles.button}
			data-variant="secondary"
		>
			Vis uten automatisk lukking
		</button>
	),
};

export const WithCustomClose: Story = {
	render: () => (
		<div className={styles.prose}>
			<button
				onClick={() => toast("Ingen lukke-kryss", { closedby: "none" })}
				type="button"
				className={styles.button}
				data-variant="secondary"
			>
				Vis uten lukke-kryss
			</button>
			<button
				onClick={() =>
					toast.info(
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
						{ closedby: "none", timeout: false },
					)
				}
				type="button"
				className={styles.button}
				data-variant="secondary"
			>
				Vis egen lukk knapp
			</button>
		</div>
	),
};

export const AsHTML: Story = {
	render: () => (
		<>
			<button
				onClick={() =>
					document.querySelector<HTMLDialogElement>("#my-toast")?.show()
				}
				type="button"
				className={styles.button}
				data-variant="secondary"
			>
				Vis en toast
			</button>
			<dialog id="my-toast" className={styles.toast}>
				Toasten
			</dialog>
		</>
	),
};
