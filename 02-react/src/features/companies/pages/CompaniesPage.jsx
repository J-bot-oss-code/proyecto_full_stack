import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './CompaniesPage.css'

const companies = [
  {
    name: 'Tech Solutions Inc.',
    initials: 'TS',
    category: 'Software y servicios',
    location: 'Remoto',
    description: 'Creamos productos digitales escalables para resolver retos de negocio.',
    color: 'blue',
  },
  {
    name: 'Data Insights Ltd.',
    initials: 'DI',
    category: 'Datos y analítica',
    location: 'Madrid',
    description: 'Ayudamos a organizaciones a convertir datos en mejores decisiones.',
    color: 'violet',
  },
  {
    name: 'Revolution Tech',
    initials: 'RT',
    category: 'Desarrollo de producto',
    location: 'Barcelona',
    description: 'Diseñamos experiencias digitales accesibles para millones de personas.',
    color: 'orange',
  },
  {
    name: 'SecureNet',
    initials: 'SN',
    category: 'Ciberseguridad',
    location: 'Remoto',
    description: 'Protegemos plataformas y acompañamos a nuestros clientes en su evolución.',
    color: 'green',
  },
  {
    name: 'TechLead Co.',
    initials: 'TL',
    category: 'Consultoría tecnológica',
    location: 'Madrid',
    description: 'Equipos multidisciplinares que convierten ideas complejas en soluciones.',
    color: 'pink',
  },
  {
    name: 'Cloud Systems',
    initials: 'CS',
    category: 'Cloud e infraestructura',
    location: 'Remoto',
    description: 'Construimos servicios cloud confiables para empresas en crecimiento.',
    color: 'cyan',
  },
]

export default function CompaniesPage({ jobs }) {
  const [query, setQuery] = useState('')
  const visibleCompanies = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('es')
    return companies.filter((company) =>
      `${company.name} ${company.category} ${company.location}`
        .toLocaleLowerCase('es')
        .includes(normalizedQuery),
    )
  }, [query])

  return (
    <main className="directory-page">
      <section className="directory-hero">
        <p className="eyebrow">Empresas que impulsan la tecnología</p>
        <h1>Encuentra un equipo donde puedas crecer</h1>
        <p>
          Conoce organizaciones, explora su cultura y descubre oportunidades para tu siguiente paso.
        </p>
        <label className="directory-search">
          <span className="visually-hidden">Buscar empresas</span>
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por empresa, especialidad o ubicación"
          />
        </label>
      </section>

      <section className="directory-results" aria-labelledby="companies-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Directorio DevJobs</p>
            <h2 id="companies-heading">Empresas destacadas</h2>
          </div>
          <span className="directory-count">
            {visibleCompanies.length} {visibleCompanies.length === 1 ? 'empresa' : 'empresas'}
          </span>
        </div>

        {visibleCompanies.length > 0 ? (
          <div className="company-grid">
            {visibleCompanies.map((company) => {
              const openings = jobs.filter((job) => job.company === company.name).length
              return (
                <article className="company-card" key={company.name}>
                  <div className={`company-logo company-logo-${company.color}`} aria-hidden="true">
                    {company.initials}
                  </div>
                  <p className="company-category">{company.category}</p>
                  <h3>{company.name}</h3>
                  <p className="company-meta">{company.location}</p>
                  <p className="company-description">{company.description}</p>
                  <div className="company-card-footer">
                    <span>{openings} {openings === 1 ? 'vacante' : 'vacantes'}</span>
                    <Link to={`/jobs?q=${encodeURIComponent(company.name)}`}>
                      Ver empleos <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <p className="state-message">No encontramos empresas con esa búsqueda.</p>
        )}
      </section>
      <p className="prototype-note">Directorio y perfiles de empresa de ejemplo; se conectarán a datos reales más adelante.</p>
    </main>
  )
}
