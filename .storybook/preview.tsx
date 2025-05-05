import { MDXProvider } from "@mdx-js/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { DocsContainer, Unstyled } from "@storybook/blocks";
import type { DocsContainerProps } from "@storybook/blocks";
import type { Preview } from "@storybook/react";
import { useEffect } from "react";
import styles from "../designsystem/styles.module.css";
import "../designsystem"; // Load JS functionaility
import "./preview.css";

const CSS_ALERT = styles.alert.split(" ");
const CSS_TABLE = styles.table.split(" ");
const MATOMO = "mattilsynet.matomo.cloud";

declare global {
	interface Window {
		_paq?: string[][];
	}
}

function urlTheme() {
	const top = window.top?.location || window.location;
	const url = new URL(top.href);
	const globals = new URLSearchParams(
		url.searchParams.get("globals")?.replace(/;/g, "&").replace(/:/g, "="),
	);
	const theme = globals.get("theme") || "Auto";
	const store = window.localStorage.getItem("theme") || "Auto";
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
		const theme = urlTheme();
		document.documentElement.setAttribute("lang", "no");
		document.documentElement.setAttribute(
			"data-color-scheme",
			theme.toLowerCase(),
		);
	});
}

// Upate url if theme is stored but not in URL
if (typeof window !== "undefined") urlTheme();

export default {
	decorators: [
		(Story) => {
			useTheme();
			return <Story />;
		},
		withThemeByDataAttribute({
			defaultTheme: "Auto",
			attributeName: "data-color-scheme",
			themes: {
				Auto: "auto",
				Light: "light",
				Dark: "dark",
			},
		}),
	],
	parameters: {
		controls: {
			disableSaveFromUI: true,
			expanded: false,
		},
		docs: {
			canvas: {
				layout: "centered",
			},
			container: (props: DocsContainerProps) => {
				useTheme();
				useEffect(() => {
					// Setup Matomo tracking
					const isLocal = window.location.hostname === "localhost";
					const isLoaded = document.querySelector('script[src*="matomo.js"]');
					const title = document.querySelector(".sbdocs-h1")?.textContent;
					const url = (window.top || window).location.href;

					window._paq = window._paq || [];
					window._paq.push(["setDocumentTitle", title || document.title]);
					window._paq.push(["setCustomUrl", url]); // Use location.href to fix storybook iframe url issues
					window._paq.push(["trackPageView"]);

					if (!isLoaded && !isLocal) {
						window._paq.push(["enableLinkTracking"]);
						window._paq.push(["setTrackerUrl", `https://${MATOMO}/matomo.php`]);
						window._paq.push(["setSiteId", "17"]);
						document.body.append(
							Object.assign(document.createElement("script"), {
								async: true,
								src: `https://cdn.matomo.cloud/${MATOMO}/matomo.js`,
							}),
						);
					}

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
						quote.setAttribute("data-color", color || "info");
						quote.removeAttribute("data-size");
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
								blockquote: (props) => <blockquote {...props} data-size="xl" />,
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
					["Introduksjon", "Tokens", "Komponenter", "*", "Debug"],
					"Profilering",
					["Introduksjon", "*"],
				],
			},
		},
	},
} satisfies Preview;
