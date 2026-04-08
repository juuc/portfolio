import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { DATA } from '../data'

export default function OtherProjects() {
  const { lang } = useLang()
  const d = DATA[lang]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const navigate = useNavigate()

  return (
    <section className="py-24 px-6 pb-40" style={{ maxWidth: 900, margin: '0 auto' }}>
      <motion.h2
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold tracking-tight mb-8"
        style={{ color: 'var(--text)' }}
      >
        {d.sections.otherProjects}
      </motion.h2>

      <div
        className="rounded-xl overflow-hidden"
        style={{ border: '1px solid var(--border)' }}
      >
        {d.other.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
            className="flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors duration-150 border-b last:border-b-0"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border)',
            }}
            whileHover={{ backgroundColor: '#1f1f23' }}
            onClick={() => navigate(`/${lang}/projects/${item.id}`)}
          >
            <span className="font-medium text-sm flex-1" style={{ color: 'var(--text)' }}>
              {item.name}
            </span>
            {item.commits !== null && (
              <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                {item.commits} {d.labels.commits}
              </span>
            )}
            <span className="text-sm flex-1 text-right" style={{ color: 'var(--text-secondary)' }}>
              {item.desc}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
