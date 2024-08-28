<script setup lang="ts">
import { ref } from "vue";

const list = ref();
const { columns, values = [] } = defineProps<{
  columns?: string;
  values: {
    hex: string;
    name: string;
    desc?: string;
  }[]
  }>();

const hexToRgb = (color: string) => {
  const values = color.slice(1).match(color[6] ? /(\S{2})/g : /(\S{1})/g) || [];
  return values.map((value: string) => Number.parseInt(value, 16));
}

// const hexToBrightness = (color: string) => {
//   const [r, g, b] = hexToRgb(color);
//   return ((r * 299) + (g * 587) + (b * 114)) / 1000;
// }
</script>

<template>
  <ul data-fill ref="list" class="colors" :style="{ gridTemplateColumns: columns }">
    <li v-for="value in values">
      <div class="preview" :style="{ background: value.hex }">

      </div>
      <strong>{{ value.name }}</strong>
      <div>{{ value.hex }}</div>
      <div v-html="hexToRgb(value.hex).map((v: number, i: number) => `${'RGB'[i]}: ${v}`).join('<br>')"></div>
      <small v-if="value.desc" v-html="value.desc"></small>
    </li>
  </ul>
</template>

<style scoped>
  .colors {
    justify-content: center;
    display: grid;
    font-size: 1rem;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, 12rem);
    line-height: 1.4;
    list-style: none;
    margin: 2rem 0;
    padding: 0;
  }
  .colors > li {
    border-radius: .5rem;
    margin: 0!important;
    padding: 1rem;
  }
  .colors strong { display: block }
  .colors small { display: block; margin-top: .5rem; font-size: .875rem }
  .preview {
    align-items: center;
    aspect-ratio: 1 / 1;
    border-radius: 100%;
    box-sizing: border-box;
    display: block;
    justify-content: center;
    margin: 0 auto 1rem;
    outline-offset: 3px;
    outline: 1px solid rgba(0,0,0,.1);
  }
</style>
