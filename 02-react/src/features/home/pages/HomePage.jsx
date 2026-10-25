import devjobsImage from '../../../assets/devjobs.png'

const benefits = [
  {
    icon: '✦',
    title: 'Conecta con las mejores oportunidades',
    quotes: [
      '“DevJobs me permitió conectarme con empresas líderes en tecnología y encontrar oportunidades que se ajustan a mis habilidades.” — Juan P.',
      '“La plataforma es fácil de usar y me ayudó a descubrir empleos que nunca habría encontrado por mi cuenta.” — Maria S.',
      '“Gracias a DevJobs, pude conectarme con empleadores de todo el mundo y expandir mis horizontes profesionales.” — Pedro L.',
    ],
  },
  {
    icon: '⌘',
    title: 'Encuentra el trabajo de tus sueños',
    quotes: [
      '“DevJobs me ayudó a encontrar un trabajo que se ajusta perfectamente a mis habilidades y pasiones.” — Ana G.',
      '“La plataforma es fácil de usar y me permitió conectarme con empleadores de todo el mundo.” — Luis M.',
      '“Gracias a DevJobs, pude avanzar en mi carrera y encontrar un trabajo que realmente disfruto.” — Sofia R.',
    ],
  },
  {
    icon: '↗',
    title: 'Obtén los salarios que te mereces',
    quotes: [
      '“DevJobs me ayudó a negociar un salario justo y competitivo para mi nuevo trabajo.” — Carlos T.',
      '“La información sobre salarios y beneficios en DevJobs me permitió tomar decisiones informadas sobre mi carrera.” — Maria L.',
      '“Gracias a DevJobs, pude encontrar un trabajo que no solo es gratificante, sino también bien remunerado.” — Javier P.',
    ],
  },
]

export default function HomePage({ navigate }) {
  function handleSearch(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const query = String(form.get('q') ?? '').trim().slice(0, 120)
    navigate(`/jobs${query ? `?q=${encodeURIComponent(query)}` : ''}`)
  }

  return (
    <main className="home-page">
      <section className="home-hero">
        <img src={devjobsImage} alt="" className="logo-img" />
        <p className="eyebrow">Tu próxima oportunidad empieza aquí</p>
        <h1>Encuentra tu trabajo ideal</h1>
        <p className="home-intro">
          En DevJobs, nos dedicamos a conectar a los mejores talentos con las oportunidades
          laborales más emocionantes en el mundo de la tecnología. Ya sea que estés buscando
          tu primer empleo, un cambio de carrera o una oportunidad para crecer profesionalmente,
          estamos aquí para ayudarte a encontrar el trabajo ideal que se ajuste a tus habilidades
          y aspiraciones.
        </p>
        <form className="home-search" role="search" onSubmit={handleSearch}>
          <label className="visually-hidden" htmlFor="home-job-search">Buscar empleos</label>
          <input
            id="home-job-search"
            name="q"
            type="search"
            maxLength="120"
            placeholder="Puesto, empresa o tecnología"
          />
          <button type="submit">Buscar empleos</button>
        </form>
      </section>

      <section className="why-devjobs" aria-labelledby="why-heading">
        <p className="eyebrow">Conecta con tu futuro</p>
        <h2 id="why-heading">¿Por qué DevJobs?</h2>
        <p className="why-intro">
          DevJobs es la principal plataforma de búsqueda de empleo para profesionales de la
          tecnología. Con una amplia gama de ofertas de trabajo en desarrollo web, diseño UX/UI,
          inteligencia artificial, ciberseguridad y más, conectamos a los candidatos con las
          empresas líderes en la industria tecnológica.
        </p>
        <div className="benefit-grid">
          {benefits.map(({ icon, title, quotes }) => (
            <article className="benefit-card" key={title}>
              <span className="benefit-icon" aria-hidden="true">{icon}</span>
              <h3>{title}</h3>
              <div className="benefit-quotes">
                {quotes.map((quote) => <p key={quote}>{quote}</p>)}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
