// Twitch: when a user gives one or more gifted subscriptions in a channel
export const subscriptionGift = {
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
    value: { format: 'number', twitch: ['total'] },
    tier: {
        format: '1000|2000|3000|Prime',
        twitch: ['tier'],
    },
    cumulativeTotal: { format: 'number', twitch: ['cumulative_total'] },
    isAnonymous: { format: 'boolean', twitch: ['is_anonymous'] },
    text: {
        twitch: (data: { user: { displayName: string }; tier: string; isGift: boolean; value: number }) =>
            `${data.user.displayName} gifted x${data.value} subscriptions at ${parseInt(data.tier) / 1000}!`,
    },
};
