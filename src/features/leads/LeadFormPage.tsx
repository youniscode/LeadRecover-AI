import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLeads } from '../../store/LeadContext'
import { useLanguage } from '../../store/LanguageContext'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import type { LeadFormData } from '../../types/lead'

function LeadFormPage() {
  const navigate = useNavigate()
  const { addLead } = useLeads()
  const { t } = useLanguage()

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
      setError(t('leads.form.nameRequired'))
      return
    }
    addLead(form)
    navigate('/leads')
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>{t('leads.form.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Input
              label={t('leads.form.name')}
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder={t('leads.form.namePlaceholder')}
              error={error}
            />
            <Input
              label={t('leads.form.phone')}
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder={t('leads.form.phonePlaceholder')}
            />
            <Input
              label={t('leads.form.email')}
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder={t('leads.form.emailPlaceholder')}
            />
            <Input
              label={t('leads.form.businessName')}
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              placeholder={t('leads.form.businessPlaceholder')}
            />
            <Input
              label={t('leads.form.notes')}
              name="notes"
              value={form.notes}
              onChange={handleChange}
              textarea
              placeholder={t('leads.form.notesPlaceholder')}
            />
            <div className="flex gap-3">
              <Button type="submit">{t('leads.form.save')}</Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/leads')}
              >
                {t('leads.form.cancel')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LeadFormPage
