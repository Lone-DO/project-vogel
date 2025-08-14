<script setup lang="ts">
import AppFooter from './AppFooter.vue'
import AppHeader from './AppHeader.vue'
import AppNavigation from './AppNavigation.vue'
</script>

<template>
  <AppHeader />
  <main>
    <AppNavigation />
    <RouterView />
  </main>
  <AppFooter />
</template>

<style lang="scss">
@use '@/assets/styles/base.scss' as *;
#app {
  @include Flex($direction: column, $justify: center, $align: center) {
    gap: 0;
  }

  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  font-family: monospace;
  background-color: whitesmoke;

  main {
    @include Flex($direction: column, $justify: flex-start, $align: flex-start);
    column-gap: 0;
    @include Desktop {
      flex-direction: row-reverse;
      justify-content: flex-start;
      align-items: center;
    }

    flex: 100%;
    width: 100%;
    overflow: hidden;
    max-height: calc(100vh - ($headerHeight + $footerHeight));
  }
}
</style>
