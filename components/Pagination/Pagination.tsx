import ReactPaginateImport from 'react-paginate';
import css from './Pagination.module.css';

// react-paginate's UMD bundle double-wraps its default export under this bundler's CJS interop.
const ReactPaginate =
    (ReactPaginateImport as unknown as { default?: typeof ReactPaginateImport }).default ?? ReactPaginateImport;

interface PaginationProps {
    currentPage: number;
    pageCount: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, pageCount, onPageChange }: PaginationProps) {
    if (pageCount <= 1) {
        return null;
    }

    const handlePageChange = ({ selected }: { selected: number }) => {
        onPageChange(selected + 1);
    };

    return (
        <ReactPaginate
            pageCount={pageCount}
            forcePage={currentPage - 1}
            onPageChange={handlePageChange}
            containerClassName={css.pagination}
            activeClassName={css.active}
            previousLabel="←"
            nextLabel="→"
            renderOnZeroPageCount={null}
        />
    );
}
