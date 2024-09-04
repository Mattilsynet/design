<script setup lang="ts">
import { withBase } from 'vitepress';
import { data } from './svgs.data.ts'

const { path } = defineProps<{ path: string; justify?: string }>();
const svgs: Record<string, string> = Object.fromEntries(data.filter(([file]) => file.startsWith(path)));

function generateSvgBlob(event: MouseEvent) {
  const link = event.currentTarget as HTMLAnchorElement;
  const svg = link.querySelector('svg')?.outerHTML || '';
  const blob = new Blob([svg], {type : 'image/svg+xml'});
  link.href = URL.createObjectURL(blob);
}
</script>
<style scoped>
  .svgs {
    display: grid;
    font-size: 1rem;
    gap: 1rem;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    line-height: 1.4;
    list-style: none;
    padding: 0;
  }
  .svgs a { display: flex; align-items: center; justify-content: center; transition: .2s; background: var(--mt-gaasunge); padding: 2rem; border-radius: var(--mt-radius-md) }
  .svgs a:hover { scale: 1.1 }
  .svgs a:active { scale: .95 }
  .svgs :deep(svg) { aspect-ratio: 1 / 1; width: 100%; height: auto }
</style>
<template>
  <div class="svgs" data-fill>
    <a v-for="(svg, file) in svgs" v-html="svg" @mouseenter.once="generateSvgBlob" :download="file.split('/').pop()"></a>
  </div>
</template>
