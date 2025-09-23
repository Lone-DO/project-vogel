<script lang='ts' setup>
import { usePlayerStore } from '@/stores/player';
import { onMounted, useTemplateRef } from 'vue';

const playerStore = usePlayerStore()
const element = useTemplateRef('player')
onMounted(() => {
  playerStore.element = element.value
})
</script>

<template>
  <div id='vogel-player'>
    <img src="@/assets/images/speaker.webp" alt="speaker image" />
    <audio ref='player' :src="playerStore.currentSound || ''" :muted='!playerStore.enabled' />
  </div>
</template>

<style lang='scss'>
#vogel-player {}
</style>