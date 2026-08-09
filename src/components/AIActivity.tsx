import { motion } from 'framer-motion'

import { useLang } from '../context/LangContext'
import { DATA, type Lang } from '../data'

export function AIActivityCard({ lang }: { lang: Lang }) {
  const content = DATA[lang].aiActivity
  const asset = `${import.meta.env.BASE_URL}metrics/ai-activity-dark-${lang}.svg`

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="ai-activity-section px-6"
      aria-labelledby="ai-activity-heading"
    >
      <div className="ai-activity-heading-row">
        <div>
          <p className="ai-activity-eyebrow">{content.eyebrow}</p>
          <h2 id="ai-activity-heading" className="ai-activity-title">
            {content.title}
          </h2>
        </div>
        <p className="ai-activity-description">{content.description}</p>
      </div>

      <div
        className="ai-activity-frame"
        role="region"
        tabIndex={0}
        aria-label={content.regionLabel}
      >
        <img className="ai-activity-image" src={asset} alt={content.alt} />
      </div>

      <p className="ai-activity-note">{content.note}</p>
    </motion.section>
  )
}

export default function AIActivity() {
  const { lang } = useLang()
  return <AIActivityCard lang={lang} />
}
