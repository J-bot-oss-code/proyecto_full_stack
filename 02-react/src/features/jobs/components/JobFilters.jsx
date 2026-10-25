import { jobFilters } from '../domain/jobFilters.js'

export default function JobFilters({ filters, onChange }) {
  return (
    <div className="filtro-container" aria-label="Filtros de empleos">
      {jobFilters.map(({ id, label, options }) => (
        <label key={id}>
          <span className="visually-hidden">{`Filtrar por ${label.toLocaleLowerCase('es')}`}</span>
          <select
            value={filters[id]}
            onChange={(event) => onChange(id, event.target.value)}
          >
            <option value="">{label}</option>
            {options.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
      ))}
    </div>
  )
}
