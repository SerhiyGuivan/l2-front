<template>
  <span class="view-tag" :class="classList"><slot/></span>
</template>

<script setup lang="ts">
interface Props {
  type?: 'danger',
  size? : 'large'
}
const props = defineProps<Props>()

const classList = computed(() => {
  const list = []
  if (props.type === 'danger') {
    list.push('view-tag__danger');
  }
  if (props.size === 'large') {
    list.push('view-tag__large');
  }
  return list;
})

</script>

<style scoped lang="scss">
.view-tag {
  font-weight: 500;
  font-size: 16px;
  padding: 4px 8px;
  background-color: var(--p-custom-primary-background);
  color: var(--p-custom-primary-color);
  border-radius: 6px;
  &__danger {
    color: var(--p-custom-danger-color);
    background: var(--p-custom-danger-background);
  }
  &__large {
    padding: 8px 15px;
    border-radius: 12px;
  }
}
</style>