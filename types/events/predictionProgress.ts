export const predictionProgress = {
    id: { format: 'string', twitch: ['id'] },
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
    title: { format: 'string', twitch: ['title'] },
    outcomes: {
        format: 'array',
        twitch: ['outcomes'],
        items: {
            id: { format: 'string', twitch: ['outcomes', 'id'] },
            title: { format: 'string', twitch: ['outcomes', 'title'] },
            color: { format: 'string', twitch: ['outcomes', 'color'] },
            users: { format: 'number', twitch: ['outcomes', 'users'] },
            channelPoints: { format: 'number', twitch: ['outcomes', 'channel_points'] },
            topPredictors: {
                format: 'array',
                twitch: ['outcomes', 'top_predictors'],
                limit: 10,
                items: {
                    user: {
                        username: { format: 'username-a', twitch: ['top_predictors', 'user_login'] },
                        displayName: { format: 'displayName-a', twitch: ['top_predictors', 'user_name'] },
                        id: { format: 'userId-a', twitch: ['top_predictors', 'user_id'] },
                    },
                    channelPointsWon: { format: null, twitch: ['channel_points_won'] },
                    channelPointsUsed: { format: 'number', twitch: ['channel_points_used'] },
                },
            },
        },
    },
    startedAt: { format: 'date', twitch: ['started_at'] },
    locksAt: { format: 'date', twitch: ['locks_at'] },
};
