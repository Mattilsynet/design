<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { getWhyframeSource } from "@whyframe/core/utils";
import { withBase } from "vitepress"

const { aspectRatio = '16 / 9', maxWidth = '100vw' } = defineProps<{
	aspectRatio?: string;
	maxWidth?: string;
}>();

const iframe = ref<HTMLIFrameElement>();
const source = computed(() => iframe.value && getWhyframeSource(iframe.value));

onMounted(() =>
	iframe.value?.addEventListener("load", () => {
    const doc = iframe.value?.contentDocument;
    if (doc) doc.body.style.maxWidth = maxWidth;
	})
);
</script>

<template>
  <iframe class="render" ref="iframe" data-why :src="withBase('/designsystem/_whyframe')" title="Preview" :style="{ aspectRatio }">
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
