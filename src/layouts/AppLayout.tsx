import { Outlet, useLocation } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'
import { MobileTopBar, MobileBottomNav } from './MobileNav'
import { useProposals } from '@/hooks/useProposals'
import { useProposlyPro } from '@/hooks/useProposlyPro'

export function AppLayout() {
  const { proposals } = useProposals()
  const { isPro } = useProposlyPro(proposals.length)
  const count = proposals.length
  const { pathname } = useLocation()

  // The wizard (create/edit) is a focused full-screen editor with its own chrome —
  // render it bare, without the dashboard sidebar or mobile nav bars.
  const isEditor = pathname.startsWith('/app/create') || pathname.startsWith('/app/edit')
  if (isEditor) {
    return <Outlet />
  }

  return (
    <div className="flex h-dvh overflow-hidden">
      <AppSidebar isPro={isPro} proposalCount={count} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <MobileTopBar isPro={isPro} proposalCount={count} />
        <main className="flex-1 overflow-auto bg-base">
          <Outlet />
        </main>
        <MobileBottomNav />
      </div>
    </div>
  )
}
