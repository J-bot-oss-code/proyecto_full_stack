import { useState } from 'react'
import JobCard from '../components/JobCard.jsx'
import JobFilters from '../components/JobFilters.jsx'
import JobsPagination from '../components/pagination/JobsPagination.jsx'
import { filterJobs } from '../domain/filterJobs.js'

const JOBS_PER_PAGE = 6

export default function JobsPage({ jobs, loading, error, initialQuery, navigate }) {
  const [query, setQuery] = useState(initialQuery)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    contract: '',
    experience: '',
  })
  const matchingJobs = filterJobs(jobs, query, filters)
  const totalPages = Math.ceil(matchingJobs.length / JOBS_PER_PAGE)
  const firstJobIndex = (currentPage - 1) * JOBS_PER_PAGE
  const visibleJobs = matchingJobs.slice(firstJobIndex, firstJobIndex + JOBS_PER_PAGE)

  function updateFilter(name, value) {
    setFilters((current) => ({ ...current, [name]: value }))
    setCurrentPage(1)
  }

  function updateQuery(value) {
    setQuery(value)
    setCurrentPage(1)
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
            <JobCard key={job.id} job={job} navigate={navigate} />
          ))}
        </div>
        {!loading && !error && (
          <JobsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </section>
    </main>
  )
}
