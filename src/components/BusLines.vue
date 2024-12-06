<template>
    <div class="bus-container">
        <div class="bus-lines">
            <p class="title">Select Bus Line</p>
            <div v-if="loading">Loading...</div>
            <div v-if="error" class="error">
                Error loading bus lines. Please try again later.
                <button @click="retryFetch" aria-label="Retry fetching bus lines">Retry</button>
            </div>
            <div v-if="busLines.length" class="bus-line-container">
                <button
                    v-for="line in busLines"
                    :key="line"
                    @click="selectLine(line)"
                    :aria-label="'Select bus line ' + line">
                    {{ line }}
                </button>
            </div>
            <div v-else-if="!loading && !error" class="placeholder">
                No bus lines available.
            </div>
        </div>
        <div class="bus-stops-container">
            <BusStops v-if="selectedLine" :line="selectedLine" />
            <div class="empty-bus-stops" v-else>
                <div class="empty-bus-stops">
                    <div class="empty-container">
                        <p>Please select the bus line first</p>
                    </div>
                </div>
                <div class="empty-time-lines">
                    <div class="empty-container">
                        <p>Please select the bus line first</p>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'
import BusStops from './BusStops.vue'
import { Stop } from '@/types'

const fetchBusLines = async (busLines: any, loading: any, error: any) => {
    try {
        const response = await axios.get<Stop[]>('http://localhost:3000/stops')
        const lines = response.data.map((item: { line: number }) => item.line)
        const uniqueLines = Array.from(new Set(lines)).sort((a, b) => a - b)
        busLines.value = uniqueLines
    } catch (err) {
        error.value = true
    } finally {
        loading.value = false
    }
}

export default defineComponent({
    components: { BusStops },
    emits: ['selectLine'],
    setup(_, { emit }) {
        const busLines = ref<number[]>([])
        const loading = ref(true)
        const error = ref(false)
        const selectedLine = ref<number | null>(null)
    
        onMounted(() => {
            fetchBusLines(busLines, loading, error)
        })

        const retryFetch = () => {
            error.value = false
            loading.value = true
            fetchBusLines(busLines, loading, error)
        }

        const selectLine = (line: number) => {
            selectedLine.value = line
            emit('selectLine', line)
        }
    
        return { busLines, loading, error, selectedLine, selectLine, retryFetch }
    },
})
</script>
  
<style scoped>
    .bus-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow-y: hidden;
    }
    .bus-lines {
        background-color: #fff;
        margin-bottom: 16px;
    }
    .title {
        font-weight: 600;
        font-size: 14px;
        line-height: 24px;
        padding: 24px 24px 8px 24px;
    }
    .bus-line-container {
        padding: 0px 58px 24px 24px;
    }
    .bus-stops-container {
        display: flex;
        margin-bottom: 40px;
        flex-direction: row;
        justify-content: center;
        flex: 1;
        overflow-y: hidden;
    }
    .empty-bus-stops, .empty-time-lines {
        display: flex;
        flex: 1;
        overflow: hidden;
    }
    .empty-bus-stops {
        margin-right: 8px;
    }
    .empty-time-lines {
        margin-left: 8px;
    }
    .error {
        color: var(--color-error);
        margin-top: 10px;
    }
    button {
        margin: 4px;
        width: 52px;
        height: 32px;
        background: #1952E1;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
    }
    button:hover {
        background: #2E3E6E;
    }
</style>
  