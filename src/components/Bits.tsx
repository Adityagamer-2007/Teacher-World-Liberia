import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Reveal, Tilt } from './Motion'
import { TEAM, WHY } from '../data'
import { GraduationCap, TrendingUp, School, BookOpen, HeartHandshake, Sprout } from 'lucide-react'

export function PageHero({ eyebrow, title, text, img }: { eyebrow: string; title: string; text: string; img?: string }) {
  return (<section className="phero" style={img ? { backgroundImage: `linear-gradient(105deg,rgba(11,36,71,.95) 40%,rgba(11,36,71,.6)),url(${img})` } : undefined}><div className="wrap">
    <motion.p className="eyebrow gold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{eyebrow}</motion.p>
    <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>{title}</motion.h1>
    <motion.p className="lead light" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>{text}</motion.p></div></section>)
}
export function TeamGrid() {
  return (<div className="grid g4">{TEAM.map((m, i) => (
    <Reveal key={m.name} delay={i * 0.1}><Tilt><article className="card team"><img src={m.img} alt={m.alt} loading="lazy" /><div className="t"><h3>{m.name}</h3><p>{m.role}</p></div></article></Tilt></Reveal>))}</div>)
}
const ICONS = [GraduationCap, TrendingUp, School, BookOpen, HeartHandshake, Sprout]
export function WhyGrid() {
  return (<div className="grid g3">{WHY.map((w, i) => { const I = ICONS[i]; return (
    <Reveal key={w} delay={i * 0.07}><Tilt><div className="card"><I className="ic" /><p>{w}</p></div></Tilt></Reveal>) })}</div>)
}
export function CtaBand() {
  return (<section className="cta-band"><div className="wrap"><h2>Partner With Us</h2><p>Teachers, schools and supporters are welcome to get in touch about training, consultancy, partnerships or supporting out-of-school children.</p>
    <Link className="btn gold" to="/get-involved">Get Involved</Link></div></section>)
}
