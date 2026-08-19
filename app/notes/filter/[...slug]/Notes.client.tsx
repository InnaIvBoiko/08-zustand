'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/Loader/Loader';
import NoteList from '@/components/NoteList/NoteList';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import css from './Notes.module.css';

interface NotesClientProps {
    tag?: NoteTag;
}

const PER_PAGE = 12;

export default function NotesClient({ tag }: NotesClientProps) {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const { data, isLoading, isFetching, isError, error } = useQuery({
        queryKey: ['notes', page, search, tag ?? 'all'],
        queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search, tag }),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5,
    });

    if (isError) {
        throw error;
    }

    const handleSearch = useDebouncedCallback((value: string) => {
        setSearch(value);
        setPage(1);
    }, 500);

    const notes = data?.notes ?? [];
    const totalPages = data?.totalPages ?? 1;

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox onSearch={handleSearch} />
                {totalPages > 1 && <Pagination currentPage={page} pageCount={totalPages} onPageChange={setPage} />}
                <Link href="/notes/action/create" className={css.button}>
                    Create note +
                </Link>
            </header>

            <main className={css.main}>
                {isLoading && (
                    <div className={css.loaderWrapper}>
                        <Loader />
                    </div>
                )}
                {!isLoading && notes.length === 0 && <p className={css.empty}>No notes found.</p>}
                {!isLoading && notes.length > 0 && <NoteList notes={notes} />}
            </main>

            {isFetching && !isLoading && <ProgressBar />}
        </div>
    );
}
