<script lang="ts" setup>
import AppNavigation from '@/app/AppNavigation.vue'
import { vogelData } from '@/assets/data/vogel'
import VogelField from '@/components/VogelField.vue'
import type { iVogel } from '@/models'
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch, type ComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const $route = useRoute()
const $router = useRouter()
const vogelId = computed(() => $route.params.id)
const vogel: ComputedRef<iVogel> | undefined = computed(() => {
  /** TODO: Create Vogel Store, and Mock fetch VogelData from Promise, with an `action` for getting Vogel by id */
  const item = vogelData[Number(vogelId.value) - 1]
  return item
})

const primaryImgSrc = ref('')

const hasData = computed(() => Boolean(vogel.value.data.length))
const dataLeft = computed(() => vogel.value?.data?.slice(0, 3))
const dataRight = computed(() => vogel.value?.data?.slice(3))
const injectedStyles = computed(() => ({ '--theme-color': vogel.value.themeColor, '--theme': vogel.value.theme }))
async function init() {
  if (!vogel?.value) {
    console.info('Vogel 404')
    return $router.push('/')
  }
  if (!hasData.value) {
    console.info('Vogel Disabled')
    return $router.push('/')
  }
  const file = await import(`@/assets/images/${vogel.value.id}/page-links.webp`)
  primaryImgSrc.value = file.default
  return syncWidth()
}

const leftContainer = useTemplateRef('left')
const rightContainer = useTemplateRef('right')
const maxWidthLeft = ref('100px')
const maxWidthRight = ref('100px')
async function syncWidth() {
  maxWidthLeft.value = `${leftContainer.value?.clientWidth || 100}px`
  maxWidthRight.value = `${rightContainer.value?.clientWidth || 100}px`
}

onMounted(() => {
  init()
  addEventListener('resize', syncWidth)
})
watch(vogel, init)
onUnmounted(() => removeEventListener('resize', syncWidth))
</script>

<template lang="html">
  <section v-if="vogel" id="vogel-view" :style='injectedStyles'>
    <AppNavigation />
    <article>
      <aside id='vogel-view__left'>
        <suspense>
          <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/figcaption -->
          <img :src="primaryImgSrc" alt="vogel left page image" />
          <template #fallback>Loading...</template>
        </suspense>
        <div v-show="false">
          <h2>{{ vogel.name }}</h2>
          <i><b>Größe:</b> {{ vogel.size }}</i>
          <i><b>Gewicht:</b> {{ vogel.weight }}</i>
        </div>
      </aside>
      <section id='vogel-view__right'>
        <div>
          <div id='vogel-view__column-left' ref='left'>
            <VogelField v-for="(info, index) in dataLeft" :key="index" :info :vogel
              :styles='{ maxImgSize: maxWidthLeft }' />
          </div>
          <div id='vogel-view__column-right' ref='right'>
            <VogelField v-for="(info, index) in dataRight" :key="index" :info :vogel
              :styles='{ maxImgSize: maxWidthRight }' />
          </div>
        </div>
      </section>
    </article>
  </section>
</template>

<style lang="scss" scoped>
#vogel-view {
  width: 100%;
  overflow: auto;
  /** Responsive height for auto filling */
  @include MaxHeight(calc(100svh - ($heightOffset)));

  @include Desktop {
    @include Flex($direction: row-reverse, $justify: center, $gap: unset);
  }
}

article {
  @include Flex($direction: column, $justify: center, $gap: unset);
  overflow: auto;

  @include Laptop {
    flex-direction: row;

    #vogel-view__left,
    #vogel-view__right {
      overflow: auto;
      position: relative;
      border: 1px solid black;
    }

    #vogel-view__left {
      padding: $gap;
    }

    #vogel-view__column-left,
    #vogel-view__column-right {
      flex: 1;
      min-width: 180px;
    }
  }

  @include LaptopOnly {
    flex: 1;
  }

  #vogel-view__left,
  #vogel-view__right {
    width: 100%;
    border-radius: 2px;


    @include Desktop {
      max-height: 600px;
    }
  }

  #vogel-view__left {
    @include Flex($direction: column, $justify: center, $align: center);

    background-color: #FFF;
    flex: 40%;

    img {
      height: unset;
      max-width: 780px;
      max-height: 980px;
    }

    @include Tablet {
      border-right: 0;
    }

    @include Desktop {
      max-width: 416px;
    }
  }

  #vogel-view__right {

    &,
    &>div {
      padding: $gap;

      @include Desktop {
        max-width: calc(500px + 2rem);
      }
    }


    &>div {
      width: 100%;
      padding: 2rem $gap;
      background-color: var(--theme);

      @include Flex($justify: flex-start, $align: flex-start) {
        flex: 60%;
        flex-wrap: wrap;
        align-content: space-between;
      }

      @include Desktop {
        gap: $gap;
      }
    }
  }

  #vogel-view__column-left,
  #vogel-view__column-right {
    @include Flex($direction: column, $justify: flex-start, $align: flex-start);

    @include TabletOnly {
      gap: $gapSmall;
    }

  }

  strong {
    text-transform: uppercase;
  }
}
</style>
