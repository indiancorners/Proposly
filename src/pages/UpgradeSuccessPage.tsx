import { Check } from 'lucide-react'
import { Button } from '@/ui/Button'
import { useNavigate } from 'react-router-dom'

export function UpgradeSuccessPage() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
        <Check className="h-8 w-8 text-success" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">You are now Pro</h1>
      <p className="text-sm text-muted mb-6 max-w-sm">
        All templates, unlimited proposals, PDF export, and share links are now unlocked.
      </p>
      <Button onClick={() => navigate('/app')}>Go to Dashboard</Button>
    </div>
  )
}
