<template>
  <section class="events-single-content">
    <MDC :value="value" />
  </section>
</template>

<script setup lang="ts">
  interface Props {
    value: string
  }
  defineProps<Props>()
</script>

<style lang="scss" scoped>
  .events-single-content {
    white-space: pre-wrap;
    font-weight: 400;
    font-size: 16px;
    ::v-deep(h2) {
      @include heading-2;
      margin-bottom: 30px;
      color: var(--p-primary-color);
    }
    ::v-deep(h3) {
      @include heading-3;
      margin-bottom: 30px;
    }
    ::v-deep(p) {
      margin-bottom: 15px;
    }
  }
</style>