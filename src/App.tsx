import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { RootLayout } from '@/layouts/RootLayout'
import { AppLayout } from '@/layouts/AppLayout'
import { PublicLayout } from '@/layouts/PublicLayout'
import { AuthGuard } from '@/layouts/AuthGuard'
import { LandingPage } from '@/pages/LandingPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { WizardPage } from '@/pages/WizardPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { UpgradePage } from '@/pages/UpgradePage'
import { UpgradeSuccessPage } from '@/pages/UpgradeSuccessPage'
import { PublicProposalView } from '@/pages/PublicProposalView'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <PublicLayout><LandingPage /></PublicLayout>,
      },
      {
        path: '/share/:linkId',
        element: <PublicProposalView />,
      },
      {
        path: '/app',
        element: <AuthGuard><AppLayout /></AuthGuard>,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'create', element: <WizardPage /> },
          { path: 'edit/:id', element: <WizardPage /> },
          { path: 'settings', element: <SettingsPage /> },
          { path: 'upgrade', element: <UpgradePage /> },
          { path: 'upgrade/success', element: <UpgradeSuccessPage /> },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
