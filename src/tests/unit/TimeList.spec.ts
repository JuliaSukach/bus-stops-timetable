import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TimeList from '../../components/TimeList.vue'

describe('TimeList.vue', () => {
    const busStops = [
        { stop: 'Stop A', line: 1, order: 1, time: '10:00' },
        { stop: 'Stop A', line: 1, order: 2, time: '11:00' },
        { stop: 'Stop B', line: 2, order: 1, time: '09:00' },
    ]
    it('renders times for the selected stop', () => {
        const selectedStop = { stop: 'Stop A', line: 1, order: 1, time: '10:00' }

        const wrapper = mount(TimeList, {
            props: {
                selectedStop,
                busStops
            },
        })

        const times = wrapper.findAll('.time-item')
        expect(times.length).toBe(2) // Only two times for "Stop A"
        expect(times[0].text()).toBe('10:00')
        expect(times[1].text()).toBe('11:00')
    })

    it('sorts times in ascending order', () => {
        const unorderedBusStops = [
            { stop: 'Stop A', line: 1, order: 1, time: '11:00' },
            { stop: 'Stop A', line: 1, order: 2, time: '10:00' },
            { stop: 'Stop A', line: 1, order: 3, time: '12:00' },
        ]

        const selectedStop = { stop: 'Stop A', line: 1, order: 1, time: '11:00' }

        const wrapper = mount(TimeList, {
            props: {
                selectedStop,
                busStops: unorderedBusStops,
            },
        })

        const times = wrapper.findAll('.time-item')
        expect(times[0].text()).toBe('10:00') // First time in ascending order
        expect(times[1].text()).toBe('11:00') // Second time
        expect(times[2].text()).toBe('12:00') // Third time
    })

    it('shows a message when no times are available', () => {
        const selectedStop = { stop: 'Stop C', line: 3, order: 1, time: '12:00' }

        const wrapper = mount(TimeList, {
            props: {
                selectedStop,
                busStops, // No matching stop in this mock data
            },
        })

        expect(wrapper.text()).toContain('No times available for this stop.')
    })
})
