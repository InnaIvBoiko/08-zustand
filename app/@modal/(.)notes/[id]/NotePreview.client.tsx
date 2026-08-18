'use client';

import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

export default function NotePreview() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const {
        data: note,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
    });

    const handleClose = () => router.back();

    return (
        <Modal onClose={handleClose}>
            <div className={css.container}>
                {isLoading && <p>Loading, please wait...</p>}
                {!isLoading && (error || !note) && <p>Something went wrong.</p>}
                {!isLoading && note && (
                    <div className={css.item}>
                        <button className={css.backBtn} onClick={handleClose}>
                            ← Back
                        </button>
                        <div className={css.header}>
                            <h2>{note.title}</h2>
                        </div>
                        <p className={css.tag}>{note.tag}</p>
                        <p className={css.content}>{note.content}</p>
                        <p className={css.date}>{note.createdAt}</p>
                    </div>
                )}
            </div>
        </Modal>
    );
}
