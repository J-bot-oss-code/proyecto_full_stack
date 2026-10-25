export function normalizeText(value) {
  return value.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function filterJobs(jobs, query, filters) {
  const normalizedQuery = normalizeText(query.trim())

  return jobs.filter((job) => {
    const searchableText = normalizeText([
      job.title,
      job.company,
      job.location,
      job.description,
      job.technology,
      ...job.technologies,
    ].join(' '))

    return (
      searchableText.includes(normalizedQuery) &&
      (!filters.technology || job.technologies.includes(filters.technology)) &&
      (!filters.location || job.location === filters.location) &&
      (!filters.contract || job.contract === filters.contract) &&
      (!filters.experience || job.experience === filters.experience)
    )
  })
}
