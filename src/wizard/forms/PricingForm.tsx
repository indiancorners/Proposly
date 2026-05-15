import { Input } from '@/ui/Input'
import { Textarea } from '@/ui/Textarea'
import { Select } from '@/ui/Select'
import { PricingLineItem } from '../fields/PricingLineItem'
import { Button } from '@/ui/Button'
import { Plus } from 'lucide-react'
import type { PricingData, PricingLineItem as PricingLineItemType } from '@/types'

const CURRENCIES = [
  { value: 'USD', label: 'USD — US Dollar' },
  { value: 'EUR', label: 'EUR — Euro' },
  { value: 'GBP', label: 'GBP — British Pound' },
  { value: 'INR', label: 'INR — Indian Rupee' },
  { value: 'AUD', label: 'AUD — Australian Dollar' },
]

interface PricingFormProps {
  data: PricingData
  onChange: (data: PricingData) => void
}

function newItem(): PricingLineItemType {
  return { id: `pi-${Date.now()}`, description: '', qty: 1, unitPrice: 0 }
}

export function PricingForm({ data, onChange }: PricingFormProps) {
  const total = data.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0)

  function updateItem(updated: PricingLineItemType) {
    onChange({ ...data, items: data.items.map((i) => (i.id === updated.id ? updated : i)) })
  }

  function removeItem(id: string) {
    onChange({ ...data, items: data.items.filter((i) => i.id !== id) })
  }

  function addItem() {
    onChange({ ...data, items: [...data.items, newItem()] })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <div className="flex-1">
          <Input label="Section Header" value={data.header} onChange={(e) => onChange({ ...data, header: e.target.value })} />
        </div>
        <Select
          label="Currency"
          value={data.currency}
          options={CURRENCIES}
          onChange={(e) => onChange({ ...data, currency: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-2">
        {data.items.map((item) => (
          <PricingLineItem
            key={item.id}
            item={item}
            currency={data.currency}
            onChange={updateItem}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </div>
      <Button variant="secondary" size="sm" onClick={addItem} type="button">
        <Plus className="h-4 w-4" />
        Add Line Item
      </Button>
      <div className="flex justify-end pt-2 border-t border-border">
        <div className="text-right">
          <p className="text-xs text-muted uppercase tracking-wide mb-1">Total Investment</p>
          <p className="text-2xl font-bold text-foreground">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: data.currency, maximumFractionDigits: 0 }).format(total)}
          </p>
        </div>
      </div>
      <Textarea
        label="Notes (optional)"
        placeholder="Payment schedule, deposit info, etc."
        value={data.notes}
        rows={3}
        onChange={(e) => onChange({ ...data, notes: e.target.value })}
      />
    </div>
  )
}
