import axios from 'axios';
import { notFound } from 'next/navigation';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NotePreview from './NotePreview.client';

interface ModalNotePageProps {
    params: Promise<{ id: string }>;
}

export default async function ModalNotePage({ params }: ModalNotePageProps) {
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
            <NotePreview />
        </HydrationBoundary>
    );
}
