import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { marked } from 'marked'
import { DATA, type Lang } from '../data'

type RouteType = 'overview' | 'timeline' | 'skills' | 'architecture' | 'intelz' | 'projects'

function resolveFilePath(type: RouteType, id: string | undefined, lang: string): string | null {
  switch (type) {
    case 'overview':
      return `${import.meta.env.BASE_URL}${lang}/overview.md`
    case 'timeline':
      return `${import.meta.env.BASE_URL}${lang}/timeline.md`
    case 'skills':
      return `${import.meta.env.BASE_URL}${lang}/skills.md`
    case 'architecture':
      return `${import.meta.env.BASE_URL}${lang}/architectural-decisions.md`
    case 'intelz':
      return null
    case 'projects':
      return id ? `${import.meta.env.BASE_URL}${lang}/projects/${id}.md` : null
  }
}

function deriveRouteType(pathname: string): RouteType {
  if (pathname.includes('/projects/')) return 'projects'
  if (pathname.endsWith('/timeline')) return 'timeline'
  if (pathname.endsWith('/skills')) return 'skills'
  if (pathname.endsWith('/architecture')) return 'architecture'
  if (pathname.endsWith('/intelz')) return 'intelz'
  return 'overview'
}

function Spinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }}>
      <div
        style={{
          width: 28,
          height: 28,
          border: '2px solid var(--border)',
          borderTopColor: 'var(--accent)',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite',
        }}
      />
    </div>
  )
}

export default function MarkdownPage() {
  const { lang, id } = useParams<{ lang: string; id?: string }>()
  const { pathname } = useLocation()

  const resolvedLang: Lang = lang === 'ko' ? 'ko' : 'en'
  const d = DATA[resolvedLang]
  const routeType = deriveRouteType(pathname)

  const [html, setHtml] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    if (routeType === 'intelz') {
      setLoading(false)
      return
    }

    const filePath = resolveFilePath(routeType, id, resolvedLang)
    if (!filePath) {
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setHtml('')

    fetch(filePath)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then(text => {
        if (cancelled) return
        setHtml(marked.parse(text) as string)
      })
      .catch(() => {
        if (!cancelled) setHtml('<p>Failed to load content.</p>')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [routeType, id, resolvedLang])

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 24px 120px' }}>
      {loading ? (
        <Spinner />
      ) : routeType === 'intelz' ? (
        <div className="prose">
          <h1>{d.nav.intelz}</h1>
          <p>{d.navDesc.intelz}</p>
          <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Coming soon.</p>
        </div>
      ) : (
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </div>
  )
}
