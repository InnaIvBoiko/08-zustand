import css from './ProgressBar.module.css';

export default function ProgressBar() {
    return (
        <div className={css.wrapper} role="status" aria-label="Updating">
            <div className={css.track}>
                <div className={css.bar} />
            </div>
        </div>
    );
}
