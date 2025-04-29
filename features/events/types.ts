export interface Server {
  name: string;
  rate: string;
}

export interface EventData {
  id: string
  name: string
  date: string
  servers?: Server
  description?: string
  image?: string
  content?: string
  result?: string
  closed: boolean
}

export interface FormattedTag {
  label: string,
  type: string,
}

export interface FormattedEvent {
  id: string
  date: string
  tags: FormattedTag[]
  img: string
  title: string
  description?: string;
  content?: string
  result?: string
  closed?: boolean
}

export type Participation = {
  id: number;
  profiles: {
    name: string;
  }
  participation_statuses: {
    id: number,
    name: string;
    order: number
    type: string
  }
  comment: string,
  classes: string
}

export type FormattedParticipation = {
  id: Participation['id'],
  username: Participation['profiles']['name'],
  comment: Participation['comment'],
  classes: Participation['classes'],
  status: Participation['participation_statuses'],
}

export type CreateParticipationPayload = {
  event_id: number,
  profile_id: string,
  status_id: number | null,
  comment: string | null,
  classes: string | null
}

export type UpdateParticipationPayload = Omit<CreateParticipationPayload, 'profile_id' | 'event_id'>

