<script setup lang="ts">
import { VPTeamMembers, useSidebar } from 'vitepress/theme'
import { useRoute, withBase } from 'vitepress'

const { path } = useRoute();
const { sidebar } = useSidebar();

const current = sidebar.value.find(({ items }) => items?.some(({ link = '' }) => withBase(link).startsWith(path)));
const members = current?.items?.map(({ text, link }) => ({
  org: text?.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>') || link,
  orgLink: link
 })) || []
</script>

<template>
  <VPTeamMembers size="small" :members="members" />
</template>