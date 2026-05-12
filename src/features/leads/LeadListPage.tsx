import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLeads } from '../../store/LeadContext'
import { useLanguage } from '../../store/LanguageContext'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import type { LeadStatus } from '../../types/lead'

const statusFilters: Array<LeadStatus | 'All'> = ['All', 'New', 'Contacted', 'Booked', 'Lost']

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function LeadListPage() {
  const { leads, loaded } = useLeads()
  const { t } = useLanguage()
  const [filter, setFilter] = useState<LeadStatus | 'All'>('All')

  const filtered = useMemo(() => {
    const sorted = [...leads].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    if (filter === 'All') return sorted
    return sorted.filter((l) => l.status === filter)
  }, [leads, filter])

  if (!loaded) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-gray-500">{t('common.loading')}</p>
      </div>
    )
  }

  if (leads.length === 0) {
    return (
      <div className="px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-2xl font-bold text-gray-900">{t('leads.title')}</h1>
          <Card>
            <CardContent>
              <div className="py-12 text-center">
                <p className="mb-6 text-lg text-gray-600">
                  {t('leads.empty')}
                </p>
                <Link
                  to="/leads/new"
                  className="inline-flex items-center justify-center rounded bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  {t('leads.emptyCta')}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">{t('leads.title')}</h1>
          <Link
            to="/leads/new"
            className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {t('leads.addLead')}
          </Link>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                filter === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t(`common.status.${s}`)}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <Card>
            <CardContent>
              <p className="py-8 text-center text-gray-500">
                {t('leads.emptyFilter')}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {filtered.map((lead) => (
              <Link
                key={lead.id}
                to={`/leads/${lead.id}`}
                className="block rounded-lg border border-gray-200 bg-white px-4 py-3 transition-colors hover:bg-gray-50"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-gray-900">{lead.name}</p>
                    {lead.businessName && (
                      <p className="truncate text-sm text-gray-500">
                        {lead.businessName}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={lead.status}>{t(`common.status.${lead.status}`)}</Badge>
                    <span className="hidden text-xs text-gray-400 sm:inline">
                      {formatDate(lead.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default LeadListPage
