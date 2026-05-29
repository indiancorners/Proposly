import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { toast } from 'sonner'
import { Input } from '@/ui/Input'
import { Textarea } from '@/ui/Textarea'
import { Select } from '@/ui/Select'
import { Button } from '@/ui/Button'
import { Spinner } from '@/ui/Spinner'
import { DEFAULT_TERMS } from '@/constants/sections'
import { getProfile, upsertProfile } from '@/services/profileService'

const CURRENCIES = [
  { value: 'USD', label: 'USD — US Dollar' },
  { value: 'EUR', label: 'EUR — Euro' },
  { value: 'GBP', label: 'GBP — British Pound' },
  { value: 'INR', label: 'INR — Indian Rupee' },
]

export function SettingsPage() {
  const { user, isLoaded } = useUser()
  const [loading, setLoading] = useState(true)
  const [studioName, setStudioName] = useState('Monolith Studio')
  const [currency, setCurrency] = useState('USD')
  const [terms, setTerms] = useState(DEFAULT_TERMS)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isLoaded || !user) return
    getProfile(user.id)
      .then((profile) => {
        if (profile) {
          setStudioName(profile.studioName)
          setCurrency(profile.defaultCurrency)
          setTerms(profile.defaultTerms)
        }
      })
      .finally(() => setLoading(false))
  }, [isLoaded, user])

  async function handleSave() {
    if (!user) return
    setSaving(true)
    setError('')
    try {
      await upsertProfile({
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress ?? '',
        studioName,
        defaultCurrency: currency,
        defaultTerms: terms,
      })
      setSaved(true)
      toast.success('Settings saved')
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown error'
      setError(`Error saving: ${msg}`)
      toast.error(`Failed to save settings: ${msg}`)
    } finally {
      setSaving(false)
    }
  }

  if (!isLoaded || loading) {
    return (
      <div className="p-4 sm:p-8 max-w-2xl">
        <h1 className="text-2xl font-bold text-foreground mb-1">Settings</h1>
        <p className="text-sm text-muted mb-8">These defaults are applied to all new proposals.</p>
        <Spinner />
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground mb-1">Settings</h1>
      <p className="text-sm text-muted mb-8">These defaults are applied to all new proposals.</p>
      <div className="flex flex-col gap-6">
        <Input label="Studio Name" value={studioName} onChange={(e) => setStudioName(e.target.value)} placeholder="e.g. Monolith Studio" />
        <Select label="Default Currency" value={currency} options={CURRENCIES} onChange={(e) => setCurrency(e.target.value)} />
        <Textarea label="Default Terms & Conditions" value={terms} rows={10} onChange={(e) => setTerms(e.target.value)} />
        <div>
          <Button onClick={handleSave} loading={saving} disabled={saving}>
            {saved ? '✓ Saved' : 'Save Settings'}
          </Button>
          {error && <p className="text-sm text-danger mt-2">{error}</p>}
        </div>
      </div>
    </div>
  )
}
