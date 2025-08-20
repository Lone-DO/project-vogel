<script lang="ts" setup>
import AppNavigation from '@/app/AppNavigation.vue'
</script>

<template lang="html">
  <section>
    <img src="@/assets/images/front.webp" alt="Front cover of book" />
    <AppNavigation mode="book" />
  </section>
</template>

<style lang="scss" scoped>
section {
  @include Flex($justify: center, $gap: unset);
  width: 100%;
  overflow: auto;
  flex-direction: column-reverse;
  @include Tablet {
    flex-direction: row;
  }
}

img {
  max-height: $maxContentHeight;
  @include MaxHeight(550px);
  @include Tablet {
    @include MaxWidth(calc(100vw - $navigationWidth));
  }
}
</style>
