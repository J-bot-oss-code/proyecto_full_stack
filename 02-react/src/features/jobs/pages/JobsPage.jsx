import { useState } from 'react'
import { usePagination } from '../hooks/usePagination.js'
import JobCard from '../components/JobCard.jsx'
import JobFilters from '../components/JobFilters.jsx'
import JobsPagination from '../components/pagination/JobsPagination.jsx'
import { filterJobs } from '../domain/filterJobs.js'

const JOBS_PER_PAGE = 6

export default function JobsPage({ jobs, loading, error, initialQuery }) {
  const [query, setQuery] = useState(initialQuery)
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    contract: '',
    experience: '',
  })
  const matchingJobs = filterJobs(jobs, query, filters)
  const {
    currentPage,
    totalPages,
    visibleItems: visibleJobs,
    goToPage,
    resetPage,
  } = usePagination(matchingJobs, JOBS_PER_PAGE)

  function updateFilter(name, value) {
    setFilters((current) => ({ ...current, [name]: value }))
    resetPage()
  }

  function updateQuery(value) {
    setQuery(value)
    resetPage()
  }

  return (
    <main className="search-page">
      <section className="hero-search">
        <p className="eyebrow">Encuentra el puesto ideal para ti</p>
        <h1>Tu próximo trabajo en tecnología</h1>
        <p>Explora oportunidades y filtra los resultados según lo que buscas.</p>
        <form
          className="search-input-container"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <span className="search-icon" aria-hidden="true">⌕</span>
          <label className="visually-hidden" htmlFor="job-search">Buscar empleos</label>
          <input
            id="job-search"
            type="search"
            maxLength="120"
            placeholder="Puesto, empresa o tecnología"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
          />
          <button className="search-button" type="submit">Buscar</button>
        </form>
        <JobFilters filters={filters} onChange={updateFilter} />
      </section>

      <section className="results-section" aria-labelledby="results-heading">
        <h2 id="results-heading">
          Resultados de búsqueda
          {!loading && !error && (
            <span className="results-count" aria-live="polite">
              {matchingJobs.length} {matchingJobs.length === 1 ? 'empleo' : 'empleos'}
            </span>
          )}
        </h2>
        {loading && <p className="state-message">Cargando empleos...</p>}
        {error && <p className="state-message is-error" role="alert">{error}</p>}
        {!loading && !error && matchingJobs.length === 0 && (
          <p className="state-message">No encontramos empleos con esos criterios. Prueba otros filtros.</p>
        )}
        <div className="job-listings" aria-live="polite">
          {!loading && !error && visibleJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        {!loading && !error && (
          <JobsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        )}
      </section>
    </main>
  )
}
