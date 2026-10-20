import { motion } from 'framer-motion'
import { Sparkle } from 'lucide-react'

export default function TechMarquee({ items }) {
  if (!items.length) return null
  // Repeat the list so a single copy is always wider than the screen, then render it twice for a seamless loop.
  const row = Array.from({ length: Math.max(2, Math.ceil(10 / items.length)) }, () => items).flat()

  return (
    <div className="mask-fade-x relative overflow-hidden border-y border-white/5 bg-white/[0.02] py-5">
      <motion.div
        className="flex w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: row.length * 3, repeat: Infinity, ease: 'linear' }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {row.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className="flex items-center gap-8 pr-8 font-display text-lg font-medium text-zinc-500 sm:text-xl"
              >
                {item}
                <Sparkle className="h-4 w-4 text-indigo-400/60" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
