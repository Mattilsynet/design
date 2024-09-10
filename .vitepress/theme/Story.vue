<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { getWhyframeSource } from "@whyframe/core/utils";
import { withBase } from "vitepress"

const { aspect, maxWidth = '100vw', layout = 'center' } = defineProps<{
	aspect?: string;
	maxWidth?: string;
  layout?: string;
}>();

const iframe = ref<HTMLIFrameElement>();
const source = computed(() => iframe.value && getWhyframeSource(iframe.value));

onMounted(() =>{
  iframe.value?.addEventListener("load", () => {
    const doc = iframe.value?.contentDocument;
    if (doc) doc.body.style.maxWidth = maxWidth;
	})
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
  <details>
    <summary>Show code</summary>
    <pre class="source">{{ source }}</pre>
  </details>
</template>
<style scoped>
summary { cursor: pointer; font-size: 1rem }
.render {
  aspect-ratio: 16 / 9;
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
