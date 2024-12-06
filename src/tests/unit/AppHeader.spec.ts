import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AppHeader from '../../components/AppHeader.vue'

describe('AppHeader.vue', () => {
    it('renders the correct title', () => {
        const wrapper = mount(AppHeader)
        const title = wrapper.find('h1')
        expect(title.text()).toBe('Timetable')
    })
})
