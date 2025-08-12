<script setup lang="ts">
import AppFooter from './AppFooter.vue'
import AppHeader from './AppHeader.vue'
import AppNavigation from './AppNavigation.vue'
</script>

<template>
  <AppHeader />
  <!-- <AppNavigation /> -->
  <AppFooter />
</template>

<style lang="scss">
@use '@/assets/styles/base.scss' as *;
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
}
</style>
