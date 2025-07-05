<script setup>
const route = useRoute()
const id = route.params.id

const { data, status, error } = await useFetch(`/api/pages/${id}`)
const isLoading = computed(() => status.value === 'pending')

watch(data, (newData) => {
    if (newData?.pageDetail?.seo) {
        useSeoMeta({
            title: newData.pageDetail?.seo.title,
            description: newData.pageDetail?.seo.description,
        })
    }
}, { immediate: true })

const { $moment } = useNuxtApp()
</script>


<template>
    <div class="w-1/2 mx-auto">
        <div v-if="isLoading">Loading pages...</div>

        <!-- Main Content -->
        <div v-else class="container mx-auto max-w-4xl">

            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li>
                        <NuxtLink to="/" class="text-primary hover:text-primary-focus">Home</NuxtLink>
                    </li>
                    <li>Page Detail</li>
                </ul>
            </div>



            <div class="card bg-base-100 shadow-xl border border-base-300">
                <div class="card-body">
                    <div class="mb-8">
                        <h1 class="text-4xl font-bold text-base-content mb-6 leading-tight">
                            {{ data.pageDetail?.title }}
                        </h1>

                        <div class="flex flex-wrap items-center gap-4 text-sm text-base-content/70 mb-6">
                            <div class="badge badge-primary badge-outline">Research Review</div>
                            <div class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                    </path>
                                </svg>
                                <ClientOnly>
                                    <span>Published: {{ $moment(data.pageDetail?.datePublished).format('MMMM D YYYY')
                                    }}</span>
                                </ClientOnly>
                            </div>
                            <div class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                    </path>
                                </svg>
                                <ClientOnly>
                                    <span>Modified: {{ $moment(data.pageDetail?.dateModified).format('MMMM D YYYY')
                                    }}</span>
                                </ClientOnly>
                            </div>
                        </div>
                    </div>

                    <div class="bg-base-200 rounded-lg p-6 mb-8">
                        <div class="flex items-start gap-4">
                            <div class="avatar">
                                <div class="w-16 rounded-full bg-primary">
                                    <div
                                        class="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-content text-xl font-bold">
                                        {{data.pageDetail?.reviewer?.name.split(" ").map((n) => n[0]).join(".")}}
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-2">
                                    <h3 class="text-xl font-semibold text-base-content">{{
                                        data.pageDetail?.reviewer?.name }}
                                    </h3>
                                    <div class="badge badge-sm badge-accent">Reviewer</div>
                                </div>
                                <p class="text-base-content/80 mb-1">
                                    <span class="font-medium">Credentials:</span> {{
                                        data.pageDetail?.reviewer?.credentials
                                    }}
                                </p>
                                <p class="text-base-content/80 mb-3">
                                    <span class="font-medium">Affiliation:</span> {{
                                        data.pageDetail?.reviewer?.affiliation
                                    }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="prose prose-lg max-w-none px-2">
                        <div class="text-base-content leading-relaxed">
                            <h2 class="text-2xl font-bold text-base-content mt-2 mb-4">Executive Summary</h2>
                            <div v-html="data.pageDetail?.body"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>