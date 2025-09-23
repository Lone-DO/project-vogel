<script setup lang="ts">
import ToggleSwitch from './ToggleSwitch.vue';
import { usePlayerStore } from '@/stores/player';

const playerStore = usePlayerStore()
</script>

<template>
  <div id='vogel-controller'>
    <div id='vogel-controller__description'>
      <p>
        <span>CAUTION:</span>
        <span>BATTERIES TO BE INSTALLED</span>
        <span>BY ADULTS ONLY</span>
        <span>AG13/LR44 DC 1.5VX3=4.5V</span>
      </p>

    </div>
    <ToggleSwitch v-model='playerStore.enabled' />
  </div>
</template>

<style lang='scss' scoped>
#vogel-controller {
  @include Flex($gap: 0, $justify: space-between);

  @include Desktop {
    width: 100%;
    font-size: 0.5rem;
  }

  &__description {
    @include BoxShadow(inset 0px 0px 2px 1px rgba($color: black, $alpha: 0.5));
    display: none;
    padding: 4px;
    border-radius: 4px;

    @include Desktop {
      display: block;
    }

    p {
      display: flex;
      text-align: center;
      align-items: center;
      flex-direction: column;
    }
  }
}
</style>