import { FileText, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function EmptyDashboard() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: '#F5F5F7' }}
      >
        <FileText className="h-6 w-6" style={{ color: '#86868B' }} />
      </div>
      <h3
        className="font-semibold mb-2"
        style={{ fontSize: '17px', letterSpacing: '-0.01em', color: '#1D1D1F' }}
      >
        No proposals yet
      </h3>
      <p
        className="text-[14px] mb-8 max-w-xs"
        style={{ color: '#6E6E73', lineHeight: 1.65 }}
      >
        Create your first proposal in minutes. Pick a template, fill the details, download the PDF.
      </p>
      <button
        onClick={() => navigate('/app/create')}
        className="inline-flex items-center gap-2 h-10 px-6 rounded-full text-[14px] font-semibold transition-opacity hover:opacity-80"
        style={{ background: '#1D1D1F', color: 'white' }}
      >
        <Plus className="h-4 w-4" />
        Create your first proposal
      </button>
    </div>
  )
}
