import { Outlet } from 'react-router-dom'
import Footer from '../../shared/components/Footer.jsx'
import Header from '../../shared/components/Header.jsx'

export default function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
