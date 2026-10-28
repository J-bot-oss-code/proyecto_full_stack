import { useEffect, useState } from 'react'
import { getJobs } from '../api/jobRepository.js'

export function useJobs(jobRepository = getJobs) {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isCurrent = true

    jobRepository()
      .then((loadedJobs) => {
        if (isCurrent) setJobs(loadedJobs)
      })
      .catch((cause) => {
        console.error('No se pudieron cargar los empleos desde la API.', cause)
        if (isCurrent) {
          setError('No se pudieron cargar los empleos. Comprueba la conexión con la API y vuelve a intentarlo.')
        }
      })
      .finally(() => {
        if (isCurrent) setLoading(false)
      })

    return () => {
      isCurrent = false
    }
  }, [jobRepository])

  return { jobs, loading, error }
}
