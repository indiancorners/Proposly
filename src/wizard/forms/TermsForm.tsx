import { Input } from '@/ui/Input'
import { Textarea } from '@/ui/Textarea'
import { Button } from '@/ui/Button'
import { DEFAULT_TERMS } from '@/constants/sections'
import type { TermsData } from '@/types'

interface TermsFormProps {
  data: TermsData
  onChange: (data: TermsData) => void
}

export function TermsForm({ data, onChange }: TermsFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Section Header"
        value={data.header}
        onChange={(e) => onChange({ ...data, header: e.target.value })}
      />
      <Textarea
        label="Terms Text"
        value={data.body}
        rows={12}
        onChange={(e) => onChange({ ...data, body: e.target.value })}
      />
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => onChange({ ...data, body: DEFAULT_TERMS })}
      >
        Load default terms
      </Button>
    </div>
  )
}
