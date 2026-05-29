import { Lock } from 'lucide-react'
import { Button } from '@/ui/Button'
import { useNavigate } from 'react-router-dom'

interface ProGateOverlayProps {
  feature: string
}

export function ProGateOverlay({ feature }: ProGateOverlayProps) {
  const navigate = useNavigate()

  return (
    <div className="absolute inset-0 backdrop-blur-sm bg-white/70 rounded-xl flex flex-col items-center justify-center gap-3 z-10">
      <div className="w-10 h-10 rounded-full bg-subtle flex items-center justify-center">
        <Lock className="h-5 w-5 text-muted" />
      </div>
      <p className="text-sm font-semibold text-foreground">Pro feature</p>
      <p className="text-xs text-muted">{feature}</p>
      <Button variant="dark" size="sm" onClick={() => navigate('/app/upgrade')}>
        Upgrade — $20 once
      </Button>
    </div>
  )
}
