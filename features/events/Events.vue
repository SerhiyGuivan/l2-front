<template>
  <div class="events">
    <div class="events__container">
      <h1 class="events__heading">Ивенты</h1>
      <!-- Loading state -->
      <div v-if="status === 'pending'" class="events__loading">Загрузка событий...</div>

      <!-- Error state -->
      <div v-else-if="status === 'error'" class="events__error">
        Не удалось загрузить события. Попробуйте позже.
      </div>

      <!-- Events grid -->
      <ViewGrid v-else-if="eventList?.length">
        <ViewGridItem
          v-for="event in eventList"
          :key="event.id"
          :title="event.title"
          :date="event.date"
          :img="event.img"
          :tags="event.tags"
          :description="event.description"
          @click="() => handleClick(event.id)"
        />
      </ViewGrid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from '#imports';

import ViewGrid from '~/components/ViewGrid.vue';
import ViewGridItem from '~/components/ViewGridItem.vue';
import {useEvents} from "~/features/events/useEvents";

const router = useRouter();
const { eventList, status } = useEvents();

const handleClick = (id: string) => {
  router.push(`/events/${id}`);
};
</script>

<style scoped lang="scss">
.events {
  &__container {
    padding: 30px 15px;
    max-width: 1440px;
    margin: 0 auto;
  }

  &__heading {
    @include heading-1;
    margin-bottom: 30px;
  }

  &__loading,
  &__error,
  &__empty {
    text-align: center;
    margin-top: 50px;
  }
}
</style>