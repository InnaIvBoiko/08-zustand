import type { Metadata } from 'next';
import axios from 'axios';
import { notFound } from 'next/navigation';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface NoteDetailsPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NoteDetailsPageProps): Promise<Metadata> {
    const { id } = await params;

    try {
        const note = await fetchNoteById(id);
        const description = note.content
            ? note.content.length > 150
                ? `${note.content.slice(0, 150)}…`
                : note.content
            : `Details for the note "${note.title}" on NoteHub.`;
        const title = `${note.title} — NoteHub`;

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                url: `/notes/${id}`,
                siteName: 'NoteHub',
                type: 'article',
                images: [
                    {
                        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                        width: 1200,
                        height: 630,
                        alt: note.title,
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
            },
        };
    } catch {
        return {
            title: 'Note — NoteHub',
            description: 'View note details on NoteHub.',
        };
    }
}

export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
    const { id } = await params;
    const queryClient = new QueryClient();

    try {
        await queryClient.fetchQuery({
            queryKey: ['note', id],
            queryFn: () => fetchNoteById(id),
        });
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            notFound();
        }
        throw error;
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    );
}
