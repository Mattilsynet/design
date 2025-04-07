// import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { MDXProvider } from "@mdx-js/react";
import { DocsContainer, Unstyled } from "@storybook/blocks";
import type { DocsContainerProps } from "@storybook/blocks";
import type { Preview } from "@storybook/react";
import { useEffect } from "react";
import { styles } from "../designsystem";
import "./preview.css";

const CSS = styles as unknown as Record<string, string>; // Fix internal typings
const CSS_ALERT = CSS.alert.split(" ");
const CSS_TABLE = CSS.table.split(" ");
const MATOMO = "mattilsynet.matomo.cloud";

declare global {
	interface Window {
		_paq?: string[][];
	}
}

export default {
	decorators: [
		(Story) => {
			useEffect(() => document.documentElement.setAttribute("lang", "no"), []); // Set Nowegian language
			return <Story />;
		},
		// withThemeByDataAttribute({
		//   defaultTheme: 'Light',
		//   attributeName: 'data-theme',
		//   themes: {
		//     'Light': 'light',
		//     'Dark preview': 'dark',
		//   }
		// })
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

					// Paint colors blockqoutes based on emojis
					for (const el of document.querySelectorAll(
						".sbdocs-blockquote:not(h1 + .sbdocs-blockquote)",
					)) {
						const colors = { "❌": "danger", "⚠️": "warning", "✅": "success" };
						const color = Object.entries(colors).find(([icon]) =>
							el.textContent?.includes(icon),
						)?.[1];

						el.innerHTML = el.innerHTML?.replace(/(❌|✅|⚠️)/, "");
						el.classList.add(...CSS_ALERT);
						el.setAttribute("data-color", color || "info");
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
								h1: (props) => <h1 {...props} className="sbdocs-h1" />,
								h2: (props) => <h2 {...props} className="sbdocs-h2" />,
								h3: (props) => <h3 {...props} className="sbdocs-h3" />,
								h4: (props) => <h4 {...props} className="sbdocs-h4" />,
								blockquote: (props) => (
									<blockquote {...props} className="sbdocs-blockquote" />
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
