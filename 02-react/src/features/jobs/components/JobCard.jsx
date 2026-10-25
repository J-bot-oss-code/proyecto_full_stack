import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function JobCard({ job }) {
  const [isApplied, setIsApplied] = useState(false)

  return (
    <article className="job-card">
      <div className="job-info">
        <h3>
          <Link to={`/jobs/${encodeURIComponent(job.id)}`}>{job.title}</Link>
        </h3>
        <p className="company-location">{job.company} · {job.location} · {job.experience}</p>
        <p className="job-description">{job.description}</p>
        <p className="job-tags">{job.technologies.join(' · ')} · {job.contract}</p>
      </div>
      <button
        className={`btn-apply${isApplied ? ' is-applied' : ''}`}
        type="button"
        onClick={() => setIsApplied(true)}
        disabled={isApplied}
        aria-label={isApplied ? `Postulación enviada para ${job.title}` : `Aplicar a ${job.title}`}
      >
        {isApplied ? 'Postulación enviada' : 'Aplicar'}
      </button>
    </article>
  )
}
