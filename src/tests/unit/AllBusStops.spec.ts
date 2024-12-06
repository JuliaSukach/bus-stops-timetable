import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'
import AllBusStops from '../../components/AllBusStops.vue'

vi.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('AllBusStops.vue', () => {
    it('renders bus stops after fetching data', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: [
                { stop: 'Stop A', order: 1 },
                { stop: 'Stop B', order: 2 },
                { stop: 'Stop C', order: 3 },
            ],
        })

        const wrapper = mount(AllBusStops)

        // Wait for mock data to load
        await new Promise(resolve => setTimeout(resolve, 0))
        await wrapper.vm.$nextTick()

        const stops = wrapper.findAll('.stops li')
        expect(stops.length).toBe(3)
        expect(stops[0].text()).toBe('Stop A')
        expect(stops[1].text()).toBe('Stop B')
        expect(stops[2].text()).toBe('Stop C')
    })

    it('filters bus stops based on search query', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: [
                { stop: 'Stop A', order: 1 },
                { stop: 'Stop B', order: 2 },
                { stop: 'Stop C', order: 3 },
            ],
        })

        const wrapper = mount(AllBusStops)

        // Wait for mock data to load
        await new Promise(resolve => setTimeout(resolve, 0))
        await wrapper.vm.$nextTick()

        // Set search term
        const searchInput = wrapper.find('#search-input')
        await searchInput.setValue('Stop B')
        await wrapper.vm.$nextTick()

        const stops = wrapper.findAll('.stops li')
        expect(stops.length).toBe(1)
        expect(stops[0].text()).toBe('Stop B')
    })

    it('sorts bus stops in descending order', async () => {
        mockedAxios.get.mockResolvedValueOnce({
        data: [
            { stop: 'Stop A', order: 1 },
            { stop: 'Stop B', order: 2 },
            { stop: 'Stop C', order: 3 },
        ],
        })

        const wrapper = mount(AllBusStops)

        // Wait for mock data to load
        await new Promise(resolve => setTimeout(resolve, 0))
        await wrapper.vm.$nextTick()

        // Toggle sort order
        const sortButton = wrapper.find('.sort-button')
        await sortButton.trigger('click')
        await wrapper.vm.$nextTick()

        const stops = wrapper.findAll('.stops li')
        expect(stops.length).toBe(3)
        expect(stops[0].text()).toBe('Stop C') // Should now be sorted in descending order
        expect(stops[1].text()).toBe('Stop B')
        expect(stops[2].text()).toBe('Stop A')
    })

    it('shows an error message when API call fails', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('API Error'))

        const wrapper = mount(AllBusStops)

        // Wait for the API call to fail
        await new Promise(resolve => setTimeout(resolve, 0))
        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain('Error loading bus stops. Please try again later.')
    })

    it('shows a placeholder when no stops are available', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: [] })

        const wrapper = mount(AllBusStops)

        // Wait for mock data to load
        await new Promise(resolve => setTimeout(resolve, 0))
        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain('No stops available for this line.')
    })
})
