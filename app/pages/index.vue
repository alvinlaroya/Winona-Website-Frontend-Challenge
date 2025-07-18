<script lang="ts" setup>
import type { PagesApiResponse } from '~/types/page'

const { data, refresh } = await useFetch<PagesApiResponse>('/api/pages', {
  default: () => ({
    pages: []
  }),
  /* transform: (data) => {
    return {
      pages: data.pages.map(page => ({
        ...page,
        datePublished: $moment(page.datePublished).format('MMMM D YYYY')
      }))
    }
  } */
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