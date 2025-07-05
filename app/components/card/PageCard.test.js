import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PageCard from '~/components/card/PageCard.vue'

const mockMoment = vi.fn((date) => ({
    format: vi.fn((format) => {
        if (date === '2023-25-12') return 'December 25 2023'
        if (date === '2024-01-01') return 'January 1 2024'
        return 'Invalid Date'
    })
}))

const mockUseNuxtApp = vi.fn(() => ({
    $moment: mockMoment
}))

// Mock NuxtLink component
const NuxtLinkStub = {
    template: '<a :href="to"><slot /></a>',
    props: ['to']
}

// Mock ClientOnly component
const ClientOnlyStub = {
    template: '<div><slot /></div>'
}

vi.mock('#app', () => ({
    useNuxtApp: mockUseNuxtApp
}))

describe('PagCard', () => {
    let wrapper

    const defaultProps = {
        id: '123',
        title: 'Test Page Title',
        datePublished: '2023-25-12'
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    const createWrapper = (props = {}) => {
        return mount(PageCard, {
            props: { ...defaultProps, ...props },
            global: {
                stubs: {
                    NuxtLink: NuxtLinkStub,
                    ClientOnly: ClientOnlyStub
                }
            }
        })
    }

    describe('Component Rendering', () => {
        it('renders the component with all elements', () => {
            wrapper = createWrapper()

            expect(wrapper.find('.card').exists()).toBe(true)
            expect(wrapper.find('.card-title').exists()).toBe(true)
        })

        it('displays the correct title', () => {
            wrapper = createWrapper()

            const titleElement = wrapper.find('.card-title')
            expect(titleElement.text()).toBe('Test Page Title')
        })
    })

    describe('Props Handling', () => {
        it('handles missing title prop', () => {
            wrapper = createWrapper({ title: undefined })

            const titleElement = wrapper.find('.card-title')
            expect(titleElement.text()).toBe('')
        })

        it('handles missing id prop', () => {
            wrapper = createWrapper({ id: undefined })

            const link = wrapper.find('a')
            expect(link.attributes('href')).toBe('/detail/undefined')
        })
    })

    describe('Navigation Link', () => {
        it('creates correct link URL with id', () => {
            wrapper = createWrapper({ id: '456' })

            const link = wrapper.find('a')
            expect(link.attributes('href')).toBe('/detail/456')
        })
    })

    describe('Date Formatting', () => {
        it('formats date correctly', () => {
            wrapper = createWrapper({ datePublished: '2024-01-01' })

            const dateElement = wrapper.find('.publish-date span')
            expect(dateElement.text()).toBe('Published: January 1 2024')
        })
    })
})
