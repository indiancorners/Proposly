import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { getProfile, upsertProfile } from '@/services/profileService'

export interface ProposlyProState {
  isPro: boolean
  isLoading: boolean
  isAtLimit: boolean
  canExport: boolean
  canShare: boolean
  canUseProTemplate: boolean
}

export const FREE_PROPOSAL_LIMIT = 3

export function useProposlyPro(proposalCount = 0): ProposlyProState {
  const { user, isLoaded } = useUser()
  const [isPro, setIsPro] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded || !user) return
    let cancelled = false
    let fetching = false

    const refresh = () => {
      if (fetching) return
      fetching = true
      getProfile(user.id)
        .then((profile) => {
          if (cancelled) return
          if (!profile) {
            upsertProfile({
              id: user.id,
              email: user.primaryEmailAddress?.emailAddress,
            }).catch(console.error)
            setIsPro(false)
          } else {
            setIsPro(profile.isPro)
          }
        })
        .catch(console.error)
        .finally(() => {
          fetching = false
          if (!cancelled) setIsLoading(false)
        })
    }

    refresh()

    // Pro status can change in another tab (Lemon Squeezy checkout). Re-check when
    // the user returns to this tab so the UI reflects a completed purchase.
    const onVisible = () => {
      if (document.visibilityState === 'visible') refresh()
    }
    window.addEventListener('focus', onVisible)
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      cancelled = true
      window.removeEventListener('focus', onVisible)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [isLoaded, user?.id])

  return {
    isPro,
    isLoading,
    isAtLimit: !isPro && proposalCount >= FREE_PROPOSAL_LIMIT,
    canExport: isPro,
    canShare: isPro,
    canUseProTemplate: isPro,
  }
}
