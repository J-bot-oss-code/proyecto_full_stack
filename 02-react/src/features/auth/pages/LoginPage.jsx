import { Link } from 'react-router-dom'
import './LoginPage.css'

export default function LoginPage() {
  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <main className="auth-page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-mark" aria-hidden="true">⚙</div>
        <p className="eyebrow">Qué bueno tenerte de vuelta</p>
        <h1 id="login-title">Inicia sesión</h1>
        <p className="register-description">
          Accede a tu perfil y continúa explorando oportunidades.
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Correo electrónico</label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="nombre@ejemplo.com"
            required
          />

          <div className="login-password-label">
            <label htmlFor="login-password">Contraseña</label>
            <span className="login-recovery">¿Olvidaste tu contraseña?</span>
          </div>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Escribe tu contraseña"
            required
          />

          <button type="submit">Iniciar sesión</button>
        </form>
        <p className="register-login">
          ¿Aún no tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
        <p className="prototype-note">Diseño de demostración: el inicio de sesión se conectará al backend más adelante.</p>
      </section>
    </main>
  )
}
