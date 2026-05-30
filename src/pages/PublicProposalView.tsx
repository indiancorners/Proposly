import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { ProposalRenderer } from '@/renderer/ProposalRenderer'
import { getProposalByLink } from '@/services/shareService'
import { Spinner } from '@/ui/Spinner'
import type { ProposalData } from '@/types'

const A4_WIDTH = 794

export function PublicProposalView() {
  const { linkId } = useParams()
  const [proposal, setProposal] = useState<ProposalData | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!linkId) {
      setNotFound(true)
      setLoading(false)
      return
    }

    getProposalByLink(linkId)
      .then((data) => {
        if (!data) {
          setNotFound(true)
        } else {
          setProposal(data)
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [linkId])

  useEffect(() => {
    function updateScale() {
      const vw = window.innerWidth
      const padding = vw < 640 ? 16 : 80
      const available = vw - padding
      setScale(available < A4_WIDTH ? available / A4_WIDTH : 1)
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (notFound || !proposal) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-sm text-placeholder">
          This proposal link is invalid or has been removed.
        </p>
        <a
          href="/"
          className="text-sm font-semibold transition-opacity hover:opacity-70"
          style={{ color: '#1D1D1F' }}
        >
          Create your own proposal with Proposly →
        </a>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-overlay/30 flex flex-col items-center py-10 px-4">
      <div
        ref={containerRef}
        style={{
          width: A4_WIDTH,
          transformOrigin: 'top center',
          transform: `scale(${scale})`,
          marginBottom: scale < 1 ? `calc((${scale} - 1) * 100%)` : undefined,
        }}
        className="shadow-xl rounded-xl overflow-hidden"
      >
        <ProposalRenderer proposal={proposal} />
      </div>
      <p className="mt-6 text-xs text-placeholder">
        Created with{' '}
        <a href="/" className="underline hover:text-muted">
          Proposly
        </a>
      </p>
    </div>
  )
}
