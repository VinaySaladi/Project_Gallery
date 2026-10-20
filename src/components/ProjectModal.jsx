import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Clock, Code2, X } from 'lucide-react'
import ProjectPreview, { hostOf } from './ProjectPreview'

const ease = [0.22, 1, 0.36, 1]

export default function ProjectModal({ project, onClose, onPrev, onNext, canNavigate }) {
  const isOpen = !!project

  useEffect(() => {
    if (!isOpen) return
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose, onNext, onPrev])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ y: 80, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-t-3xl border border-white/10 bg-panel shadow-2xl sm:rounded-3xl"
          >
            <button
              autoFocus
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 rounded-full bg-black/60 p-2 text-white backdrop-blur transition hover:rotate-90 hover:bg-black/80"
            >
              <X className="h-5 w-5" />
            </button>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3, ease }}
              >
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <motion.div
                    className="h-full w-full"
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease }}
                  >
                    <ProjectPreview project={project} />
                  </motion.div>
                </div>

                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
                  className="p-6 sm:p-10"
                >
                  <Item className="flex flex-wrap items-center gap-3 text-sm text-zinc-500">
                    <span className="font-medium uppercase tracking-wider" style={{ color: project.accent?.[0] }}>
                      {project.category}
                    </span>
                    <span>•</span>
                    <span>{project.year}</span>
                    {project.liveUrl && (
                      <>
                        <span>•</span>
                        <span>{hostOf(project.liveUrl)}</span>
                      </>
                    )}
                  </Item>

                  <Item as="h2" id="project-modal-title" className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
                    {project.title}
                  </Item>

                  <Item as="p" className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
                    {project.description || project.summary}
                  </Item>

                  {project.highlights?.length > 0 && (
                    <Item as="ul" className="mt-8 grid gap-3 sm:grid-cols-2">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3 text-sm text-zinc-300">
                          <span className="mt-0.5 rounded-full bg-emerald-400/15 p-1 text-emerald-400">
                            <Check className="h-3 w-3" />
                          </span>
                          {h}
                        </li>
                      ))}
                    </Item>
                  )}

                  {project.tags?.length > 0 && (
                    <Item as="ul" className="mt-8 flex flex-wrap gap-2">
                      {project.tags.map((t) => (
                        <li key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                          {t}
                        </li>
                      ))}
                    </Item>
                  )}

                  <Item className="mt-10 flex flex-wrap gap-3">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:shadow-[0_0_40px_-5px_rgba(129,140,248,0.7)]"
                      >
                        Visit live website
                        <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm text-zinc-500">
                        <Clock className="h-4 w-4" /> Live link coming soon
                      </span>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                      >
                        <Code2 className="h-4 w-4" /> Source code
                      </a>
                    )}
                  </Item>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {canNavigate && (
              <div className="sticky bottom-0 flex items-center justify-between border-t border-white/10 bg-panel/90 px-6 py-3 backdrop-blur sm:px-10">
                <button onClick={onPrev} className="inline-flex items-center gap-1 text-sm text-zinc-400 transition hover:text-white">
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>
                <span className="hidden text-xs text-zinc-600 sm:block">Use ← → keys to browse</span>
                <button onClick={onNext} className="inline-flex items-center gap-1 text-sm text-zinc-400 transition hover:text-white">
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Item({ as = 'div', children, ...props }) {
  const Tag = motion[as]
  return (
    <Tag variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }} {...props}>
      {children}
    </Tag>
  )
}
