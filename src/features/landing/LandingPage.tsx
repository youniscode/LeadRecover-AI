import { Link } from 'react-router-dom'
import { Card, CardContent } from '../../components/ui/Card'
import { useLanguage } from '../../store/LanguageContext'
import { translations } from '../../lib/translations'

function LandingPage() {
  const { lang, t } = useLanguage()
  const l = translations[lang].landing

  return (
    <div>
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-sm text-amber-800">
        {t('common.demoBanner')}{' '}
        <a href="mailto:contact@jonascode.com?subject=LeadRecover AI setup" className="underline font-medium">
          {lang === 'fr' ? 'contactez-nous' : 'contact us'}
        </a>.
      </div>
      <section className="bg-gradient-to-b from-blue-50 to-white px-4 py-20 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {t('landing.hero.title')}
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          {t('landing.hero.subtitle')}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center rounded bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {t('landing.hero.ctaDemo')}
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 border border-gray-300"
          >
            {t('landing.hero.ctaDashboard')}
          </Link>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-2 text-center text-3xl font-bold text-gray-900">
            {t('landing.problem.title')}
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-gray-600">
            {t('landing.problem.text')}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {l.features.map((f: { title: string; description: string }) => (
              <Card key={f.title}>
                <CardContent>
                  <h3 className="mb-2 font-semibold text-gray-900">{f.title}</h3>
                  <p className="text-sm text-gray-600">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            {t('landing.howItWorks')}
          </h2>
          <div className="grid gap-8 sm:grid-cols-4">
            {l.steps.map((s: { title: string; description: string }, i: number) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mb-1 font-semibold text-gray-900">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">
          {t('landing.cta.title')}
        </h2>
        <p className="mb-8 text-gray-600">
          {t('landing.cta.subtitle')}
        </p>
        <Link
          to="/pricing"
          className="inline-flex items-center justify-center rounded bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          {t('landing.cta.button')}
        </Link>
      </section>

      <section className="bg-blue-600 px-4 py-20 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">
          {t('landing.service.title')}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
          {t('landing.service.text')}
        </p>
        <a
          href="mailto:contact@jonascode.com?subject=LeadRecover AI setup request"
          className="inline-flex items-center justify-center rounded bg-white px-6 py-3 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
        >
          {t('landing.service.button')}
        </a>
      </section>
    </div>
  )
}

export default LandingPage
