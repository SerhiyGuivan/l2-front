import { computed } from 'vue'
import {formatDate, getFormattedSingleEvent} from '~/features/events/utils'
import type { EventData, FormattedEvent, Participation } from '~/features/events/types'

export function useEventSingle() {
    const route = useRoute()
    const {findOne, find} =useStrapi();
    const client = useStrapiClient()
    const user = useStrapiUser();
    const { public: { strapiURL } } = useRuntimeConfig()

    const eventId = computed(() => route.params.id as string)

    const {
        data: fetchedData,
        error,
        refresh
    } = useAsyncData(
        `event-single:${eventId.value}`,
        async () => {
            const { data: eventRaw } = await findOne<EventData>('events', eventId.value, {})

            if (!eventRaw) {
                return {eventRaw: null, participationListRaw: null, userParticipationRaw: null}
            }

            const participationListRaw = !eventRaw.closed ? await find<Participation>('participations', {
                filters: { event: { documentId: { $eq: eventId.value } } },
                sort: ['presence.order:asc'],
                populate: { event: true, user: true, presence: true },
            }) : null;


            const userParticipationRaw = user.value && !eventRaw.closed ? await client<Participation>(
                `/participations/me/event/${eventId.value}`,
                { method: 'GET' }
            ) : null

            return {
                eventRaw,
                participationListRaw,
                userParticipationRaw
            }
        },
        {
            watch: [user],
            server: false
        }
    )

    const event = computed<FormattedEvent | null>(() => {
        const eventRaw = fetchedData.value?.eventRaw ?? null;
        return eventRaw ? getFormattedSingleEvent(eventRaw, strapiURL) : null;
    })

    const participationList = computed(() =>
        fetchedData.value?.participationListRaw?.data?.map(p => ({
            username: p.user.username,
            classes: p.classes,
            comment: p.comment,
            presence: p.presence,
        })) ?? []
    )

    const userParticipation = computed(() => fetchedData.value?.userParticipationRaw ?? null);

    return {
        event,
        participationList,
        userParticipation,
        error,
        refresh
    }
}
