import { useEffect, useState } from "react";
import styles from "../designsystem/styles.module.css";

// Jump to navigation
export const JumpTo = () => {
	const [links, setLinks] = useState<{ text: string; href: string }[]>([]);

	useEffect(() => {
		setLinks(
			Array.from(document.querySelectorAll(".sbdocs-h2[id]"), (h2) => ({
				text: h2.textContent || "",
				href: `#${h2.id}`,
			})),
		);
	}, []);

	return (
		<menu
			className={styles.grid}
			data-grid="lg"
			style={{ marginBlock: "2em", rowGap: 0 }}
		>
			{links.map(({ text, href }) => (
				<li key={href}>
					<a href={href} className={styles.button} data-nowrap>
						<svg aria-hidden="true" viewBox="0 40 256 256">
							<path d="m221.66 181.66-48 48a8 8 0 0 1-11.32-11.32L196.69 184H72a8 8 0 0 1-8-8V32a8 8 0 0 1 16 0v136h116.69l-34.35-34.34a8 8 0 0 1 11.32-11.32l48 48a8 8 0 0 1 0 11.32Z" />
						</svg>
						<span data-nowrap>{text}</span>
					</a>
				</li>
			))}
		</menu>
	);
};
