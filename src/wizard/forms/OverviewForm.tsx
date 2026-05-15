import { Input } from '@/ui/Input'
import { Textarea } from '@/ui/Textarea'
import type { OverviewData } from '@/types'

interface OverviewFormProps {
  data: OverviewData
  onChange: (data: OverviewData) => void
}

export function OverviewForm({ data, onChange }: OverviewFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Headline"
        placeholder="e.g. Redefining [Client]'s digital presence"
        value={data.headline}
        onChange={(e) => onChange({ ...data, headline: e.target.value })}
      />
      <Textarea
        label="Project Summary"
        placeholder="Describe the challenge, your approach, and the value you deliver..."
        value={data.body}
        rows={6}
        onChange={(e) => onChange({ ...data, body: e.target.value })}
      />
    </div>
  )
}
