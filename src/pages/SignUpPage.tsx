import { SignUp } from '@clerk/clerk-react'
import { clerkAppearance } from '@/lib/clerkAppearance'

export function SignUpPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-8"
      style={{ background: '#FAFAFA' }}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <span
          className="font-semibold tracking-tight"
          style={{ fontSize: '22px', color: '#1D1D1F', letterSpacing: '-0.02em' }}
        >
          Proposly
        </span>
        <p className="text-sm" style={{ color: '#6E6E73' }}>
          Create your workspace
        </p>
      </div>
      <SignUp appearance={clerkAppearance} forceRedirectUrl="/app" />
    </div>
  )
}
