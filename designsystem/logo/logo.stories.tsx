import { Plant } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Logo",
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story) => (
			<div className={styles.body} style={{ padding: "3em" }}>
				<div className={`${styles.grid} demo-resize`} data-gap="8">
					<Story />
					<style>{`
						body { background: var(--ds-color-background-default) }
						html:has(.sbdocs-preview)::after { display: none } /* Hide environment bar in Storybook */
						.demo-resize {
							box-sizing: border-box;
							border-radius: 2px;
							box-sizing: border-box;
							outline: 1px dashed transparent;
							outline-offset: 5px;
							overflow: hidden;
							padding-bottom: 2em;
							position: relative;
							resize: horizontal;
							
							&:active,
							&:hover { outline-color: currentColor }
							&:ative::after,
							&:hover::after { content: "Drag to resize →"; position: absolute; right: 1em; bottom: 0; white-space: nowrap }
						}
					`}</style>
				</div>
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<>
			{/* <svg
				viewBox="0 0 4595 800"
				style={{ width: 206, translate: "0 68px", color: "gray" }}
			>
				<path
					fill="currentcolor"
					d="m2252 582.6 2-.4v71.2l-1 .4c-7 3-22.8 8-51.2 8-65.2 0-105.6-40-105.6-104.3V379.1h-64v-67.8h19.5c32.8 0 51.6-19 51.6-52v-54.9h78.2v105.3h71.8v69.4h-71.8v165c0 28.9 12.7 41.3 42.3 41.3a175 175 0 0 0 28.2-2.8Zm265.4 0c-3 .6-16.5 2.8-28.2 2.8-29.6 0-42.3-12.4-42.3-41.4V379h71.9v-69.3h-71.9V204.4h-78.1v55c0 33-18.9 52-51.7 52h-19.5V379h64v178.4c0 64.3 40.5 104.2 105.7 104.2 28.3 0 44.2-5 51.1-7.9l1.1-.4v-71.2l-2.1.4Zm-529.2 71.9.4 2h-80l-.4-1.2c-.8-2-3.2-14.5-3.6-38.6-12.9 18.3-44.2 50.5-104.8 50.5-34.8 0-64.8-11-86.9-32a100.7 100.7 0 0 1-32-73.6c0-56.6 39.6-96.1 105.9-105.6l88.7-13.5c21.5-3 24-14.6 24-23 0-31.6-25.4-50.6-63.6-50.6s-64.4 22.6-69 58.9l-78.6-17.8c7-54.2 55.4-111.7 147-111.7 134 0 148.6 91.2 148.6 130.4v171c0 33.3 4 53.9 4.2 54.8h.1Zm-88.7-156-88.2 13.1c-16.6 2.8-44.6 12.3-44.6 45 0 20.5 15.2 42.7 48.6 42.7 38.4 0 84.2-15.1 84.2-87.3v-13.5Zm696.2 159.1h85.8V309.2h-85.8v348.4ZM400 237c72.4 0 152 51 162.7 148.8 72-35.1 153-50 233.3-43a400 400 0 0 0-785.3-34.2 445 445 0 0 1 229 61.4A163 163 0 0 1 400 237ZM2 361.8c-20.4 201.3 118.4 386.1 308.9 428v-2.2c0-74 18.2-146.4 53-211.2C297.5 443 151.4 355.8 2 361.8Zm1322.8 170.8-162.4-378.9-.5-1H1045v505h86.8v-361l152.3 358.6h78.4l153.7-360v362.3h88.3V152.7h-119l-160.8 380ZM364.5 798.3C596.8 820 801.2 633.3 800 399.9v-3.3c-234.6-27.4-444 165.7-435.5 401.7Zm3979.9-319.5c0 22-2.2 27.9-2.2 27.9H4089a91 91 0 0 0 92.8 86.3c37.1 0 63.4-14.6 78.5-43.3h81.7c-4.3 14.7-10 28.4-17 41-24.5 41-71 76.4-143.2 76.4-48 0-92.5-17.4-125.1-49-35.3-34-54-81.6-54-137.1 0-51.5 18.6-98.6 52.2-132.5a167.8 167.8 0 0 1 118.4-50.2c105.6 0 171.2 69 171.2 180.5Zm-86.9-35.7c-2.9-53.7-46.7-72.8-83.6-72.8-36.9 0-78.1 25.5-82.8 72.8h166.4Zm-440.7-143.4c-42.5 0-79.7 19.1-100.8 51.4v-41.6h-84v348h86.1V457c0-48.3 27.6-79.6 70.2-79.6 60.4 0 69.5 46.8 69.5 74.7v205.5h86V437.9c0-85.3-48.6-138.2-127-138.2ZM3410.1 524 3312 310.2l-.5-1h-97.3l149.2 304.6-82 177.2h92.1l220.4-481.8h-91.5l-92.3 215ZM4593 582.6a177 177 0 0 1-28.2 2.8c-29.7 0-42.4-12.4-42.4-41.4V379h72v-69.3h-72V204.4h-78.1v55c0 33-18.9 52-51.7 52h-19.5V379h64v178.4c0 64.3 40.5 104.2 105.6 104.2 29.5 0 45.7-5.5 51.2-7.9l1.1-.4v-71.2l-2 .4ZM2643 135c-31 0-55.5 24.9-55.5 55.5s24 54.7 55.5 54.7 56.2-24 56.2-54.7A55.8 55.8 0 0 0 2643 135Zm135.8 522.6h85.8V141.8h-85.8v515.8Zm326-208.7h-.2.1Zm-.3 0h.1l-52.6-10.6c-21-4.2-33.5-17-33.5-34.3 0-21.3 21.2-37.9 48.1-37.9a58.1 58.1 0 0 1 62.4 50.1l.3 2 73.1-20.8-.2-1.5A113.6 113.6 0 0 0 3169 334c-24.8-23.7-59.3-35.8-102.4-35.8-71.2 0-129.2 50.6-129.2 112.7 0 50.9 35.4 89 94.6 102l51.3 11.3c25.7 5.3 39.2 17.9 39.2 36.5s-15.5 37.8-50.2 37.8c-47 0-66.4-30.7-68.8-57l-.2-2.1-75.4 20.7.2 1.5c2.6 23.8 16 49 36 67.6 26.6 24.7 64.2 37.9 108.8 37.9 87.2 0 132.7-56.4 132.7-112 0-55.7-36.8-92.5-101-106.3Z"
				/>
			</svg> */}
			<h1 className={styles.logo}></h1>
		</>
	),
};

