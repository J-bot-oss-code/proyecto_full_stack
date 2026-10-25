import { useState } from 'react'
import { Link } from 'react-router-dom'

function JobListSection({ title, items }) {
  return (
    <section className="job-detail-section">
      <h2>{title}</h2>
      <ul className="job-detail-list">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  )
}

export default function JobDetailPage({ job, loading, error }) {
  const [isApplied, setIsApplied] = useState(false)

  if (loading) {
    return <main className="job-detail-page"><p className="state-message">Cargando empleo...</p></main>
  }

  if (error || !job) {
    return (
      <main className="job-detail-page">
        <p className="state-message is-error" role="alert">
          {error ?? 'No encontramos ese empleo. Vuelve a la búsqueda para elegir otro.'}
        </p>
        <Link className="back-link" to="/jobs">Volver a empleos</Link>
      </main>
    )
  }

  function apply() {
    setIsApplied(true)
  }

  const buttonLabel = isApplied ? 'Postulación enviada' : 'Aplicar ahora'
  const buttonClass = `btn-apply${isApplied ? ' is-applied' : ''}`

  return (
    <main className="job-detail-page">
      <nav className="breadcrumbs" aria-label="Ruta de navegación">
        <Link to="/jobs">Empleos</Link>
        <span aria-hidden="true">›</span>
        <span>{job.title}</span>
      </nav>
      <header className="job-detail-heading">
        <div>
          <p className="eyebrow">Oportunidad laboral</p>
          <h1>{job.title}</h1>
          <p className="job-detail-company">{job.company} · {job.location}</p>
        </div>
        <button className={buttonClass} onClick={apply} disabled={isApplied}>{buttonLabel}</button>
      </header>
      <div className="job-detail-tags">
        {[job.contract, job.experience, ...job.technologies].map((tag) => (
          <span className="job-detail-tag" key={tag}>{tag}</span>
        ))}
      </div>
      <section className="job-detail-section">
        <h2>Descripción del puesto</h2>
        <p>{job.description}</p>
      </section>
      <JobListSection title="Responsabilidades" items={job.responsibilities} />
      <JobListSection title="Requisitos" items={job.requirements} />
      <section className="job-detail-section">
        <h2>Acerca de la empresa</h2>
        <p>{job.aboutCompany}</p>
      </section>
      <div className="job-detail-bottom-action">
        <button className={buttonClass} onClick={apply} disabled={isApplied}>{buttonLabel}</button>
      </div>
    </main>
  )
}
