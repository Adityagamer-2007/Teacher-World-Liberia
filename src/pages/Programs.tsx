import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { PageHero } from '../components/Bits'
import { Reveal } from '../components/Motion'
import { PROGRAMS } from '../data'

function Item({ t }: { t: string }) {
  const [o, setO] = useState(false)
  const cut = t.indexOf(' ', 40)
  const short = cut > 0 ? t.slice(0, cut) + '…' : t
  return (<div className="acc"><button aria-expanded={o} onClick={() => setO(!o)}><span>{o ? 'Hide detail' : short}</span><ChevronDown className={o ? 'rot' : ''} /></button>
    <AnimatePresence>{o && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{t}</motion.p>}</AnimatePresence></div>)
}
export default function Programs() {
  return (<>
    <PageHero eyebrow="Programs & Services" title="Three program areas" text="Training, educational consultancy, and charity & health support." />
    {PROGRAMS.map((p, i) => (<section key={p.id} id={p.id} className={i % 2 ? 'alt' : ''}><div className="wrap grid g2" style={{ alignItems: 'start' }}>
      <Reveal from={i % 2 ? 'right' : 'left'}><h2>{p.title}</h2>
        {p.id === 'consultancy' ? p.items.map(t => <Item key={t} t={t} />) : <ul>{p.items.map(t => <li key={t}>{t}</li>)}</ul>}
        <p><Link className="btn navy" to={`/contact?type=${encodeURIComponent(p.type)}`}>Inquire about {p.title}</Link></p></Reveal>
      {p.img ? <Reveal from={i % 2 ? 'left' : 'right'}><img className="photo" src={p.img} alt={p.title + ' photograph supplied by TWL'} loading="lazy" /></Reveal>
        : <Reveal from="right"><div className="card blueprint"><p>Systems · Policies · Databases · Materials · Printing · Advocacy</p></div></Reveal>}
    </div></section>))}
  </>)
}
