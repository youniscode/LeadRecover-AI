import { Link, Outlet } from 'react-router-dom'

const navLinkClasses = 'text-sm text-gray-600 hover:text-gray-900 transition-colors'

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-xl font-bold text-gray-900">
            LeadRecover AI
          </Link>
          <nav className="flex flex-wrap gap-4">
            <Link to="/" className={navLinkClasses}>
              Home
            </Link>
            <Link to="/pricing" className={navLinkClasses}>
              Pricing
            </Link>
            <Link to="/dashboard" className={navLinkClasses}>
              Dashboard
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-gray-200 bg-gray-50 py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} LeadRecover AI
      </footer>
    </div>
  )
}

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/dashboard" className="text-xl font-bold text-gray-900">
            LeadRecover AI
          </Link>
          <nav className="flex flex-wrap gap-x-4 gap-y-1">
            <Link to="/dashboard" className={navLinkClasses}>
              Dashboard
            </Link>
            <Link to="/leads" className={navLinkClasses}>
              Leads
            </Link>
            <Link to="/leads/new" className={navLinkClasses}>
              Add Lead
            </Link>
            <Link to="/tools/reply" className={navLinkClasses}>
              Reply
            </Link>
            <Link to="/tools/review" className={navLinkClasses}>
              Review
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}

export { PublicLayout, AppLayout }
