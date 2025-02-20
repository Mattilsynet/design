import type { Meta, StoryObj } from "@storybook/react";
import { Flex, Grid, Skeleton } from "../react";
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
			<div className={styles.flex} data-gap="md" data-align="center">
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
			<Flex data-gap="md" data-align="center">
				<Skeleton data-variant="circle" style={{ width: 40 }}></Skeleton>
				<h2>
					<Skeleton data-variant="text">En medium tittel</Skeleton>
				</h2>
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
