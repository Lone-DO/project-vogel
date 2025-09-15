<script lang="ts" setup>
import AppNavigation from '@/app/AppNavigation.vue'
import { vogelData } from '@/assets/data/vogel'
import type { iVogel } from '@/models'
import { computed, onMounted, reactive, ref, watch, type ComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const $route = useRoute()
const $router = useRouter()
const vogelId = computed(() => $route.params.id)
const vogel: ComputedRef<iVogel> | undefined = computed(() => {
  /** TODO: Create Vogel Store, and Mock fetch VogelData from Promise, with an `action` for getting Vogel by id */
  const item = vogelData[Number(vogelId.value) - 1]
  return item
})

const altImgSrc = ref('')
const primaryImgSrc = ref('')
const icons = reactive<{ [key: string]: string }>({})
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
  const altFile = await import(`@/assets/images/${vogel.value.id}/page-alt.webp`)
  altImgSrc.value = altFile.default

  vogel.value.data.forEach(async (field) => {
    if (field.icon) {
      const file = await import(`@/assets/images/${vogel.value.id}/${field.icon}.webp`)
      icons[field.icon] = file.default
    }
  })
  return
}

onMounted(init)
watch(vogel, init)
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
        <div id='vogel-view__column-left'>
          <fieldset v-for="(info, index) in dataLeft" :key="index">
            <template v-if='info.image'>
              <img :src="altImgSrc" :alt="info.image" data-type='alt'>
              <p data-type='image-description'>{{ info.image_description }}</p>
            </template>
            <template v-else>
              <h3>{{ info.title }}</h3>
              <p>{{ info.description }}</p>
              <img v-if='info.icon' :src="icons[info.icon]" :alt="info.icon" data-type='icon'>
            </template>
          </fieldset>
        </div>
        <div id='vogel-view__column-right'>
          <fieldset v-for="(info, index) in dataRight" :key="index">
            <template v-if='info.image'>
              <img :src="altImgSrc" :alt="info.image" data-type='alt'>
              <p data-type='image-description'>{{ info.image_description }}</p>
            </template>
            <template v-else>
              <h3>{{ info.title }}</h3>
              <p>{{ info.description }}</p>
              <img v-if='info.icon' :src="icons[info.icon]" :alt="info.icon" data-type='icon'>
            </template>
          </fieldset>
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
      border: 1px solid black;
      overflow: auto;
    }

    #vogel-view__left {
      padding: $gap;
    }

    #vogel-view__column-left,
    #vogel-view__column-right {
      flex: 1;
      min-width: 190px;
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
      max-height: 550px;
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
    @include Flex($justify: flex-start, $align: flex-start) {
      flex: 60%;
      flex-wrap: wrap;
      align-content: space-between;
    }

    padding: $gapSmall $gap;
    background-color: var(--theme);

    @include Desktop {
      gap: 1rem;
      max-width: 450px;
    }
  }

  #vogel-view__column-left,
  #vogel-view__column-right {
    @include Flex($direction: column, $justify: flex-start, $align: flex-start);

    @include TabletOnly {
      gap: $gapSmall;
    }

  }

  fieldset {
    @include Flex($gap: unset);
    padding: 0;
    flex-wrap: wrap;

    @include Laptop {
      flex-direction: column;

      img[data-type="icon"] {
        margin-right: $gap;
      }
    }

    h3 {
      flex: 100%;
      font-size: 1rem;
      color: var(--theme-color);
      text-transform: uppercase;
    }

    img {
      &[data-type="icon"] {
        flex: 1;
        margin-left: auto;
        max-width: 50px;
      }
    }

    p {
      flex: 80%;
    }

    p[data-type="image-description"] {
      font-size: 0.75rem;
      color: var(--theme-color);
      white-space: nowrap;
    }
  }

  strong {
    text-transform: uppercase;
  }
}
</style>
