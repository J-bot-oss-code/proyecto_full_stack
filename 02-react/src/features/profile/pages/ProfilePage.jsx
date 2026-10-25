import { Link } from 'react-router-dom'
import { getInitials } from '../services/avatarService.js'
import { getSavedProfile } from '../services/profileStorage.js'
import './ProfilePage.css'

const sampleProjects = [
  {
    name: 'DevJobs — plataforma de empleo',
    description: 'Aplicación web para descubrir oportunidades de trabajo en tecnología.',
    technologies: ['React', 'Vite', 'CSS'],
    href: 'https://github.com/',
  },
  {
    name: 'API de proyectos personales',
    description: 'Ejemplo de API REST para organizar tareas y proyectos de aprendizaje.',
    technologies: ['Node.js', 'JavaScript', 'SQL'],
    href: 'https://github.com/',
  },
]

const sampleCertificates = [
  { name: 'Desarrollo Frontend con React', issuer: 'Academia de tecnología', year: '2025' },
  { name: 'Fundamentos de Git y GitHub', issuer: 'Programa de aprendizaje', year: '2024' },
]

export default function ProfilePage() {
  const savedProfile = getSavedProfile()
  const displayName = savedProfile?.name ?? 'Alex Morgan'
  const avatarSrc = savedProfile?.avatarSrc

  return (
    <main className="professional-profile">
      <div className="profile-demo-banner">
        <span aria-hidden="true">ⓘ</span>
        Perfil de demostración. El contenido se conectará a la cuenta del usuario cuando implementemos el backend.
      </div>

      <section className="professional-profile-header">
        <div className="profile-cover" />
        <div className="professional-profile-summary">
          <div className="professional-avatar">
            {avatarSrc
              ? <img src={avatarSrc} alt={`Avatar de ${displayName}`} />
              : <span>{getInitials(displayName)}</span>}
          </div>
          <div className="professional-identity">
            <p className="eyebrow">Perfil profesional</p>
            <h1>{displayName}</h1>
            <p>Desarrollador/a Full Stack · React · JavaScript · Node.js</p>
            <span className="profile-location">⌖ Madrid, España · Disponible para oportunidades</span>
          </div>
          <button className="profile-edit-link" type="button" disabled>
            Editar perfil <span aria-hidden="true">↗</span>
          </button>
        </div>
        <div className="profile-skills" aria-label="Tecnologías principales">
          {['React', 'JavaScript', 'Node.js', 'SQL', 'CSS'].map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <div className="professional-profile-grid">
        <div className="profile-main-column">
          <section className="profile-content-card" aria-labelledby="about-profile-heading">
            <div className="profile-card-heading">
              <h2 id="about-profile-heading">Acerca de</h2>
              <button type="button" aria-label="Editar acerca de" disabled>✎</button>
            </div>
            <p className="profile-about">
              Profesional de tecnología con interés en crear productos útiles y accesibles.
              Disfruto aprender nuevas herramientas, colaborar en equipo y transformar ideas
              en experiencias digitales claras. Actualmente estoy ampliando mi experiencia
              construyendo aplicaciones web con React y servicios backend.
            </p>
          </section>

          <section className="profile-content-card" aria-labelledby="projects-heading">
            <div className="profile-card-heading">
              <div>
                <h2 id="projects-heading">Proyectos</h2>
                <p>Repositorios y trabajos destacados</p>
              </div>
              <button type="button" aria-label="Agregar proyecto" disabled>＋</button>
            </div>
            <div className="profile-project-list">
              {sampleProjects.map((project) => (
                <article className="profile-project" key={project.name}>
                  <div className="profile-project-icon" aria-hidden="true">⌘</div>
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="profile-project-tags">
                      {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                    </div>
                    <a href={project.href} target="_blank" rel="noreferrer">
                      Ver repositorio <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="profile-content-card" aria-labelledby="certificates-heading">
            <div className="profile-card-heading">
              <div>
                <h2 id="certificates-heading">Licencias y certificados</h2>
                <p>Aprendizaje y desarrollo profesional</p>
              </div>
              <button type="button" aria-label="Agregar certificado" disabled>＋</button>
            </div>
            <div className="profile-certificate-list">
              {sampleCertificates.map((certificate) => (
                <article className="profile-certificate" key={certificate.name}>
                  <div className="certificate-icon" aria-hidden="true">✓</div>
                  <div>
                    <h3>{certificate.name}</h3>
                    <p>{certificate.issuer}</p>
                    <span>Emitido en {certificate.year}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="profile-side-column">
          <section className="profile-content-card resume-card" aria-labelledby="resume-heading">
            <div className="profile-card-heading">
              <div>
                <h2 id="resume-heading">Currículum</h2>
                <p>Destaca tu experiencia profesional</p>
              </div>
              <span className="resume-file-icon" aria-hidden="true">PDF</span>
            </div>
            <div className="resume-preview">
              <span aria-hidden="true">▤</span>
              <div>
                <strong>Mi_CV_Profesional.pdf</strong>
                <span>Vista previa de ejemplo · PDF</span>
              </div>
            </div>
            <button className="profile-outline-button" type="button" disabled>
              Subir o reemplazar CV
            </button>
            <p className="profile-small-note">La carga de archivos estará disponible al conectar el backend.</p>
          </section>

          <section className="profile-content-card profile-completion" aria-labelledby="completion-heading">
            <p className="eyebrow">Tu perfil</p>
            <h2 id="completion-heading">Haz que tu experiencia destaque</h2>
            <p>Completa las secciones para que reclutadores conozcan mejor tu trabajo.</p>
            <div className="completion-meter"><span /></div>
            <strong>Perfil de ejemplo · 80%</strong>
          </section>

          <section className="profile-content-card profile-links-card">
            <h2>¿Buscas tu siguiente reto?</h2>
            <p>Explora vacantes que coincidan con tus habilidades.</p>
            <Link className="profile-primary-button" to="/jobs">Ver empleos</Link>
          </section>
        </aside>
      </div>
    </main>
  )
}
