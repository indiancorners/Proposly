import { Input } from '@/ui/Input'
import { Textarea } from '@/ui/Textarea'
import { DynamicListField } from '../fields/DynamicListField'
import type { AboutData, TeamMember } from '@/types'

interface AboutFormProps {
  data: AboutData
  onChange: (data: AboutData) => void
}

function newMember(): TeamMember {
  return { id: `tm-${Date.now()}`, name: '', role: '' }
}

export function AboutForm({ data, onChange }: AboutFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <Input label="Section Header" value={data.header} onChange={(e) => onChange({ ...data, header: e.target.value })} />
      <Textarea
        label="Studio Bio"
        placeholder="Tell your story — who you are, what you do, why it matters..."
        value={data.bio}
        rows={5}
        onChange={(e) => onChange({ ...data, bio: e.target.value })}
      />
      <div>
        <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Team Members (optional)</p>
        <DynamicListField
          items={data.team}
          fields={[
            { key: 'name', label: 'Name', placeholder: 'e.g. Alex Kim' },
            { key: 'role', label: 'Role', placeholder: 'e.g. Creative Director' },
          ]}
          onAdd={newMember}
          onChange={(team) => onChange({ ...data, team })}
          addLabel="Add Team Member"
        />
      </div>
    </div>
  )
}
