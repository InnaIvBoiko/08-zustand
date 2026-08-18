import css from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={css.footer}>
            <div className={css.content}>
                <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
                <div className={css.wrap}>
                    <p>Developer: Inna Boiko</p>
                    <p>
                        Contact us:
                        <a href="mailto:inna_boiko@libero.it"> inna_boiko@libero.it</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
