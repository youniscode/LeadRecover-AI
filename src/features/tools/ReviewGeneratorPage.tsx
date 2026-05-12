import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLeads } from '../../store/LeadContext'
import { useLanguage } from '../../store/LanguageContext'
import { translations } from '../../lib/translations'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

function ReviewGeneratorPage() {
  const { leads } = useLeads()
  const { lang, t } = useLanguage()
  const [selectedId, setSelectedId] = useState('')
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const sortedLeads = useMemo(
    () => [...leads].sort((a, b) => a.name.localeCompare(b.name)),
    [leads],
  )

  if (leads.length === 0) {
    return (
      <div className="px-4 py-12">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            {t('review.title')}
          </h1>
          <p className="mb-6 text-gray-600">
            {t('review.empty')}
          </p>
          <Link
            to="/leads/new"
            className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {t('review.emptyCta')}
          </Link>
        </div>
      </div>
    )
  }

  function handleGenerate() {
    if (!selectedId) return
    const lead = leads.find((l) => l.id === selectedId)
    if (!lead) return
    setMessage(translations[lang].templates.reviewRequest(lead.name, lead.businessName))
    setCopied(false)
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available
    }
  }

  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-lg">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          {t('review.title')}
        </h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t('review.selectLead')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label
                htmlFor="lead-select"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                {t('review.lead')}
              </label>
              <select
                id="lead-select"
                value={selectedId}
                onChange={(e) => {
                  setSelectedId(e.target.value)
                  setMessage('')
                  setCopied(false)
                }}
                className="block w-full rounded border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">{t('review.selectPlaceholder')}</option>
                {sortedLeads.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}{l.businessName ? ` — ${l.businessName}` : ''}
                  </option>
                ))}
              </select>
            </div>

            <Button onClick={handleGenerate} disabled={!selectedId}>
              {t('review.generate')}
            </Button>
          </CardContent>
        </Card>

        {message && (
          <Card>
            <CardHeader>
              <CardTitle>{t('review.generatedTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                readOnly
                value={message}
                rows={5}
                className="mb-4 block w-full rounded border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="flex items-center gap-3">
                <Button onClick={handleCopy}>
                  {copied ? t('review.copied') : t('review.copy')}
                </Button>
                {copied && (
                  <span className="text-sm text-green-600">
                    {t('review.copiedMsg')}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default ReviewGeneratorPage
