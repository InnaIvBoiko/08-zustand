import type { Metadata } from 'next';
import css from './Home.module.css';

export const metadata: Metadata = {
    title: 'Page not found — NoteHub',
    description: 'Sorry, the page you are looking for does not exist on NoteHub.',
    alternates: {
        canonical: '/not-found',
    },
    openGraph: {
        title: 'Page not found — NoteHub',
        description: 'Sorry, the page you are looking for does not exist on NoteHub.',
        url: '/not-found',
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
        title: 'Page not found — NoteHub',
        description: 'Sorry, the page you are looking for does not exist on NoteHub.',
        images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
};

export default function NotFound() {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>404 - Page not found</h1>
                <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
            </div>
        </main>
    );
}
