import { useParams } from 'react-router-dom'
import { ProposalEditorLayout } from '@/layouts/ProposalEditorLayout'
import { ThemePickerStep } from '@/wizard/ThemePickerStep'
import { FormStep } from '@/wizard/FormStep'
import { ReviewStep } from '@/wizard/ReviewStep'
import { Button } from '@/ui/Button'
import { useWizardStore } from '@/hooks/useWizardStore'
import { useProposlyPro } from '@/hooks/useProposlyPro'
import { clsx } from 'clsx'

const STEPS = [
  { id: 1 as const, label: '1. Template' },
  { id: 2 as const, label: '2. Details' },
  { id: 3 as const, label: '3. Review' },
]

export function WizardPage() {
  const { id } = useParams()
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
  } = useWizardStore()

  const isEdit = Boolean(id)

  const stepIndicator = (
    <div className="flex items-center gap-1">
      {STEPS.map((s, i) => (
        <div key={s.id} className="flex items-center gap-1">
          <button
            onClick={() => { if (s.id < step || step === 3) setStep(s.id) }}
            className={clsx(
              'text-xs font-medium px-2.5 py-1 rounded-full transition-colors',
              step === s.id
                ? 'bg-accent text-white'
                : step > s.id
                  ? 'text-accent hover:underline cursor-pointer'
                  : 'text-placeholder cursor-default'
            )}
          >
            {s.label}
          </button>
          {i < STEPS.length - 1 && <span className="text-placeholder text-xs">›</span>}
        </div>
      ))}
    </div>
  )

  return (
    <ProposalEditorLayout isSaving={isSaving} stepIndicator={stepIndicator}>
      <div className="flex flex-col h-full">
        {/* Main content area */}
        <div className="flex-1 overflow-auto p-6">
          {step === 1 && (
            <ThemePickerStep
              selected={proposal.theme}
              isPro={isPro}
              onSelect={setTheme}
            />
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
              onSave={saveProposal}
            />
          )}
        </div>

        {/* Bottom nav */}
        {step < 3 && (
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-t border-border bg-surface">
            <Button
              variant="ghost"
              onClick={() => setStep((step - 1) as 1 | 2 | 3)}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button
              onClick={() => setStep((step + 1) as 1 | 2 | 3)}
            >
              {step === 2 ? 'Review →' : 'Next →'}
            </Button>
          </div>
        )}
      </div>
    </ProposalEditorLayout>
  )
}
