export const pollEnd = {
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
    choices: {
        format: 'array',
        items: {
            id: { format: 'string', twitch: ['choices', 'id'] },
            title: { format: 'string', twitch: ['choices', 'title'] },
            votes: { format: 'number', twitch: ['choices', 'votes'] },
        },
        twitch: ['choices'],
    },
    totalVotes: { format: 'number', twitch: ['bits_voting', 'total_votes'] },
    cheerVoting: {
        isEnabled: { format: 'boolean', twitch: ['bits_voting', 'is_enabled'] },
        amountPerVote: { format: 'number', twitch: ['bits_voting', 'amount_per_vote'] },
    },
    channelPointsVoting: {
        isEnabled: { format: 'boolean', twitch: ['channel_points_voting', 'is_enabled'] },
        amountPerVote: { format: 'number', twitch: ['channel_points_voting', 'amount_per_vote'] },
    },
    startedAt: { format: 'date', twitch: ['started_at'] },
    endsAt: { format: 'date', twitch: ['ends_at'] },
    text: {
        twitch: (data: { choices: { title: string }[] }) => {
            return `the poll has ended! winner: ${data.choices[0].title}`;
        },
    },
};
