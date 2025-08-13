<template lang="html">
  <article v-if="vogel">
    <aside>
      <h3>{{ vogel.name }}</h3>
      <span>Grosse: {{ vogel.size }}</span>
      <span>Gewicht: {{ vogel.weight }}</span>
    </aside>
    <section>
      <fieldset v-for="(info, index) in vogel.data" :key="index">
        <strong>{{ info.title }}</strong>
        <p>{{ info.description }}</p>
      </fieldset>
    </section>
  </article>
</template>
<script lang="ts" setup>
import { vogels } from '@/assets/data/vogel'
import type { iVogel } from '@/models'
import { computed, type ComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const $route = useRoute()
const $router = useRouter()
const vogelId = computed(() => $route.params.id)
const vogel: ComputedRef<iVogel> | undefined = computed(() => {
  const item = vogels[Number(vogelId.value) - 1]
  return item
})

if (!vogel.value) {
  console.info('Vogel 404')
  $router.push('/')
}
</script>
<style lang="scss" scoped>
article {
  padding: $padding;
}
</style>
