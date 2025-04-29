import {formatEvent, formatParticipants, formatParticipation} from '~/features/events/utils'
import {
  createParticipation,
  fetchEvent,
  fetchParticipants,
  fetchParticipationStatuses,
  fetchUserParticipation, updateParticipation
} from "~/features/events/api";
import type {
  FormattedEvent,
  FormattedParticipation,
  Participation,
  UpdateParticipationPayload
} from "~/features/events/types";
import {useAsyncData, computed} from '#imports';
import type {FormResolverOptions, FormSubmitEvent} from "@primevue/forms";
import {useToast} from "primevue/usetoast";

export function useEventSingle() {
  const toast = useToast();
  const route = useRoute()
  const eventId = computed(() => route.params.id as string)
  const userId = computed(() => user.value?.id);
  const sb = useSupabaseClient();
  const user = useSupabaseUser();

  const {
    data,
    error,
    status,
    refresh
  } = useAsyncData<{event: null | FormattedEvent, participants: FormattedParticipation[], userParticipation: null | FormattedParticipation }>(
    `event:${eventId.value}`,
    async () => {
      const eventRaw = await fetchEvent(sb, eventId.value);

      if (!eventRaw) {
        return { event: null, participants: [], userParticipation: null };
      }

      let participantsRaw: Participation[] = [];
      let userParticipationRaw = null;

      if (!eventRaw.closed) {
        [participantsRaw, userParticipationRaw] = await Promise.all([
          fetchParticipants(sb, eventId.value),
          userId.value ? fetchUserParticipation(sb, eventId.value, userId.value) : null
        ]);
      }

      return {
        event: formatEvent(sb, eventRaw),
        participants: participantsRaw.length ? formatParticipants(participantsRaw) : [],
        userParticipation: userParticipationRaw ? formatParticipation(userParticipationRaw) : null,
      };
    },
    {
      server: true,
      watch: [eventId, userId]
    }
  )

  const { data: participationStatusesRaw } = useAsyncData('participation-statuses', async () => {
    return await fetchParticipationStatuses(sb)
  });

  const event = computed(() => data.value?.event ?? null);
  const participationList = computed(() => data.value?.participants ?? []);
  const userParticipation = computed(() => data.value?.userParticipation ?? null);
  const participationStatuses = computed(() => participationStatusesRaw.value ?? []);

  const isVisibleDialog = ref(false);

  const participationAction = computed(() => ({
    isVisible: !!user.value && event.value?.closed === false && status.value === 'success',
    type: !!userParticipation.value ? 'secondary' : 'success',
    label: !!userParticipation.value ? 'Обновить информацию' : 'Принять участие',
    handler: () => isVisibleDialog.value = true
  }))

  const isSubmitting = ref(false);

  const classesList = ["Боевой маг", "Лук", "EE", "Биш", "Варк", "СВС", "БД"];

  const initialFormData = computed<UpdateParticipationPayload>(() => ({
    status_id: userParticipation.value?.status.id ?? null,
    comment: userParticipation.value?.comment ?? null,
    classes: userParticipation.value?.classes ?? null,
  }));

  const formResolver = (data: FormResolverOptions) => {
    const errors: Record<string, { type: string, message: string }[]> = { status_id: [] };

    if (!data.values.status_id) {
      errors.status_id.push({ type: 'required', message: 'Статус не может быть пустым!' });
    }

    return {
      values: data.values,
      errors
    };
  };

  const submitParticipation = async (data: FormSubmitEvent<UpdateParticipationPayload>) => {
    if (!user.value || !data.valid) return
    isSubmitting.value = true;

    try {
      if (userParticipation.value) {
        await updateParticipation(sb, userParticipation.value.id, {
          ...data.values
        });
      } else {
        await createParticipation(sb, {
          ...data.values,
          event_id: Number(eventId.value),
          profile_id: user.value.id
        });
      }
      await refresh();
    } catch {
      toast.add({ severity: 'error', summary: 'Упс. Что-то пошло не так.', life: 3000 });
    } finally {
      isSubmitting.value = false;
      isVisibleDialog.value = false;
    }
  };

  return {
    event,
    participationList,
    userParticipation,
    participationAction,
    isVisibleDialog,
    isSubmitting,
    classesList,
    participationStatuses,
    initialFormData,
    formResolver,
    submitParticipation,
    error,
  }
}
