import { MDXProvider } from "@mdx-js/react";
import type { DocsContainerProps } from "@storybook/addon-docs/blocks";
import { DocsContainer, Unstyled } from "@storybook/addon-docs/blocks";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react-vite";
import { useEffect } from "react";
import { analytics } from "../designsystem"; // Load JS functionaility
import styles from "../designsystem/styles.module.css";
import "./preview.css";
// import { transformSource } from "./transformSource";

const CSS_ALERT = styles.alert.split(" ");
const CSS_TABLE = styles.table.split(" ");

function urlTheme() {
	const top = window.top?.location || window.location;
	const url = new URL(top.href);
	const globals = new URLSearchParams(
		url.searchParams.get("globals")?.replace(/;/g, "&").replace(/:/g, "="),
	);
	const theme = globals.get("theme") || "Auto medium";
	const store = window.localStorage.getItem("theme") || "Auto medium";
	window.localStorage.setItem("theme", theme);

	// If no theme is set in URL, but one is stored, update URL
	if (!globals.get("theme") && theme !== store) {
		globals.set("theme", store);
		url.searchParams.set(
			"globals",
			globals.toString().replace(/&/g, ";").replace(/=/g, ":"),
		);
		top.replace(url.toString());
	}
	return theme;
}

// Setup color scheme and language
function useTheme() {
	useEffect(() => {
		const [color, scale] = urlTheme().toLowerCase().split(" ");
		const size = { small: "sm", medium: "md", large: "lg" }[scale] || "md";

		document.documentElement.setAttribute("lang", "no");
		document.documentElement.setAttribute("data-color-scheme", color);
		document.body.setAttribute("data-size", size); // Need to be on body to keep "REM"
	});
}

// Upate url if theme is stored but not in URL
if (typeof window !== "undefined") urlTheme();

export default {
	// globalTypes: {
	// 	codePreview: {
	// 		description: '"Show code" will output the selected format',
	// 		toolbar: {
	// 			icon: "markup",
	// 			items: [
	// 				{ title: "HTML", value: "html" },
	// 				{ title: "React", value: "react" },
	// 			],
	// 			dynamicTitle: true,
	// 		},
	// 	},
	// },
	// initialGlobals: {
	// 	codePreview: "react",
	// },
	decorators: [
		(Story) => {
			useTheme();
			return <Story />;
		},
		withThemeByDataAttribute({
			defaultTheme: "Auto medium",
			themes: {
				"Auto small": "auto",
				"Auto medium": "auto",
				"Auto large": "auto",
				"Light small": "light",
				"Light medium": "light",
				"Light large": "light",
				"Dark small": "dark",
				"Dark medium": "dark",
				"Dark large": "dark",
			},
		}),
	],
	parameters: {
		controls: {
			disableSaveFromUI: true,
			expanded: false,
		},
		docs: {
			// source: {
			// 	transform: () => "",
			// 	type: "auto",
			// },
			canvas: {
				layout: "centered",
			},

			container: (props: DocsContainerProps) => {
				useTheme();
				useEffect(() => {
					// Setup analytics
					analytics("init", {
						matomoId: 17,
						enabled: location.hostname !== "localhost" || "debug",
					});
					analytics("pageview", {
						url: (window.top || window).location.href,
						title:
							document.querySelector(".sbdocs-h1")?.textContent ||
							document.title,
					});

					// Make prose
					document
						.querySelector(".sbdocs-content")
						?.classList.add(styles.prose);

					// Paint colors blockqoutes based on emojis
					for (const quote of document.querySelectorAll(
						".sbdocs-content blockquote:not(h1 + blockquote)",
					)) {
						const colors = { "❌": "danger", "⚠️": "warning", "✅": "success" };
						const color = Object.entries(colors).find(([icon]) =>
							quote.textContent?.includes(icon),
						)?.[1];

						quote.innerHTML = quote.innerHTML?.replace(/(❌|✅|⚠️)/, "");
						quote.classList.add(...CSS_ALERT);
						quote.classList.remove(styles.ingress);
						quote.setAttribute("data-color", color || "info");
					}

					// Hide BR from screen readers
					for (const br of document.getElementsByTagName("br"))
						br.setAttribute("aria-hidden", "true");

					// Tables
					for (const table of document.querySelectorAll("table:not([class])"))
						table.classList.add(...CSS_TABLE);

					document.addEventListener("click", (e) => {
						const base = (window.top || window).location.href.split("?")[0];
						const link = e.target instanceof Element && e.target.closest("a");
						const sameDomain = link && link.hostname === location.hostname;
						const samePage = sameDomain && link.pathname === location.pathname;

						if (!sameDomain && link) link.target = "_blank"; // Open external links in new tab

						// Prefix all internal links with window.top url to fix storybook iframe url issues
						if (sameDomain && link.search.startsWith("?path="))
							link.href = base + link.search;

						// Use smooth scrolling on internal anchors
						if (samePage && link.hash) {
							e.preventDefault();
							document
								.getElementById(decodeURIComponent(link.hash.slice(1)))
								?.scrollIntoView({ behavior: "smooth" });
						}
					});
				}, []);

				return (
					<Unstyled>
						<MDXProvider
							components={{
								h1: (props) => (
									<h1 {...props} className={styles.heading} data-size="2xl" />
								),
								h2: (props) => (
									<h2 {...props} className={styles.heading} data-size="lg" />
								),
								h3: (props) => (
									<h3 {...props} className={styles.heading} data-size="md" />
								),
								h4: (props) => (
									<h4 {...props} className={styles.heading} data-size="sm" />
								),
								blockquote: (props) => (
									<blockquote {...props} className={styles.ingress} />
								),
								ol: (props) => <ol {...props} className="sbdocs-ol" />,
								ul: (props) => <ul {...props} className="sbdocs-ul" />,
								p: (props) => <p {...props} className="sbdocs-p" />,
								a: (props) => <a {...props} className="sbdocs-a" />,
							}}
						>
							<DocsContainer {...props} />
						</MDXProvider>
					</Unstyled>
				);
			},

			codePanel: true,
		},
		options: {
			storySort: {
				order: [
					"Introduksjon",
					"Identitet",
					[
						"Kompasset og roller",
						"Logo",
						"Farger",
						"Typografi",
						"Form og bevegelse",
						"Ikoner",
						"Illustrasjoner",
						"Bilder",
						"Slik skriver vi",
						"*",
					],
					"Designsystem",
					["Introduksjon", "Komponenter", "Tokens", "Analyse", "Debug", "*"],
					"Profilering",
					["Introduksjon", "*"],
				],
			},
		},
	},
} satisfies Preview;
