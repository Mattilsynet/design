import { UploadIcon, XIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button, Card, Fileupload, Flex, Grid } from "../react";
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
			<input type="file" accept="image/*,.pdf" title="Last opp filer" />
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
			<input type="file" accept="image/*,.pdf" title="Last opp filer" />
		</Fileupload>
	),
};

export const WithPreviewImage: Story = {
	render: function Render() {
		const [images, setImages] = useState<{ title: string; src: string }[]>([]);
		const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			const reader = new FileReader();
			reader.onload = () =>
				setImages((prev) => [
					...prev,
					{
						title: file?.name || "",
						src: reader.result as string,
					},
				]);
			if (file) reader.readAsDataURL(file);
		};

		const handleRemove = (index: number) =>
			setImages((prev) => prev.filter((_, i) => i !== index));

		return (
			<Grid>
				Velg et bilde for å se:
				<Fileupload>
					<UploadIcon />
					<strong>Last opp filer</strong>
					Dra over eller <u>last opp fil</u>
					<small>
						Støttede formater: PDF, JPEG, SVG
						<br />
						Filstørrelse under 10 MB
					</small>
					<input
						type="file"
						accept="image/jpeg, image/png, image/gif"
						title="Last opp filer"
						onChange={handleFile}
					/>
				</Fileupload>
				<Grid data-items="300" data-fixed>
					{images.map((file, index) => (
						<Card as={Grid} key={file.title}>
							<img alt="" width="100%" src={file.src} />
							<Flex data-align="center" data-nowrap>
								<strong>{file.title}</strong>
								<Button
									data-self="auto"
									data-fixed
									data-size="sm"
									onClick={() => handleRemove(index)}
								>
									<XIcon />
								</Button>
							</Flex>
						</Card>
					))}
				</Grid>
			</Grid>
		);
	},
};
