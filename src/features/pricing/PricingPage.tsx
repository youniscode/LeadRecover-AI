import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'

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

const plans: PlanProps[] = [
  {
    name: 'Free',
    price: '€0',
    period: 'forever',
    description: 'For testing and solo use.',
    features: [
      'Lead capture form',
      'Pipeline management',
      'Reply templates',
      'Review request templates',
      'LocalStorage persistence',
    ],
    cta: 'Try the demo',
    to: '/dashboard',
  },
  {
    name: '€99 setup service',
    price: '€99',
    period: 'one-time',
    description: 'Done-for-you setup with a 20-minute walkthrough.',
    features: [
      'Everything in Free',
      'Custom follow-up message for your business',
      'Google review request message written for you',
      '20-minute walkthrough',
      'Simple usage guide',
    ],
    cta: 'Get started',
    to: 'mailto:contact@jonascode.com?subject=LeadRecover AI setup request',
    highlighted: true,
  },
  {
    name: 'Custom setup',
    price: 'Custom',
    period: '',
    description: 'For teams or agencies with unique needs.',
    features: [
      'Everything in Free',
      'Tailored setup for your team',
      'Custom templates and workflow',
      'Priority support',
    ],
    cta: 'Contact me',
    to: 'mailto:contact@jonascode.com?subject=LeadRecover AI custom setup',
  },
]

function PricingPage() {
  return (
    <div className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-center text-4xl font-bold text-gray-900">
          Simple pricing
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
          Try the demo free, or get the complete setup service for your business.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${plan.highlighted ? 'border-blue-500 ring-1 ring-blue-500' : ''}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                  Most popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="ml-1 text-sm text-gray-500">{plan.period}</span>
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
                  View Leads
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-gray-400">
          No authentication required. No backend. All data stays in
          your browser. The €99 setup service is handled via email.
        </p>
      </div>
    </div>
  )
}

export default PricingPage
