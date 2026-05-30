import { createContext, useContext, type ReactNode } from 'react'
import { useProposals } from '@/hooks/useProposals'
import { useProposlyPro, type ProposlyProState } from '@/hooks/useProposlyPro'
import type { ProposalSummary, ProposalStatus } from '@/types'

interface AppDataContextValue extends ProposlyProState {
  proposals: ProposalSummary[]
  proposalsLoading: boolean
  deleteProposal: (id: string) => Promise<void>
  updateStatus: (id: string, status: ProposalStatus) => Promise<void>
}

const AppDataContext = createContext<AppDataContextValue | null>(null)

export function AppDataProvider({ children }: { children: ReactNode }) {
  const { proposals, isLoading: proposalsLoading, deleteProposal, updateStatus } = useProposals()
  const proState = useProposlyPro(proposals.length)

  return (
    <AppDataContext.Provider value={{ proposals, proposalsLoading, deleteProposal, updateStatus, ...proState }}>
      {children}
    </AppDataContext.Provider>
  )
}

export function useAppData(): AppDataContextValue {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be used inside AppDataProvider')
  return ctx
}
