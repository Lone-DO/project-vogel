<script lang="ts" setup>
import { vogelData } from '@/assets/data/vogel'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const vogelId = computed(() => Number(route.params.id) || null)

const isActive = (id: number) => id === vogelId.value || null
</script>

<template lang="html">
  <nav>
    <ul>
      <li data-type="controller">
        <img src="/images/speaker.webp" alt="speaker image" />
      </li>
      <li
        v-for="vogel in vogelData"
        :key="vogel.id"
        data-type="option"
        :data-active="isActive(vogel.id)"
        :disabled="!vogel.data.length || null"
        :title="!vogel.data.length ? 'Disabled: Please checkout book for full experience' : ''"
      >
        <router-link :to="`/page/${vogel.id}`">
          <img :src="`/images/${vogel.id}/profile.webp`" :alt="vogel.name + 'profile icon'" />
        </router-link>
      </li>
      <li data-type="controller">
        <!-- TODO: Create Toggle to enable sound onClick events -->
        <img src="/images/speaker.webp" alt="speaker image" />
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  top: -1px;
  z-index: 2;
  width: 100%;
  overflow: auto;
  position: sticky;

  padding: $gapSmall;
  background-color: $green;
  min-height: $navigationHeight;
  @include Flex($align: center);
  @include Desktop {
    flex-basis: calc(($iconSize + $gapSmall) * 3);
    ul {
      flex-wrap: wrap;
      justify-content: space-between;
      li[data-type='controller'] {
        flex: 100%;
      }
    }
  }
}

ul {
  @include Flex($justify: center);
  width: 100%;
  min-height: 70px;
  border-radius: 4px;
  min-width: fit-content;
  padding: $gapSmall;
  border: 1px solid rgba($color: black, $alpha: 0.5);

  @include BoxShadow(inset 0px 0px 4px 1px rgba($color: black, $alpha: 0.5));
}

li {
  &[disabled] {
    cursor: not-allowed;
    a {
      pointer-events: none;
    }
    img {
      filter: grayscale(1);
    }
  }
  &[data-type='option']:not([disabled]) :hover {
    transform: scale(1.1);
  }
  &[data-type='controller'] {
    z-index: 1;
    @include Flex($justify: center);
    &:first-child {
      margin-right: auto;
    }
    &:last-child {
      margin-left: auto;
    }
  }
}

img {
  width: $iconSize;
  height: $iconSize;
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
