import { notFound } from 'next/navigation';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { NOTE_TAGS, type NoteTag } from '@/types/note';
import NotesClient from './Notes.client';

export const dynamic = 'force-dynamic';

const PER_PAGE = 12;

interface NotesPageProps {
    params: Promise<{ slug: string[] }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
    const { slug } = await params;

    if (!slug || slug.length !== 1) {
        notFound();
    }

    const [rawTag] = slug;
    const isValidTag = (value: string): value is NoteTag => NOTE_TAGS.includes(value as NoteTag);

    if (rawTag !== 'all' && !isValidTag(rawTag)) {
        notFound();
    }

    const activeTag = rawTag === 'all' ? undefined : (rawTag as NoteTag);

    const queryClient = new QueryClient();

    await queryClient.fetchQuery({
        queryKey: ['notes', 1, '', activeTag ?? 'all'],
        queryFn: () => fetchNotes({ page: 1, perPage: PER_PAGE, search: '', tag: activeTag }),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient key={activeTag ?? 'all'} tag={activeTag} />
        </HydrationBoundary>
    );
}
