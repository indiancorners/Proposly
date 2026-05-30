import { useState, useCallback, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import type { ProposalData, ThemeId, SectionData, SectionType } from '@/types'
import { ProposalStatus, ProposalCategory } from '@/types'
import { createEmptySections } from '@/constants/defaultData'
import { CATEGORY_SECTION_DEFAULTS } from '@/constants/sections'
import { createProposal, updateProposal } from '@/services/proposalService'

export type WizardStepId = 1 | 2 | 3

interface WizardState {
  step: WizardStepId
  proposal: ProposalData
  isDirty: boolean
  isSaving: boolean
  lastChangedAt: number // C1: increments on every mutation to reset the debounce timer
}

function makeInitialProposal(userId: string): ProposalData {
  return {
    id: '',
    userId,
    status: ProposalStatus.Draft,
    category: ProposalCategory.General,
    theme: 'folio',
    sections: createEmptySections(ProposalCategory.General),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sharedLinkId: null,
  }
}

export function useWizardStore(initialProposal?: ProposalData, userId = '') {
  const [state, setState] = useState<WizardState>(() => ({
    step: 1,
    proposal: initialProposal ?? makeInitialProposal(userId),
    isDirty: false,
    isSaving: false,
    lastChangedAt: 0,
  }))

  const proposalRef = useRef(state.proposal)
  proposalRef.current = state.proposal

  // C2: single ref shared by auto-save and manual save to prevent concurrent writes
  const isSavingRef = useRef(false)

  const proposalId = state.proposal.id

  // C1: dep on lastChangedAt so the effect — and its 2s timer — re-runs on every
  // mutation, not just when isDirty first flips. This means the timer resets on
  // every keystroke as intended.
  useEffect(() => {
    if (!state.isDirty || !proposalId) return

    const timer = setTimeout(async () => {
      // C2: bail if a manual save is already in flight
      if (isSavingRef.current) return

      isSavingRef.current = true
      setState((prev) => ({ ...prev, isSaving: true }))
      try {
        const saved = await updateProposal(proposalRef.current)
        setState((prev) => ({
          ...prev,
          isSaving: false,
          isDirty: false,
          // C3: merge only server-derived fields — preserve any edits that
          // arrived while the request was in flight
          proposal: { ...prev.proposal, updatedAt: saved.updatedAt },
        }))
      } catch (err) {
        setState((prev) => ({ ...prev, isSaving: false }))
        console.error('auto-save:', err)
        toast.error("Your changes couldn't be saved automatically. Check your connection.")
      } finally {
        isSavingRef.current = false
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [state.isDirty, state.lastChangedAt, proposalId])

  const setStep = useCallback((step: WizardStepId) => {
    setState((prev) => ({ ...prev, step }))
  }, [])

  const setTheme = useCallback((theme: ThemeId) => {
    setState((prev) => ({
      ...prev,
      isDirty: true,
      lastChangedAt: Date.now(),
      proposal: { ...prev.proposal, theme, updatedAt: new Date().toISOString() },
    }))
  }, [])

  const setCategory = useCallback((category: ProposalCategory) => {
    setState((prev) => ({
      ...prev,
      isDirty: true,
      lastChangedAt: Date.now(),
      proposal: {
        ...prev.proposal,
        category,
        sections: createEmptySections(category),
        updatedAt: new Date().toISOString(),
      },
    }))
  }, [])

  const updateSection = useCallback((type: SectionType, data: SectionData['data']) => {
    setState((prev) => ({
      ...prev,
      isDirty: true,
      lastChangedAt: Date.now(),
      proposal: {
        ...prev.proposal,
        updatedAt: new Date().toISOString(),
        sections: prev.proposal.sections.map((s) =>
          s.type === type ? ({ ...s, data } as SectionData) : s
        ),
      },
    }))
  }, [])

  const toggleSection = useCallback((type: SectionType, enabled: boolean) => {
    setState((prev) => {
      const currentTypes = prev.proposal.sections.map((s) => s.type)
      const categoryDefaults = CATEGORY_SECTION_DEFAULTS[prev.proposal.category]

      if (enabled && !currentTypes.includes(type)) {
        const newSection = createEmptySections(prev.proposal.category).find((s) => s.type === type)
        if (!newSection) return prev

        const targetIndex = categoryDefaults.indexOf(type)
        const newSections = [...prev.proposal.sections]
        let insertAt = newSections.length
        for (let i = 0; i < newSections.length; i++) {
          if (categoryDefaults.indexOf(newSections[i].type) > targetIndex) {
            insertAt = i
            break
          }
        }
        newSections.splice(insertAt, 0, newSection)
        return {
          ...prev,
          isDirty: true,
          lastChangedAt: Date.now(),
          proposal: { ...prev.proposal, sections: newSections, updatedAt: new Date().toISOString() },
        }
      }

      if (!enabled) {
        return {
          ...prev,
          isDirty: true,
          lastChangedAt: Date.now(),
          proposal: {
            ...prev.proposal,
            sections: prev.proposal.sections.filter((s) => s.type !== type),
            updatedAt: new Date().toISOString(),
          },
        }
      }

      return prev
    })
  }, [])

  // C4: merge a partial patch into proposal so ExportPanel can write back the
  // sharedLinkId without triggering a full proposal replace
  const patchProposal = useCallback((patch: Partial<ProposalData>) => {
    setState((prev) => ({
      ...prev,
      proposal: { ...prev.proposal, ...patch },
    }))
  }, [])

  const saveProposal = useCallback(async (): Promise<ProposalData> => {
    // C2: cancel any pending auto-save timer by marking as saving
    isSavingRef.current = true
    setState((prev) => ({ ...prev, isSaving: true }))
    try {
      const isNew = !proposalRef.current.id
      const saved = isNew
        ? await createProposal(proposalRef.current)
        : await updateProposal(proposalRef.current)
      setState((prev) => ({
        ...prev,
        isSaving: false,
        isDirty: false,
        // C3: merge only server-derived fields, preserve any in-flight edits
        proposal: { ...prev.proposal, id: saved.id, updatedAt: saved.updatedAt },
      }))
      return { ...proposalRef.current, id: saved.id, updatedAt: saved.updatedAt }
    } catch (err) {
      setState((prev) => ({ ...prev, isSaving: false }))
      throw err
    } finally {
      isSavingRef.current = false
    }
  }, [])

  return {
    step: state.step,
    proposal: state.proposal,
    isDirty: state.isDirty,
    isSaving: state.isSaving,
    setStep,
    setTheme,
    setCategory,
    updateSection,
    toggleSection,
    patchProposal,
    saveProposal,
  }
}
