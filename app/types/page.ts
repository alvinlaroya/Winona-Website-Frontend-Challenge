interface Reviewer {
    name: string
    credentials: string
    affiliation: string
}

interface SEO {
    title: string
    description: string
}

interface Page {
    id: string
    title: string
    datePublished: string
}

export interface PagesApiResponse {
    pages: Page[]
}

export interface PageDetailApiResponse {
    pageDetail: {
        id: string
        title: string
        reviewer: Reviewer
        datePublished: string
        dateModified: string
        body: string
        seo: SEO
    }
}