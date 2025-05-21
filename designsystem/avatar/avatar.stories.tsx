import { UserIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "../react";
import styles from "../styles.module.css";
import avatar from "./avatar.jpg";

const meta = {
	title: "Designsystem/Avatar",
	decorators: [
		(Story) => (
			<div className={styles.flex} data-align="center">
				<Story />
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<>
			<div className={styles.avatar}>MT</div>
			<div className={styles.avatar}>
				<img src={avatar} alt="Navn Navnesen" />
			</div>
			<div className={styles.avatar}>
				<UserIcon aria-label="Navn Navnesen" />
			</div>
		</>
	),
};

export const React: Story = {
	render: () => (
		<>
			<Avatar>MT</Avatar>
			<Avatar>
				<img src={avatar} alt="Navn Navnesen" />
			</Avatar>
			<Avatar href="#">
				<UserIcon aria-label="Navn Navnesen" />
			</Avatar>
		</>
	),
};

export const Sizes: Story = {
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

export const WithBadge: Story = {
	render: () => (
		<div className={styles.badge}>
			<div className={styles.avatar} data-size="xs">
				<img src={avatar} alt="Navn Navnesen" />
			</div>
		</div>
	),
};

export const InButton: Story = {
	render: () => (
		<>
			<button type="button" className={styles.button}>
				<div className={styles.avatar} data-size="xs">
					NN
				</div>
				Navn Navnesen
			</button>
			<button type="button" className={styles.button}>
				More buttons
			</button>
		</>
	),
};
