import { useCallback, useMemo, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { projects as allProjects } from './data/projects'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import WorkSection from './components/WorkSection'
import ProjectModal from './components/ProjectModal'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Featured first, then newest first.
const projects = [...allProjects].sort(
  (a, b) => Number(!!b.featured) - Number(!!a.featured) || (b.year ?? 0) - (a.year ?? 0),
)
const categories = ['All', ...new Set(projects.map((p) => p.category))]
const technologies = [...new Set(projects.flatMap((p) => p.tags ?? []))]

export default function App() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [activeId, setActiveId] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      if (category !== 'All' && p.category !== category) return false
      if (!q) return true
      return [p.title, p.summary, p.category, ...(p.tags ?? [])].join(' ').toLowerCase().includes(q)
    })
  }, [category, query])

  // The modal walks through whatever is currently visible in the grid.
  const activeIndex = filtered.findIndex((p) => p.id === activeId)
  const active = activeIndex >= 0 ? filtered[activeIndex] : null

  const close = useCallback(() => setActiveId(null), [])
  const step = useCallback(
    (dir) => {
      if (activeIndex < 0 || filtered.length < 2) return
      setActiveId(filtered[(activeIndex + dir + filtered.length) % filtered.length].id)
    },
    [activeIndex, filtered],
  )

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero
          stats={[
            { value: projects.length, label: 'Live projects' },
            { value: categories.length - 1, label: 'Industries served' },
            { value: technologies.length, label: 'Technologies' },
          ]}
        />
        <TechMarquee items={technologies} />
        <WorkSection
          projects={filtered}
          total={projects.length}
          categories={categories}
          category={category}
          onCategory={setCategory}
          query={query}
          onQuery={setQuery}
          onOpen={setActiveId}
        />
        <Contact />
      </main>
      <Footer />
      <ProjectModal
        project={active}
        onClose={close}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
        canNavigate={filtered.length > 1}
      />
    </MotionConfig>
  )
}
