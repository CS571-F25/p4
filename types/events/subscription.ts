// Twitch: when a specified channel receives a subscriber. This does not include resubscribes. (the user changed from a non sub to a sub)
export const subscription = {
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
    isGift: { format: false },
    text: {
        twitch: (data: { user: { displayName: string }; tier: string; isGift: boolean }) =>
            `${data.user.displayName} subscribed at tier ${data.tier}!`,
    },
};
