export const hypetrainEnd = {
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
    endedAt: { format: 'date', twitch: ['expires_at'] },
    isSharedTrain: { format: 'boolean', twitch: ['is_shared_train'] },
    type: { format: 'string', twitch: ['type'] },
    text: {
        twitch: (data: { level: number }) => {
            return `the hype train has ended at level ${data.level}!`;
        },
    },
};
