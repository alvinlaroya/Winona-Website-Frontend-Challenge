export default defineEventHandler(async (event) => {
    const apiBaseUrl = process.env.NUXT_API_BASE_URL
    const apiAuthorization = process.env.NUXT_API_AUTHORIZATION

    if (!apiBaseUrl || !apiAuthorization) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Missing required environment variables'
        })
    }

    const response = await fetch(`${apiBaseUrl}/pages`, {
        headers: {
            'Authorization': apiAuthorization
        }
    })
    const pages = await response.json()

    console.log("pagess", pages)

    return {
        pages
    }
})