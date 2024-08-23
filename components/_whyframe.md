---
layout: false
---

<div ref="el" class="vp-raw"></div>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { createApp } from 'whyframe:app';

const el = ref<HTMLDivElement>();

onMounted(() => createApp(el.value));
</script>
<style>
  body { margin: auto!important }
  :has(> .vp-raw) { display: flex; min-height: 100vh; align-items: center; justify-content: center }
  .vp-raw { min-width: 0 }
</style>