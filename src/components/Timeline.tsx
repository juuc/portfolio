import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../context/LangContext'
import { DATA } from '../data'

export default function Timeline() {
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
        {d.sections.career}
      </motion.h2>

      <div className="relative pl-8">
        {/* Vertical line */}
        <div
          className="absolute left-2 top-2 bottom-2 w-px"
          style={{ background: 'linear-gradient(to bottom, rgba(59,130,246,0.4), transparent)' }}
        />

        {d.career.map((item, i) => (
          <motion.div
            key={item.company}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.2 + i * 0.15 }}
            className="relative mb-10 last:mb-0"
          >
            {/* Dot */}
            <div
              className="absolute -left-8 top-1.5 w-3 h-3 rounded-full border-2"
              style={{
                background: i === 0 ? 'var(--accent)' : '#6366f1',
                borderColor: 'var(--bg)',
              }}
            />

            <div
              className="p-5 rounded-xl"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-baseline gap-2 flex-wrap mb-1">
                <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                  {item.company}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  · {item.type}
                </span>
              </div>
              <div className="text-xs mb-2 font-mono" style={{ color: 'var(--text-muted)' }}>
                {item.period}
              </div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {item.role}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
