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
  @include Flex('center') {
    flex-direction: column;
  }

  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  font-family: monospace;
  background-color: whitesmoke;
}
</style>
