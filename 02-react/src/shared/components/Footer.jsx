export default function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <span>© 2025 DevJobs. Todos los derechos reservados.</span>
      <a href="/jobs" onClick={navigate}>Explorar empleos</a>
    </footer>
  )
}
