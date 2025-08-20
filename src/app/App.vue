<script setup lang="ts">
import AppFooter from './AppFooter.vue'
import AppHeader from './AppHeader.vue'
</script>

<template>
  <AppHeader />
  <main>
    <RouterView />
  </main>
  <AppFooter />
</template>

<style lang="scss">
@use '@/assets/styles/base.scss' as *;
#app {
  @include Flex($direction: column, $justify: center, $align: center, $gap: unset);

  width: 100svw;
  min-height: 100svh;
  overflow: hidden;
  position: relative;
  font-family: monospace;
  background-color: whitesmoke;

  main {
    @include Flex($direction: column, $justify: flex-start, $align: flex-start, $gap: unset);
    width: 100%;
    overflow: hidden;
    justify-content: center;
    max-height: $maxContentHeight;
  }
}
</style>
