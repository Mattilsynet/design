import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Logo",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators = [
	(Story: StoryFn) => (
		<div className={styles.grid}>
			<Story />
			<style>{`
				.demo-resize {
					border-radius: 2px;
					box-sizing: border-box;
					max-width: max-content;
					min-width: min-content;
					outline: 1px dashed;
					outline-offset: 5px;
					overflow: hidden;
					padding-bottom: 2em;
					position: relative;
					resize: horizontal;

					&::after { content: "Drag to resize →"; position: absolute; right: 1em; bottom: 0; white-space: nowrap }
				}
			`}</style>
		</div>
	),
];

export const Default: Story = {
	decorators,
	render: () => (
		<>
			<h1 className={styles.logo}></h1>
			<a className={styles.logo} href="/">
				Undermerke
			</a>
			<div className="demo-resize">
				<h1 className={styles.logo}>Resize&nbsp;Demo</h1>
			</div>
		</>
	),
};