export const React: Story = {
	render: () => (
		<>
			<Logo as="h1" />
			<Logo href="/">
				Helse
				<wbr />
				sertifikat
			</Logo>
			<Logo as="h1" />
			<Logo href="/" data-env="test">
				Helse
				<wbr />
				sertifikat
			</Logo>
			<Logo href="/">
				<Plant weight="fill" />
				Digiplant
			</Logo>
			<Logo href="/" data-env="test">
				<Plant weight="fill" />
				Digiplant
			</Logo>
		</>
	),
};

export const WithEnvironment: Story = {
	render: () => <h1 className={styles.logo} data-env="test"></h1>,
};

export const WithEnvironmentBlue: Story = {
	render: () => (
		<h1 className={styles.logo} data-env="dev" data-color="info"></h1>
	),
};

export const WithSubbrand: Story = {
	render: () => (
		<a className={styles.logo} href="/">
			Helse
			<wbr />
			sertifikat
		</a>
	),
};

export const WithSubbrandEnglish: Story = {
	render: () => (
		<a className={styles.logo} href="/" lang="en">
			Sanitary certificate status
		</a>
	),
};

export const WithSubbrandEnvironment: Story = {
	render: () => (
		<a className={styles.logo} href="/" lang="en" data-env="test">
			Sanitary certificate status
		</a>
	),
};

export const WithSubbrandEnvironmentBlue: Story = {
	render: () => (
		<a
			className={styles.logo}
			href="/"
			lang="en"
			data-env="dev"
			data-color="info"
		>
			Sanitary certificate status
		</a>
	),
};

export const WithAppIcon: Story = {
	render: () => (
		<a className={styles.logo} href="/">
			<Plant weight="fill" />
			Digiplant
		</a>
	),
};

export const WithAppIconEnvironment: Story = {
	render: () => (
		<a className={styles.logo} href="/" data-env="test">
			<Plant weight="fill" />
			Digiplant
		</a>
	),
};
export const WithAppIconEnvironmentBlue: Story = {
	render: () => (
		<a className={styles.logo} href="/" data-env="dev" data-color="info">
			<Plant weight="fill" />
			Digiplant
		</a>
	),
};
