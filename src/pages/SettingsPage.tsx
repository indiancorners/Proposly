import { useState } from 'react'
import { Input } from '@/ui/Input'
import { Textarea } from '@/ui/Textarea'
import { Select } from '@/ui/Select'
import { Button } from '@/ui/Button'
import { DEFAULT_TERMS } from '@/constants/sections'

const CURRENCIES = [
  { value: 'USD', label: 'USD — US Dollar' },
  { value: 'EUR', label: 'EUR — Euro' },
  { value: 'GBP', label: 'GBP — British Pound' },
  { value: 'INR', label: 'INR — Indian Rupee' },
]

export function SettingsPage() {
  const [studioName, setStudioName] = useState('Monolith Studio')
  const [currency, setCurrency] = useState('USD')
  const [terms, setTerms] = useState(DEFAULT_TERMS)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground mb-1">Settings</h1>
      <p className="text-sm text-muted mb-8">These defaults are applied to all new proposals.</p>

      <div className="flex flex-col gap-6">
        <Input
          label="Studio Name"
          value={studioName}
          onChange={(e) => setStudioName(e.target.value)}
          placeholder="e.g. Monolith Studio"
        />
        <Select
          label="Default Currency"
          value={currency}
          options={CURRENCIES}
          onChange={(e) => setCurrency(e.target.value)}
        />
        <Textarea
          label="Default Terms & Conditions"
          value={terms}
          rows={10}
          onChange={(e) => setTerms(e.target.value)}
        />
        <div>
          <Button onClick={handleSave}>
            {saved ? '✓ Saved' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </div>
  )
}
