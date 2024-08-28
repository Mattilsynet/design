<script setup lang="ts">
import { withBase } from 'vitepress';
import { data } from './graphics.data.ts'

const { path } = defineProps<{ path: string }>();
  const icons: Record<string, string> = Object.fromEntries(data.filter(([file]) => file.startsWith(path)));
</script>
<style scoped>
  .icons {
    justify-content: center;
    display: grid;
    font-size: 1rem;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, 12rem);
    line-height: 1.4;
    list-style: none;
    margin: 2rem 0;
    padding: 0;
  }
  .icons a { display: flex; align-items: center; justify-content: center; transition: .2s; background: white; padding: 2rem; border-radius: var(--mt-radius-md) }
  .icons a:hover { scale: 1.1 }
  .icons a:active { scale: .95 }
  .icons :deep(svg) { width: 100%; height: auto }
</style>
<template>
  <div class="icons" data-fill>
    <a v-for="(svg, file) in icons" v-html="svg" :href="withBase(file)" download></a>
  </div>
</template>
