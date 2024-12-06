<template>
    <div class="bus-stops">
        <h1 class="bus-line-title">Bus Line: {{ line }}</h1>
        <div class="bus-stops-wrap">
            <p class="bus-stop-title">Bus Stops
                <button
                    @click="toggleSortOrder"
                    class="sort-button"
                    aria-label="Sort bus stops by order"
                    title="Toggle sorting order"
                >
                    {{ sortOrder === 'asc' ? '↓' :'↑' }}
                </button>
            </p>
            <div v-if="loading">Loading...</div>
            <div v-if="error" class="error">
                Error loading bus stops. Please try again later.
                <button @click="retryFetch" aria-label="Retry fetching bus stops">
                    Retry
                </button>
            </div>
            <div v-if="busStops.length && !error" class="stops">
                <ul>
                    <li
                        v-for="stop in uniqueSortedBusStops"
                        :key="stop.stop"
                        @click="selectStop(stop)"
                        :aria-label="'Select bus stop ' + stop.stop"
                    >
                        {{ stop.stop }}
                    </li>
                </ul>
            </div>
            <p v-else-if="!loading && !error">No stops available for this line.</p>
        </div>
    </div>
    <TimeList v-if="selectedStop" :selectedStop="selectedStop" :busStops="busStops" />
    <div v-else class="empty-time-lines">
        <div class="empty-container">
            <p>Please select the bus line first</p>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, watch, computed, Ref } from 'vue'
import axios from 'axios'
import TimeList from './TimeList.vue'
import { Stop } from '@/types'

const fetchBusStops = async (
    line: number,
    busStops: Ref<Stop[]>,
    loading: Ref<boolean>,
    error: Ref<boolean>
) => {
    try {
        const response = await axios.get<Stop[]>(
            `http://localhost:3000/stops?line=${line}`
        )
        busStops.value = response.data.sort((a, b) => a.order - b.order)
        error.value = false; 
    } catch (err) {
        console.log('Error caught in fetchBusStops:', err); // Add this line
        error.value = true
    } finally {
        loading.value = false
    }
}

export default defineComponent({
    components: { TimeList },
    props: {
        line: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const busStops = ref<Stop[]>([])
        const loading = ref(true)
        const error = ref(false)
        const sortOrder = ref<'asc' | 'desc'>('asc')
        const selectedStop = ref<Stop | null>(null)

        const toggleSortOrder = () => {
            sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
        }

        const selectStop = (stop: Stop) => {
            selectedStop.value = stop
        }

        const retryFetch = () => {
            error.value = false
            loading.value = true
            fetchBusStops(props.line, busStops, loading, error)
        }

        const uniqueSortedBusStops = computed(() => {
            const uniqueStopsMap = new Map<string, Stop>()
            busStops.value.forEach(stop => {
                if (!uniqueStopsMap.has(stop.stop)) {
                    uniqueStopsMap.set(stop.stop, stop)
                }
            })
            const uniqueStopsArray = Array.from(uniqueStopsMap.values())
            return uniqueStopsArray.sort((a, b) => {
                return sortOrder.value === 'asc' ? a.order - b.order : b.order - a.order
            })
        })
    
        watch(() => props.line, (newLine) => {
            loading.value = true
            error.value = false
            fetchBusStops(newLine, busStops, loading, error)
        }, { immediate: true })
    
        return {
            busStops,
            loading,
            error,
            sortOrder,
            toggleSortOrder,
            uniqueSortedBusStops,
            selectStop,
            selectedStop,
            retryFetch
        }
    },
})
</script>
  
<style scoped>
</style>

  