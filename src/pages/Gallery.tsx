import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
import { PageHero } from '../components/Bits'
import { GALLERY, type GalleryItem } from '../gallery'

const FIRST = 12

function Lightbox({ items, start, title, onClose }: { items: GalleryItem[]; start: number; title: string; onClose: () => void }) {
  const [i, setI] = useState(start)
  const closeRef = useRef<HTMLButtonElement>(null)
  const prev = useCallback(() => setI(n => (n + items.length - 1) % items.length), [items.length])
  const next = useCallback(() => setI(n => (n + 1) % items.length), [items.length])
  useEffect(() => {
    const keep = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); else if (e.key === 'ArrowLeft') prev(); else if (e.key === 'ArrowRight') next() }
    window.addEventListener('keydown', k)
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; keep?.focus() }
  }, [onClose, prev, next])
  const it = items[i]
  return (<div className="lb" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
    <div onClick={e => e.stopPropagation()} style={{ display: 'contents' }}>
      {it.type === 'video'
        ? <video key={it.src} src={it.src} poster={it.poster} controls autoPlay playsInline />
        : <img key={it.src} src={it.src} alt={`${title}, photo ${i + 1} of ${items.length}`} />}
      <button className="x" ref={closeRef} aria-label="Close" onClick={onClose}><X /></button>
      <button className="pv" aria-label="Previous" onClick={prev}><ChevronLeft /></button>
      <button className="nx" aria-label="Next" onClick={next}><ChevronRight /></button>
      <div className="cap">{title} · {i + 1} / {items.length}</div>
    </div></div>)
}

export default function Gallery() {
  const [open, setOpen] = useState<{ set: number; i: number } | null>(null)
  const [all, setAll] = useState<Record<string, boolean>>({})
  const close = useCallback(() => setOpen(null), [])
  return (<>
    <PageHero eyebrow="Gallery" title="Moments from our work" text="Photos and videos from TWL trainings, workshops, graduations and community programs." />
    <section><div className="wrap">
      <nav className="gtabs" aria-label="Gallery sections">{GALLERY.map(g => <a key={g.id} href={`#${g.id}`}>{g.title}</a>)}</nav>
      {GALLERY.map((g, si) => {
        const shown = all[g.id] ? g.items : g.items.slice(0, FIRST)
        return (<div key={g.id} id={g.id} style={{ marginBottom: 56, scrollMarginTop: 90 }}>
          <h2>{g.title} <span className="gcount">({g.items.length})</span></h2>
          <div className="ggrid">{shown.map((it, i) => (
            <button key={it.src} className="gitem" aria-label={`${it.type === 'video' ? 'Play video' : 'View photo'} ${i + 1} of ${g.items.length}: ${g.title}`} onClick={() => setOpen({ set: si, i })}>
              <img src={it.thumb ?? it.poster} alt="" loading="lazy" decoding="async" />
              {it.type === 'video' && <span className="play"><Play size={34} /></span>}
            </button>))}</div>
          {g.items.length > FIRST && <button className="btn navy gmore" onClick={() => setAll(a => ({ ...a, [g.id]: !a[g.id] }))}>{all[g.id] ? 'Show fewer' : `Show all ${g.items.length}`}</button>}
        </div>)
      })}
    </div></section>
    {open && <Lightbox items={GALLERY[open.set].items} start={open.i} title={GALLERY[open.set].title} onClose={close} />}
  </>)
}
