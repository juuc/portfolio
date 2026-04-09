import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'
import { DATA } from '../data'

import Particles from './ui/Particles'
import DecryptedText from './ui/DecryptedText'
import BlurText from './ui/BlurText'
import CountUp from './ui/CountUp'

export default function Hero() {
  const { lang } = useLang()
  const d = DATA[lang]
  const heroRef = useRef<HTMLDivElement>(null)
  const [showName, setShowName] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowName(true), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden"
      style={{ paddingTop: 56 }}
    >
      {/* Particles background */}
      <div className="absolute inset-0 z-0">
        <Particles
          className="absolute inset-0"
          particleCount={120}
          particleSpread={8}
          speed={0.08}
          particleColors={['#6366f1', '#818cf8', '#a5b4fc', '#ffffff']}
          alphaParticles
          particleBaseSize={80}
          sizeRandomness={1.2}
          moveParticlesOnHover
          particleHoverFactor={0.3}
        />
      </div>

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 pointer-events-none">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-widest uppercase mb-6"
          style={{ color: 'rgba(99,102,241,0.8)', letterSpacing: '0.2em' }}
        >
          {d.title}
        </motion.div>

        {/* Name — DecryptedText animation */}
        <div className="mb-4 flex justify-center">
          {showName && (
            <DecryptedText
              text={d.name}
              className="text-5xl md:text-7xl font-bold tracking-tight"
              speed={120}
              revealDirection="start"
            />
          )}
        </div>

        {/* Alt name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-sm mb-8"
          style={{ color: 'var(--text-muted)' }}
        >
          {d.nameAlt}
        </motion.div>

        {/* Subtitle — BlurText */}
        <div
          className="mb-10 text-base leading-relaxed max-w-xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}
        >
          <BlurText
            text={d.intro}
            delay={60}
            stepDuration={0.4}
            animateBy="words"
            direction="top"
            className="text-base leading-relaxed"
          />
        </div>

        {/* Stats with CountUp */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-12"
        >
          {d.stats.map((stat) => {
            const numericValue = parseInt(stat.value.replace(/\D/g, ''), 10)
            return (
              <div key={stat.label} className="text-center">
                <div
                  className="text-2xl font-bold font-mono mb-1"
                  style={{ color: 'var(--text)' }}
                >
                  <CountUp
                    from={0}
                    to={numericValue}
                    duration={2}
                    delay={2}
                    separator=","
                  />
                </div>
                <div
                  className="text-xs uppercase tracking-widest"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {stat.label}
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
          className="flex flex-col items-center gap-2"
          style={{ color: 'var(--text-muted)' }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
