import type { H3Event } from 'h3'

export default cachedEventHandler(async (event) => {
    const apiBaseUrl = process.env.NUXT_API_BASE_URL
    const apiAuthorization = process.env.NUXT_API_AUTHORIZATION

    if (!apiBaseUrl || !apiAuthorization) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Missing required environment variables'
        })
    }

    const { id } = event.context.params!
    //const id = getRouterParam(event, 'id')

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
},
    {
        maxAge: 60 * 60, // 1 hour
        getKey: (event: H3Event) => event.path
    }
)