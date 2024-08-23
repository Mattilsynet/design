---
layout: false
---

<div ref="el" class="vp-raw"></div>

<script setup>
import { createApp } from "whyframe:app";
import { onMounted, ref } from "vue";
import { withBase } from "vitepress"

const el = ref();

onMounted(() => {
  const iframe = window.frameElement
  const whyId = iframe?.dataset.whyId || ""
  const hasBase = whyId.startsWith(withBase("/"))

  if (!hasBase) iframe.dataset.whyId = withBase(whyId); // Resolve whyframe with correct base URL
  createApp(el.value)
});
</script>
<style>
  body { margin: auto!important }
  :has(> .vp-raw) { display: flex; min-height: 100vh; align-items: center; justify-content: center }
  .vp-raw { min-width: 0 }
</style>