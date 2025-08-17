<template lang="html">
  <section>
    <img src="/images/front.webp" alt="" />
  </section>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
$maxHeight: calc(100vh - ($headerHeight + $footerHeight + $navigationHeight + $gapSmall));
section {
  width: 100%;
  @include Flex($justify: center, $align: center);
}

section,
img {
  & {
    max-height: $maxHeight;
  }
}
</style>
