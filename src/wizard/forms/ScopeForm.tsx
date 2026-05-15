import { Input } from '@/ui/Input'
import { DynamicListField } from '../fields/DynamicListField'
import type { ScopeData, ScopeItem } from '@/types'

interface ScopeFormProps {
  data: ScopeData
  onChange: (data: ScopeData) => void
}

function newItem(): ScopeItem {
  return { id: `si-${Date.now()}`, deliverable: '', description: '' }
}

export function ScopeForm({ data, onChange }: ScopeFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <Input label="Section Header" value={data.header} onChange={(e) => onChange({ ...data, header: e.target.value })} />
      <DynamicListField
        items={data.items}
        fields={[
          { key: 'deliverable', label: 'Deliverable', placeholder: 'e.g. Logo Design' },
          { key: 'description', label: 'Description', placeholder: 'What is included...', multiline: true },
        ]}
        onAdd={newItem}
        onChange={(items) => onChange({ ...data, items })}
        addLabel="Add Deliverable"
      />
    </div>
  )
}
