
<template>
    <nav class="navigation">
        <router-link
            to="/"
            class="nav-tab"
            active-class="active"
            exact
        >
            Bus Lines
        </router-link>
        <router-link
            to="/stops"
            class="nav-tab"
            active-class="active"
            exact
        >
            Stops
        </router-link>
    </nav>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'NavigationTabs',
})
</script>
  
<style scoped>
    .navigation {
        margin-bottom: 16px;
        padding: 19.5px;
        background-color: #fff;
    }
    .nav-tab {
        padding: 21px 25px;
        text-align: center;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        text-decoration: none;
        cursor: pointer;
        color: #9A9DA4;
    }
    .nav-tab.active {
        color: #33373C;
        border-bottom: 2px solid #1952E1;
    }
    .nav-tab:not(.active):hover {
        color: #9A9DA4;
    }
</style>
  