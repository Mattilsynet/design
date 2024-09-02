<script setup lang="ts">
import { VPTeamMembers, useSidebar } from 'vitepress/theme'
import { useRoute, withBase } from 'vitepress'

const { path } = useRoute();
const { sidebar } = useSidebar();

const current = sidebar.value.find(({ items }) => items?.some(({ link = '' }) => withBase(link).startsWith(path)));
</script>

<template>
  <ul>
    <li v-for="page of current?.items">
      <a :href="page.link">{{ page.text }}</a>
    </li>
  </ul>
</template>