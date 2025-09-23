<script lang="ts" setup>
import { vogelData } from '@/assets/data/vogel'
import VogelController from '@/components/VogelController.vue'
import VogelPlayer from '@/components/VogelPlayer.vue'
import type { iVogel, iVogelParsed } from '@/models'
import { usePlayerStore } from '@/stores/player'
import { computed, onMounted, ref, watch, type PropType } from 'vue'
import { useRoute } from 'vue-router'

const playerStore = usePlayerStore()
const selectedId = ref<number | null>(null)
const route = useRoute()
const vogelId = computed(() => Number(route.params.id) || null)
const props = defineProps({
  mode: { default: 'page', type: String as PropType<'page' | 'book'> },
})

const isActive = (id: number) => id === vogelId.value || null

const parsedVogel = ref<iVogelParsed[]>([])
onMounted(async () => {
  parsedVogel.value = await Promise.all(
    vogelData.map(async (vogel: iVogel) => {
      const file = await import(`@/assets/images/${vogel.id}/profile.webp`)
      return { ...vogel, imgSrc: file.default }
    }),
  )
})

function play(id: number) {
  if (selectedId.value === id) {
    playerStore.play()
  }
  selectedId.value = id
}

watch(vogelId, (id) => playerStore.setSound(id, true))
</script>

<template lang="html">
  <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/menu -->
  <nav :data-mode="props.mode">
    <VogelPlayer />
    <ul>
      <li v-for="vogel in parsedVogel" :key="vogel.id" data-type="option" :data-active="isActive(vogel.id)"
        :disabled="!vogel.data.length || null"
        :title="!vogel.data.length ? 'Disabled: Please checkout book for full experience' : ''" @click='play(vogel.id)'>
        <router-link :to="`/page/${vogel.id}`">
          <img :src="vogel.imgSrc" :alt="vogel.name + 'profile icon'" />
        </router-link>
      </li>
    </ul>
    <VogelController />
  </nav>
</template>

<style lang="scss" scoped>
@mixin ResponsiveNav {
  $width: calc(($iconSize + $gapSmall) * 2.75);
  max-width: $width;
  min-width: $width;
  flex-direction: column;

  ul {
    flex-wrap: wrap;
  }

  &:deep() #vogel-player img {
    width: calc($iconSize * 1.5);
    height: calc($iconSize * 1.5);
  }
}

nav {
  top: -1px;
  z-index: 2;
  width: 100%;
  overflow: auto;
  position: sticky;
  padding: $gapSmall;
  background-color: $green;

  min-height: $navigationHeight;

  @include Flex($direction: row, $align: center);

  &[data-mode='book'] {
    @include Tablet {
      @include ResponsiveNav;
      flex-wrap: wrap;
    }
  }

  &[data-mode='page'] {
    @include Desktop {
      @include ResponsiveNav;
    }
  }

  &:deep img {
    width: $iconSize;
    height: $iconSize;
    border-radius: 100%;
    border: 1px solid rgba($color: $green, $alpha: 0.5);
    @include BoxShadow((inset 0 0px 1px 1px rgba($color: $green, $alpha: 0.75), 0 0px 2px 1px rgba($color: black, $alpha: 0.5)));
  }
}

ul {
  @include Flex($justify: center);
  width: 100%;
  min-height: 70px;
  border-radius: 4px;
  padding: $gapSmall;
  min-width: fit-content;
  align-items: flex-start;
  align-content: flex-start;
  border: 1px solid rgba($color: black, $alpha: 0.5);
  @include BoxShadow(inset 0px 0px 4px 1px rgba($color: black, $alpha: 0.5));
}

li {
  @include Flex($justify: center);

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
}
</style>
