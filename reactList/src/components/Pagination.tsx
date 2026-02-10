interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PAGE_BTN_STYLES = {
  active: 'bg-blue-500 text-white shadow-md scale-105',
  inactive: 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm hover:shadow-md',
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            page === currentPage ? PAGE_BTN_STYLES.active : PAGE_BTN_STYLES.inactive
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

