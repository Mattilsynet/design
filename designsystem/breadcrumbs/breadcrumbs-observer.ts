import styles from "../styles.module.css";
import { attr, onLoaded, onMutation } from "../utils";

const CSS_BREADCRUMBS = styles.breadcrumbs.split(" ")[0];

function handleBreadcrumbsMutation(breadcrumbs: HTMLCollectionOf<HTMLElement>) {
	for (const breadcumbs of breadcrumbs)
		breadcumbs.querySelectorAll("li a").forEach((crumb, index, { length }) => {
			attr(crumb, "aria-current", index === length - 1 ? "page" : null);
		});
}

onLoaded(() =>
	onMutation(
		document.documentElement,
		CSS_BREADCRUMBS,
		handleBreadcrumbsMutation,
	),
);
