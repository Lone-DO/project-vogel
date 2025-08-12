<template lang="html">
  <footer>
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
  @include Flex('center') {
    flex-direction: column;
  }

  width: 100%;
  margin-top: auto;
  padding: $padding 1rem;
  @include Tablet {
    width: unset;
    border-radius: 12px 12px 0 0;
  }

  i {
    flex: 100%;
  }
}
</style>
