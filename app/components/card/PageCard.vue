<script setup>
const props = defineProps({
    id: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: false,
    },
    datePublished: {
        type: String,
        required: false,
    },
});
const { title, datePublished } = props;

const { $moment } = useNuxtApp()
</script>

<template>
    <div class="card w-full bg-base-200 card-xs shadow-sm my-3 rounded-lg p-3">
        <div class="card-body flex flex-row justify-between">
            <div>
                <h2 class="card-title">{{ title }}</h2>

                <div class="flex items-center gap-1 mt-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                        </path>
                    </svg>
                    <ClientOnly class="publish-date">
                        <span>Published: {{ $moment(datePublished).format('MMMM D YYYY') }}</span>
                    </ClientOnly>
                </div>
            </div>
            <div>
                <NuxtLink :to="`/detail/${id}`" class="btn btn-primary">View</NuxtLink>
            </div>
        </div>
    </div>
</template>
