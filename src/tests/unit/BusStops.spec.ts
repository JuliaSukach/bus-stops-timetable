import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import BusStops from '../../components/BusStops.vue'
import axios from 'axios'
import { Ref } from 'vue'

vi.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

mockedAxios.get.mockResolvedValueOnce({
    data: [
      { stop: 'Stop A', order: 1 },
      { stop: 'Stop B', order: 2 },
    ],
  })

describe('BusStops.vue', () => {
    it('renders stops for the selected line', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: [
                { stop: 'Stop A', order: 1 },
                { stop: 'Stop B', order: 2 },
            ],
        })
        
        const wrapper = mount(BusStops, {
            props: {
                line: 1, // Pass a valid line number
            },
        })
        
        // Wait for the mock API call and DOM updates
        await new Promise((resolve) => setTimeout(resolve, 0))
        await wrapper.vm.$nextTick()
        
        // Verify the stops are rendered
        const stops = wrapper.findAll('li')
        expect(stops.length).toBe(2)
        expect(stops[0].text()).toBe('Stop A')
        expect(stops[1].text()).toBe('Stop B')
    })

    it('renders stops for the selected line', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: [
            { stop: 'Stop A', order: 1 },
            { stop: 'Stop B', order: 2 },
            ],
        })
    
        const wrapper = mount(BusStops, {
            props: {
                line: 1, // Pass a valid line number
            },
        })
        
        // Wait for the mock API call and DOM updates
        await new Promise((resolve) => setTimeout(resolve, 0))
        await wrapper.vm.$nextTick()
        
        // Verify the stops are rendered
        const stops = wrapper.findAll('li')
        expect(stops.length).toBe(2)
        expect(stops[0].text()).toBe('Stop A')
        expect(stops[1].text()).toBe('Stop B')
    })
      
    it('shows a placeholder when no line is selected', () => {
        const wrapper = mount(BusStops, {
            props: {
                line: 0, // No line selected
            },
        })

        expect(wrapper.text()).toContain('Please select the bus line first')
    })

    it('shows a placeholder when no stops are available', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: [] }) // Mock empty response
    
        const wrapper = mount(BusStops, {
            props: {
                line: 1,
            },
        })
    
        await new Promise((resolve) => setTimeout(resolve, 0))
        await wrapper.vm.$nextTick()
    
        // Ensure the placeholder is displayed
        expect(wrapper.text()).toContain('No stops available for this line.')
    })
})

