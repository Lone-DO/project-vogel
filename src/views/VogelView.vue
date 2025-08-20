<script lang="ts" setup>
import AppNavigation from '@/app/AppNavigation.vue'
import { vogelData } from '@/assets/data/vogel'
import type { iVogel } from '@/models'
import { computed, onMounted, ref, watch, type ComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const $route = useRoute()
const $router = useRouter()
const vogelId = computed(() => $route.params.id)
const vogel: ComputedRef<iVogel> | undefined = computed(() => {
  /** TODO: Create Vogel Store, and Mock fetch VogelData from Promise, with an `action` for getting Vogel by id */
  const item = vogelData[Number(vogelId.value) - 1]
  return item
})

const imgSrc = ref('')
const hasData = computed(() => Boolean(vogel.value.data.length))
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
  imgSrc.value = file.default
  return
}

onMounted(init)
watch(vogel, init)
</script>

<template lang="html">
  <section v-if="vogel" id="vogel-view">
    <AppNavigation />
    <article>
      <aside>
        <suspense>
          <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/figcaption -->
          <img :src="imgSrc" alt="vogel left page image" />
          <template #fallback>Loading...</template>
        </suspense>
        <div v-show="false">
          <h2>{{ vogel.name }}</h2>
          <i><b>Größe:</b> {{ vogel.size }}</i>
          <i><b>Gewicht:</b> {{ vogel.weight }}</i>
        </div>
      </aside>
      <section>
        <fieldset v-for="(info, index) in vogel.data" :key="index">
          <h3>{{ info.title }}</h3>
          <p>{{ info.description }}</p>
        </fieldset>
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
    display: flex;
    flex-direction: row-reverse;
  }
}

article {
  @include Flex($direction: column, $gap: unset);
  width: 100%;
  overflow: auto;
  @include Laptop {
    flex: 1;
    flex-direction: row;
  }
  aside,
  section {
    width: 100%;
    border-radius: 2px;

    @include Laptop {
      overflow: auto;
    }
  }

  aside {
    @include Flex($direction: column);
    flex: 40%;
    img {
      max-width: 780px;
      max-height: 980px;
    }
  }

  section {
    @include Flex($justify: flex-start, $align: flex-start) {
      flex: 60%;
      flex-wrap: wrap;
      align-content: space-between;
    }
    border: 1px solid black;
    padding: $gapSmall $gap;
    background-color: $pageGreen;

    fieldset {
      padding: 0;
      @include Laptop {
        min-width: 200px;
        max-width: 250px;
        flex: 1;
      }
    }
  }

  strong {
    text-transform: uppercase;
  }
}
</style>
