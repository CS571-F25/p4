import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
    title: 'orbt',
    description: 'widget platform for content creators',
    icons: {
        icon: '/star.ico',
    },
};

import NavBar from '@/components/NavBar';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import ClientProviders from './ClientProviders';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head />
            <body className="antialiased min-h-screen">
                <ClientProviders>
                    <NavBar />
                    <main>
                        <Logo />
                        {children}
                    </main>
                    <Footer />
                </ClientProviders>
            </body>
        </html>
    );
}
