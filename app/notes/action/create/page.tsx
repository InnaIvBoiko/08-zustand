import type { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';

export const metadata: Metadata = {
    title: 'Create note — NoteHub',
    description: 'Create a new note on NoteHub — add a title, content and tag.',
    alternates: {
        canonical: '/notes/action/create',
    },
    openGraph: {
        title: 'Create note — NoteHub',
        description: 'Create a new note on NoteHub — add a title, content and tag.',
        url: '/notes/action/create',
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
        title: 'Create note — NoteHub',
        description: 'Create a new note on NoteHub — add a title, content and tag.',
        images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
};

export default function CreateNote() {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm />
            </div>
        </main>
    );
}
