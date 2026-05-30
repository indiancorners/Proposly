import { useParams, useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { ProposalEditorLayout } from '@/layouts/ProposalEditorLayout'
import { ThemePickerStep } from '@/wizard/ThemePickerStep'
import { FormStep } from '@/wizard/FormStep'
import { ReviewStep } from '@/wizard/ReviewStep'
import { Button } from '@/ui/Button'
import { Spinner } from '@/ui/Spinner'
import { useWizardStore } from '@/hooks/useWizardStore'
import { useProposal } from '@/hooks/useProposal'
import { useProposlyPro } from '@/hooks/useProposlyPro'
import type { ProposalData } from '@/types'
import { clsx } from 'clsx'

const STEPS = [
  { id: 1 as const, label: '1. Template' },
  { id: 2 as const, label: '2. Details' },
  { id: 3 as const, label: '3. Review' },
]

export function WizardPage() {
  const { id } = useParams()
  if (id) return <WizardEdit id={id} />
  return <WizardCreate />
}

function WizardCreate() {
  const { user } = useUser()
  return <WizardContent userId={user?.id ?? ''} />
}

function WizardEdit({ id }: { id: string }) {
  const { user } = useUser()
  const navigate = useNavigate()
  const { proposal, isLoading, error } = useProposal(id, user?.id)

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (error || !proposal) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="text-sm" style={{ color: '#6E6E73' }}>
          This proposal couldn't be loaded. It may have been deleted.
        </p>
        <div className="flex gap-3">
          <Button variant="dark" onClick={() => navigate('/app')}>Back to dashboard</Button>
          <Button variant="secondary" onClick={() => window.location.reload()}>Try again</Button>
        </div>
      </div>
    )
  }

  return <WizardContent initialProposal={proposal} userId={user?.id ?? ''} />
}

function WizardContent({
  initialProposal,
  userId,
}: {
  initialProposal?: ProposalData
  userId: string
}) {
  const { isPro } = useProposlyPro()
  const {
    step,
    proposal,
    isSaving,
    setStep,
    setTheme,
    setCategory,
    updateSection,
    toggleSection,
    saveProposal,
  } = useWizardStore(initialProposal, userId)

  const stepIndicator = (
    <div className="flex items-center gap-1">
      {STEPS.map((s, i) => (
        <div key={s.id} className="flex items-center gap-1">
          <button
            onClick={() => { if (s.id < step || step === 3) setStep(s.id) }}
            className={clsx(
              'text-xs font-medium px-2.5 py-1 rounded-full transition-colors',
              step === s.id
                ? 'bg-foreground text-white'
                : step > s.id
                ? 'text-foreground hover:underline cursor-pointer'
                : 'text-placeholder cursor-default'
            )}
          >
            <span className="hidden sm:inline">{s.label}</span>
            <span className="sm:hidden">{i + 1}</span>
          </button>
          {i < STEPS.length - 1 && <span className="text-placeholder text-xs">›</span>}
        </div>
      ))}
    </div>
  )

  return (
    <ProposalEditorLayout isSaving={isSaving} stepIndicator={stepIndicator}>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto p-6">
          {step === 1 && (
            <ThemePickerStep selected={proposal.theme} isPro={isPro} onSelect={setTheme} />
          )}
          {step === 2 && (
            <FormStep
              proposal={proposal}
              onCategoryChange={setCategory}
              onSectionUpdate={updateSection}
              onSectionToggle={toggleSection}
            />
          )}
          {step === 3 && (
            <ReviewStep
              proposal={proposal}
              isPro={isPro}
              isSaving={isSaving}
              onSave={async () => {
                await saveProposal()
              }}
            />
          )}
        </div>

        {step < 3 && (
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-t border-border bg-surface">
            <Button
              variant="ghost"
              onClick={() => setStep((step - 1) as 1 | 2 | 3)}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button variant="dark" onClick={() => setStep((step + 1) as 1 | 2 | 3)}>
              {step === 2 ? 'Review →' : 'Next →'}
            </Button>
          </div>
        )}
      </div>
    </ProposalEditorLayout>
  )
}
