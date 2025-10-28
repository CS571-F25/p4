export const predictionBegin = {
    id: { format: 'string', twitch: ['id'] },
    broadcaster: {
        id: {
            format: 'userId-b',
            twitch: ['broadcaster_user_id'],
        },
        username: {
            format: 'username-b',
            twitch: ['broadcaster_user_login'],
        },
        displayName: {
            format: 'displayName-b',
            twitch: ['broadcaster_user_name'],
        },
    },
    title: { format: 'string', twitch: ['title'] },
    outcomes: {
        format: 'array',
        twitch: ['outcomes'],
        items: {
            id: { format: 'string', twitch: ['outcomes', 'id'] },
            title: { format: 'string', twitch: ['outcomes', 'title'] },
            color: { format: 'string', twitch: ['outcomes', 'color'] },
        },
    },
    startedAt: { format: 'date', twitch: ['started_at'] },
    locksAt: { format: 'date', twitch: ['locks_at'] },
    text: {
        twitch: () => {
            return `a new prediction has started!`;
        },
    },
};
