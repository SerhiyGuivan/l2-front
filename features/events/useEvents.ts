import {useAsyncData} from '#imports';

import type {FormattedEvent} from '~/features/events/types';
import {fetchEvents} from "~/features/events/api";
import {formatEvents} from "~/features/events/utils";

export const useEvents = () => {
  const sb = useSupabaseClient();

  const {
    data: eventList,
    status,
    error
  } = useAsyncData<FormattedEvent[]>('events', async () => {
    const eventsRaw = await fetchEvents(sb);
    return formatEvents(sb, eventsRaw);
  });

  return {
    eventList,
    status,
    error,
  };
};
