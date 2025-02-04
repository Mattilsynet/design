import { User } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";
import avatar from "./avatar.jpg";

const meta = {
	title: "Designsystem/Avatar",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators: Story["decorators"] = [
	(Story) => (
		<div className={styles.flex} data-align="center">
			<Story />
		</div>
	),
];

export const Default: Story = {
	decorators,
	render: () => (
		<>
			<div className={styles.avatar}>MT</div>
			<div className={styles.avatar}>
				<img src={avatar} alt="Navn Navnesen" />
			</div>
			<div className={styles.avatar}>
				<User aria-label="Navn Navnesen" />
			</div>
		</>
	),
};

export const Sizes: Story = {
	decorators,
	render: () => (
		<>
			<div className={styles.avatar} data-size="xs">
				XS
			</div>
			<div className={styles.avatar} data-size="sm">
				SM
			</div>
			<div className={styles.avatar} data-size="md">
				MD
			</div>
			<div className={styles.avatar} data-size="lg">
				LG
			</div>
		</>
	),
};
