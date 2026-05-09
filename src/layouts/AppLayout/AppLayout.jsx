import { Outlet, useLocation } from 'react-router-dom'
import AppHeader from '../../components/shared/AppHeader/AppHeader'
import BottomNav from '../../components/shared/BottomNav/BottomNav'
import './AppLayout.css'

// Routes that show the top app header + bottom nav (full app shell)
const APP_SHELL_ROUTES = ['/dashboard', '/savings', '/settings']

function AppLayout() {
  const { pathname } = useLocation()

  const inAppShell = APP_SHELL_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  )

  return (
    <div className="app-layout">
      <div className="app-layout__shell">
        {inAppShell ? <AppHeader /> : null}

        <main
          className={`app-layout__main ${inAppShell ? 'app-layout__main--with-nav' : ''}`}
        >
          <Outlet />
        </main>

        {inAppShell ? <BottomNav /> : null}
      </div>
    </div>
  )
}

export default AppLayout
