import { useState } from 'react'

export default function JobCard({ job, navigate }) {
  const [isApplied, setIsApplied] = useState(false)

  return (
    <article className="job-card">
      <div className="job-info">
        <h3>
          <a href={`/jobs/${encodeURIComponent(job.id)}`} onClick={navigate}>{job.title}</a>
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
