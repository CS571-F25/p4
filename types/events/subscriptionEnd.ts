// Twitch: when a subscription to the specified channel expires
export const subscriptionEnd = {
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
    tier: {
        format: '1000|2000|3000|Prime',
        twitch: ['event', 'data', 'tier'],
    },
    isGift: { format: 'boolean', twitch: ['event', 'data', 'is_gift'] },
};
