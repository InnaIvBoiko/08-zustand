import { useState } from 'react';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../lib/api';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteNote,
        onMutate: (id: string) => {
            setDeletingId(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
        onSettled: () => {
            setDeletingId(null);
        },
    });

    return (
        <ul className={css.list}>
            {notes.map(note => (
                <li key={note.id} className={css.listItem}>
                    <h2 className={css.title}>{note.title}</h2>
                    <p className={css.content}>{note.content}</p>
                    <div className={css.footer}>
                        <span className={css.tag}>{note.tag}</span>
                        <Link href={`/notes/${note.id}`} className={css.link}>
                            View details
                        </Link>
                        <button
                            className={css.button}
                            onClick={() => deleteMutation.mutate(note.id)}
                            disabled={deletingId === note.id}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
