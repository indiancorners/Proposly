import { SignIn } from '@clerk/clerk-react'
import { Link, useSearchParams } from 'react-router-dom'
import { clerkAppearance } from '@/lib/clerkAppearance'

export function SignInPage() {
  const [params] = useSearchParams()
  const redirect = params.get('redirect') ?? '/app'
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-8 px-4"
      style={{ background: '#FAFAFA' }}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <Link to="/" className="font-semibold tracking-tight transition-opacity hover:opacity-70" style={{ fontSize: '22px', color: '#1D1D1F', letterSpacing: '-0.02em' }}>
          Proposly
        </Link>
        <p className="text-sm" style={{ color: '#6E6E73' }}>
          Welcome back.
        </p>
      </div>
      <SignIn appearance={clerkAppearance} forceRedirectUrl={redirect} />
      <Link to="/" className="text-xs transition-opacity hover:opacity-70" style={{ color: '#86868B' }}>
        ← Back to home
      </Link>
    </div>
  )
}
