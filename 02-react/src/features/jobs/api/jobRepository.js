const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function fetchJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: 'application/json' },
    credentials: 'omit',
    mode: 'cors',
    redirect: 'error',
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.message || `La solicitud falló con estado ${response.status}.`)
  }

  const contentType = response.headers.get('content-type')?.split(';')[0].trim().toLowerCase()
  if (contentType !== 'application/json' && !/^application\/[\w.-]+\+json$/.test(contentType ?? '')) {
    throw new TypeError('La respuesta no tiene un tipo de contenido JSON.')
  }

  return response.json()
}

export async function getJobs() {
  const body = await fetchJson('/api/jobs')

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new TypeError('La respuesta de la API no es un objeto válido.')
  }

  const records = body.data?.jobs ?? body.jobs ?? []

  if (!Array.isArray(records)) {
    throw new TypeError('La respuesta de la API debe contener un array de empleos.')
  }

  return records
}

export async function getJobById(id) {
  const body = await fetchJson(`/api/jobs/${id}`)

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new TypeError('La respuesta de la API no es un objeto válido.')
  }

  return body.data?.job ?? body
}
