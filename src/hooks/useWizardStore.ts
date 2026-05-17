import { useState, useCallback, useEffect, useRef } from 'react'
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
  }))

  const proposalRef = useRef(state.proposal)
  proposalRef.current = state.proposal

  // Auto-save: 2s debounce after any change, only when proposal is persisted (has id)
  // Depend only on isDirty + proposal.id — proposalRef carries the latest data without
  // causing the effect to restart every time setState mutates other fields (isSaving, updatedAt).
  const proposalId = state.proposal.id
  useEffect(() => {
    if (!state.isDirty || !proposalId) return

    const timer = setTimeout(async () => {
      setState((prev) => ({ ...prev, isSaving: true }))
      try {
        const saved = await updateProposal(proposalRef.current)
        setState((prev) => ({
          ...prev,
          isSaving: false,
          isDirty: false,
          proposal: { ...prev.proposal, updatedAt: saved.updatedAt },
        }))
      } catch (err) {
        setState((prev) => ({ ...prev, isSaving: false }))
        console.error('Auto-save failed:', err)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [state.isDirty, proposalId])

  const setStep = useCallback((step: WizardStepId) => {
    setState((prev) => ({ ...prev, step }))
  }, [])

  const setTheme = useCallback((theme: ThemeId) => {
    setState((prev) => ({
      ...prev,
      isDirty: true,
      proposal: { ...prev.proposal, theme, updatedAt: new Date().toISOString() },
    }))
  }, [])

  const setCategory = useCallback((category: ProposalCategory) => {
    setState((prev) => ({
      ...prev,
      isDirty: true,
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
          proposal: { ...prev.proposal, sections: newSections, updatedAt: new Date().toISOString() },
        }
      }

      if (!enabled) {
        return {
          ...prev,
          isDirty: true,
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

  const saveProposal = useCallback(async (): Promise<ProposalData> => {
    setState((prev) => ({ ...prev, isSaving: true }))
    try {
      const isNew = !proposalRef.current.id
      const saved = isNew
        ? await createProposal(proposalRef.current)
        : await updateProposal(proposalRef.current)
      setState((prev) => ({ ...prev, isSaving: false, isDirty: false, proposal: saved }))
      return saved
    } catch (err) {
      setState((prev) => ({ ...prev, isSaving: false }))
      throw err
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
    saveProposal,
  }
}
