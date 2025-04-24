export interface Server {
    name: string;
    rate: string;
}

export interface EventData {
    documentId: string
    title: string
    date: string
    server?: Server
    description?: string
    image?: {
        url: string
    };
    content?: string
    results?: string
    closed?: boolean
}

export interface FormattedTag {
    label: string,
    type: string,
}

export interface FormattedEvent {
    documentId: string
    date: string
    tags: FormattedTag[]
    img: string
    title: string
    description?: string;
    content?: string
    results?: string
    closed?: boolean
}

export type Participation = {
    documentId: string;
    user: {
        username: string;
    }
    presence: {
        documentId: string;
        label: string,
        type: string
    }
    comment: string,
    classes: 'War mage' | 'Archers'
}

