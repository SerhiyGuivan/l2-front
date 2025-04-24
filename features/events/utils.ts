// Format the date nicely
import type {EventData, FormattedEvent, FormattedTag} from "~/features/events/types";

export const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const getTags = (eventRaw: EventData): FormattedTag[] => {
    const tags = [];
    if (eventRaw.server) {
        tags.push({ label: `${eventRaw.server.name} ${eventRaw.server.rate}`, type: 'primary' })
    }
    if (eventRaw.closed) {
        tags.push({label: 'Завершен', type: 'danger'});
    }
    return tags;
}

export const getFormattedEvent = (eventRaw: EventData, strapiURL: string): FormattedEvent => {
    return {
        documentId: eventRaw.documentId,
        title: eventRaw.title,
        img: eventRaw.image ? `${strapiURL}${eventRaw.image.url}` : '',
        date: formatDate(eventRaw.date),
        tags: getTags(eventRaw),
        description: eventRaw.description
    }
}

export const getFormattedSingleEvent = (eventRaw: EventData, strapiURL: string): FormattedEvent => {
    return {
        documentId: eventRaw.documentId,
        title: eventRaw.title,
        img: eventRaw.image ? `${strapiURL}${eventRaw.image.url}` : '',
        date: formatDate(eventRaw.date),
        tags: getTags(eventRaw),
        content: eventRaw.content,
        results: eventRaw.results,
        closed: eventRaw.closed
    }
}