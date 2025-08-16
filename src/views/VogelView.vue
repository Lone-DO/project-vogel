<template lang="html">
  <article v-if="vogel">
    <aside>
      <h2>{{ vogel.name }}</h2>
      <i><b>Grosse:</b> {{ vogel.size }}</i>
      <i><b>Gewicht:</b> {{ vogel.weight }}</i>
    </aside>
    <section>
      <fieldset v-for="(info, index) in vogel.data" :key="index">
        <h3>{{ info.title }}</h3>
        <p>{{ info.description }}</p>
      </fieldset>
    </section>
  </article>
</template>
<script lang="ts" setup>
import { vogelData } from '@/assets/data/vogel'
import type { iVogel } from '@/models'
import { computed, type ComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const $route = useRoute()
const $router = useRouter()
const vogelId = computed(() => $route.params.id)
const vogel: ComputedRef<iVogel> | undefined = computed(() => {
  const item = vogelData[Number(vogelId.value) - 1]
  return item
})

if (!vogel.value) {
  console.info('Vogel 404')
  $router.push('/')
}
</script>
<style lang="scss" scoped>
article {
  width: 100%;
  overflow: auto;
  padding: 0 0.5rem 0.5rem;
  @include Flex($direction: column);
  @include Laptop {
    flex: 1;
    flex-direction: row;
  }
}

aside,
section {
  width: 100%;
  padding: $padding;
  border-radius: 2px;
  border: 1px solid black;
  @include Laptop {
    overflow: auto;
  }
}

aside {
  @include Flex($direction: column);
  flex: 40%;
}

section {
  @include Flex($justify: flex-start, $align: flex-start) {
    flex: 60%;
    flex-wrap: wrap;
    align-content: space-between;
  }
  background-color: $pageGreen;

  fieldset {
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
</style>
