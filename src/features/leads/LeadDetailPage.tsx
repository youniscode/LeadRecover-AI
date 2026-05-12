import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useLeads } from '../../store/LeadContext'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import type { LeadStatus } from '../../types/lead'

const statusOptions: LeadStatus[] = ['New', 'Contacted', 'Booked', 'Lost']

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function LeadDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getLeadById, updateStatus, deleteLead } = useLeads()
  const [deleting, setDeleting] = useState(false)

  const lead = id ? getLeadById(id) : undefined

  if (!lead) {
    return (
      <div className="px-4 py-12">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">Lead not found</h1>
          <p className="mb-6 text-gray-600">
            This lead may have been deleted or the link is incorrect.
          </p>
          <Link
            to="/leads"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            &larr; Back to Leads
          </Link>
        </div>
      </div>
    )
  }

  const currentLead = lead

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    updateStatus(currentLead.id, e.target.value as LeadStatus)
  }

  function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this lead?')) return
    setDeleting(true)
    deleteLead(currentLead.id)
    navigate('/leads')
  }

  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-lg">
        <Link
          to="/leads"
          className="mb-6 inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          &larr; Back to Leads
        </Link>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle>{lead.name}</CardTitle>
                {lead.businessName && (
                  <p className="mt-1 text-sm text-gray-500">{lead.businessName}</p>
                )}
              </div>
              <Badge variant={lead.status}>{lead.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Phone
                </p>
                <p className="text-sm text-gray-900">{lead.phone || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Email
                </p>
                <p className="text-sm text-gray-900">{lead.email || '—'}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Notes
              </p>
              <p className="whitespace-pre-wrap text-sm text-gray-900">
                {lead.notes || '—'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Created
                </p>
                <p className="text-sm text-gray-900">{formatDate(lead.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Updated
                </p>
                <p className="text-sm text-gray-900">{formatDate(lead.updatedAt)}</p>
              </div>
            </div>

            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                Status
              </p>
              <select
                value={lead.status}
                onChange={handleStatusChange}
                className="block w-full rounded border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2">
              <Button variant="danger" onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Delete Lead'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LeadDetailPage
