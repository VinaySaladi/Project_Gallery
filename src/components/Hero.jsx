import { useEffect, useRef } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { site } from '../config/site'

const ease = [0.22, 1, 0.36, 1]

function Counter({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, value, { duration: 1.8, ease: 'easeOut' })
    return () => controls.stop()
  }, [inView, value, count])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

function Aurora() {
  const blobs = [
    { className: 'left-[-10%] top-[-10%] h-[28rem] w-[28rem] bg-indigo-600/30', x: [0, 120, -40, 0], y: [0, 60, 120, 0], d: 22 },
    { className: 'right-[-10%] top-[10%] h-[24rem] w-[24rem] bg-fuchsia-600/25', x: [0, -100, 40, 0], y: [0, 100, -40, 0], d: 26 },
    { className: 'bottom-[-15%] left-[30%] h-[26rem] w-[26rem] bg-sky-500/20', x: [0, 80, -80, 0], y: [0, -60, 30, 0], d: 30 },
  ]
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${b.className}`}
          animate={{ x: b.x, y: b.y, scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: b.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function Hero({ stats }) {
  const mx = useMotionValue(-9999)
  const my = useMotionValue(-9999)
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}px ${my}px, rgba(129,140,248,0.14), transparent 60%)`

  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 700], [0, 160])
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0])

  function handleMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  const words = site.headline.split(' ')
  const highlight = site.highlight.split(' ')

  return (
    <section
      id="top"
      onMouseMove={handleMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-32"
    >
      <Aurora />
      <div aria-hidden className="bg-grid mask-fade-radial absolute inset-0" />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative mx-auto w-full max-w-6xl px-6">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {site.availability}
        </motion.span>

        <h1 className="mt-7 max-w-4xl font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {[...words.map((w) => ({ w, hl: false })), ...highlight.map((w) => ({ w, hl: true }))].map(({ w, hl }, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span
                className={`inline-block ${hl ? 'text-gradient' : ''}`}
                initial={{ y: '110%', rotate: 4 }}
                animate={{ y: '0%', rotate: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.45 + i * 0.07 }}
              >
                {w}&nbsp;
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.1 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          {site.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.25 }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:shadow-[0_0_40px_-5px_rgba(129,140,248,0.7)]"
          >
            Explore my work
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/10"
          >
            Start a project
          </a>
        </motion.div>

        <motion.dl
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 1.4 } } }}
          className="mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl font-semibold text-white sm:text-4xl">
                <Counter value={s.value} />
              </dd>
              <dd className="mt-1 text-xs text-zinc-500 sm:text-sm">{s.label}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.a
        href="#work"
        aria-label="Scroll to projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 2 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 rounded-full border border-white/10 p-2.5 text-zinc-400 transition hover:text-white sm:block"
      >
        <ArrowDown className="h-4 w-4" />
      </motion.a>
    </section>
  )
}
