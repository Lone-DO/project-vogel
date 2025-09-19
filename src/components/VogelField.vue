<script lang='ts' setup>
import type { iVogel, iVogelArticle } from '@/models';
import { computed, onMounted, ref, watch } from 'vue';

const $props = defineProps<{
  vogel: iVogel
  info: iVogelArticle
  styles?: { [key: string]: string }
}>()
const imgSrc = ref('')
const iconSrc = ref('')

async function init() {
  const file = await import(`@/assets/images/${$props.vogel.id}/page-alt.webp`)
  imgSrc.value = file.default
  if ($props.info.icon) {
    let iconFile = { default: '' }
    if ($props.info.image_extension === 'webp') {
      iconFile = await import(`@/assets/images/${$props.vogel.id}/${$props.info.icon}.webp`)
    }
    else if ($props.info.image_extension === 'png') {
      iconFile = await import(`@/assets/images/${$props.vogel.id}/${$props.info.icon}.png`)
    }
    iconSrc.value = iconFile?.default
  }
}

const injectedStyles = computed(() => ({
  '--icon-position': $props.info.styles?.position || 'unset',
  '--icon-position-nested': $props.info.styles?.positionNested ? 'relative' : 'unset',
  '--icon-position-top': $props.info.styles?.top,
  '--icon-position-left': $props.info.styles?.left,
  '--icon-position-right': $props.info.styles?.right,
  '--icon-position-bottom': $props.info.styles?.bottom,
  '--icon-size': $props.info.styles?.size || '50px',
  '--img-width': $props?.styles?.maxImgSize,
  '--margin-offset': $props?.info.styles?.marginOffset,
  '--img-width-offset': $props?.info?.styles?.sizeOffset || '0px'
}))

onMounted(init)
watch(() => $props.vogel, init)
</script>

<template>
  <Suspense>
    <fieldset class='vogel-field' :style='injectedStyles'>
      <template v-if='info.image'>
        <div class='vogel-field__alt'>
          <img :src="imgSrc" :alt="info.image" />
        </div>
        <p data-type='image-description'>{{ info.image_description }}</p>
      </template>
      <template v-else>
        <h3>{{ info.title }}</h3>
        <p>{{ info.description }}</p>
        <div v-if='info.icon' class='vogel-field__icon'>
          <img :src="iconSrc" :alt="info.icon" />
        </div>
      </template>
    </fieldset>
  </Suspense>
</template>

<style lang='scss' scoped>
.vogel-field {
  @include Flex($gap: unset);
  padding: 0;
  flex-wrap: wrap;
  position: var(--icon-position-nested);

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

  &__alt {
    @include Laptop {
      width: calc(var(--img-width) + var(--img-width-offset));
    }
  }

  &__icon {
    flex: 1;
    margin-left: auto;
    margin-right: var(--margin-offset);
    min-width: var(--icon-size);
    max-width: var(--icon-size);

    @include Laptop {
      position: var(--icon-position);
      top: var(--icon-position-top);
      left: var(--icon-position-left);
      right: var(--icon-position-right);
      bottom: var(--icon-position-bottom);
    }
  }

  p {
    flex: 80%;
  }

  p[data-type="image-description"] {
    font-size: 0.75rem;
    color: var(--theme-color);

    @include Laptop {
      width: var(--img-width);
    }
  }
}
</style>