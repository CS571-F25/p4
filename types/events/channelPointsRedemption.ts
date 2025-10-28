export const channelPointsRedemption = {
    user: {
        id: { format: 'userId-a', twitch: ['user_id'] },
        username: { format: 'username-a', twitch: ['user_login'] },
        displayName: { format: 'displayName-a', twitch: ['user_name'] },
    },
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
    id: { format: 'string', twitch: ['id'] },
    status: {
        format: 'string',
        twitch: ['status'],
    },
    reward: {
        id: { format: 'string', twitch: ['reward', 'id'] },
        title: { format: 'string', twitch: ['reward', 'title'] },
        prompt: { format: 'string', twitch: ['reward', 'prompt'] },
        cost: { format: 'number', twitch: ['reward', 'cost'] },
    },
    redeemedAt: { format: 'date', twitch: ['redeemed_at'] },
};
