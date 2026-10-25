const MAX_JSON_BYTES = 1_000_000
const MAX_JOBS = 1_000

function requireString(value, field, maxLength) {
  if (
    typeof value !== 'string' ||
    value.trim().length === 0 ||
    value.length > maxLength
  ) {
    throw new TypeError(`El campo "${field}" no es válido.`)
  }

  return value
}

function requireStringList(value, field, maxItems, maxLength) {
  if (!Array.isArray(value) || value.length === 0 || value.length > maxItems) {
    throw new TypeError(`La lista "${field}" no es válida.`)
  }

  return value.map((item, index) => requireString(item, `${field}[${index}]`, maxLength))
}

function validateJob(value, index, ids) {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new TypeError(`El empleo en la posición ${index} no es un objeto válido.`)
  }

  const id = requireString(value.id, `empleos[${index}].id`, 80)
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || ids.has(id)) {
    throw new TypeError(`El identificador del empleo en la posición ${index} no es válido o está duplicado.`)
  }
  ids.add(id)

  const technologies = requireStringList(value.technologies, `empleos[${index}].technologies`, 20, 80)
  const technology = requireString(value.technology, `empleos[${index}].technology`, 80)
  if (!technologies.includes(technology)) {
    throw new TypeError(`La tecnología principal del empleo ${id} no coincide con sus tecnologías.`)
  }

  return {
    id,
    title: requireString(value.title, `empleos[${index}].title`, 120),
    company: requireString(value.company, `empleos[${index}].company`, 160),
    location: requireString(value.location, `empleos[${index}].location`, 120),
    technology,
    technologies,
    contract: requireString(value.contract, `empleos[${index}].contract`, 80),
    experience: requireString(value.experience, `empleos[${index}].experience`, 80),
    description: requireString(value.description, `empleos[${index}].description`, 2_000),
    responsibilities: requireStringList(value.responsibilities, `empleos[${index}].responsibilities`, 30, 500),
    requirements: requireStringList(value.requirements, `empleos[${index}].requirements`, 30, 500),
    aboutCompany: requireString(value.aboutCompany, `empleos[${index}].aboutCompany`, 2_000),
  }
}

export async function getJobs() {
  const response = await fetch(`${import.meta.env.BASE_URL}data/data.json`, {
    headers: { Accept: 'application/json' },
    credentials: 'omit',
    mode: 'same-origin',
    redirect: 'error',
  })

  if (!response.ok) {
    throw new Error(`La solicitud de data.json falló con estado ${response.status}.`)
  }

  const contentType = response.headers.get('content-type')?.split(';')[0].trim().toLowerCase()
  if (contentType !== 'application/json' && !/^application\/[\w.-]+\+json$/.test(contentType ?? '')) {
    throw new TypeError('La respuesta de data.json no tiene un tipo de contenido JSON.')
  }

  const contentLength = Number(response.headers.get('content-length'))
  if (Number.isFinite(contentLength) && contentLength > MAX_JSON_BYTES) {
    throw new RangeError('data.json supera el tamaño máximo permitido.')
  }

  const jsonText = await response.text()
  if (new TextEncoder().encode(jsonText).byteLength > MAX_JSON_BYTES) {
    throw new RangeError('data.json supera el tamaño máximo permitido.')
  }

  const records = JSON.parse(jsonText)
  if (!Array.isArray(records) || records.length > MAX_JOBS) {
    throw new TypeError('data.json debe contener un array válido de empleos.')
  }

  const ids = new Set()
  return records.map((record, index) => validateJob(record, index, ids))
}
