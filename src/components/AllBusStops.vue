<template>
    <div class="search-container">
        <div class="input-container">
            <div class="input-container">
                <input
                    type="text"
                    id="search-input"
                    class="text-input"
                    v-model="searchTerm"
                    placeholder="Search..."
                    aria-label="Search bus stops"
                >
                <label for="search-input" class="label">Search</label>
                <svg
                    class="search-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="{ hidden: searchTerm }"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.83325 7.33337C1.83325 4.29581 4.29569 1.83337 7.33325 1.83337C10.3708 1.83337 12.8333 4.29581 12.8333 7.33337C12.8333 10.3709 10.3708 12.8334 7.33325 12.8334C4.29569 12.8334 1.83325 10.3709 1.83325 7.33337ZM7.33325 0.833374C3.7434 0.833374 0.833252 3.74352 0.833252 7.33337C0.833252 10.9232 3.7434 13.8334 7.33325 13.8334C8.9482 13.8334 10.4256 13.2444 11.5624 12.2696L13.6464 14.3536C13.8416 14.5489 14.1582 14.5489 14.3535 14.3536C14.5487 14.1583 14.5487 13.8418 14.3535 13.6465L12.2695 11.5625C13.2443 10.4257 13.8333 8.94832 13.8333 7.33337C13.8333 3.74352 10.9231 0.833374 7.33325 0.833374Z"
                        fill="#9A9DA4"
                    />
                </svg>
            </div>
        </div>
        <div class="bus-stops bus-result">
            <div class="bus-stops-wrap">
                <p class="bus-stop-title">Bus Stops
                    <button
                        @click="toggleSortOrder"
                        class="sort-button"
                        aria-label="Sort bus stops by order"
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
                <div v-if="filteredStops.length && !error" class="stops">
                    <ul>
                        <li
                            v-for="stop in filteredStops"
                            :key="stop.stop"
                            :aria-label="'Bus stop ' + stop.stop"
                        >
                            {{ stop.stop }}
                        </li>
                    </ul>
                </div>
                <p class="error" v-else-if="!loading && !error">
                    No stops available for this line.
                </p>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted, computed, Ref } from 'vue'
import axios from 'axios'
import { Stop } from '@/types'

const fetchStops = async (
    stops: Ref<Stop[]>,
    loading: Ref<boolean>,
    error: Ref<boolean>
) => {
    try {
        const response = await axios.get<Stop[]>('http://localhost:3000/stops')
        stops.value = response.data
    } catch (err) {
        error.value = true
    } finally {
        loading.value = false
    }
}

export default defineComponent({
    name: 'AllBusStops',
    setup() {
        const stops = ref<Stop[]>([])
        const loading = ref(true)
        const error = ref(false)
        const searchTerm = ref('')
        const sortOrder = ref<'asc' | 'desc'>('asc')
    
        onMounted(() => {
            fetchStops(stops, loading, error)
        })

        const retryFetch = () => {
            error.value = false
            loading.value = true
            fetchStops(stops, loading, error)
        }

        const uniqueStops = computed(() => {
            const stopNames = new Set()
            return stops.value.filter(stop => {
                if (stopNames.has(stop.stop)) {
                    return false
                }
                stopNames.add(stop.stop)
                return true
            })
        })

        const toggleSortOrder = () => {
            sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
        }
    
        const filteredStops = computed(() => {
            const filtered = searchTerm.value
                ? uniqueStops.value.filter(stop => stop.stop.toLowerCase().includes(searchTerm.value.toLowerCase()))
                : uniqueStops.value
            
            return filtered.sort((a, b) => {
                const comparison = a.stop.localeCompare(b.stop)
                return sortOrder.value === 'asc' ? comparison : -comparison
            })
        })

        return {
            stops,
            loading,
            error,
            filteredStops,
            searchTerm,
            toggleSortOrder,
            sortOrder,
            retryFetch
        }
    },
})
</script>
  
<style scoped>
    .bus-result {
        overflow-y: auto;
    }
    .search-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow-y: hidden;
        background-color: #fff;
        margin-bottom: 40px;
    }
    .error {
        color: var(--color-error);
        font-size: 12px;
        font-weight: 600;
        line-height: 16px;
        letter-spacing: 0.001em;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        display: flex;
        align-items: center;
        margin: 24px 0px 24px 24px;
    }
    .search-bar {
        margin-bottom: 20px;
        padding: 5px;
        width: 100%;
    }
    .input-container {
        margin: 8px;
        width: 288px;
    }
    .input-label {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 10px;
        display: inline-block;
        color: #333;
    }
    .input-container {
        position: relative;
    }

    .label {
        position: absolute;
        left: 10px;
        top: 14px;
        transition: all 0.2s;
        padding: 0 4px;
        z-index: 10;
        color: #63666E;
        font-size: 10px;
        font-weight: 400;
        line-height: 16px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
    }

    .text-input {
        padding: 0.8rem;
        width: 100%;
        height: 100%;
        transition: all .3s;
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        border-radius: 4px;
        border: 1px solid #E2E4EA;
    }
    
    .style-input {
        width: 100%;
        font-size: 12px;
        padding: 10px 30px 10px 10px;
        border: 1px solid #E2E4EA;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .search-icon {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        pointer-events: none;
    }
    .search-label {
        font-size: 12px;
        color: #333;
        margin-bottom: 5px;
        display: inline-block;
    }
    .label::before {
        content: "";
        height: 5px;
        position: absolute;
        left: 0;
        top: 10px;
        width: 41px;
        z-index: -1;
        background-color: #fff;
    }

    .text-input:focus {
        border: 1px solid #1952E1;
    }

    .text-input:focus-visible {
        outline: none;
    }
    .text-input + .label {
        display: none;
    }
    .text-input:focus + .label, .filled {
        display: block;
        top: -10px;
        color: #63666E;
    }

    .text-input::placeholder {
        opacity: 1;
        transition: all .3s;
    }

    .text-input:focus::placeholder {
        opacity: 0;
        animation-delay: 0.2s;
    }
    .text-input:focus ~ .search-icon {
        display: none;
    }
</style>
  