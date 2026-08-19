import type { Metadata } from 'next';
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

export async function generateMetadata({ params }: NotesPageProps): Promise<Metadata> {
    const { slug } = await params;
    const rawTag = slug?.[0];
    const isValidTag = (value?: string): value is NoteTag => NOTE_TAGS.includes(value as NoteTag);
    const tagLabel = isValidTag(rawTag) ? rawTag : 'All';

    const title = `${tagLabel} notes — NoteHub`;
    const description = `Browse and manage your "${tagLabel}" notes on NoteHub.`;
    const url = `/notes/filter/${rawTag ?? 'all'}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
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
            title,
            description,
            images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
        },
    };
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
