<script setup lang="ts">
import { withBase } from 'vitepress';
import { data } from './graphics.data.ts'

const { path } = defineProps<{ path: string; justify?: string }>();
  const graphics: Record<string, string> = Object.fromEntries(data.filter(([file]) => file.startsWith(path)));
</script>
<style scoped>
  .graphics {
    display: grid;
    font-size: 1rem;
    gap: 1rem;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    line-height: 1.4;
    list-style: none;
    padding: 0;
  }
  .graphics a { display: flex; align-items: center; justify-content: center; transition: .2s; background: var(--mt-gaasunge); padding: 2rem; border-radius: var(--mt-radius-md) }
  .graphics a:hover { scale: 1.1 }
  .graphics a:active { scale: .95 }
  .graphics :deep(svg) { aspect-ratio: 1 / 1; width: 100%; height: auto }
</style>
<template>
  <div class="graphics" data-fill>
    <a v-for="(svg, file) in graphics" v-html="svg" :href="withBase(file)" download></a>
  </div>
</template>
