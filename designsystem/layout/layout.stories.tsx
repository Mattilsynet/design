import type { Meta, StoryObj } from "@storybook/react-vite";
import { Fragment } from "react";
import { Button, Flex, Grid } from "../react";
import styles from "../styles.module.css";

const gaps = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 22, 26, 30,
];
const meta = {
	title: "Designsystem/Layout",
	parameters: {
		layout: "padded",
	},
	decorators: [
		(Story) => (
			<div className="mt-story">
				<Story />
				<style>{`
					.mt-story:not(:has(.${styles.body.split(" ")[0]})) {
						display: grid;
						gap: 1rem;
						padding: 1px;
						
						& b { display: flex; align-items: center; padding: .5em 1em; border: 1px solid; border-radius: var(--mtds-border-radius-md) }
						& code { font-size: .875rem }
						& div:not([class*="box"]) { outline: 1px dashed color-mix(in hsl, currentcolor 50%, transparent) }
						& div[data-align-content] { height: 150px }
					}
				`}</style>
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FlexStory: Story = {
	name: "Flex",
	parameters: {
		showInOverview: true,
	},
	render: () => (
		<div className={styles.flex}>
			<button type="button" className={styles.button} data-variant="primary">
				Action 1
			</button>
			<button type="button" className={styles.button} data-variant="primary">
				Action som er lengre 2
			</button>
			<button type="button" className={styles.button} data-variant="primary">
				Action 3
			</button>
			<button type="button" className={styles.button} data-variant="primary">
				Action 4
			</button>
			<button type="button" className={styles.button} data-variant="primary">
				Action 5
			</button>
			<button type="button" className={styles.button} data-variant="primary">
				Action 6
			</button>
		</div>
	),
};

export const GridStory: Story = {
	name: "Grid",
	parameters: {
		showInOverview: true,
	},
	render: () => (
		<div className={styles.grid} data-gap="6">
			<div className={styles.grid} data-items="auto">
				<div>auto</div>
				<div>auto</div>
			</div>
			<div
				className={styles.grid}
				data-gap="6"
				style={{ gridTemplateColumns: "1fr 2fr" }}
			>
				<div>
					Custom
					<div className={styles.grid} data-items="100" data-gap="0">
						<div>100</div>
						<div>100</div>
					</div>
				</div>
				<div className={styles.grid} data-items="300" data-gap="4">
					<div>300</div>
					<div className={styles.grid} data-items="100">
						<div>100</div>
						<div>100</div>
						<div>100</div>
						<div>100</div>
						<div>100</div>
						<div>100</div>
					</div>
					<div>300</div>
					<div>300</div>
				</div>
			</div>
		</div>
	),
};

export const React: Story = {
	render: () => (
		<>
			<Flex>
				<Button data-variant="primary">Action 1</Button>
				<Button data-variant="primary">Action som er lengre 2</Button>
				<Button data-variant="primary">Action 3</Button>
				<Button data-variant="primary">Action 4</Button>
				<Button data-variant="primary">Action 5</Button>
				<Button data-variant="primary">Action 6</Button>
			</Flex>
			<Grid data-gap="6">
				<Grid data-items="auto">
					<div>auto</div>
					<div>auto</div>
				</Grid>
				<Grid style={{ gridTemplateColumns: "1fr 2fr" }} data-gap="6">
					<div>
						Custom
						<Grid data-items="100" data-gap="0">
							<div>100</div>
							<div>100</div>
						</Grid>
					</div>
					<Grid data-items="300" data-gap="4">
						<div>300</div>
						<Grid data-items="100">
							<div>100</div>
							<div>100</div>
							<div>100</div>
							<div>100</div>
							<div>100</div>
							<div>100</div>
						</Grid>
						<div>300</div>
						<div>300</div>
					</Grid>
				</Grid>
			</Grid>
		</>
	),
};

export const Gap: Story = {
	render: () => (
		<section className={styles.grid} style={{ gridTemplateColumns: "1fr 2fr" }}>
			{gaps.map((gap) => (
				<Fragment key={gap}>
					<code>data-gap="{gap}"</code>
					<div className={styles.flex} data-gap={gap}>
						<b>a</b>
						<b>b</b>
						<b>c</b>
					</div>
				</Fragment>
			))}
		</section>
	),
};

export const Center: Story = {
	parameters: {
		layout: "fullscreen",
	},
	render: () => (
		<>
			<div className={styles.grid} data-center="sm">
				sm (640px)
			</div>
			<div className={styles.grid} data-center="md">
				md (768px)
			</div>
			<div className={styles.grid} data-center="lg">
				lg (1024px)
			</div>
			<div className={styles.grid} data-center="xl">
				xl (1280px)
			</div>
			<div className={styles.grid} data-center="2xl">
				2xl (1536px)
			</div>
		</>
	),
};

export const ItemSizes: Story = {
	render: () => (
		<>
			<h2 className={styles.heading}>
				Minimumsstørrelser Grid og Flex data-items:
			</h2>
			{[25, 50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500].map((i) => (
				<div key={i}>
					<div className={styles.flex} key={i} data-gap="3" data-fixed>
						<div
							data-self={i}
							style={{
								background: "var(--mtds-color-surface-tinted)",
								whiteSpace: "nowrap",
							}}
						>
							{i}
						</div>
					</div>
				</div>
			))}
		</>
	),
};

export const ItemFixed: Story = {
	render: () => (
		<>
			<span>
				Flex <code>data-items="100"</code> with <code>data-fixed</code> (does
				not allow growing over <code>data-items</code> value):
			</span>
			<div className={styles.flex} data-items="100" data-fixed>
				<div>a</div>
				<div>b</div>
				<div>c</div>
				<div>d</div>
			</div>
			<span>
				Flex <code>data-items="100"</code> without <code>data-fixed</code>{" "}
				(allows items to grow):
			</span>
			<div className={styles.flex} data-items="100">
				<div>a</div>
				<div>b</div>
				<div>c</div>
				<div>d</div>
			</div>
			<span>
				Grid <code>data-items="100"</code> with <code>data-fixed</code> (repeats
				"fake" empty columns to align ish with <code>data-items</code>):
			</span>
			<div className={styles.grid} data-items="100" data-fixed>
				<div>a</div>
				<div>b</div>
				<div>c</div>
				<div>d</div>
			</div>
			<span>
				Grid <code>data-items="100"</code> without <code>data-fixed</code>{" "}
				(fills grid with actual columns):
			</span>
			<div className={styles.grid} data-items="100">
				<div>a</div>
				<div>b</div>
				<div>c</div>
				<div>d</div>
			</div>
		</>
	),
};

export const Align: Story = {
	render: () => (
		<section
			className={styles.grid}
			data-align="center"
			data-gap="6"
			style={{ gridTemplateColumns: "1fr 2fr" }}
		>
			<code>data-align="stretch"</code>
			<div className={styles.flex} data-align="stretch">
				<b data-size="sm">Small</b>
				<b data-size="md">Medium</b>
				<b data-size="lg">Large</b>
			</div>
			<code>data-align="start"</code>
			<div className={styles.flex} data-align="start">
				<b data-size="sm">Small</b>
				<b data-size="md">Medium</b>
				<b data-size="lg">Large</b>
			</div>
			<code>data-align="center"</code>
			<div className={styles.flex} data-align="center">
				<b data-size="sm">Small</b>
				<b data-size="md">Medium</b>
				<b data-size="lg">Large</b>
			</div>
			<code>data-align="end"</code>
			<div className={styles.flex} data-align="end">
				<b data-size="sm">Small</b>
				<b data-size="md">Medium</b>
				<b data-size="lg">Large</b>
			</div>
		</section>
	),
};

export const Justify: Story = {
	render: () => (
		<section
			className={styles.grid}
			data-align="center"
			data-gap="6"
			style={{ gridTemplateColumns: "1fr 2fr" }}
		>
			<code>data-justify="start"</code>
			<div className={styles.flex} data-justify="start">
				<b>Box</b>
				<b>Box</b>
				<b>Box</b>
			</div>
			<code>data-justify="center"</code>
			<div className={styles.flex} data-justify="center">
				<b>Box</b>
				<b>Box</b>
				<b>Box</b>
			</div>
			<code>data-justify="end"</code>
			<div className={styles.flex} data-justify="end">
				<b>Box</b>
				<b>Box</b>
				<b>Box</b>
			</div>
			<code>data-justify="space-between"</code>
			<div className={styles.flex} data-justify="space-between">
				<b>Box</b>
				<b>Box</b>
				<b>Box</b>
			</div>
			<code>data-justify="space-around"</code>
			<div className={styles.flex} data-justify="space-around">
				<b>Box</b>
				<b>Box</b>
				<b>Box</b>
			</div>
			<code>data-justify="space-evenly"</code>
			<div className={styles.flex} data-justify="space-evenly">
				<b>Box</b>
				<b>Box</b>
				<b>Box</b>
			</div>
			<span>
				<code>.grid</code> +<br />
				<code>data-justify="center"</code>
			</span>
			<div className={styles.grid} data-justify="center">
				<b>Box Box</b>
				<b>Box Box Box</b>
				<b>Box</b>
			</div>
		</section>
	),
};

export const AlignContent: Story = {
	render: () => (
		<section
			className={styles.grid}
			data-items="200"
			data-gap="6"
			style={{ maxWidth: 700 }}
		>
			<article>
				<code>start</code>
				<div className={styles.flex} data-align-content="start">
					<b>Box</b>
					<b>Box</b>
					<b>Box</b>
				</div>
			</article>
			<article>
				<code>center</code>
				<div className={styles.flex} data-align-content="center">
					<b>Box</b>
					<b>Box</b>
					<b>Box</b>
				</div>
			</article>
			<article>
				<code>end</code>
				<div className={styles.flex} data-align-content="end">
					<b>Box</b>
					<b>Box</b>
					<b>Box</b>
				</div>
			</article>
			<article>
				<code>space-between</code>
				<div className={styles.flex} data-align-content="space-between">
					<b>Box</b>
					<b>Box</b>
					<b>Box</b>
				</div>
			</article>
			<article>
				<code>space-around</code>
				<div className={styles.flex} data-align-content="space-around">
					<b>Box</b>
					<b>Box</b>
					<b>Box</b>
				</div>
			</article>
			<article>
				<code>space-evenly</code>
				<div className={styles.flex} data-align-content="space-evenly">
					<b>Box</b>
					<b>Box</b>
					<b>Box</b>
				</div>
			</article>
		</section>
	),
};
