import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../../components/shared/Navbar/Navbar'
import Footer from '../../components/shared/Footer/Footer'
import './PublicLayout.css'

const BARE_ROUTES = new Set(['/'])

function PublicLayout() {
  const { pathname } = useLocation()
  const isBare = BARE_ROUTES.has(pathname)

  return (
    <div className="public-layout">
      {isBare ? null : <Navbar />}

      <main className={`public-layout__main ${isBare ? 'public-layout__main--bare' : ''}`}>
        <Outlet />
      </main>

      {isBare ? null : <Footer />}
    </div>
  )
}

export default PublicLayout
