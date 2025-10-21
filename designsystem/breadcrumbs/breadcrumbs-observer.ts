import styles from "../styles.module.css";
import { attr, IS_BROWSER, onLoaded, onMutation } from "../utils";

const CSS_BREADCRUMBS = styles.breadcrumbs.split(" ")[0];
const BREADCRUMBS = IS_BROWSER
	? document.getElementsByClassName(CSS_BREADCRUMBS)
	: [];

function handleBreadcrumbsMutation() {
	if (BREADCRUMBS)
		for (const breadcumbs of BREADCRUMBS)
			breadcumbs.querySelectorAll("a").forEach((crumb, index, { length }) => {
				attr(crumb, "aria-current", index === length - 1 ? "page" : null);
			});
}

onLoaded(() => [onMutation(handleBreadcrumbsMutation, "class")]);
