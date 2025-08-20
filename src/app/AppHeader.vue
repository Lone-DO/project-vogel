<template lang="html">
  <header id="header">
    <img id="header__tree-icon" src="@/assets/images/raw/tree.svg" alt="tree icon" />
    <p>
      <span id="header__title" title="Birds in the Wild">Vögel</span>
      <i id="header__subtitle"> in unseren Wäldern</i>
      <!-- TODO: Update Header based on selected series -->
    </p>
    <RouterLink to="/" title="navigate to home page">
      <img id="header__house-icon" src="@/assets/images/raw/building.svg" alt="building icon" />
    </RouterLink>
  </header>
</template>

<style lang="scss" scoped>
#header {
  @include SecondaryTheme;
  @include Flex($justify: space-between, $align: center);
  width: 100%;
  height: 50px;
  margin-bottom: auto;
  position: relative;
  font-family: 'Lucida Handwritten';

  a {
    color: inherit;
    text-decoration: none;
  }
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
