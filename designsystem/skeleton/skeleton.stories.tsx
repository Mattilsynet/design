import type { Meta, StoryObj } from "@storybook/react-vite";
import { Flex, Grid, Heading, Skeleton } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Skeleton",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className={styles.grid}>
			<div className={styles.skeleton} style={{ height: 150 }} />
			<div className={styles.flex} data-gap="4" data-align="center">
				<div
					className={styles.skeleton}
					data-variant="circle"
					style={{ width: 40 }}
				></div>
				<h2>
					<div className={styles.skeleton} data-variant="text">
						En medium tittel
					</div>
				</h2>
			</div>
			<p>
				<span className={styles.skeleton} data-variant="text">
					Cras vulputate et dolor vel aliquet. Aliquam convallis, dolor id
					rhoncus lobortis, quam quam cursus nisl, consectetur accumsan ligula
					velit eu nulla.
				</span>
			</p>
		</div>
	),
};

export const React: Story = {
	render: () => (
		<Grid>
			<Skeleton style={{ height: 150 }} />
			<Flex data-gap="4" data-align="center">
				<Skeleton data-variant="circle" style={{ width: 40 }}></Skeleton>
				<Heading>
					<Skeleton data-variant="text">En medium tittel</Skeleton>
				</Heading>
			</Flex>
			<p>
				<Skeleton data-variant="text">
					Cras vulputate et dolor vel aliquet. Aliquam convallis, dolor id
					rhoncus lobortis, quam quam cursus nisl, consectetur accumsan ligula
					velit eu nulla.
				</Skeleton>
			</p>
		</Grid>
	),
};

export const Circle: Story = {
	render: () => (
		<div
			className={styles.skeleton}
			data-variant="circle"
			style={{ width: 50 }}
		></div>
	),
};

export const Text: Story = {
	render: () => (
		<p>
			<span className={styles.skeleton} data-variant="text">
				Cras vulputate et dolor vel aliquet. Aliquam convallis, dolor id rhoncus
				lobortis, quam quam cursus nisl, consectetur accumsan ligula velit eu
				nulla. Cras vulputate et dolor vel aliquet. Aliquam convallis, dolor id
				rhoncus lobortis, quam quam cursus nisl, consectetur accumsan ligula
				velit eu nulla.
			</span>
		</p>
	),
};

export const OnBackground: Story = {
	render: () => (
		<div
			className={`${styles.grid} ${styles.body}`}
			data-items="auto"
			style={{ padding: 40 }}
		>
			<p className={styles.card}>
				<span className={styles.skeleton} data-variant="text">
					Cras vulputate et dolor vel aliquet. Aliquam convallis, dolor id
					rhoncus lobortis, quam quam cursus nisl, consectetur accumsan ligula
					velit eu nulla. Cras vulputate et dolor vel aliquet. Aliquam
					convallis, dolor id rhoncus lobortis, quam quam cursus nisl,
					consectetur accumsan ligula velit eu nulla.
				</span>
			</p>
			<p
				className={styles.card}
				style={{
					background: "var(--mtds-color-background-default)",
				}}
			>
				<span className={styles.skeleton} data-variant="text">
					Cras vulputate et dolor vel aliquet. Aliquam convallis, dolor id
					rhoncus lobortis, quam quam cursus nisl, consectetur accumsan ligula
					velit eu nulla. Cras vulputate et dolor vel aliquet. Aliquam
					convallis, dolor id rhoncus lobortis, quam quam cursus nisl,
					consectetur accumsan ligula velit eu nulla.
				</span>
			</p>
			<p
				className={styles.card}
				style={{
					border: 0,
					background: "var(--mtds-color-background-tinted)",
				}}
			>
				<span className={styles.skeleton} data-variant="text">
					Cras vulputate et dolor vel aliquet. Aliquam convallis, dolor id
					rhoncus lobortis, quam quam cursus nisl, consectetur accumsan ligula
					velit eu nulla. Cras vulputate et dolor vel aliquet. Aliquam
					convallis, dolor id rhoncus lobortis, quam quam cursus nisl,
					consectetur accumsan ligula velit eu nulla.
				</span>
			</p>
		</div>
	),
};
