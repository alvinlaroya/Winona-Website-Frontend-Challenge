import moment from 'moment'

export default defineNuxtPlugin(() => {
    // Make moment available globally
    return {
        provide: {
            moment: moment
        }
    }
})