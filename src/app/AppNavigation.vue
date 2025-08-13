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
  width: 100%;
  position: relative;
  padding: $paddingSmall;
  background-color: $green;
  @include Laptop {
    width: calc(($iconWidth + $paddingSmall) * 2.5);
  }
}

ul {
  @include Flex($justify: center);
  padding: $paddingSmall;
  border-radius: 4px;

  border: 1px solid rgba($color: black, $alpha: 0.5);
  $shadow:
    inset -2px 2px 5px 1px #000000,
    inset 2px -2px 5px 1px #000000;
  @include BoxShadow($shadow);
  @include Laptop {
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
img {
  width: 3rem;
  border-radius: 100%;
  border: 1px solid rgba($color: $green, $alpha: 0.5);
  $shadow:
    inset 0 0px 1px 1px
      rgba(
        $color: $green,
        $alpha: 0.75,
      ),
    0 0px 2px 1px
      rgba(
        $color: black,
        $alpha: 0.5,
      );
  @include BoxShadow($shadow);
}
</style>
