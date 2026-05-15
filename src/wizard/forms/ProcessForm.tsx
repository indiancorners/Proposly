import { Input } from '@/ui/Input'
import { DynamicListField } from '../fields/DynamicListField'
import type { ProcessData, ProcessStep } from '@/types'

interface ProcessFormProps {
  data: ProcessData
  onChange: (data: ProcessData) => void
}

function newStep(stepNumber: number): ProcessStep {
  return { id: `ps-${Date.now()}`, stepNumber, title: '', description: '' }
}

export function ProcessForm({ data, onChange }: ProcessFormProps) {
  function handleChange(steps: ProcessStep[]) {
    const renumbered = steps.map((s, i) => ({ ...s, stepNumber: i + 1 }))
    onChange({ ...data, steps: renumbered })
  }

  return (
    <div className="flex flex-col gap-4">
      <Input label="Section Header" value={data.header} onChange={(e) => onChange({ ...data, header: e.target.value })} />
      <DynamicListField
        items={data.steps}
        fields={[
          { key: 'title', label: 'Step Title', placeholder: 'e.g. Discovery' },
          { key: 'description', label: 'Description', placeholder: 'What happens in this step...', multiline: true },
        ]}
        onAdd={() => newStep(data.steps.length + 1)}
        onChange={handleChange}
        addLabel="Add Step"
      />
    </div>
  )
}
