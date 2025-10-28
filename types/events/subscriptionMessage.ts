// Twitch: when a user sends a resubscription chat message in a specific channel
export const subscriptionMessage = {
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
        twitch: ['tier'],
    },
    message: {
        text: { format: 'string', twitch: ['message', 'text'] },
        emotes: { format: 'array', twitch: ['message', 'emotes'] },
    },
    cumulativeMonths: { format: 'number', twitch: ['cumulative_months'] },
    streakMonths: { format: 'number', twitch: ['streak_months'] },
    durationMonths: { format: 'number', twitch: ['duration_months'] },
    text: {
        twitch: (data: { user: { displayName: string }; tier: string; isGift: boolean; durationMonths: number }) =>
            `${data.user.displayName} resubscribed at tier ${parseInt(data.tier) / 1000} for ${data.durationMonths} months!`,
    },
};
