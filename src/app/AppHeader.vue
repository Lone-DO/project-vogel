<template lang="html">
  <header id="header">
    <span id="header__title" title="Birds in the Wild">Vögel</span>
    <i id="header__subtitle"> in unseren Wäldern</i>
  </header>
</template>

<style lang="scss" scoped>
#header {
  @include Flex('center');
  @include SecondaryTheme;

  width: 100%;
  height: fit-content;
  font-family: 'Lucida Handwritten';

  padding: $padding;

  &__title {
    font-weight: 800;
  }
  &__subtitle {
    font-weight: 400;
  }
}
</style>
