import { useEffect } from 'react'
import AppLayout from './layout/AppLayout.jsx'
import { useBrowserRouter } from './routing/useBrowserRouter.js'
import HomePage from '../features/home/pages/HomePage.jsx'
import JobDetailPage from '../features/jobs/pages/JobDetailPage.jsx'
import JobsPage from '../features/jobs/pages/JobsPage.jsx'
import { useJobs } from '../features/jobs/hooks/useJobs.js'
import RegisterPage from '../features/auth/pages/RegisterPage.jsx'
import '../styles/app.css'

function NotFoundPage({ navigate }) {
  return (
    <main className="job-detail-page">
      <p className="state-message">No encontramos esta página.</p>
      <a className="back-link" href="/" onClick={navigate}>Volver al inicio</a>
    </main>
  )
}

export default function App() {
  const { pathname, search, navigate } = useBrowserRouter()
  const { jobs, loading, error } = useJobs()
  const route = pathname.replace(/\/+$/, '') || '/'
  const detailMatch = route.match(/^\/jobs\/([^/]+)$/)
  const detailId = detailMatch?.[1] ?? null
  const activeJob = detailId
    ? jobs.find((job) => encodeURIComponent(job.id) === detailId)
    : null
  const pageTitle = activeJob
    ? `${activeJob.title} | DevJobs`
    : route === '/jobs'
      ? 'Empleos | DevJobs'
      : route === '/register'
        ? 'Crear cuenta | DevJobs'
      : route === '/'
        ? 'DevJobs | Empleos en tecnología'
        : 'Página no encontrada | DevJobs'

  useEffect(() => {
    document.title = pageTitle
  }, [pageTitle])

  let page
  if (route === '/') {
    page = <HomePage navigate={navigate} />
  } else if (route === '/register') {
    page = <RegisterPage />
  } else if (route === '/jobs') {
    page = (
      <JobsPage
        key={search}
        jobs={jobs}
        loading={loading}
        error={error}
        initialQuery={new URLSearchParams(search).get('q')?.trim().slice(0, 120) ?? ''}
        navigate={navigate}
      />
    )
  } else if (detailId) {
    page = <JobDetailPage job={activeJob} loading={loading} error={error} navigate={navigate} />
  } else {
    page = <NotFoundPage navigate={navigate} />
  }

  return <AppLayout path={route} navigate={navigate}>{page}</AppLayout>
}
