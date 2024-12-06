import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import NavigationTabs from '../../components/NavigationTabs.vue'

// Mock routes for testing
const routes = [
    { path: '/', name: 'BusLines', component: { template: '<div>Bus Lines</div>' } },
    { path: '/stops', name: 'Stops', component: { template: '<div>Stops</div>' } },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

describe('NavigationTabs.vue', () => {
    it('renders navigation links correctly', async () => {
        router.push('/') // Start on the "Bus Lines" route
        await router.isReady()

        const wrapper = mount(NavigationTabs, {
            global: {
                plugins: [router],
            },
        })

        const links = wrapper.findAll('.nav-tab')
        expect(links.length).toBe(2)
        expect(links[0].text()).toBe('Bus Lines')
        expect(links[1].text()).toBe('Stops')
    })

    it('applies active class to the correct link', async () => {
        router.push('/') // Start on the "Bus Lines" route
        await router.isReady()

        const wrapper = mount(NavigationTabs, {
            global: {
                plugins: [router],
            },
        })

        const activeLink = wrapper.find('.nav-tab.active')
        expect(activeLink.text()).toBe('Bus Lines')

        // Navigate to "Stops" route
        await router.push('/stops')
        await wrapper.vm.$nextTick()

        const newActiveLink = wrapper.find('.nav-tab.active')
        expect(newActiveLink.text()).toBe('Stops')
    })
})
