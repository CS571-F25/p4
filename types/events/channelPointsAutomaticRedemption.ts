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
    reward: {
        type: { format: 'string', twitch: ['reward', 'title'] },
        cost: { format: 'number', twitch: ['reward', 'cost'] },
        unlockedEmote: { format: 'string', twitch: ['reward', 'is_user_input_required'] },
    },
    message: {
        text: { format: 'string', twitch: ['user_input'] },
        emotes: {
            format: 'array',
            twitch: ['emotes'],
            items: {
                id: { format: 'string', twitch: ['id'] },
                start: { format: 'number', twitch: ['start'] },
                end: { format: 'number', twitch: ['end'] },
            },
        },
    },
    userInput: { format: 'string', twitch: ['user_input'] },
    redeemedAt: { format: 'date', twitch: ['redeemed_at'] },
};
