<template>
    <div v-if="selectedStop && stopTimes.length" class="bus-time">
        <h1 class="bus-line-title">Bus Stop: {{ selectedStop.stop }}</h1>
        <div class="bus-stops-wrap">
            <p class="bus-stop-title">Time</p>
            <div class="stops time-list">
                <ul class="time-items">
                    <li
                        v-for="time in stopTimes"
                        :key="time"
                        :aria-label="'Bus time ' + time"
                        class="time-item"
                    >
                        {{ time }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div v-else class="no-times">
        <p>No times available for this stop.</p>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue'
import { Stop } from '@/types'

export default defineComponent({
    props: {
        selectedStop: {
            type: Object as PropType<Stop | null>,
            required: false,
        },
        busStops: {
            type: Array as PropType<Stop[]>,
            required: true,
        },
    },
    setup(props) {
        const stopTimes = ref<string[]>([])
    
        watch(() => props.selectedStop, (newStop) => {
            if (newStop) {
                stopTimes.value = props.busStops
                    .filter(stop => stop.stop === newStop.stop)
                    .map(stop => stop.time)
                    .sort((a, b) =>
                        new Date(`1970/01/01 ${a}`).getTime() -
                        new Date(`1970/01/01 ${b}`).getTime()
                    )
            } else {
                stopTimes.value = []
            }
        }, { immediate: true })
    
        return { stopTimes }
    },
})
</script>
  
<style scoped>
    .bus-time {
        margin-left: 8px;
    }
</style>
  