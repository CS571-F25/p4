export const hypetrainBegin = {
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
    sharedTrainParticipants: { format: null, twitch: ['shared_train_participants'] },
    level: { format: 'number', twitch: ['level'] },
    startedAt: { format: 'date', twitch: ['started_at'] },
    expiresAt: { format: 'date', twitch: ['expires_at'] },
    isSharedTrain: { format: 'boolean', twitch: ['is_shared_train'] },
    allTimeHighLevel: { format: 'number', twitch: ['all_time_high_level'] },
    allTimeHighTotal: { format: 'number', twitch: ['all_time_high_total'] },
    text: {
        twitch: (data: { broadcaster: { displayName: string }; level: number; goal: number }) => {
            return `a level ${data.level} hype train has begun!`;
        },
    },
};
