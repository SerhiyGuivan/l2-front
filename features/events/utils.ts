import type {
  EventData,
  FormattedEvent,
  FormattedParticipation,
  FormattedTag,
  Participation
} from "~/features/events/types";

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
  if (eventRaw.servers) {
    tags.push({label: `${eventRaw.servers.name} ${eventRaw.servers.rate}`, type: 'primary'})
  }
  if (eventRaw.closed) {
    tags.push({label: 'Завершен', type: 'danger'});
  }
  return tags;
}

const getImage = (sb: ReturnType<typeof useSupabaseClient>, name: string | undefined): string => {
  let img = '';
  if (name) {
    const {data: imageData} = sb.storage.from('storage').getPublicUrl(name);
    img = imageData?.publicUrl || '';
  }
  return img;
}

export const formatEvents = (sb: ReturnType<typeof useSupabaseClient>, eventsRaw: EventData[]): FormattedEvent[] => {
  return eventsRaw.map((eventRaw) => {
    return {
      id: eventRaw.id,
      title: eventRaw.name,
      img: getImage(sb, eventRaw.image),
      date: formatDate(eventRaw.date),
      tags: getTags(eventRaw),
      description: eventRaw.description,
    };
  });
};

export const formatEvent = (sb: ReturnType<typeof useSupabaseClient>, eventRaw: EventData): FormattedEvent => {
  return {
    id: eventRaw.id,
    title: eventRaw.name,
    img: getImage(sb, eventRaw.image),
    date: formatDate(eventRaw.date),
    tags: getTags(eventRaw),
    description: eventRaw.description,
    closed: eventRaw.closed,
    content: eventRaw.content,
    result: eventRaw.result,
  };
};

export const formatParticipants = (participantsRaw: Participation[]): FormattedParticipation[] => {
  return participantsRaw?.map(p => {
    return {
      id: p.id,
      username: p.profiles.name,
      classes: p.classes,
      comment: p.comment,
      status: p.participation_statuses
    };
  });
}

export const formatParticipation = (participationRaw: Participation): FormattedParticipation => {
  return {
    id: participationRaw.id,
    username: participationRaw.profiles.name,
    classes: participationRaw.classes,
    comment: participationRaw.comment,
    status: participationRaw.participation_statuses
  };
}


