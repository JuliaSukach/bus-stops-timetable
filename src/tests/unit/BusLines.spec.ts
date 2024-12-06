import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'
import BusLines from '../../components/BusLines.vue'

// Mock the axios module
vi.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('BusLines.vue', () => {
    it('renders loading message while fetching data', () => {
        const wrapper = mount(BusLines, {
            global: {
                mocks: {
                    $t: (msg: string) => msg, // Mock translation if needed
                },
            },
        })
        expect(wrapper.text()).toContain('Loading...')
    })

    it('renders bus lines after successful API call', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: [
                { line: 1 },
                { line: 2 },
                { line: 3 },
            ],
        })

        const wrapper = mount(BusLines)

        // Wait for the mock API response to resolve
        await new Promise((resolve) => setTimeout(resolve, 0)) // Wait for all promises to settle
        await wrapper.vm.$nextTick() // Ensure the DOM is updated

        const buttons = wrapper.findAll('button')
        expect(buttons.length).toBe(3)
        expect(buttons[0].text()).toBe('1')
        expect(buttons[1].text()).toBe('2')
        expect(buttons[2].text()).toBe('3')
    })

    it('shows an error message if the API call fails', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('API Error'))

        const wrapper = mount(BusLines)

        // Wait for the component to update
        await new Promise((resolve) => setTimeout(resolve, 0))
        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain('Error loading bus lines. Please try again later.')
    })

    it('shows a placeholder when no line is selected', () => {
        const wrapper = mount(BusLines)

        const placeholder = wrapper.find('.empty-bus-stops')
        expect(placeholder.text()).toContain('Please select the bus line first')
    })

    it('emits the selected line when a line is clicked', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: [
                { line: 1 },
                { line: 2 },
            ],
        })
        
        const wrapper = mount(BusLines)
        
        // Wait for the mock API response to resolve
        await new Promise((resolve) => setTimeout(resolve, 0)) // Wait for all promises to settle
        await wrapper.vm.$nextTick() // Ensure the DOM is updated
        
        const buttons = wrapper.findAll('button')
        expect(buttons.length).toBe(2) // Ensure buttons are rendered
        await buttons[0].trigger('click') // Trigger click on the first button
        
        expect(wrapper.emitted()).toHaveProperty('selectLine')
        expect(wrapper.emitted().selectLine[0]).toEqual([1])
    })
})
