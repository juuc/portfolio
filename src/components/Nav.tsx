import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { DATA, PortfolioData } from '../data'

const NAV_LINKS = [
  { label: (d: PortfolioData) => d.nav.home, path: '/' },
  { label: (d: PortfolioData) => d.nav.overview, path: '/overview' },
  { label: (d: PortfolioData) => d.nav.timeline, path: '/timeline' },
  { label: (d: PortfolioData) => d.nav.skills, path: '/skills' },
]

export default function Nav() {
  const { lang, toggle } = useLang()
  const d = DATA[lang]
  const location = useLocation()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(9,9,11,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(39,39,42,0.5)' : '1px solid transparent',
      }}
    >
      {/* Scroll progress line */}
      <div
        className="absolute bottom-0 left-0 h-px transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
        }}
      />

      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-sm tracking-tight" style={{ color: 'var(--text)' }}>
          JW
        </Link>

        {/* Nav links (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, path }) => {
            const href = path === '/' ? '/' : `/${lang}${path}`
            return (
              <Link
                key={path}
                to={href}
                className="text-xs font-medium transition-colors duration-150"
                style={{
                  color: location.pathname === href ? 'var(--accent)' : 'var(--text-muted)',
                }}
              >
                {label(d)}
              </Link>
            )
          })}
        </nav>

        {/* Lang toggle */}
        <button
          onClick={toggle}
          className="text-xs font-semibold px-3 py-1.5 rounded transition-all duration-150"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'var(--text-secondary)',
          }}
        >
          {lang === 'en' ? 'KO' : 'EN'}
        </button>
      </div>
    </header>
  )
}
