import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useSpring } from 'framer-motion'
import { Check, Copy, Mail, MessageCircle } from 'lucide-react'
import { site } from '../config/site'

const ease = [0.22, 1, 0.36, 1]

/** Wraps a child so it gently follows the cursor while hovered. */
function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 160, damping: 14 })
  const y = useSpring(0, { stiffness: 160, damping: 14 })

  function handleMove(e) {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  )
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for browsers/contexts without the async clipboard API (e.g. plain http).
    const el = document.createElement('textarea')
    el.value = text
    el.setAttribute('readonly', '')
    el.style.position = 'fixed'
    el.style.opacity = '0'
    document.body.appendChild(el)
    el.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(el)
    return ok
  }
}

function CopyEmailButton({ email }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  async function handleCopy() {
    if (!(await copyText(email))) return
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Email copied' : `Copy email address ${email}`}
      className={`relative inline-flex items-center gap-2 rounded-full border px-7 py-4 text-sm font-semibold transition ${
        copied
          ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'
          : 'border-white/15 bg-white/5 text-white backdrop-blur hover:border-white/30 hover:bg-white/10'
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? 'done' : 'copy'}
          initial={{ opacity: 0, y: 8, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center gap-2"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy email'}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </button>
  )
}

export default function Contact() {
  const whatsappHref = site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`
    : ''

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-28 sm:py-36">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="bg-grid mask-fade-radial absolute inset-0" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-400">Next project</p>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
          Like what you see? <span className="text-gradient">Let&apos;s build yours.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-zinc-400 sm:text-lg">
          Tell me about your business and I&apos;ll get back to you with ideas, a timeline and a quote.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {site.email && (
            <Magnetic>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black shadow-[0_0_60px_-10px_rgba(129,140,248,0.8)] transition hover:bg-indigo-50"
              >
                <Mail className="h-4 w-4" /> {site.email}
              </a>
            </Magnetic>
          )}
          {site.email && (
            <Magnetic>
              <CopyEmailButton email={site.email} />
            </Magnetic>
          )}
          {whatsappHref && (
            <Magnetic>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-7 py-4 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/20"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </Magnetic>
          )}
        </div>
      </motion.div>
    </section>
  )
}
