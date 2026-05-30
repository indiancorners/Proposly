import type { RefObject } from 'react'
import type { ProposalSummary } from '@/types'

function sanitize(str: string): string {
  return str.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '')
}

async function capture(ref: RefObject<HTMLElement | null>): Promise<HTMLCanvasElement> {
  if (!ref.current) throw new Error('Export target not found')
  // Dynamic import keeps html2canvas + jsPDF out of the main bundle (~700 KB saved).
  const { default: html2canvas } = await import('html2canvas')
  return html2canvas(ref.current, { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff' })
}

export async function exportToPDF(
  ref: RefObject<HTMLElement | null>,
  meta: Pick<ProposalSummary, 'projectTitle' | 'clientName'>
): Promise<void> {
  const [canvas, { default: jsPDF }] = await Promise.all([
    capture(ref),
    import('jspdf').then(m => ({ default: m.jsPDF })),
  ])
  const doc = new jsPDF('p', 'mm', 'a4')
  const pageWidth = 210
  const pageHeight = 297
  const imgWidth = pageWidth
  const imgHeight = (canvas.height * pageWidth) / canvas.width
  const imgData = canvas.toDataURL('image/png')
  let yOffset = 0
  let pageIndex = 0

  while (yOffset < imgHeight) {
    if (pageIndex > 0) doc.addPage()
    doc.addImage(imgData, 'PNG', 0, -yOffset, imgWidth, imgHeight)
    yOffset += pageHeight
    pageIndex++
  }

  const client = sanitize(meta.clientName)
  const project = sanitize(meta.projectTitle)
  doc.save(`${client}_${project}_Proposal.pdf`)
}

export async function exportToPNG(
  ref: RefObject<HTMLElement | null>,
  meta: Pick<ProposalSummary, 'projectTitle' | 'clientName'>
): Promise<void> {
  const canvas = await capture(ref)
  const client = sanitize(meta.clientName)
  const project = sanitize(meta.projectTitle)
  const filename = `${client}_${project}_Proposal.png`

  // M5: toBlob is callback-based — wrap in a Promise so the caller can await it
  // and the success toast fires only after the download is actually triggered.
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/png')
  )
  if (!blob) throw new Error('Failed to generate PNG')

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
