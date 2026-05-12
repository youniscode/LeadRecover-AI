import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { useLanguage } from '../../store/LanguageContext'
import { translations } from '../../lib/translations'

interface PlanProps {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  to: string
  highlighted?: boolean
}

function PricingPage() {
  const { lang, t } = useLanguage()
  const p = translations[lang].pricing

  const plans: PlanProps[] = [
    {
      name: p.free.name,
      price: p.free.price,
      period: p.free.period,
      description: p.free.description,
      features: p.free.features,
      cta: p.free.cta,
      to: '/dashboard',
    },
    {
      name: p.setup.name,
      price: p.setup.price,
      period: p.setup.period,
      description: p.setup.description,
      features: p.setup.features,
      cta: p.setup.cta,
      to: 'mailto:contact@jonascode.com?subject=LeadRecover AI setup request',
      highlighted: true,
    },
    {
      name: p.custom.name,
      price: p.custom.price,
      period: p.custom.period,
      description: p.custom.description,
      features: p.custom.features,
      cta: p.custom.cta,
      to: 'mailto:contact@jonascode.com?subject=LeadRecover AI custom setup',
    },
  ]

  return (
    <div className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-center text-4xl font-bold text-gray-900">
          {t('pricing.title')}
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
          {t('pricing.subtitle')}
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${plan.highlighted ? 'border-blue-500 ring-1 ring-blue-500' : ''}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                  {t('pricing.mostPopular')}
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="ml-1 text-sm text-gray-500">{plan.period}</span>}
                </div>
                <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <ul className="mb-6 flex-1 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-0.5 text-blue-600">&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.to.startsWith('mailto:') ? (
                  <a
                    href={plan.to}
                    className={`block w-full rounded px-4 py-2 text-center text-sm font-medium transition-colors ${plan.highlighted ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    {plan.cta}
                  </a>
                ) : (
                  <Link
                    to={plan.to}
                    className={`block w-full rounded px-4 py-2 text-center text-sm font-medium transition-colors ${plan.highlighted ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    {plan.cta}
                  </Link>
                )}
                <Link
                  to="/leads"
                  className="mt-2 block w-full rounded px-4 py-2 text-center text-sm text-gray-500 transition-colors hover:text-gray-700"
                >
                  {t('pricing.viewLeads')}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-gray-400">
          {t('pricing.footer')}
        </p>
      </div>
    </div>
  )
}

export default PricingPage
