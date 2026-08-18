'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../lib/api';
import type { NewNote, NoteTag } from '../../types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
    onCancel: () => void;
}

const tags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const initialValues: NewNote = {
    title: '',
    content: '',
    tag: 'Todo',
};

const validationSchema = Yup.object({
    title: Yup.string()
        .min(3, 'Title must be at least 3 characters')
        .max(50, 'Title must be at most 50 characters')
        .required('Title is required'),
    content: Yup.string().max(500, 'Content must be at most 500 characters'),
    tag: Yup.mixed<NoteTag>().oneOf(tags, 'Invalid tag').required('Tag is required'),
});

export default function NoteForm({ onCancel }: NoteFormProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            onCancel();
        },
    });

    const handleSubmit = (values: NewNote, helpers: FormikHelpers<NewNote>) => {
        mutation.mutate(values, {
            onSettled: () => helpers.setSubmitting(false),
        });
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor="title">Title</label>
                    <Field id="title" type="text" name="title" className={css.input} />
                    <ErrorMessage name="title" component="span" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="content">Content</label>
                    <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
                    <ErrorMessage name="content" component="span" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="tag">Tag</label>
                    <Field as="select" id="tag" name="tag" className={css.select}>
                        {tags.map(tag => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </Field>
                    <ErrorMessage name="tag" component="span" className={css.error} />
                </div>

                <div className={css.actions}>
                    <button type="button" className={css.cancelButton} onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
                        Create note
                    </button>
                </div>
            </Form>
        </Formik>
    );
}
