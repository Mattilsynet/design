---
layout: false
---

<div ref="el" class="vp-raw demo"></div>

<script setup lang="ts">
import { createApp } from "whyframe:app";
import { onMounted, ref } from "vue";
import { withBase } from "vitepress";

const el = ref();

onMounted(() => {
  const iframe = window.frameElement;
  const whyId = iframe?.dataset.whyId || "";
  const hasBase = whyId.startsWith(withBase("/"));

  el.value.parentElement.dataset.demo = iframe?.dataset.layout || "center";
  if (!hasBase) iframe.dataset.whyId = withBase(whyId); // Resolve whyframe with correct base URL
  createApp(el.value);
});
</script>
<style>
  body {
    margin: auto!important;
    font-size: var(--mt-font-md-max); /* Prevent fluid when in Whyframe */
  }
  [data-demo] { padding: 5% }
  [data-demo="grid"],
  [data-demo="grid"] > *,
  [data-demo="center"] {
    align-items: center;
    align-content: center;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    justify-content: center;
    min-height: 100vh;
    &  > * { min-width: 0 }
  }
  [data-demo="grid"] > * { min-height: 0 }
  [data-demo="grid"] > * > hr { flex: 1 0 100%; visibility: hidden }
</style>