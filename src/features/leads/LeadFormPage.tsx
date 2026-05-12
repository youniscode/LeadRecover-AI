import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLeads } from '../../store/LeadContext'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import type { LeadFormData } from '../../types/lead'

function LeadFormPage() {
  const navigate = useNavigate()
  const { addLead } = useLeads()

  const [form, setForm] = useState<LeadFormData>({
    name: '',
    phone: '',
    email: '',
    businessName: '',
    notes: '',
  })
  const [error, setError] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Name is required')
      return
    }
    addLead(form)
    navigate('/leads')
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Add Lead</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Input
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Lead name"
              error={error}
            />
            <Input
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 555-0100"
            />
            <Input
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="lead@example.com"
            />
            <Input
              label="Business Name"
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              placeholder="Their business name"
            />
            <Input
              label="Notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              textarea
              placeholder="Any additional information"
            />
            <div className="flex gap-3">
              <Button type="submit">Save Lead</Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/leads')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LeadFormPage
