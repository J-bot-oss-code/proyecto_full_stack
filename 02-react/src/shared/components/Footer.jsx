import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <span>© 2025 DevJobs. Todos los derechos reservados.</span>
      <Link to="/jobs">Explorar empleos</Link>
    </footer>
  )
}
