import { Button } from '@/ui/Button'
import { Input } from '@/ui/Input'
import { Textarea } from '@/ui/Textarea'
import { Plus, Trash2, GripVertical } from 'lucide-react'

interface Field {
  key: string
  label: string
  placeholder?: string
  multiline?: boolean
}

interface DynamicListFieldProps<T extends { id: string }> {
  items: T[]
  fields: Field[]
  onAdd: () => T
  onChange: (items: T[]) => void
  addLabel?: string
}

export function DynamicListField<T extends { id: string }>(
  { items, fields, onAdd, onChange, addLabel = 'Add Item' }: DynamicListFieldProps<T>
) {
  function updateItem(id: string, key: string, value: string) {
    onChange(
      items.map((item) =>
        item.id === id ? ({ ...item, [key]: value } as T) : item
      )
    )
  }

  function removeItem(id: string) {
    onChange(items.filter((item) => item.id !== id))
  }

  function addItem() {
    onChange([...items, onAdd()])
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => {
        const row = item as Record<string, unknown>
        return (
          <div
            key={item.id}
            className="flex gap-2 p-3 rounded-xl border border-border bg-subtle group"
          >
            <div className="flex-shrink-0 mt-2 cursor-grab text-placeholder hover:text-muted">
              <GripVertical className="h-4 w-4" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              {fields.map((field) =>
                field.multiline ? (
                  <Textarea
                    key={field.key}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={String(row[field.key] ?? '')}
                    rows={2}
                    onChange={(e) => updateItem(item.id, field.key, e.target.value)}
                  />
                ) : (
                  <Input
                    key={field.key}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={String(row[field.key] ?? '')}
                    onChange={(e) => updateItem(item.id, field.key, e.target.value)}
                  />
                )
              )}
            </div>
            <button
              className="flex-shrink-0 mt-2 text-placeholder hover:text-danger transition-colors"
              onClick={() => removeItem(item.id)}
              title="Remove"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )
      })}
      <Button variant="secondary" size="sm" onClick={addItem} type="button">
        <Plus className="h-4 w-4" />
        {addLabel}
      </Button>
    </div>
  )
}
