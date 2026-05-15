import { Input } from '@/ui/Input'
import { DynamicListField } from '../fields/DynamicListField'
import type { TimelineData, Milestone } from '@/types'

interface TimelineFormProps {
  data: TimelineData
  onChange: (data: TimelineData) => void
}

function newMilestone(): Milestone {
  return { id: `ms-${Date.now()}`, phase: '', duration: '', description: '' }
}

export function TimelineForm({ data, onChange }: TimelineFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <Input label="Section Header" value={data.header} onChange={(e) => onChange({ ...data, header: e.target.value })} />
      <DynamicListField
        items={data.milestones}
        fields={[
          { key: 'phase', label: 'Phase', placeholder: 'e.g. Discovery & Strategy' },
          { key: 'duration', label: 'Duration', placeholder: 'e.g. 2 weeks' },
          { key: 'description', label: 'Description (optional)', placeholder: 'What happens in this phase?', multiline: true },
        ]}
        onAdd={newMilestone}
        onChange={(milestones) => onChange({ ...data, milestones })}
        addLabel="Add Phase"
      />
    </div>
  )
}
