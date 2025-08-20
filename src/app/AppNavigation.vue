<script lang="ts" setup>
import { vogelData } from '@/assets/data/vogel'
import type { iVogel, iVogelParsed } from '@/models'
import { computed, onMounted, ref, type PropType } from 'vue'
import { useRoute } from 'vue-router'

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
</script>

<template lang="html">
  <nav :data-mode="props.mode">
    <ul>
      <li data-type="controller">
        <img src="@/assets/images/speaker.webp" alt="speaker image" />
      </li>
      <li
        v-for="vogel in parsedVogel"
        :key="vogel.id"
        data-type="option"
        :data-active="isActive(vogel.id)"
        :disabled="!vogel.data.length || null"
        :title="!vogel.data.length ? 'Disabled: Please checkout book for full experience' : ''"
      >
        <router-link :to="`/page/${vogel.id}`">
          <img :src="vogel.imgSrc" :alt="vogel.name + 'profile icon'" />
        </router-link>
      </li>
      <li data-type="controller">
        <!-- TODO: Create Toggle to enable sound onClick events -->
        <img src="@/assets/images/speaker.webp" alt="speaker image" />
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@mixin ResponsiveNav {
  $width: calc(($iconSize + $gapSmall) * 2.5);
  max-width: $width;
  min-width: $width;
  ul {
    flex-wrap: wrap;
    justify-content: space-between;
    li[data-type='controller'] {
      flex: 100%;
    }
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

  @include Flex($align: center);
  &[data-mode='book'] {
    li[data-type='controller'] {
      display: none;
    }
    @include Tablet {
      @include ResponsiveNav;
      flex-wrap: wrap;
      li[data-type='controller'] {
        display: flex;
      }
    }
  }
  &[data-mode='page'] {
    @include Desktop {
      @include ResponsiveNav;
    }
    li[data-type='controller'] {
      &:first-child {
        margin-right: auto;
      }
      &:last-child {
        margin-left: auto;
      }
    }
  }
}

ul {
  @include Flex($justify: center);
  width: 100%;
  min-height: 70px;
  padding: $gapSmall;
  border-radius: 4px;
  min-width: fit-content;
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

img {
  width: $iconSize;
  height: $iconSize;
  border-radius: 100%;
  border: 1px solid rgba($color: $green, $alpha: 0.5);

  @include BoxShadow((inset 0 0px 1px 1px rgba($color: $green, $alpha: 0.75), 0 0px 2px 1px rgba($color: black, $alpha: 0.5)));
}
</style>
