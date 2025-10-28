import NextAuth from 'next-auth';
import type { DefaultSession } from 'next-auth';
import providers from '@/data/providers.json';
import Twitch from 'next-auth/providers/twitch';

declare module 'next-auth' {
    interface Session {
        user: {
            provider?: string;
            providerAccountId?: string;
        } & DefaultSession['user'];
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Twitch({
            authorization: {
                params: {
                    scope: providers.twitch.scopes?.join(' ') || '',
                    force_verify: 'true',
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account) {
                const response = await fetch(`${process.env.API}/user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        provider: account.provider,
                        id: account.providerAccountId,
                        accessToken: account.access_token,
                        refreshToken: account.refresh_token,
                        expires: account.expires_at,
                    }),
                }).then((res) => res.json());
                fetch(`${process.env.API}/eventsub/service/twitch/manage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: response.providerId,
                        accessToken: account.access_token,
                    }),
                }).catch(() => {});
                return true;
            }
            return true;
        },
        async jwt({ token, account, profile }) {
            if (account) {
                token.provider = account.provider;
                token.providerAccountId = account.providerAccountId;
            }
            return token;
        },
        async session({ session, user, token }) {
            session.user.provider = token.provider as string | undefined;
            session.user.providerAccountId = token.providerAccountId as string | undefined;
            return session;
        },
    },
});
