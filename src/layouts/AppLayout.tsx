import { Outlet } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'
import { useProposlyPro } from '@/hooks/useProposlyPro'

export function AppLayout() {
  const { isPro } = useProposlyPro()

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar isPro={isPro} />
      <main className="flex-1 overflow-auto bg-base">
        <Outlet />
      </main>
    </div>
  )
}
