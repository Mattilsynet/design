import type { Meta, StoryObj } from "@storybook/react";
import { pagination } from "../";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Pagination",
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
			<nav className={styles.pagination}>
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
			</nav>
		);
	},
};
