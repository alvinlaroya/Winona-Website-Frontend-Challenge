<script setup>
const props = defineProps({
    dropdownPosition: {
        type: String,
        required: false,
    },
});
const { dropdownPosition } = props;

const currentTheme = ref('light')

onMounted(() => {
    if (process.client) {
        currentTheme.value = localStorage.getItem('theme') || 'light'
        applyTheme(currentTheme.value)
    }
})

const setTheme = (theme) => {
    currentTheme.value = theme
    applyTheme(theme)

    if (process.client) {
        localStorage.setItem('theme', theme)
    }
}

const applyTheme = (theme) => {
    if (process.client) {
        const html = document.documentElement

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            html.setAttribute('data-theme', systemTheme)
        } else {
            html.setAttribute('data-theme', theme)
        }
    }
}

if (process.client) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
        if (currentTheme.value === 'system') {
            applyTheme('system')
        }
    })
}
</script>

<template>
    <div class="dropdown dropdown-end" :class="dropdownPosition">
        <label tabindex="0" class="btn btn-ghost btn-circle">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" v-if="currentTheme === 'light'">
                <path
                    d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.59 1.59a.75.75 0 101.06 1.061l1.59-1.59zM6 12a.75.75 0 01-.75-.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
            </svg>
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" v-else>
                <path
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
        </label>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
                <button @click="setTheme('light')" :class="{ 'active': currentTheme === 'light' }">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59z" />
                    </svg>
                    Light Mode
                </button>
            </li>
            <li>
                <button @click="setTheme('dark')" :class="{ 'active': currentTheme === 'dark' }">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                    Dark Mode
                </button>
            </li>
        </ul>
    </div>
</template>