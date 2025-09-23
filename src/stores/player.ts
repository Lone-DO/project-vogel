import { defineStore } from 'pinia';
import { effect, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const regex = /(audio\/)(\d+)(.wav)/gm
export const usePlayerStore = defineStore('playerStore', () => {
  /** TODO: 🐛 Audio Assets Loading multiple times */
  const context = import.meta.glob('@/assets/audio/*.wav', { eager: true, import: 'default' })
  /** Loop over Audio Assets and cache them as Key/Value pairs for easy importing/referencing */
  const data = Object.keys(context).reduce((set, filePath) => {
    // const module = context[filePath]
    /** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll */
    const [regexMatch] = [...filePath.matchAll(regex)]
    const fileName = regexMatch[2]
    console.log('data:loop', { [fileName]: filePath })
    return { ...set, [fileName]: filePath }
  }, {})
  const sounds = ref(data)
  /** Book Power State, when truthy, audio will play, else muted */
  const cacheEnabled = localStorage.getItem('powerOn')
  const enabled = ref(cacheEnabled === 'true' ? true : false)
  /** Audio Source */
  const ready = ref(false)
  const element = ref<HTMLAudioElement | null>(null)
  const route = useRoute()
  const currentSound = ref(null)
  const paramId = isNaN(Number(route.params.id)) ? null : Number(route.params.id) || null
  function setSound(id: number | null, mounted?: boolean) {
    currentSound.value = sounds.value[id as keyof object] || null
    if (mounted) {
      ready.value = true
    }
  }
  async function play(skip?: boolean) {
    if (!ready.value) return;
    if (currentSound.value && enabled.value && element.value) {
      /** Play Audio Player Element */
      try {
        await ((!skip) ? element.value.load() : Promise.resolve())
        element.value.play()
      } catch (error) {
        console.warn(error)
      }
    }
  }
  onMounted(() => setSound(paramId))
  /** Sync Cache */
  effect(() => {
    try {
      localStorage.setItem('powerOn', String(enabled.value))
    } catch (warning) {
      console.warn(warning)
    }
  })
  watch(currentSound, () => play())
  return {
    element,
    sounds,
    enabled,
    currentSound,
    play,
    setSound,
  }
})