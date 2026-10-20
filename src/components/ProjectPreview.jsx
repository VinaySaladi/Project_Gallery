import { useState } from 'react'

export function hostOf(url) {
  try {
    return new URL(url).host.replace(/^www\./, '')
  } catch {
    return ''
  }
}

/**
 * Shows the project's screenshot when there is one; otherwise draws a mock browser window
 * in the project's accent colours so every card still looks finished.
 */
export default function ProjectPreview({ project, className = '' }) {
  const [failed, setFailed] = useState(false)
  const [from, to] = project.accent ?? ['#6366f1', '#ec4899']

  if (project.image && !failed) {
    return (
      <img
        src={project.image}
        alt={`${project.title} website preview`}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover object-top ${className}`}
      />
    )
  }

  const host = hostOf(project.liveUrl) || `${project.id}.com`

  return (
    <div
      role="img"
      aria-label={`${project.title} preview`}
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <div className="bg-grid absolute inset-0 opacity-50" />
      <div className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-white/25 blur-3xl" />
      <div className="absolute -left-10 -top-16 h-40 w-40 rounded-full bg-black/20 blur-2xl" />

      <div className="absolute inset-x-[8%] bottom-0 top-[12%] overflow-hidden rounded-t-xl border border-white/25 bg-black/35 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-amber-300/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
          <span className="ml-2 truncate rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] text-white/70">{host}</span>
        </div>
        <div className="p-4 sm:p-5">
          <p className="font-display text-lg font-semibold leading-tight text-white sm:text-2xl">{project.title}</p>
          <div className="mt-3 space-y-1.5">
            <div className="h-1.5 w-3/4 rounded-full bg-white/25" />
            <div className="h-1.5 w-1/2 rounded-full bg-white/15" />
          </div>
          <div className="mt-4 flex gap-2">
            <div className="h-5 w-16 rounded-full bg-white/80" />
            <div className="h-5 w-12 rounded-full border border-white/30" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[4/3] rounded-md bg-white/10" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
