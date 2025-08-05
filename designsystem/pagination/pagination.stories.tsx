import type { Meta, StoryObj } from "@storybook/react-vite";
import { pagination } from "../";
import { Pagination } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Pagination",
	argTypes: {
		current: {
			description: "Nåværede side",
			table: {
				type: { summary: "number" },
			},
		},
		total: {
			description: "Totalt antall sider",
			table: {
				type: { summary: "number" },
			},
		},
		show: {
			description: "Maks antall tall/dotter som skal vises i paginasjonen",
			table: {
				defaultValue: { summary: "7" },
				type: { summary: "number" },
			},
		},
		props: {
			description:
				"Funksjon som lager props som skal legges på hver lenke/knapp",
			table: {
				type: {
					summary: `({ page: number, type: "prev" | "next" | "page" }) => ({ ...props })`,
					detail: `Eksempel: ({ page }) => ({ href: \`?p=\${page}\` })`,
				},
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLinks: Story = {
	render: () => (
		<nav aria-label="Sidenavigering" className={styles.pagination}>
			<ul>
				<li>
					<a href="?p=1" className={styles.button} aria-disabled="true">
						Forrige
					</a>
				</li>
				<li>
					<a href="?p=1" className={styles.button} aria-current="page">
						1
					</a>
				</li>
				<li>
					<a href="?p=2" className={styles.button}>
						2
					</a>
				</li>
				<li>
					<a href="?p=3" className={styles.button}>
						3
					</a>
				</li>
				<li>
					<a href="?p=4" className={styles.button}>
						4
					</a>
				</li>
				<li></li>
				<li>
					<a href="?p=10" className={styles.button}>
						10
					</a>
				</li>
				<li>
					<a href="?p=2" className={styles.button}>
						Neste
					</a>
				</li>
			</ul>
		</nav>
	),
};

export const React: Story = {
	render: () => {
		const { pages, next, prev } = pagination({
			current: 1,
			total: 20,
			show: 7,
		});

		return (
			<>
				Rendering using separate elements:
				<Pagination>
					<ul>
						<li>
							<a href="?p=1" className={styles.button} aria-disabled="true">
								Forrige
							</a>
						</li>
						<li>
							<a href="?p=1" className={styles.button} aria-current="page">
								1
							</a>
						</li>
						<li>
							<a href="?p=2" className={styles.button}>
								2
							</a>
						</li>
						<li>
							<a href="?p=3" className={styles.button}>
								3
							</a>
						</li>
						<li>
							<a href="?p=4" className={styles.button}>
								4
							</a>
						</li>
						<li></li>
						<li>
							<a href="?p=10" className={styles.button}>
								10
							</a>
						</li>
						<li>
							<a href="?p=2" className={styles.button}>
								Neste
							</a>
						</li>
					</ul>
				</Pagination>
				<br />
				Rendering using helper-function:
				<Pagination>
					<ul>
						<li>
							<a
								aria-disabled={!prev}
								className={styles.button}
								href={prev ? `?p=${prev}` : undefined}
							>
								Forrige
							</a>
						</li>
						{pages.map(({ current, key, page }) => (
							<li key={key}>
								{!!page && (
									<a
										aria-current={current}
										className={styles.button}
										href={`?p=${page}`}
									>
										{page}
									</a>
								)}
							</li>
						))}
						<li>
							<a
								aria-disabled={!next}
								className={styles.button}
								href={next ? `?p=${next}` : undefined}
							>
								Neste
							</a>
						</li>
					</ul>
				</Pagination>
				<br />
				Rendering buttons using props:
				<Pagination
					current={1}
					show={7}
					total={20}
					props={({ page }) => ({ onClick: () => alert(page) })}
				/>
				<br />
				Rendering links using props:
				<Pagination
					current={1}
					show={7}
					total={20}
					props={({ page }) => ({ href: `?p=${page}` })}
				/>
			</>
		);
	},
};

export const WithButtons: Story = {
	render: () => (
		<nav aria-label="Sidenavigering" className={styles.pagination}>
			<ul>
				<li>
					<button type="button" className={styles.button} disabled>
						Forrige
					</button>
				</li>
				<li>
					<button type="button" className={styles.button} aria-current="page">
						1
					</button>
				</li>
				<li>
					<button type="button" className={styles.button}>
						2
					</button>
				</li>
				<li>
					<button type="button" className={styles.button}>
						3
					</button>
				</li>
				<li>
					<button type="button" className={styles.button}>
						4
					</button>
				</li>
				<li></li>
				<li>
					<button type="button" className={styles.button}>
						10
					</button>
				</li>
				<li>
					<button type="button" className={styles.button}>
						Neste
					</button>
				</li>
			</ul>
		</nav>
	),
};

export const Sizes: Story = {
	render: () => (
		<nav
			data-size="sm"
			aria-label="Sidenavigering"
			className={styles.pagination}
		>
			<ul>
				<li>
					<button type="button" className={styles.button} disabled></button>
				</li>
				<li>
					<button type="button" className={styles.button} aria-current="page">
						1
					</button>
				</li>
				<li>
					<button type="button" className={styles.button}>
						2
					</button>
				</li>
				<li>
					<button type="button" className={styles.button}>
						3
					</button>
				</li>
				<li>
					<button type="button" className={styles.button}>
						4
					</button>
				</li>
				<li></li>
				<li>
					<button type="button" className={styles.button}>
						10
					</button>
				</li>
				<li>
					<button type="button" className={styles.button}></button>
				</li>
			</ul>
		</nav>
	),
};

export const WithHelper: Story = {
	render: () => {
		const { pages, next, prev } = pagination({
			current: 1,
			total: 20,
			show: 7,
		});

		return (
			<Pagination>
				<ul>
					<li>
						<a
							aria-disabled={!prev}
							className={styles.button}
							href={prev ? `?p=${prev}` : undefined}
						>
							Forrige
						</a>
					</li>
					{pages.map(({ current, key, page }) => (
						<li key={key}>
							{!!page && (
								<a
									aria-current={current}
									className={styles.button}
									href={`?p=${page}`}
								>
									{page}
								</a>
							)}
						</li>
					))}
					<li>
						<a
							aria-disabled={!next}
							className={styles.button}
							href={next ? `?p=${next}` : undefined}
						>
							Neste
						</a>
					</li>
				</ul>
			</Pagination>
		);
	},
};
