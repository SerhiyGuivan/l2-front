<template>
  <div class="events-single-header">
    <img
      v-if="title"
      class="events-single-header__img"
      :src="img"
      :alt="title"/>
    <div class="events-single-header__container">
      <h1 class="events-single-header__title">
        <Button
          class="events-single-header__return-btn"
          :size="'large'"
          icon="pi pi-arrow-left"
          severity="contrast"
          variant="text"
          rounded
          @click="$emit('return')"/>
        {{ title }}
      </h1>
      <div v-if="tags" class="events-single-header__tags">
        <ViewTag
          v-for="(tag, key) in tags"
          :type="tag.type"
          :size="'large'"
          :key="key">{{ tag.label }}</ViewTag>
      </div>
      <div class="events-single-header__date">{{ date }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {FormattedTag} from "~/features/events/types";
import ViewTag from "~/components/ViewTag.vue";

interface Props {
  title?: string,
  img?: string
  tags?: FormattedTag[],
  date?: string
}

defineProps<Props>();

defineEmits<{
  (e: 'return'): void;
}>()

</script>

<style scoped lang="scss">
.events-single-header {
  position: relative;
  min-height: 240px;
  display: flex;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 15px;
  &__img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
    object-position: top;
    filter: brightness(0.5);
    border-radius: 0 0 40px 40px;
  }
  &__container {
    max-width: 1320px;
    flex: 1 1 auto;
    width: 100%;
    margin: 0 auto;
    padding: 15px;
  }
  &__title {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 30px;
    transform: translateZ(0);
    display: flex;
    gap: 20px;
    align-items: center;
  }
  &__return-btn {
    flex: 0 0 auto;
  }
  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 20px;
    transform: translateZ(0);
  }
  &__date {
    color: var(--p-text-muted-color);
    font-weight: 400;
    font-size: 18px;
    transform: translateZ(0);
  }
}

</style>