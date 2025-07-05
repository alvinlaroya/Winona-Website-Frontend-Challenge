<script lang="ts" setup>
import type { PagesApiResponse } from '~/types/page'

const { data } = await useFetch<PagesApiResponse>('/api/pages', {
  default: () => ({
    pages: []
  })
})

useSeoMeta({
  title: 'Winona Website Frontend Challenge'
})
</script>

<template>
  <div class="w-full px-4 xl:w-1/2 mx-auto">
    <h1 class="my-4">Pages</h1>
    <div>
      <div v-for="page in data.pages" :key="page.id">
        <CardPageCard :id="page.id" :title="page.title" :datePublished="page.datePublished" />
      </div>
    </div>
  </div>
</template>