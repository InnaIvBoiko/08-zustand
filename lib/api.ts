import axios, { type AxiosResponse } from 'axios';
import type { NewNote, Note, NoteTag } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

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
