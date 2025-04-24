<template>
  <div class="app">
    <Toast />
    <Header/>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
useHead({
  htmlAttrs: {
    class: 'darkmode'
  }
})

import Header from "~/features/header/Header.vue";
</script>

<style scoped>

</style>

