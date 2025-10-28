export const raid = {
    fromBroadcaster: {
        id: { format: 'userId-a', twitch: ['user_id'] },
        username: { format: 'username-a', twitch: ['user_login'] },
        displayName: { format: 'displayName-a', twitch: ['user_name'] },
    },
    toBroadcaster: {
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
    value: { format: 'number', twitch: ['viewers'] },
    text: {
        twitch: (data: { fromBroadcaster: { displayName: string }; toBroadcaster: { displayName: string }; value: number }) =>
            `${data.fromBroadcaster.displayName} raided with ${data.value} viewers!`,
    },
};
