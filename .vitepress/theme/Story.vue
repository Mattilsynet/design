<script setup>
import { computed, onMounted, ref } from "vue";
import { getWhyframeSource } from "@whyframe/core/utils";

const { aspectRatio, maxWidth } = defineProps({
	maxWidth: {
		type: String,
		default: "100vw",
	},
	aspectRatio: {
		type: String,
		default: "16 / 9",
	},
});

const iframe = ref();
const source = computed(() => iframe.value && getWhyframeSource(iframe.value));

onMounted(() =>
	iframe.value.addEventListener("load", () => {
    iframe.value.contentDocument.body.style.maxWidth = maxWidth;
	})
);
</script>

<template>
  <iframe class="render" ref="iframe" data-why src="/components/_whyframe" title="Preview" :style="{ aspectRatio }">
    <slot></slot>
  </iframe>
  <pre class="source">{{ source }}</pre>
  <!-- <details open>
    <summary>Show code</summary>
  </details> -->
</template>

<style scoped>
summary { cursor: pointer; font-size: 1rem }
.render {
  margin: 2rem 0 0;
  border: 1px solid var(--mt-divider);
  background: transparent;
  width: 100%;
}

.source {
  background-color: #1e1e1e;
  color: white;
  font-size: 0.8rem;
  overflow: auto;
  padding: 0 0.5rem;
  margin: 0;
}
</style>
