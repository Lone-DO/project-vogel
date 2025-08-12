<template lang="html">
  <header id="header">
    <span id="header__title" title="Birds in the Wild">Vögel</span>
    <i id="header__subtitle"> in unseren Wäldern</i>
  </header>
</template>

<style lang="scss" scoped>
#header {
  gap: 0.5rem;
  display: flex;
  height: fit-content;
  justify-content: center;

  width: 100%;
  color: #ddd;
  padding: 0.5rem 1rem;
  background-color: #e0371c;
  font-family: 'Lucida Handwritten';

  &__title {
    font-weight: 800;
  }
  &__subtitle {
    font-weight: 400;
  }
}
</style>
