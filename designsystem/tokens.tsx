import tokens from "../design-tokens-build/mattilsynet.css?raw";
import styles from "./styles.module.css";

const IS_FLIP = /-(text|border-(default|strong))/;

export const Tokens = () => {
	const list = Array.from(
		new Set(
			tokens
				.match(/--mtds-color-[^:)]+/g)
				?.map((token) => token.replace(/-(neutral|primary)-/, "-")) // We do not need to expose 'primary' or 'neutral' at this point
				.filter((token) => !token.includes("-color-focus-")), // Hide focus colors
		),
	);

	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>CSS</th>
				</tr>
			</thead>
			<tbody>
				{list.map((token) => (
					<tr
						key={token}
						data-color={token.match(/(info|danger|success|warning)/g)}
						style={{
							background: `var(${token})`,
							// color: `lch(from var(${token}) calc((49.44 - l) * infinity) 0 0)`,
							color: `var(--mtds-color-${token.includes("-base-") ? (token.includes("-contrast-") ? "base" : "base-contrast") : IS_FLIP.test(token) ? "background" : "text"}-default)`,
						}}
					>
						<td>{token}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
