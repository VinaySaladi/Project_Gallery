import { ArrowUp } from 'lucide-react'
import { site } from '../config/site'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-sm text-zinc-500 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.role}
        </p>
        {site.socials.length > 0 && (
          <ul className="flex gap-5">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
        <a href="#top" className="group inline-flex items-center gap-1.5 transition hover:text-white">
          Back to top <ArrowUp className="h-4 w-4 transition group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  )
}
