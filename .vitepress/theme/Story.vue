<script setup lang="ts">
import { styles } from "../../designsystem/";
// @ts-ignore Vite knows how to handle this:
import css from "../../designsystem/styles.module.css?inline";

const { stacked } = defineProps<{ stacked?: boolean }>();

if (typeof window !== "undefined" && !customElements.get("vp-story"))
	customElements.define(
		"vp-story",
		class extends HTMLElement {
			connectedCallback() {
				setTimeout(() => {
					const code = this.previousElementSibling?.innerHTML;
					const div = document.createElement("div");
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
					div.setAttribute("data-stacked", `${this.dataset.stacked}`);
					this.attachShadow({ mode: "open" }).append(style, div);
					if (source) source.textContent = code || "";
				});
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
