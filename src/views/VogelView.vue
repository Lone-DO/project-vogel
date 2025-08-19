<script lang="ts" setup>
import AppNavigation from '@/app/AppNavigation.vue'
import { vogelData } from '@/assets/data/vogel'
import type { iVogel } from '@/models'
import { computed, onMounted, watch, type ComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const $route = useRoute()
const $router = useRouter()
const vogelId = computed(() => $route.params.id)
const vogel: ComputedRef<iVogel> | undefined = computed(() => {
  /** TODO: Create Vogel Store, and Mock fetch VogelData from Promise, with an `action` for getting Vogel by id */
  const item = vogelData[Number(vogelId.value) - 1]
  return item
})

const hasData = computed(() => Boolean(vogel.value.data.length))

function init() {
  if (!vogel?.value) {
    console.info('Vogel 404')
    $router.push('/')
  } else if (!hasData.value) {
    console.info('Vogel Disabled')
    $router.push('/')
  }
}

onMounted(init)
watch(vogel, init)
</script>

<template lang="html">
  <section v-if="vogel" id="vogel-view">
    <AppNavigation />
    <article>
      <aside>
        <img :src="`/images/${vogel.id}/page-links.webp`" alt="" />
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
  @include MaxHeight(calc(100vh - ($heightOffset)));
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
    flex: 50%;
  }

  section {
    @include Flex($justify: flex-start, $align: flex-start) {
      flex: 50%;
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
