<script setup lang='ts'>

const model = defineModel<boolean>()
const $emit = defineEmits(['update:value'])
function update(event: unknown) {
  $emit('update:value', event)
}
</script>

<template>
  <label class='toggle-switch' :data-checked='model || null'>
    <span>ON</span>
    <div class='toggle-switch__controller'>
      <input name='volume-toggle' v-model='model' type="checkbox" @input='update' />
      <i class='toggle-switch__icon'></i>
    </div>
    <span>OFF</span>
  </label>
</template>

<style lang='scss' scoped>
.toggle-switch {
  min-width: 1rem;
  max-width: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  input {
    top: 2px;
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: none;
  }

  &__controller {
    flex: 1;
    display: flex;
    position: relative;
    justify-content: center;


    width: 100%;
    padding: 2px;
    min-height: 2rem;
    border-radius: 1rem;
    background-color: $green;
    @include BoxShadow(inset 0px 0px 4px 0px rgba($color: black, $alpha: 0.75));
  }

  &__icon {
    width: 12px;
    height: 12px;
    border-radius: 100%;
    @include BoxShadow(inset 0px 0px 4px 0px rgba($color: black, $alpha: 0.75));
    transition: all 100ms ease-in-out
  }

  &[data-checked] &__icon {
    transform: translateY(0%);
  }

  &:not([data-checked]) &__icon {
    transform: translateY(100%);
  }
}
</style>