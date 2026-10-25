import ProfileMenu from '../../features/profile/components/ProfileMenu.jsx'

export default function Header({ path, navigate }) {
  return (
    <header className="navbar">
      <a className="brand" href="/" onClick={navigate} aria-label="DevJobs, página de inicio">
        <span className="brand-icon" aria-hidden="true">⚙</span>
        <span>DevJobs</span>
      </a>
      <nav aria-label="Navegación principal">
        <ul className="nav-links">
          <li><a className={path === '/' ? 'active' : ''} href="/" onClick={navigate}>Inicio</a></li>
          <li>
            <a className={path.startsWith('/jobs') ? 'active' : ''} href="/jobs" onClick={navigate}>
              Empleos
            </a>
          </li>
          <li><a href="/jobs" onClick={navigate}>Empresas</a></li>
          <li><a href="/jobs" onClick={navigate}>Salarios</a></li>
          <li>
            <a
              className={path === '/register' ? 'active' : ''}
              href="/register"
              onClick={navigate}
            >
              Registrarse
            </a>
          </li>
        </ul>
      </nav>
      <ProfileMenu />
    </header>
  )
}
