import { useState, useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

interface PublicLayoutProps {
  children: ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={
          scrolled
            ? {
                background: 'rgba(255,255,255,0.72)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 1px 0 rgba(0,0,0,0.08)',
              }
            : { background: 'transparent' }
        }
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-70">
            <img src="/logo.png" alt="Proposly" className="h-6 w-6 rounded-md" />
            <span
              className="font-semibold"
              style={{ fontSize: '15px', letterSpacing: '-0.01em', color: '#1D1D1F' }}
            >
              Proposly
            </span>
          </Link>
          <div className="flex items-center gap-5">
            <SignedOut>
              <Link
                to="/sign-in"
                className="text-[13px] font-medium transition-colors"
                style={{ color: '#6E6E73' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#1D1D1F')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#6E6E73')}
              >
                Sign in
              </Link>
              <Link
                to="/app/create"
                className="inline-flex items-center h-8 px-4 rounded-full text-[13px] font-medium transition-opacity hover:opacity-80"
                style={{ background: '#1D1D1F', color: '#FFFFFF' }}
              >
                Get started
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                to="/app"
                className="inline-flex items-center h-8 px-4 rounded-full text-[13px] font-medium transition-opacity hover:opacity-80"
                style={{ background: '#1D1D1F', color: '#FFFFFF' }}
              >
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer style={{ background: '#F5F5F7', borderTop: '1px solid #D2D2D7' }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 transition-opacity hover:opacity-70">
                <img src="/logo.png" alt="Proposly" className="h-5 w-5 rounded-sm" />
                <span
                  className="font-semibold"
                  style={{ fontSize: '15px', letterSpacing: '-0.01em', color: '#1D1D1F' }}
                >
                  Proposly
                </span>
              </Link>
              <p className="text-[13px] mt-2" style={{ color: '#6E6E73' }}>
                Agency-grade proposals, built in minutes.
              </p>
              <p className="text-[12px] mt-6" style={{ color: '#86868B' }}>
                © {new Date().getFullYear()} Monolith Studio. All rights reserved.
              </p>
            </div>
            <div className="flex gap-12">
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-widest mb-4"
                  style={{ color: '#86868B' }}
                >
                  Product
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    ['Templates', '/app/create'],
                    ['Dashboard', '/app'],
                    ['Upgrade',   '/app/upgrade'],
                  ].map(([label, href]) => (
                    <li key={label}>
                      <Link
                        to={href}
                        className="text-[13px] transition-colors"
                        style={{ color: '#6E6E73' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#1D1D1F')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#6E6E73')}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-widest mb-4"
                  style={{ color: '#86868B' }}
                >
                  Legal
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    ['Terms',   '/terms'],
                    ['Privacy', '/privacy'],
                  ].map(([label, href]) => (
                    <li key={label}>
                      <Link
                        to={href}
                        className="text-[13px] transition-colors"
                        style={{ color: '#6E6E73' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#1D1D1F')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#6E6E73')}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
