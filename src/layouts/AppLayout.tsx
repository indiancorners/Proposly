import { Outlet, useLocation } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'
import { MobileTopBar, MobileBottomNav } from './MobileNav'
import { AppDataProvider, useAppData } from '@/context/AppDataContext'

function AppShell() {
  const { isPro, proposals } = useAppData()
  const count = proposals.length
  const { pathname } = useLocation()

  // Wizard is a full-screen editor with its own chrome — render it bare.
  const isEditor = pathname.startsWith('/app/create') || pathname.startsWith('/app/edit')
  if (isEditor) return <Outlet />

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

export function AppLayout() {
  return (
    <AppDataProvider>
      <AppShell />
    </AppDataProvider>
  )
}
