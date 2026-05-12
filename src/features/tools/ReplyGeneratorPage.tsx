import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLeads } from '../../store/LeadContext'
import { generateReply } from '../../lib/templates'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import type { ReplyContext } from '../../types/lead'

const contextOptions: { value: ReplyContext; label: string }[] = [
  { value: 'price_inquiry', label: 'Price Inquiry' },
  { value: 'scheduling', label: 'Scheduling' },
  { value: 'follow_up', label: 'Follow-up' },
  { value: 'general', label: 'General' },
]

function ReplyGeneratorPage() {
  const { leads } = useLeads()
  const [selectedId, setSelectedId] = useState('')
  const [context, setContext] = useState<ReplyContext>('general')
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
          <h1 className="mb-4 text-2xl font-bold text-gray-900">Reply Generator</h1>
          <p className="mb-6 text-gray-600">
            No leads yet. Create a lead first to generate replies.
          </p>
          <Link
            to="/leads/new"
            className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Create a Lead
          </Link>
        </div>
      </div>
    )
  }

  function handleGenerate() {
    if (!selectedId) return
    const lead = leads.find((l) => l.id === selectedId)
    if (!lead) return
    setMessage(generateReply(lead, context))
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
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Reply Generator</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Lead</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label
                htmlFor="lead-select"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Lead
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
                <option value="">Select a lead...</option>
                {sortedLeads.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}{l.businessName ? ` — ${l.businessName}` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="context-select"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Context
              </label>
              <select
                id="context-select"
                value={context}
                onChange={(e) => {
                  setContext(e.target.value as ReplyContext)
                  setMessage('')
                  setCopied(false)
                }}
                className="block w-full rounded border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {contextOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <Button onClick={handleGenerate} disabled={!selectedId}>
              Generate Reply
            </Button>
          </CardContent>
        </Card>

        {message && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Reply</CardTitle>
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
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </Button>
                {copied && (
                  <span className="text-sm text-green-600">
                    Message copied
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

export default ReplyGeneratorPage
