import { computed } from 'vue'
import { useRoute } from '#imports'

export function usePresences() {
    const { find } = useStrapi()
    const route = useRoute()

    const { data: presencesRaw } = useAsyncData(
        `presences:${route.params.id}`,
        () => find<{label: string}>('presences', {
            sort: ['order:asc'],
        }))

    const presences = computed(() =>
        presencesRaw.value?.data?.map(p => ({
            label: p.label,
            documentId: p.documentId,
        })) ?? []
    )

    return {
        presences,
    }
}
