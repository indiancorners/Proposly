import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { getProfile, upsertProfile } from '@/services/profileService'

export interface ProposlyProState {
  isPro: boolean
  isAtLimit: boolean
  canExport: boolean
  canShare: boolean
  canUseProTemplate: boolean
}

export const FREE_PROPOSAL_LIMIT = 3

export function useProposlyPro(proposalCount = 0): ProposlyProState {
  const { user, isLoaded } = useUser()
  const [isPro, setIsPro] = useState(false)

  useEffect(() => {
    if (!isLoaded || !user) return

    getProfile(user.id)
      .then((profile) => {
        if (!profile) {
          upsertProfile({
            id: user.id,
            email: user.primaryEmailAddress?.emailAddress,
          }).catch(console.error)
        } else {
          setIsPro(profile.isPro)
        }
      })
      .catch(console.error)
  }, [isLoaded, user?.id])

  return {
    isPro,
    isAtLimit: !isPro && proposalCount >= FREE_PROPOSAL_LIMIT,
    canExport: isPro,
    canShare: isPro,
    canUseProTemplate: isPro,
  }
}
