<script setup lang="ts">

</script>

<template>
  <div class="view-grid">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .view-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
    gap: 20px; /* optional spacing between items */
  }
</style>