import { useEffect } from 'react'
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom'
import AppLayout from './layout/AppLayout.jsx'
import HomePage from '../features/home/pages/HomePage.jsx'
import CompaniesPage from '../features/companies/pages/CompaniesPage.jsx'
import LoginPage from '../features/auth/pages/LoginPage.jsx'
import ProfilePage from '../features/profile/pages/ProfilePage.jsx'
import SalariesPage from '../features/salaries/pages/SalariesPage.jsx'
import JobDetailPage from '../features/jobs/pages/JobDetailPage.jsx'
import JobsPage from '../features/jobs/pages/JobsPage.jsx'
import { useJobs } from '../features/jobs/hooks/useJobs.js'
import RegisterPage from '../features/auth/pages/RegisterPage.jsx'
import '../styles/app.css'

const pageTitles = {
  '/': 'DevJobs | Empleos en tecnología',
  '/register': 'Crear cuenta | DevJobs',
  '/login': 'Iniciar sesión | DevJobs',
  '/profile': 'Perfil profesional | DevJobs',
  '/companies': 'Empresas | DevJobs',
  '/salaries': 'Salarios | DevJobs',
  '/jobs': 'Empleos | DevJobs',
}

function JobDetailRoute({ jobs, loading, error }) {
  const { jobId } = useParams()
  const job = jobs.find((item) => item.id === jobId)

  return <JobDetailPage job={job} loading={loading} error={error} />
}

function NotFoundPage() {
  return (
    <main className="job-detail-page">
      <p className="state-message">No encontramos esta página.</p>
      <Link className="back-link" to="/">Volver al inicio</Link>
    </main>
  )
}

export default function App() {
  const { pathname, search } = useLocation()
  const { jobs, loading, error } = useJobs()
  const route = pathname.replace(/\/+$/, '') || '/'
  const detailId = route.match(/^\/jobs\/([^/]+)$/)?.[1]
  const activeJob = jobs.find((job) => encodeURIComponent(job.id) === detailId)
  const pageTitle = activeJob
    ? `${activeJob.title} | DevJobs`
    : pageTitles[route] ?? 'Página no encontrada | DevJobs'

  useEffect(() => {
    document.title = pageTitle
  }, [pageTitle])

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="companies" element={<CompaniesPage jobs={jobs} />} />
        <Route path="salaries" element={<SalariesPage />} />
        <Route
          path="jobs"
          element={(
            <JobsPage
              key={search}
              jobs={jobs}
              loading={loading}
              error={error}
              initialQuery={new URLSearchParams(search).get('q')?.trim().slice(0, 120) ?? ''}
            />
          )}
        />
        <Route
          path="jobs/:jobId"
          element={<JobDetailRoute jobs={jobs} loading={loading} error={error} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
