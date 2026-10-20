import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Clock, Star } from 'lucide-react'
import ProjectPreview from './ProjectPreview'

const spring = { stiffness: 220, damping: 22 }

export default function ProjectCard({ project, onOpen }) {
  const ref = useRef(null)

  // Pointer position as 0..1 drives the 3D tilt; pixel position drives the spotlight glow.
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const gx = useMotionValue(-500)
  const gy = useMotionValue(-500)
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), spring)
  const [from, to] = project.accent ?? ['#6366f1', '#ec4899']
  const glow = useMotionTemplate`radial-gradient(380px circle at ${gx}px ${gy}px, ${from}33, transparent 60%)`
  const border = useMotionTemplate`radial-gradient(260px circle at ${gx}px ${gy}px, ${to}, transparent 70%)`

  function handleMove(e) {
    const r = ref.current.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    px.set(x / r.width)
    py.set(y / r.height)
    gx.set(x)
    gy.set(y)
  }

  function reset() {
    px.set(0.5)
    py.set(0.5)
    gx.set(-500)
    gy.set(-500)
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className="group relative h-full rounded-3xl p-px"
    >
      {/* Glowing border that follows the cursor */}
      <div className="absolute inset-0 rounded-3xl bg-white/10" />
      <motion.div
        aria-hidden
        style={{ background: border }}
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-panel p-3">
        <motion.div
          aria-hidden
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <button
          onClick={onOpen}
          aria-label={`View details for ${project.title}`}
          className="relative block aspect-[16/10] w-full overflow-hidden rounded-2xl"
        >
          <ProjectPreview
            project={project}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          {project.featured && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-amber-300 backdrop-blur">
              <Star className="h-3 w-3 fill-current" /> Featured
            </span>
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
            <span className="translate-y-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-transform duration-300 group-hover:translate-y-0">
              View details
            </span>
          </span>
        </button>

        <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span className="font-medium uppercase tracking-wider" style={{ color: from }}>
              {project.category}
            </span>
            <span>{project.year}</span>
          </div>
          <h3 className="mt-2 font-display text-xl font-semibold text-white">{project.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">{project.summary}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {(project.tags ?? []).slice(0, 3).map((t) => (
              <li key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[11px] text-zinc-400">
                {t}
              </li>
            ))}
            {(project.tags?.length ?? 0) > 3 && (
              <li className="px-1 py-0.5 text-[11px] text-zinc-500">+{project.tags.length - 3}</li>
            )}
          </ul>

          <div className="mt-auto flex items-center justify-between gap-3 pt-6">
            {/* <button onClick={onOpen} className="text-sm font-medium text-zinc-300 transition hover:text-white">
              View work
            </button> */}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
              >
                Visit live
                <ArrowUpRight className="h-4 w-4 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-500">
                <Clock className="h-3.5 w-3.5" /> Link coming soon
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
