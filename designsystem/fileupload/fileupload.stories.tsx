import { UploadIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Fileupload } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Fileupload",
	parameters: {
		layout: "padded",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<label className={styles.fileupload}>
			<UploadIcon />
			<strong>Last opp filer</strong>
			Dra over eller <u>last opp fil</u>
			<small>
				Støttede formater: PDF, JPEG, SVG
				<br />
				Filstørrelse under 10 MB
			</small>
			<input type="file" title="Last opp filer" />
		</label>
	),
};

export const React: Story = {
	render: () => (
		<Fileupload>
			<UploadIcon />
			<strong>Last opp filer</strong>
			Dra over eller <u>last opp fil</u>
			<small>
				Støttede formater: PDF, JPEG, SVG
				<br />
				Filstørrelse under 10 MB
			</small>
			<input type="file" title="Last opp filer" />
		</Fileupload>
	),
};
