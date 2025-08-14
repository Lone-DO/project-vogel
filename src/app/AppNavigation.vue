<template lang="html">
  <nav>
    <ul>
      <li v-for="vogel in vogels" :key="vogel.id">
        <router-link :to="`/page/${vogel.id}`">
          <img :src="`/images/icons/${vogel.id}.svg`" alt="" />
        </router-link>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts" setup>
import { vogels } from '@/assets/data/vogel'
</script>
<style lang="scss" scoped>
nav {
  top: -1px;
  z-index: 2;
  width: 100%;
  overflow: auto;
  position: sticky;

  padding: $paddingSmall;
  background-color: $green;
  min-height: $navigationHeight;
  @include Desktop {
    flex-basis: calc(($iconWidth + $paddingSmall) * 2.5);
  }
}

ul {
  @include Flex($justify: center);
  border-radius: 4px;
  min-width: fit-content;
  border: 1px solid rgba($color: black, $alpha: 0.5);

  padding: $paddingSmall;
  @include BoxShadow(inset 0px 0px 4px 1px rgba($color: black, $alpha: 0.5));
  @include Laptop {
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
img {
  width: 3rem;
  border-radius: 100%;
  border: 1px solid rgba($color: $green, $alpha: 0.5);

  @include BoxShadow(
    (
      inset 0 0px 1px 1px rgba($color: $green, $alpha: 0.75),
      0 0px 2px 1px rgba($color: black, $alpha: 0.5)
    )
  );
}
</style>
