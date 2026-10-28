let jobs = [
  {
    id: '1',
    title: 'Desarrollador Frontend',
    company: 'Tech Solutions',
    location: 'Remoto',
    technology: 'React',
    technologies: ['React', 'JavaScript', 'CSS'],
    contract: 'Tiempo completo',
    experience: 'Intermedio',
    description: 'Desarrollo de interfaces web modernas.',
    responsibilities: ['Crear componentes reutilizables', 'Colaborar con diseño UX'],
    requirements: ['React', 'JavaScript', 'HTML/CSS'],
    aboutCompany: 'Empresa líder en tecnología.',
  },
  {
    id: '2',
    title: 'Desarrollador Backend',
    company: 'Data Corp',
    location: 'Presencial',
    technology: 'Node.js',
    technologies: ['Node.js', 'Express', 'PostgreSQL'],
    contract: 'Medio tiempo',
    experience: 'Senior',
    description: 'Construcción de APIs y servicios backend.',
    responsibilities: ['Diseñar APIs REST', 'Mantener bases de datos'],
    requirements: ['Node.js', 'SQL', 'Git'],
    aboutCompany: 'Especialistas en datos.',
  },
]

export const jobModel = {
  findAll() {
    return jobs
  },

  findById(id) {
    return jobs.find((job) => job.id === id)
  },

  create(jobData) {
    const newJob = {
      id: String(jobs.length + 1),
      ...jobData,
    }
    jobs.push(newJob)
    return newJob
  },

  update(id, jobData) {
    const index = jobs.findIndex((job) => job.id === id)
    if (index === -1) return null

    const updatedJob = {
      id,
      ...jobData,
    }
    jobs[index] = updatedJob
    return updatedJob
  },

  remove(id) {
    const index = jobs.findIndex((job) => job.id === id)
    if (index === -1) return false

    jobs.splice(index, 1)
    return true
  },

  reset() {
    jobs.length = 0
    jobs.push(
      {
        id: '1',
        title: 'Desarrollador Frontend',
        company: 'Tech Solutions',
        location: 'Remoto',
        technology: 'React',
        technologies: ['React', 'JavaScript', 'CSS'],
        contract: 'Tiempo completo',
        experience: 'Intermedio',
        description: 'Desarrollo de interfaces web modernas.',
        responsibilities: ['Crear componentes reutilizables', 'Colaborar con diseño UX'],
        requirements: ['React', 'JavaScript', 'HTML/CSS'],
        aboutCompany: 'Empresa líder en tecnología.',
      },
      {
        id: '2',
        title: 'Desarrollador Backend',
        company: 'Data Corp',
        location: 'Presencial',
        technology: 'Node.js',
        technologies: ['Node.js', 'Express', 'PostgreSQL'],
        contract: 'Medio tiempo',
        experience: 'Senior',
        description: 'Construcción de APIs y servicios backend.',
        responsibilities: ['Diseñar APIs REST', 'Mantener bases de datos'],
        requirements: ['Node.js', 'SQL', 'Git'],
        aboutCompany: 'Especialistas en datos.',
      }
    )
  },
}
