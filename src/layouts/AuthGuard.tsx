import type { ReactNode } from 'react'

interface AuthGuardProps {
  children: ReactNode
}

// Phase 3: replace with Clerk useAuth() gate
export function AuthGuard({ children }: AuthGuardProps) {
  return <>{children}</>
}
