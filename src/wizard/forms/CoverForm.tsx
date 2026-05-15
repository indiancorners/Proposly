import { Input } from '@/ui/Input'
import type { CoverData } from '@/types'

interface CoverFormProps {
  data: CoverData
  onChange: (data: CoverData) => void
}

export function CoverForm({ data, onChange }: CoverFormProps) {
  function update(key: keyof CoverData, value: string) {
    onChange({ ...data, [key]: value })
  }

  return (
    <div className="flex flex-col gap-4">
      <Input label="Project Title" placeholder="e.g. Brand Identity System" value={data.projectTitle} onChange={(e) => update('projectTitle', e.target.value)} />
      <Input label="Client Name" placeholder="e.g. Acme Corp" value={data.clientName} onChange={(e) => update('clientName', e.target.value)} />
      <Input label="Your Studio Name" placeholder="e.g. Monolith Studio" value={data.studioName} onChange={(e) => update('studioName', e.target.value)} />
      <Input label="Tagline (optional)" placeholder="A short project description" value={data.tagline} onChange={(e) => update('tagline', e.target.value)} />
      <Input label="Proposal Date" type="date" value={data.date} onChange={(e) => update('date', e.target.value)} />
    </div>
  )
}
