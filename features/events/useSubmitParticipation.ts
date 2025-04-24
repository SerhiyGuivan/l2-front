import { ref, computed } from 'vue'
import { useRoute } from '#imports'
import type {FormattedEvent, Participation} from '~/features/events/types'
import type {FormSubmitEvent, FormResolverOptions} from "@primevue/forms";

export function useSubmitParticipation(
    event: ComputedRef<FormattedEvent | null>,
    userParticipation: ComputedRef<Participation | null>,
    refresh: () => Promise<void>,
) {
    const { create } = useStrapi();
    const user = useStrapiUser()
    const client = useStrapiClient()

    const route = useRoute()
    const toast = useToast();

    const isVisibleSubmitParticipationDialog = ref(false);

    const classOptions = ["Боевой маг", "Лук", "EE", "Биш", "Варк", "СВС", "БД"];

    const setIsVisibleSubmitParticipationDialog = (value: boolean) => {
        isVisibleSubmitParticipationDialog.value = value;
    }

    const initialSubmitParticipationFormData = computed(() => {
        if (userParticipation.value) {
            return {
                comment: userParticipation.value.comment,
                presence: userParticipation.value.presence?.documentId || '',
                classes: userParticipation.value.classes,
            }
        }
        return  {
            comment: '',
            presence: '',
            classes: ''
        }
    })

    const isVisibleSubmitParticipationActions = computed(() => {
        return user.value && !userParticipation.value && !event.value?.closed
    })

    const isVisibleUpdateParticipationActions = computed(() => {
        return user.value && userParticipation.value && !event.value?.closed;
    })

    const createParticipation = async (payload: any) => {
        await create('participations', payload);
    };

    const updateParticipation = async (id: string, payload: any) => {
        await client(`/participations/me/${id}`, {
            method: 'PUT',
            body: { data: payload }
        });
    };

    const isLoadingSubmitParticipation = ref(false)

    const submitParticipation = async (data: FormSubmitEvent<{
        comment?: string;
        classes?: string;
        presence?: { documentId: string };
    }>) => {
        if (!data.valid) {
            toast.add({ severity: 'error', summary: 'Form is invalid.', life: 3000 });
            return;
        }

        isLoadingSubmitParticipation.value = true;

        const payload = {
            event: route.params.id,
            ...data.values
        };

        try {
            if (userParticipation.value) {
                await updateParticipation(userParticipation.value.documentId, payload);
            } else {
                await createParticipation(payload);
            }
            await refresh();
        } catch {
            toast.add({ severity: 'error', summary: 'Participation submit error.', life: 3000 });
        } finally {
            isLoadingSubmitParticipation.value = false;
            setIsVisibleSubmitParticipationDialog(false);
        }
    };

    const resolver = (data: FormResolverOptions) => {
        const errors: Record<string, { type: string, message: string }[]> = { presence: [] };

        if (!data.values.presence) {
            errors.presence.push({ type: 'required', message: 'Статус не может быть пустым!' });
        }

        return {
            values: data.values,
            errors
        };
    };

    return {
        classOptions,
        initialSubmitParticipationFormData,
        isVisibleSubmitParticipationActions,
        isVisibleUpdateParticipationActions,
        isVisibleSubmitParticipationDialog,
        isLoadingSubmitParticipation,
        setIsVisibleSubmitParticipationDialog,
        resolver,
        submitParticipation,
    }
}
