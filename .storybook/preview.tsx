// import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { MDXProvider } from "@mdx-js/react";
import { DocsContainer, Unstyled } from "@storybook/blocks";
import type { DocsContainerProps } from "@storybook/blocks";
import type { Preview } from "@storybook/react";
import { useEffect } from "react";
import "./style.css";
import "@u-elements/u-tabs";

export default {
	// decorators: [
	// 		withThemeByDataAttribute({
	// 		  defaultTheme: 'Light',
	// 		  attributeName: 'data-theme',
	// 		  themes: {
	// 		    'Light': 'light',
	// 		    'Dark preview': 'dark',
	// 		  }
	// 		})
	// ],
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
					// Paint blockqoutes with x as red
					for (const el of document.querySelectorAll(".sbdocs-blockquote"))
						el.toggleAttribute("data-error", el.textContent?.includes("❌"));

					// Hide BR from screen readers
					for (const br of document.getElementsByTagName("br")) {
						br.setAttribute("aria-hidden", "true");
					}
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
								.getElementById(link.hash.slice(1))
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
					["Introduksjon", "*"],
					"Profilering",
					["Introduksjon", "*"],
				],
			},
		},
	},
} satisfies Preview;
