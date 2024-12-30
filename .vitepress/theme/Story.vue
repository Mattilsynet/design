<script setup lang="ts">
import { observe, styles, unobserve } from "../../designsystem/";
// @ts-ignore Vite knows how to handle this:
import css from "../../designsystem/styles.module.css?inline";

const { stacked } = defineProps<{ stacked?: boolean }>();

if (typeof window !== "undefined" && !customElements.get("vp-story"))
	customElements.define(
		"vp-story",
		class extends HTMLElement {
			div: HTMLDivElement | null = null;

			connectedCallback() {
				setTimeout(() => {
					const pre = this.previousElementSibling;
					const div = document.createElement("div");
					const code = pre?.innerHTML.replace(/(<\/?u-)-/g, "$1") || "";
					const html = code?.replace(/styles\.([^\s"]+)/g, (_, k) => styles[k]);
					const style = document.createElement("style");
					const source = this.nextElementSibling;

					style.textContent = `${css}
						[data-stacked="true"] > * + *{margin-top:1rem}
						.demo-resize {
							box-sizing: border-box;
							border-radius: 5px;
							margin: 1em -6px;
							padding: 5px 5px 2em;
							overflow: hidden;
							resize: horizontal;
							border: 1px dashed;
							min-width: min-content;
							max-width: max-content;
							position: relative;

							&::after { content: "Drag to resize →"; position: absolute; right: 1em; bottom: 0; white-space: nowrap }
						}
					`;
					div.innerHTML = html || "";
					div.onclick = ({ target }) => {
						const attrs = ["aria-pressed", "aria-expanded"];
						const el = (target as Element)?.closest?.(`[${attrs.join("],[")}]`);
						const attr = attrs.find((attr) => el?.hasAttribute(attr)) || "";

						el?.setAttribute(attr, `${el.getAttribute(attr) !== "true"}`); // Toggle aria-pressed | aria-expanded
					};
					observe(div);
					div.setAttribute("data-stacked", `${this.dataset.stacked}`);
					this.attachShadow({ mode: "open" }).append(style, div);
					this.div = div;

					if (source) source.textContent = code.replace(/=""/g, ""); // Prevent popover="", hidden="" etc.
				});
			}
			disconnextedCallback() {
				if (this.div) unobserve(this.div);
			}
		},
	);
</script>
<template>
	<vp-story :class="`demo ${styles.body}`" :data-stacked="stacked"></vp-story>
  <pre class="code"></pre>
</template>
<style scoped>
.demo {
	display: block;
	border: 1px solid var(--mt-divider);
	margin: 2rem 0 0;
	padding: 5%;
}

.code {
	background: #032C30;
	color: white;
	font-size: 0.8rem;
	margin: 0;
	overflow: auto;
	padding: 1.5em;
}
</style>
