import { useState, useCallback } from 'react'
import type { ProposalData, ThemeId, SectionData, SectionType } from '@/types'
import { ProposalStatus, ProposalCategory } from '@/types'
import { createEmptySections } from '@/constants/defaultData'
import { CATEGORY_SECTION_DEFAULTS } from '@/constants/sections'

export type WizardStepId = 1 | 2 | 3

interface WizardState {
  step: WizardStepId
  proposal: ProposalData
  isDirty: boolean
  isSaving: boolean
}

const INITIAL_PROPOSAL: ProposalData = {
  id: '',
  userId: 'mock-user',
  status: ProposalStatus.Draft,
  category: ProposalCategory.General,
  theme: 'folio',
  sections: createEmptySections(ProposalCategory.General),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  sharedLinkId: null,
}

export function useWizardStore(initialProposal?: ProposalData) {
  const [state, setState] = useState<WizardState>({
    step: 1,
    proposal: initialProposal ?? INITIAL_PROPOSAL,
    isDirty: false,
    isSaving: false,
  })

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
          s.type === type ? { ...s, data } as SectionData : s
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

        // Insert at canonical position from category defaults
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

  const saveProposal = useCallback(async (): Promise<void> => {
    setState((prev) => ({ ...prev, isSaving: true }))
    // Phase 2: call proposalService.saveProposal(state.proposal)
    await new Promise((r) => setTimeout(r, 600))
    setState((prev) => ({ ...prev, isSaving: false, isDirty: false }))
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
