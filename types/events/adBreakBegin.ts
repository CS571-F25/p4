export const adBreakBegin = {
    durationSeconds: { format: '30|60|90|120|180', twitch: ['duration_seconds'] },
    startedAt: { format: 'date', twitch: ['started_at'] },
    isAutomatic: { format: 'boolean', twitch: ['is_automatic'] },
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
    requesterUser: {
        id: { format: 'userId-a', twitch: ['requester_user_id'] },
        username: { format: 'username-a', twitch: ['requester_user_login'] },
        displayName: { format: 'displayName-a', twitch: ['requester_user_name'] },
    },
    text: {
        twitch: (data: { broadcaster: { displayName: string }; durationSeconds: number; isAutomatic: boolean }) =>
            `a ${data.durationSeconds} second ad has started!`,
    },
};
