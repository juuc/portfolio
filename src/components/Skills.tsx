import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../context/LangContext'

const TECH_TAGS = [
  'React', 'TypeScript', 'Next.js', 'React Native', 'Expo',
  'Python', 'AWS Lambda', 'Node.js', 'PostgreSQL', 'Dagster',
  'Sentry', 'Docker', 'GitHub Actions', 'Tailwind CSS',
  'Framer Motion', 'GraphQL', 'REST', 'Vite', 'Turborepo',
]

export default function Skills() {
  const { lang } = useLang()
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
        {lang === 'en' ? 'Skills & Tech' : '기술 스택'}
      </motion.h2>

      {/* Two rows of auto-scrolling tags, opposite directions */}
      <div className="space-y-3 overflow-hidden">
        {[TECH_TAGS, [...TECH_TAGS].reverse()].map((tags, row) => (
          <motion.div
            key={row}
            className="flex gap-3"
            animate={{ x: row === 0 ? [0, -400] : [-400, 0] }}
            transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
            style={{ width: 'max-content' }}
          >
            {[...tags, ...tags, ...tags].map((tag, i) => (
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
          </motion.div>
        ))}
      </div>
    </section>
  )
}
