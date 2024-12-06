import { createStore } from 'vuex'

export default createStore({
  state: {
    busLines: [],
    selectedLine: null,
    busStops: [],
    selectedStop: null
  },
  getters: {
    getBusLines: state => state.busLines,
    getSelectedLine: state => state.selectedLine,
    getBusStops: state => state.busStops,
    getSelectedStop: state => state.selectedStop
  },
  mutations: {
    setBusLines(state, busLines) {
      state.busLines = busLines
    },
    setSelectedLine(state, line) {
      state.selectedLine = line
    },
    setBusStops(state, busStops) {
      state.busStops = busStops
    },
    setSelectedStop(state, stop) {
      state.selectedStop = stop
    }
  },
  actions: {
  },
  modules: {
  }
})
