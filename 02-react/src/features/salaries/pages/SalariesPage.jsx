import { useState } from 'react'
import './SalariesPage.css'

const salaryData = [
  { role: 'Frontend Developer', range: '$45k – $85k', average: '$64k', demand: 78, level: 'Intermedio' },
  { role: 'Backend Developer', range: '$50k – $95k', average: '$72k', demand: 86, level: 'Intermedio' },
  { role: 'Data Analyst', range: '$42k – $78k', average: '$58k', demand: 67, level: 'Intermedio' },
  { role: 'Software Engineer', range: '$65k – $125k', average: '$92k', demand: 92, level: 'Senior' },
  { role: 'Cybersecurity Specialist', range: '$58k – $110k', average: '$81k', demand: 83, level: 'Senior' },
]

export default function SalariesPage() {
  const [experience, setExperience] = useState('Todos los niveles')
  const visibleRoles = salaryData.filter((role) =>
    experience === 'Todos los niveles' || role.level === experience,
  )

  return (
    <main className="salaries-page">
      <section className="salaries-hero">
        <p className="eyebrow">Información para tu carrera</p>
        <h1>Conoce el valor de tu talento</h1>
        <p>Explora referencias salariales de ejemplo para preparar tu próximo paso profesional.</p>
        <div className="salary-hero-stats">
          <div><strong>5</strong><span>roles de ejemplo</span></div>
          <div><strong>Tech</strong><span>sector profesional</span></div>
          <div><strong>2026</strong><span>prototipo visual</span></div>
        </div>
      </section>

      <section className="salary-insights" aria-labelledby="salary-insights-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Explora por especialidad</p>
            <h2 id="salary-insights-heading">Referencias salariales</h2>
          </div>
          <label className="salary-level-filter">
            <span className="visually-hidden">Filtrar por experiencia</span>
            <select value={experience} onChange={(event) => setExperience(event.target.value)}>
              <option>Todos los niveles</option>
              <option>Intermedio</option>
              <option>Senior</option>
            </select>
          </label>
        </div>

        <div className="salary-list">
          {visibleRoles.map((role) => (
            <article className="salary-card" key={role.role}>
              <div className="salary-role">
                <span className="salary-role-icon" aria-hidden="true">↗</span>
                <div>
                  <h3>{role.role}</h3>
                  <span>{role.level} · Tecnología</span>
                </div>
              </div>
              <div className="salary-range">
                <span>Rango anual estimado</span>
                <strong>{role.range}</strong>
              </div>
              <div className="salary-average">
                <span>Promedio de ejemplo</span>
                <strong>{role.average}</strong>
              </div>
              <div className="salary-demand">
                <div><span>Demanda estimada</span><strong>{role.demand}%</strong></div>
                <div className="salary-meter" role="img" aria-label={`Demanda de ejemplo ${role.demand}%`}>
                  <span style={{ width: `${role.demand}%` }} />
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="prototype-note">
          Cifras ilustrativas en USD anuales; no representan datos de mercado verificados. La fuente y moneda se configurarán al conectar el backend.
        </p>
      </section>
    </main>
  )
}
