<script setup lang="ts">
import { getWhyframeSource } from "@whyframe/core/utils";
import { withBase } from "vitepress";
import { computed, onMounted, ref } from "vue";

const {
	aspect,
	maxWidth = "100vw",
	layout = "center",
} = defineProps<{
	aspect?: string;
	maxWidth?: string;
	layout?: string;
}>();

const iframe = ref<HTMLIFrameElement>();
const source = computed(() => iframe.value && getWhyframeSource(iframe.value));

onMounted(() => {
	iframe.value?.addEventListener("load", () => {
		const doc = iframe.value?.contentDocument;
		const observer = new MutationObserver(() => {
			for (const el of doc?.querySelectorAll('[class*="styles."]') || []) {
				el.className = el.className.replace(/styles\./g, "");
			}
			observer.takeRecords();
		});

		if (doc) {
			doc.body.style.maxWidth = maxWidth;
			observer.observe(doc.body, {
				childList: true,
				subtree: true,
				attributes: true,
				attributeFilter: ["class"],
			});
		}
	});
});
</script>
<template>
  <iframe
    :data-layout="layout"
    :src="withBase('/designsystem/_whyframe')"
    :style="{ aspectRatio: aspect }"
    class="render"
    data-why
    ref="iframe"
    title="Preview"
  >
    <slot></slot>
  </iframe>
  <pre class="source">{{ source }}</pre>
</template>
<style scoped>
.render {
  aspect-ratio: 16 / 9;
  margin: 2rem 0 0;
  border: 1px solid var(--mt-divider);
  background: transparent;
  width: 100%;
}

.source {
  background-color: #032C30;
  color: white;
  font-size: 0.8rem;
  margin: 0;
  overflow: auto;
  padding: 1.5em;
}
</style>
