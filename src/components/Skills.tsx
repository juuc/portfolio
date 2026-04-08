import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../context/LangContext'
import { DATA } from '../data'

const TECH_TAGS = [
  'React', 'TypeScript', 'Next.js', 'React Native', 'Expo',
  'Python', 'AWS Lambda', 'Node.js', 'PostgreSQL', 'Dagster',
  'Sentry', 'Docker', 'GitHub Actions', 'Tailwind CSS',
  'Framer Motion', 'GraphQL', 'REST', 'Vite', 'Turborepo',
]

const TAGS_REVERSED = [...TECH_TAGS].reverse()

export default function Skills() {
  const { lang } = useLang()
  const d = DATA[lang]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-24 px-6 overflow-hidden" style={{ maxWidth: 900, margin: '0 auto' }}>
      <motion.h2
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold tracking-tight mb-12"
        style={{ color: 'var(--text)' }}
      >
        {d.sections.skills}
      </motion.h2>

      {/* Two rows of CSS-animated marquee tags, opposite directions */}
      <div className="space-y-3 overflow-hidden">
        {[TECH_TAGS, TAGS_REVERSED].map((tags, row) => (
          <div
            key={row}
            className="flex gap-3"
            style={{
              width: 'max-content',
              animation: `${row === 0 ? 'marquee' : 'marquee-reverse'} 25s linear infinite`,
            }}
          >
            {[...tags, ...tags].map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
