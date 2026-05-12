import { Link } from 'react-router-dom'
import { Card, CardContent } from '../../components/ui/Card'

const features = [
  {
    title: 'Lead Capture',
    description: 'Log every inquiry instantly with a simple form. Name, phone, email, and notes — all saved locally.',
  },
  {
    title: 'Pipeline Tracking',
    description: 'Move leads through New → Contacted → Booked → Lost. See your entire pipeline at a glance.',
  },
  {
    title: 'Reply Templates',
    description: 'Generate fast, professional replies for price inquiries, scheduling, and follow-ups.',
  },
  {
    title: 'Review Requests',
    description: 'Create Google review request messages in seconds. Copy and send to happy customers.',
  },
]

const steps = [
  { number: '1', title: 'Add a lead', description: 'Enter their details in the lead form.' },
  { number: '2', title: 'Track progress', description: 'Update status as you engage.' },
  { number: '3', title: 'Generate a reply', description: 'Pick a template and copy the message.' },
  { number: '4', title: 'Follow up', description: 'Stay on top of every opportunity.' },
]

function LandingPage() {
  return (
    <div>
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-sm text-amber-800">
        This is a public demo. Data is saved only in your browser. For a configured business setup,{' '}
        <a href="mailto:contact@jonascode.com?subject=LeadRecover AI setup" className="underline font-medium">contact us</a>.
      </div>
      <section className="bg-gradient-to-b from-blue-50 to-white px-4 py-20 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Never Lose a Lead Again
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          Capture, track, and recover every business opportunity. LeadRecover AI helps
          local businesses reply faster and stay organised — no backend, just
          your browser.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center rounded bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Get Started Free
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 border border-gray-300"
          >
            View Dashboard
          </Link>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-2 text-center text-3xl font-bold text-gray-900">
            The problem with slow replies
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-gray-600">
            Local businesses lose leads when they take too long to respond. Messages pile up,
            follow-ups slip through the cracks, and potential customers move on. LeadRecover AI
            gives you a simple system to capture every lead and respond on time.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
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
            How it works
          </h2>
          <div className="grid gap-8 sm:grid-cols-4">
            {steps.map((s) => (
              <div key={s.number} className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {s.number}
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
          Ready to recover your leads?
        </h2>
        <p className="mb-8 text-gray-600">
          Start free. No account, no credit card, no backend.
        </p>
        <Link
          to="/pricing"
          className="inline-flex items-center justify-center rounded bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          See Pricing
        </Link>
      </section>

      <section className="bg-blue-600 px-4 py-20 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">
          Want this set up for your business?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
          Try the demo for free, or request a €99 setup. I can set up LeadRecover AI for your local business, customize your follow-up message, prepare your Google review request message, and walk you through the workflow.
        </p>
        <a
          href="mailto:contact@jonascode.com?subject=LeadRecover AI setup request"
          className="inline-flex items-center justify-center rounded bg-white px-6 py-3 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
        >
          Get this set up for €99
        </a>
      </section>
    </div>
  )
}

export default LandingPage
