import { useState } from 'react'

export function usePagination(items, pageSize) {
  if (!Number.isInteger(pageSize) || pageSize < 1) {
    throw new RangeError('pageSize debe ser un entero positivo.')
  }

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(items.length / pageSize)
  const safePage = Math.min(currentPage, Math.max(totalPages, 1))
  const firstItemIndex = (safePage - 1) * pageSize
  const visibleItems = items.slice(firstItemIndex, firstItemIndex + pageSize)

  function goToPage(page) {
    if (!Number.isInteger(page)) return
    setCurrentPage(Math.min(Math.max(page, 1), Math.max(totalPages, 1)))
  }

  function resetPage() {
    setCurrentPage(1)
  }

  return { currentPage: safePage, totalPages, visibleItems, goToPage, resetPage }
}
