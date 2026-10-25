import { Link, NavLink } from 'react-router-dom'
import ProfileMenu from '../../features/profile/components/ProfileMenu.jsx'

export default function Header() {
  return (
    <header className="navbar">
      <Link className="brand" to="/" aria-label="DevJobs, página de inicio">
        <span className="brand-icon" aria-hidden="true">⚙</span>
        <span>DevJobs</span>
      </Link>
      <nav aria-label="Navegación principal">
        <ul className="nav-links">
          <li><NavLink to="/" end>Inicio</NavLink></li>
          <li><NavLink to="/jobs">Empleos</NavLink></li>
          <li><NavLink to="/companies">Empresas</NavLink></li>
          <li><NavLink to="/salaries">Salarios</NavLink></li>
        </ul>
      </nav>
      <div className="navbar-auth">
        <NavLink className="navbar-login" to="/login">Iniciar sesión</NavLink>
        <NavLink className="navbar-register" to="/register">Registrarse</NavLink>
      </div>
      <ProfileMenu />
    </header>
  )
}
