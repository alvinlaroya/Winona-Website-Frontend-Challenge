export default defineEventHandler(async (event) => {
    const apiBaseUrl = process.env.NUXT_API_BASE_URL
    const apiAuthorization = process.env.NUXT_API_AUTHORIZATION

    if (!apiBaseUrl || !apiAuthorization) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Missing required environment variables'
        })
    }

    const { id } = event.context.params!

    const response = await fetch(`${apiBaseUrl}/pages/${id}`, {
        headers: {
            'Authorization': apiAuthorization
        }
    })
    const pageDetail = await response.json()

    console.log("page detaill", pageDetail)

    return {
        pageDetail
    }
})