import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PublicLayout, AppLayout } from './components/Layout'
import LandingPage from './features/landing/LandingPage'
import PricingPage from './features/pricing/PricingPage'
import DashboardPage from './features/dashboard/DashboardPage'
import LeadListPage from './features/leads/LeadListPage'
import LeadFormPage from './features/leads/LeadFormPage'
import LeadDetailPage from './features/leads/LeadDetailPage'
import ReplyGeneratorPage from './features/tools/ReplyGeneratorPage'
import ReviewGeneratorPage from './features/tools/ReviewGeneratorPage'

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/pricing', element: <PricingPage /> },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/leads', element: <LeadListPage /> },
      { path: '/leads/new', element: <LeadFormPage /> },
      { path: '/leads/:id', element: <LeadDetailPage /> },
      { path: '/tools/reply', element: <ReplyGeneratorPage /> },
      { path: '/tools/review', element: <ReviewGeneratorPage /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
