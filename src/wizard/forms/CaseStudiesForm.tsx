import { Input } from '@/ui/Input'
import { DynamicListField } from '../fields/DynamicListField'
import type { CaseStudiesData, CaseStudyEntry } from '@/types'

interface CaseStudiesFormProps {
  data: CaseStudiesData
  onChange: (data: CaseStudiesData) => void
}

function newEntry(): CaseStudyEntry {
  return { id: `cs-${Date.now()}`, projectName: '', client: '', description: '', outcome: '' }
}

export function CaseStudiesForm({ data, onChange }: CaseStudiesFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <Input label="Section Header" value={data.header} onChange={(e) => onChange({ ...data, header: e.target.value })} />
      <DynamicListField
        items={data.entries}
        fields={[
          { key: 'projectName', label: 'Project Name', placeholder: 'e.g. Rebranding for TechCo' },
          { key: 'client', label: 'Client', placeholder: 'e.g. TechCo' },
          { key: 'description', label: 'Description', placeholder: 'What you did...', multiline: true },
          { key: 'outcome', label: 'Outcome (optional)', placeholder: 'e.g. +40% conversion rate' },
        ]}
        onAdd={newEntry}
        onChange={(entries) => onChange({ ...data, entries })}
        addLabel="Add Case Study"
      />
    </div>
  )
}
