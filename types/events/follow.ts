export const follow = {
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
    followedAt: {
        format: 'date',
        twitch: ['event', 'data', 'followed_at'],
    },
    text: {
        twitch: (data: { user: { displayName: string } }) => `${data.user.displayName} followed!`,
    },
};
