import { Link } from 'react-router-dom'
import { useLeads } from '../../store/LeadContext'
import { useLanguage } from '../../store/LanguageContext'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import type { LeadStatus } from '../../types/lead'

const statuses: LeadStatus[] = ['New', 'Contacted', 'Booked', 'Lost']

function DashboardPage() {
  const { leads, loaded } = useLeads()
  const { lang, t } = useLanguage()

  const counts: Record<LeadStatus, number> = {
    New: 0,
    Contacted: 0,
    Booked: 0,
    Lost: 0,
  }

  for (const lead of leads) {
    counts[lead.status]++
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-gray-500">{t('common.loading')}</p>
      </div>
    )
  }

  const demoBanner = (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-sm text-amber-800">
      {t('common.demoBanner')}{' '}
      <a href="mailto:contact@jonascode.com?subject=LeadRecover AI setup" className="underline font-medium">
        {lang === 'fr' ? 'contactez-nous' : 'contact us'}
      </a>.
    </div>
  )

  if (leads.length === 0) {
    return (
      <>
      {demoBanner}
      <div className="px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
          <Card>
            <CardContent>
              <div className="py-12 text-center">
                <p className="mb-6 text-lg text-gray-600">
                  {t('dashboard.empty')}
                </p>
                <Link
                  to="/leads/new"
                  className="inline-flex items-center justify-center rounded bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  {t('dashboard.emptyCta')}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
    )
  }

  return (
    <>
      {demoBanner}
      <div className="px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
          <Link
            to="/leads/new"
            className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {t('dashboard.newLead')}
          </Link>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent>
              <p className="text-sm text-gray-500">{t('dashboard.totalLeads')}</p>
              <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
            </CardContent>
          </Card>
          {statuses.map((status) => (
            <Card key={status}>
              <CardContent>
                <div className="mb-1">
                  <Badge variant={status}>{t(`common.status.${status}`)}</Badge>
                </div>
                <p className="text-2xl font-bold text-gray-900">{counts[status]}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="mb-4 text-lg font-semibold text-gray-900">{t('dashboard.quickActions')}</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            to="/leads"
            className="block rounded-lg border border-gray-200 bg-white px-4 py-3 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            {t('dashboard.viewLeads')}
          </Link>
          <Link
            to="/tools/reply"
            className="block rounded-lg border border-gray-200 bg-white px-4 py-3 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            {t('dashboard.replyTool')}
          </Link>
          <Link
            to="/tools/review"
            className="block rounded-lg border border-gray-200 bg-white px-4 py-3 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            {t('dashboard.reviewTool')}
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default DashboardPage
