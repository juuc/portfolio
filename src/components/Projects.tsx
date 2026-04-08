import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { DATA, FlagshipItem, type PortfolioData } from '../data'
import SpotlightCard from './ui/SpotlightCard'

function ProjectCard({ item, index, d }: { item: FlagshipItem; index: number; d: PortfolioData }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const navigate = useNavigate()
  const { lang } = useLang()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
      className="relative rounded-xl cursor-pointer"
      onClick={() => navigate(`/${lang}/projects/${item.id}`)}
    >
      <SpotlightCard
        className="rounded-xl h-full"
        spotlightColor="rgba(99, 102, 241, 0.12)"
      >
        <div
          className="rounded-xl p-6 h-full"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
          }}
        >
          <div
            className="inline-block text-xs font-bold font-mono px-2 py-0.5 rounded mb-4"
            style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}
          >
            {item.metric}
          </div>
          <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text)' }}>
            {item.name}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {item.impact}
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs" style={{ color: 'var(--accent)' }}>
            <span>{d.labels.viewProject}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

export default function Projects() {
  const { lang } = useLang()
  const d = DATA[lang]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-24 px-6" style={{ maxWidth: 900, margin: '0 auto' }}>
      <motion.h2
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold tracking-tight mb-12"
        style={{ color: 'var(--text)' }}
      >
        {d.sections.flagship}
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {d.flagship.map((item, i) => (
          <ProjectCard key={item.id} item={item} index={i} d={d} />
        ))}
      </div>
    </section>
  )
}
