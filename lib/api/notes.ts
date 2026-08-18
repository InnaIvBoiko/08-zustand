import type { AxiosResponse } from 'axios';
import { api } from './axios';
import type { NewNote, Note, NoteTag } from '../../types/note';

export interface FetchNotesParams {
    page?: number;
    perPage?: number;
    search?: string;
    tag?: NoteTag;
}

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export const fetchNotes = async ({
    page = 1,
    perPage = 12,
    search = '',
    tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
    const response: AxiosResponse<FetchNotesResponse> = await api.get('/notes', {
        params: {
            page,
            perPage,
            ...(search ? { search } : {}),
            ...(tag ? { tag } : {}),
        },
    });

    return response.data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
    const response: AxiosResponse<Note> = await api.post('/notes', note);

    return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);

    return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
    const response: AxiosResponse<Note> = await api.get(`/notes/${id}`);

    return response.data;
};
