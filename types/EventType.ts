import providers from '@/data/providers.json';

export type EventType = {
    service: keyof typeof providers;
    subscription: keyof (typeof providers)[keyof typeof providers]['eventsub'];
    mock?: boolean;
    data: any; // unable to define the data object
    userId?: string;
};

export type SystemEventType = {
    service: 'orbt';
    subscription: 'connected';
    mock?: boolean;
    data: any; // unable to define the data object
};
