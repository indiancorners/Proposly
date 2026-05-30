import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const CONTENT = {
  '/terms': {
    title: 'Terms of Service',
    updated: '30 May 2026',
    sections: [
      {
        heading: 'Acceptance',
        body: 'By using Proposly you agree to these terms. If you do not agree, do not use the service.',
      },
      {
        heading: 'Service',
        body: 'Proposly provides a proposal-generation tool. We reserve the right to modify or discontinue the service at any time with reasonable notice.',
      },
      {
        heading: 'Payment',
        body: 'Pro access is a one-time lifetime purchase processed by Lemon Squeezy. Refund requests within 30 days will be honoured. We do not store payment details.',
      },
      {
        heading: 'Acceptable use',
        body: 'You may not use Proposly to generate content that is unlawful, harmful, or fraudulent. We may terminate access for violations.',
      },
      {
        heading: 'Intellectual property',
        body: 'Proposal content you create remains yours. Proposly templates and code are owned by Monolith Studio.',
      },
      {
        heading: 'Limitation of liability',
        body: 'Proposly is provided "as is". Monolith Studio is not liable for indirect or consequential damages arising from your use of the service.',
      },
      {
        heading: 'Contact',
        body: 'Questions? Email support@proposly.com.',
      },
    ],
  },
  '/privacy': {
    title: 'Privacy Policy',
    updated: '30 May 2026',
    sections: [
      {
        heading: 'What we collect',
        body: 'We collect your email address (via Clerk authentication) and the proposal content you create. We do not sell your data.',
      },
      {
        heading: 'How we use it',
        body: 'Your email is used for authentication and, if you opt in, product updates. Proposal content is stored in Supabase to power the service.',
      },
      {
        heading: 'Third-party services',
        body: 'We use Clerk (authentication), Supabase (database), and Lemon Squeezy (payments). Each has its own privacy policy.',
      },
      {
        heading: 'Data retention',
        body: 'Your data is retained until you delete your account. You may request deletion at any time by emailing support@proposly.com.',
      },
      {
        heading: 'Cookies',
        body: 'We use only essential session cookies required for authentication. No advertising or tracking cookies.',
      },
      {
        heading: 'Contact',
        body: 'For privacy requests, email support@proposly.com.',
      },
    ],
  },
}

export function LegalPage() {
  const { pathname } = useLocation()
  const page = CONTENT[pathname as keyof typeof CONTENT] ?? CONTENT['/terms']

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm mb-10 transition-opacity hover:opacity-70"
        style={{ color: '#6E6E73' }}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#86868B' }}>
        Monolith Studio
      </p>
      <h1
        className="font-bold mb-2"
        style={{ fontSize: 'clamp(28px, 5vw, 40px)', letterSpacing: '-0.03em', color: '#1D1D1F' }}
      >
        {page.title}
      </h1>
      <p className="text-sm mb-10" style={{ color: '#86868B' }}>Last updated: {page.updated}</p>

      <div className="flex flex-col gap-8">
        {page.sections.map((s) => (
          <div key={s.heading}>
            <h2
              className="font-semibold mb-2"
              style={{ fontSize: '15px', letterSpacing: '-0.01em', color: '#1D1D1F' }}
            >
              {s.heading}
            </h2>
            <p style={{ fontSize: '15px', color: '#6E6E73', lineHeight: 1.7 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
