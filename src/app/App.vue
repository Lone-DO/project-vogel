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

  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  font-family: monospace;
  background-color: whitesmoke;

  main {
    @include Flex($direction: column, $justify: flex-start, $align: flex-start, $gap: unset);
    flex: 100%;
    width: 100%;
    overflow: hidden;
    justify-content: center;
    max-height: $maxContentHeight;

    @include Desktop {
      padding: $gapSmall;
    }
  }
}
</style>
