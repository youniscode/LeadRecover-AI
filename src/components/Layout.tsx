import { Link, Outlet } from 'react-router-dom'
import { useLanguage } from '../store/LanguageContext'

const navLinkClasses = 'text-sm text-gray-600 hover:text-gray-900 transition-colors'

function LangSwitcher() {
  const { lang, setLang } = useLanguage()
  return (
    <span className="ml-4 text-xs text-gray-400">
      <button
        onClick={() => setLang('fr')}
        className={`transition-colors ${lang === 'fr' ? 'font-bold text-gray-900' : 'hover:text-gray-700'}`}
      >
        FR
      </button>
      <span className="mx-1">|</span>
      <button
        onClick={() => setLang('en')}
        className={`transition-colors ${lang === 'en' ? 'font-bold text-gray-900' : 'hover:text-gray-700'}`}
      >
        EN
      </button>
    </span>
  )
}

function PublicLayout() {
  const { t } = useLanguage()
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-xl font-bold text-gray-900">
            {t('layout.brand')}
          </Link>
          <nav className="flex flex-wrap items-center gap-4">
            <Link to="/" className={navLinkClasses}>
              {t('layout.home')}
            </Link>
            <Link to="/pricing" className={navLinkClasses}>
              {t('layout.pricing')}
            </Link>
            <Link to="/dashboard" className={navLinkClasses}>
              {t('layout.dashboard')}
            </Link>
            <LangSwitcher />
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
  const { t } = useLanguage()
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/dashboard" className="text-xl font-bold text-gray-900">
            {t('layout.brand')}
          </Link>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link to="/dashboard" className={navLinkClasses}>
              {t('layout.dashboard')}
            </Link>
            <Link to="/leads" className={navLinkClasses}>
              {t('layout.leads')}
            </Link>
            <Link to="/leads/new" className={navLinkClasses}>
              {t('layout.addLead')}
            </Link>
            <Link to="/tools/reply" className={navLinkClasses}>
              {t('layout.reply')}
            </Link>
            <Link to="/tools/review" className={navLinkClasses}>
              {t('layout.review')}
            </Link>
            <LangSwitcher />
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
