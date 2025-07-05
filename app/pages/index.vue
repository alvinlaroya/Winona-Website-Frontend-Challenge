<script lang="ts" setup>
const { data, status, error } = await useFetch('/api/pages')

const isLoading = computed(() => status.value === 'pending')

useSeoMeta({
  title: 'Winona Website Frontend Challenge'
})
</script>

<template>
  <div class="w-1/2 mx-auto">
    <h1 class="my-4">Pages</h1>
    <div v-if="isLoading">Loading pages...</div>
    <div v-else>
      <div v-for="page in data.pages" :key="page.id">
        <CardPageCard :id="page.id" :title="page.title" :datePublished="page.datePublished" />
      </div>
    </div>
  </div>
</template>