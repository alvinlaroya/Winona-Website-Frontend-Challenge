import { defineStore } from 'pinia';

export const useThemeStore = defineStore('themes', {
    state: () => ({
        currentTheme: 'light'
    }),
    actions: {
        setTheme(theme: any) {
            this.currentTheme = theme
            this.applyTheme(theme)

            if (process.client) {
                localStorage.setItem('theme', theme)
            }
        },
        applyTheme(theme: any) {
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
    },
});