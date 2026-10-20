import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { site } from '../config/site'

export default function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-40 px-4"
    >
      <nav
        className={`mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-6 ${
          scrolled ? 'border-white/10 bg-black/50 shadow-2xl shadow-black/40 backdrop-blur-xl' : 'border-transparent'
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 grid-cols-2 gap-0.5 rounded-lg bg-white/5 p-1.5">
            <span className="rounded-[3px] bg-indigo-400" />
            <span className="rounded-[3px] bg-fuchsia-400/60" />
            <span className="rounded-[3px] bg-fuchsia-400/60" />
            <span className="rounded-[3px] bg-pink-400" />
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-white sm:text-base">{site.name}</span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <a href="#work" className="rounded-full px-3 py-2 text-sm text-zinc-400 transition hover:text-white">
            Work
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-indigo-100"
          >
            Let&apos;s talk
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </nav>
    </motion.header>
  )
}
