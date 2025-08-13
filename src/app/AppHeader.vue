<template lang="html">
  <header id="header">
    <img id="header__tree-icon" src="/images/tree.svg" alt="tree icon" />
    <p>
      <span id="header__title" title="Birds in the Wild">Vögel</span>
      <i id="header__subtitle"> in unseren Wäldern</i>
    </p>
    <img id="header__house-icon" src="/images/building.svg" alt="building icon" />
  </header>
</template>

<style lang="scss" scoped>
#header {
  @include SecondaryTheme;
  @include Flex($justify: space-between, $align: center);
  width: 100%;
  height: 50px;
  position: relative;
  font-family: 'Lucida Handwritten';

  img {
    width: 2rem;
  }
  &__house-icon {
    margin-right: 1rem;
  }

  &__title {
    font-weight: 800;
  }
  &__subtitle {
    font-weight: 400;
  }
}
</style>
