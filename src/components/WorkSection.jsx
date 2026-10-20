import { AnimatePresence, motion } from 'framer-motion'
import { Search, SearchX, X } from 'lucide-react'
import ProjectCard from './ProjectCard'

const ease = [0.22, 1, 0.36, 1]

function FilterBar({ categories, category, onCategory, query, onQuery }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = c === category
          return (
            <button
              key={c}
              role="tab"
              aria-selected={active}
              onClick={() => onCategory(c)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active ? 'text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="active-filter"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{c}</span>
            </button>
          )
        })}
      </div>

      <label className="relative block md:w-72">
        <span className="sr-only">Search projects</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search projects or tech…"
          className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-indigo-400/60 focus:bg-white/[0.07] [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            onClick={() => onQuery('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-500 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </label>
    </div>
  )
}

export default function WorkSection({ projects, total, onOpen, ...filters }) {
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease }}
        className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-400">Gallery</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            The <span className="text-gradient">Collection</span>
          </h2>
        </div>
        <p className="max-w-sm text-zinc-400">
          A curated collection of my digital works, each one live and ready to explore.
        </p>
      </motion.div>

      <FilterBar {...filters} />

      <p className="mt-6 text-sm text-zinc-500" aria-live="polite">
        Showing {projects.length} of {total} works
      </p>

      <motion.div layout className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
              transition={{ duration: 0.6, ease, delay: (i % 3) * 0.08 }}
            >
              <ProjectCard project={p} onOpen={() => onOpen(p.id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-white/10 py-20 text-center"
          >
            <SearchX className="h-8 w-8 text-zinc-600" />
            <p className="text-zinc-400">No projects match that search.</p>
            <button
              onClick={() => {
                filters.onQuery('')
                filters.onCategory('All')
              }}
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
            >
              Reset filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
