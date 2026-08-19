import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import 'modern-normalize';
import './globals.css';
import css from './layout.module.css';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-roboto',
    display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://08-zustand-rho-eight.vercel.app';

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: 'NoteHub',
    description:
        'NoteHub is a simple and efficient application for managing personal notes — create, search, filter and organize your thoughts in one place.',
    openGraph: {
        title: 'NoteHub',
        description:
            'NoteHub is a simple and efficient application for managing personal notes — create, search, filter and organize your thoughts in one place.',
        url: '/',
        siteName: 'NoteHub',
        type: 'website',
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: 'NoteHub',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'NoteHub',
        description:
            'NoteHub is a simple and efficient application for managing personal notes — create, search, filter and organize your thoughts in one place.',
        images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
};

export default function RootLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={roboto.variable}>
                <TanStackProvider>
                    <Header />
                    <div className={css.main}>{children}</div>
                    {modal}
                    <Footer />
                </TanStackProvider>
            </body>
        </html>
    );
}
