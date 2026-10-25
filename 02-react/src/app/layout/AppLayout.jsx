import Footer from '../../shared/components/Footer.jsx'
import Header from '../../shared/components/Header.jsx'

export default function AppLayout({ path, navigate, children }) {
  return (
    <>
      <Header path={path} navigate={navigate} />
      {children}
      <Footer navigate={navigate} />
    </>
  )
}
