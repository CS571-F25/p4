export const cheer = {
    isAnonymous: { format: 'boolean', twitch: ['is_anonymous'] },
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
    message: { format: 'string', twitch: ['message'] },
    value: { format: 'number', twitch: ['bits'] },
    text: {
        twitch: (data: { user: { displayName: string }; value: number }) =>
            `${data.user.displayName} cheered ${data.value} bits!`,
    },
};
