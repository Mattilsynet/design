<script setup lang="ts">
import { useSidebar } from 'vitepress/theme'
import { useRoute, withBase } from 'vitepress'

const { path } = useRoute();
const { sidebar } = useSidebar();
const { exclude = [] } = defineProps<{
	exclude?: string[];
}>();

const current = sidebar.value.find(({ items }) => items?.some(({ link = '' }) => withBase(link).startsWith(path)));
const items = current?.items?.filter(({ link }) => link !== path && !exclude.includes(link?.split('/').pop() || ''));
</script>

<template>
  <ul>
    <li v-for="page of items">
      <a :href="page.link">{{ page.text }}</a>
    </li>
  </ul>
</template>