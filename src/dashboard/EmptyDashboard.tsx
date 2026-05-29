import { FileText, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/ui/Button'

export function EmptyDashboard() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-subtle">
        <FileText className="h-6 w-6 text-placeholder" />
      </div>
      <h3 className="font-semibold mb-2 text-foreground" style={{ fontSize: '17px', letterSpacing: '-0.01em' }}>
        No proposals yet
      </h3>
      <p className="text-[14px] mb-8 max-w-xs text-muted" style={{ lineHeight: 1.65 }}>
        Create your first proposal in minutes. Pick a template, fill the details, download the PDF.
      </p>
      <Button variant="primary" size="lg" onClick={() => navigate('/app/create')}>
        <Plus className="h-4 w-4" />
        Create your first proposal
      </Button>
    </div>
  )
}
