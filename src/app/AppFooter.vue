<template lang="html">
  <footer>
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/small -->
    <i>© 2024 COPPENRATH Verlag GmbH & Co. KG</i>
    <p>
      <span>Based on the following </span>
      <a href="https://www.thalia.de/shop/home/artikeldetails/A1071524369">physical Book</a>
    </p>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  @include SecondaryTheme;
  @include Flex($direction: column, $align: center);
  width: 100%;
  margin-top: auto;
  padding: $gapSmall $gap $gap;
  @include Laptop {
    width: unset;
    border-radius: 12px 12px 0 0;
  }

  i {
    flex: 100%;
  }
}
</style>
