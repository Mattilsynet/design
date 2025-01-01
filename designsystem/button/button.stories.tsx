import { HeartIcon, StarFillIcon, StarIcon } from "@navikt/aksel-icons";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { useState } from "react";

// Make React support popover=""target attribute
// https://github.com/facebook/react/issues/27479
declare global {
	namespace React.JSX {
		interface IntrinsicAttributes {
			popovertarget?: string;
			popover?: string | boolean;
		}
	}
	namespace React {
		interface HTMLAttributes<T> {
			popovertarget?: string;
			popover?: string | boolean;
		}
	}
}

const meta = {
	title: "Designsystem/Button",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators = [
	(Story: StoryFn) => (
		<div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
			<Story />
		</div>
	),
];

export const Default: Story = {
	decorators,
	render: (args) => (
		<button className="styles.button" {...args}>
			Hei
		</button>
	),
};

export const Variants: Story = {
	decorators,
	render: () => (
		<>
			<button type="button" className="styles.button">
				Primary (default)
			</button>
			<button type="button" className="styles.button" data-variant="secondary">
				Secondary
			</button>
			<button type="button" className="styles.button" data-variant="tertiary">
				Tertiary
			</button>
		</>
	),
};

export const Sizes: Story = {
	decorators,
	render: () => (
		<>
			<button type="button" className="styles.button" data-size="sm">
				Small
			</button>
			<button type="button" className="styles.button" data-size="md">
				Medium
			</button>
			<button type="button" className="styles.button" data-size="lg">
				Large
			</button>
		</>
	),
};

export const Arrows: Story = {
	decorators,
	render: () => (
		<>
			<button type="button" className="styles.button" data-arrow>
				Knapp
			</button>
			<button type="button" className="styles.button" data-arrow="left">
				Knapp
			</button>
			<a className="styles.button" data-arrow="right" href="#none">
				Lenkeknapp
			</a>
			<button
				data-arrow="popover"
				popovertarget="pop-1"
				type="button"
				className="styles.button"
			>
				Popover
			</button>

			<menu className="styles.popover" id="pop-1" popover="">
				<li>
					<button type="button" className="styles.button">
						Knapp 1
					</button>
				</li>
				<li>
					<button type="button" className="styles.button">
						Knapp 2
					</button>
				</li>
				<li>
					<button type="button" className="styles.button">
						Knapp 3
					</button>
				</li>
			</menu>
		</>
	),
};

export const Icons: Story = {
	decorators,
	render: () => (
		<>
			<button type="button" className="styles.button">
				<HeartIcon />
				Ikon før
			</button>
			<button type="button" className="styles.button">
				Ikon etter
				<StarIcon />
			</button>
		</>
	),
};

export const Loading: Story = {
	decorators,
	render: () => (
		<>
			<button aria-busy="true" disabled type="button" className="styles.button">
				Knapp
			</button>
			<a aria-busy="true" tabIndex={-1} href="#none" className="styles.button">
				Lenkeknapp
			</a>
			<button
				aria-busy="true"
				className="styles.button"
				data-arrow="right"
				disabled
				type="button"
			>
				Knapp med høyrepil
			</button>
		</>
	),
};

export const Contextmenu: Story = {
	decorators,
	render: () => (
		<>
			<button
				aria-label="Handlinger"
				popovertarget="pop-2"
				type="button"
				className="styles.button"
				data-variant="secondary"
			/>
			<menu popover="" id="pop-2" className="styles.popover">
				<li>
					<button type="button" className="styles.button">
						Knapp 1
					</button>
				</li>
				<li>
					<button type="button" className="styles.button">
						Knapp 2
					</button>
				</li>
				<li>
					<button type="button" className="styles.button">
						Knapp 3
					</button>
				</li>
			</menu>
		</>
	),
};

export const Pressed: Story = {
	decorators,
	render: function Render() {
		const [pressed, setPressed] = useState(false);

		return (
			<button
				aria-pressed={pressed}
				type="button"
				className="styles.button"
				data-variant="tertiary"
				onClick={() => setPressed(!pressed)}
			>
				<StarIcon data-pressed="false" />
				<span data-pressed="false">Lagre favoritt</span>
				<StarFillIcon data-pressed="true" />
				<span data-pressed="true">Fjern favoritt</span>
			</button>
		);
	},
};

export const Tooltip: Story = {
	decorators,
	render: () => (
		<button
			data-tooltip="Favoritt"
			type="button"
			className="styles.button"
			data-variant="tertiary"
		>
			<StarIcon />
		</button>
	),
};
