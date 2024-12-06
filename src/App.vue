<template>
    <div id="container" class="app-container">
      <AppHeader />
      <NavigationTabs />
      <router-view />
    </div>
</template>
  
<script lang="ts">
import AppHeader from './components/AppHeader.vue'
import NavigationTabs from './components/NavigationTabs.vue'
  
export default {
    name: 'App',
    components: {
        AppHeader,
        NavigationTabs,
    },
}
</script>
  
<style>
    .app-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
</style>