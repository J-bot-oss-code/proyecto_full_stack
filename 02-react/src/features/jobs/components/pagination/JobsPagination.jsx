function ArrowIcon({ direction }) {
  const path = direction === 'previous' ? 'M15 6l-6 6l6 6' : 'M9 6l6 6l-6 6'

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />
    </svg>
  )
}

export default function JobsPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  return (
    <nav className="pagination" aria-label="Paginación de empleos">
      <button
        className="pagination-arrow"
        type="button"
        aria-label="Página anterior"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowIcon direction="previous" />
      </button>

      <ol className="pagination-pages">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <li key={page}>
            <button
              className={page === currentPage ? 'is-active' : ''}
              type="button"
              aria-label={`Página ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ol>

      <button
        className="pagination-arrow"
        type="button"
        aria-label="Página siguiente"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ArrowIcon direction="next" />
      </button>
    </nav>
  )
}
