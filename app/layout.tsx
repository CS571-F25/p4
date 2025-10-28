import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
    title: 'widgets.bradydallama.com',
    description: 'widget server',
    icons: {
        icon: '/star.ico',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head />
            <body className="antialiased">
                <main className="min-h-screen">{children}</main>
            </body>
        </html>
    );
}
