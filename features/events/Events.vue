<template>
  <div class="events">
    <div class="events__container">
      <h1 class="events__heading">Ивенты</h1>
      <ViewGrid v-if="eventList.length">
        <ViewGridItem
          v-for="event in eventList"
          :key="event.documentId"
          v-bind="event"
          @click="() => onClick(event.documentId)"
        />
      </ViewGrid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAsyncData, useRouter, useStrapi } from '#imports';

import ViewGrid from '~/shared/ViewGrid.vue';
import ViewGridItem from '~/shared/ViewGridItem.vue';
import type { EventData, FormattedEvent } from '~/features/events/types';
import {formatDate, getFormattedEvent} from "~/features/events/utils";

const { find } = useStrapi();
const router = useRouter();

const { public: { strapiURL }} = useRuntimeConfig();

// Fetch event data
const { data: eventsRaw } = await useAsyncData('events', () => find<EventData>('events'), {server: false});

// Format it for the grid
const eventList = computed<FormattedEvent[]>(() => {
  const raw = eventsRaw.value;

  // Return an empty array if raw or raw.data is not available
  if (!raw || !raw.data) return [];

  // Map through the data to structure it as FormattedEvent[]
  return raw.data.map((event: EventData) => {
    return getFormattedEvent(event, strapiURL);
  });
});

// Handle click
const onClick = (documentId: string): void => {
  router.push(`/events/${documentId}`);
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
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 30px;
  }
}
</style>