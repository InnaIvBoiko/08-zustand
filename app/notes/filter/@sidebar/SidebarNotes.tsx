'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NOTE_TAGS } from '@/types/note';
import css from './SidebarNotes.module.css';

export default function SidebarNotes() {
    const pathname = usePathname();

    const linkClassName = (href: string) => (pathname === href ? `${css.menuLink} ${css.active}` : css.menuLink);

    return (
        <ul className={css.menuList}>
            <li className={css.menuItem}>
                <Link href="/notes/filter/all" className={linkClassName('/notes/filter/all')}>
                    All notes
                </Link>
            </li>
            {NOTE_TAGS.map(tag => (
                <li key={tag} className={css.menuItem}>
                    <Link href={`/notes/filter/${tag}`} className={linkClassName(`/notes/filter/${tag}`)}>
                        {tag}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
