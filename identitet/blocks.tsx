import { useEffect, useState } from "react";
import styles from "../designsystem/styles.module.css";

// Jump to navigation
export const JumpTo = () => {
	const [links, setLinks] = useState<{ text: string; href: string }[]>([]);

	useEffect(() => {
		// TODO
		setLinks([]);
		// 	Array.from(document.querySelectorAll("h2[id]"), (h2) => ({
		// 		text: h2.textContent || "",
		// 		href: `#${h2.id}`,
		// 	}))
	}, []);

	return (
		<>
			<menu className={styles.flex} hidden>
				{links.map(({ text, href }) => (
					<li key={href}>
						<a href={href} className={styles.button}>
							{text}
						</a>
					</li>
				))}
			</menu>
		</>
	);
};
