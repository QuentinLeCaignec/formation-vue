<template>
  <h1>{{}}</h1>
  <header>
    <router-view name="header">
      <span>HEADER</span>
    </router-view>
  </header>
  <main>
    <router-view name="main"></router-view>
  </main>
  <router-view name="sidebar">
    <span>SIDEBAR</span>
  </router-view>
</template>

<style lang="scss">
.App {
  &__Title {
    font-size: 18px;
    text-align: center;
    margin: 0;
  }
}
</style>
