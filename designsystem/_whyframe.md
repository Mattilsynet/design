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
    font-size: 1.125rem; /* Prevent fluid when in Whyframe */
  }
  [data-demo] { padding: 5% }
  [data-demo="rows"],
  [data-demo="grid"],
  [data-demo="grid"] > *,
  [data-demo="center"] {
    align-items: center;
    align-content: center;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    margin: auto;
    min-height: 100vh;
    /* &  > * { min-width: 0; margin: auto } */
  }
  [data-demo="grid"] > * { min-height: 0 }
  [data-demo="grid"] > * > hr { flex: 1 0 100%; visibility: hidden; margin: 0 }
  [data-demo="rows"] > * > * + * { margin-top: 1.5rem }

  .demo-resize {
    border-radius: 5px;
    margin: 1em -6px;
    padding: 5px 5px 2em;
    overflow: hidden;
    resize: horizontal;
    border: 1px dashed;
    max-width: 100%;
    position: relative;

    &::after {
      content: "Drag to resize →";
      position: absolute;
      right: 1em;
      bottom: 0;
      white-space: nowrap;
    }
  }
</style>