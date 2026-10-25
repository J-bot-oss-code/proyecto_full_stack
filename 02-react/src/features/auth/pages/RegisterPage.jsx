import { Link } from 'react-router-dom'
import './RegisterPage.css'

export default function RegisterPage() {
  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <main className="auth-page">
      <section className="register-card" aria-labelledby="register-title">
        <p className="eyebrow">Únete a DevJobs</p>

        <h1 id="register-title">Crea tu cuenta</h1>

        <p className="register-description">
          Regístrate para encontrar oportunidades en tecnología.
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="register-name">Nombre completo</label>
          <input
            id="register-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Tu nombre"
            required
          />

          <label htmlFor="register-email">Correo electrónico</label>
          <input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="nombre@ejemplo.com"
            required
          />

          <label htmlFor="register-password">Contraseña</label>
          <input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Crea una contraseña"
            required
          />

          <label htmlFor="register-password-confirmation">
            Confirmar contraseña
          </label>
          <input
            id="register-password-confirmation"
            name="passwordConfirmation"
            type="password"
            autoComplete="new-password"
            placeholder="Escribe tu contraseña otra vez"
            required
          />

          <label className="terms-control" htmlFor="register-terms">
            <input id="register-terms" name="terms" type="checkbox" required />
            <span>Acepto los términos y condiciones</span>
          </label>

          <button type="submit">Crear cuenta</button>
        </form>
        <p className="register-login">
          ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </section>
    </main>
  )
}
