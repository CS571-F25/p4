export const hypetrainProgress = {
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
    level: { format: 'number', twitch: ['level'] },
    total: { format: 'number', twitch: ['total'] },
    progress: { format: 'number', twitch: ['progress'] },
    goal: { format: 'number', twitch: ['goal'] },
    topContributions: {
        format: 'array',
        twitch: ['top_contributions'],
        items: {
            user: {
                id: { format: 'userId', twitch: ['user_id'] },
                username: { format: 'username', twitch: ['user_login'] },
                displayName: { format: 'displayName', twitch: ['user_name'] },
            },
            type: { format: 'string', twitch: ['type'] },
            total: { format: 'number', twitch: ['total'] },
        },
    },
    lastContribution: {
        user: {
            id: { format: 'userId', twitch: ['last_contribution', 'user_id'] },
            username: { format: 'userName', twitch: ['last_contribution', 'user_login'] },
            displayName: { format: 'displayName', twitch: ['last_contribution', 'user_name'] },
        },
        type: { format: 'string', twitch: ['last_contribution', 'type'] },
        total: { format: 'number', twitch: ['last_contribution', 'total'] },
    },
    startedAt: { format: 'date', twitch: ['started_at'] },
    expiresAt: { format: 'date', twitch: ['expires_at'] },
    isGoldenKappaTrain: { format: 'boolean', twitch: ['is_golden_kappa_train'] },
};
