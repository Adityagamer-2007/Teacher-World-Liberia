import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Reveal, Tilt, Counter } from '../components/Motion'
import { CtaBand, TeamGrid, WhyGrid } from '../components/Bits'
import { EMAIL, PHONES, PROGRAMS } from '../data'
const Globe3D = lazy(() => import('../components/Globe3D'))

export default function Home() {
  return (<>
    <section className="hero"><div className="wrap grid g2" style={{ alignItems: 'center' }}>
      <div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>Better Teachers. Better World.</motion.h1>
        <motion.p className="sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Empowering Educators. Strengthening Schools. Transforming Lives.</motion.p>
        <motion.p className="light" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>Teacher World Liberia is committed to strengthening education through quality teacher training, professional development, educational consultancy, and opportunities for children and communities across Liberia.</motion.p>
        <div className="row"><Link className="btn gold" to="/programs">Explore Our Programs</Link><Link className="btn out" to="/get-involved">Partner With Us</Link></div>
      </div>
      <Suspense fallback={<div className="globe-fallback" />}><Globe3D /></Suspense>
    </div></section>

    <section><div className="wrap grid g2" style={{ alignItems: 'center' }}>
      <Reveal from="left"><p className="eyebrow">About TWL</p><h2>Improving education through its teachers</h2>
        <p>Teacher World Liberia (TWL) works to improve the quality of education through teacher professional development, training, educational consultancy, learning resources, and community-focused initiatives.</p><Link className="btn navy" to="/about">Learn more</Link></Reveal>
      <Reveal from="right"><img className="photo" src="/images/hero.jpg" alt="Graduates holding certificates" loading="lazy" /></Reveal></div></section>

    <section className="alt"><div className="wrap"><p className="eyebrow">Programs &amp; Services</p><h2>What we do</h2>
      <div className="grid g3">{PROGRAMS.map((p, i) => <Reveal key={p.id} delay={i * 0.1}><Tilt><div className="card"><h3>{p.title}</h3><p>{p.items[0]}</p><Link to="/programs">See details →</Link></div></Tilt></Reveal>)}</div></div></section>

    <section><div className="wrap"><p className="eyebrow">Why Choose Us?</p><h2>What sets TWL apart</h2><WhyGrid /></div></section>

    <section className="alt"><div className="wrap"><p className="eyebrow">Verified impact</p><h2>Reported milestones</h2>
      <p className="lead">Reported historical figures, not live statistics.</p>
      <div className="grid g2"><div className="card"><div className="stat"><Counter to={328} /></div><p>individuals expressed interest in in-service teacher training (Sept 2022 survey).</p></div>
        <div className="card"><div className="stat"><Counter to={9} /></div><p>teacher-trainees graduated from the first cohort.</p></div></div>
      <p><Link to="/impact">Read the full story →</Link></p></div></section>

    <section><div className="wrap"><p className="eyebrow">Our Team</p><h2>Meet the leadership</h2><TeamGrid /></div></section>
    <CtaBand />
    <section><div className="wrap card"><h2>Contact</h2>{PHONES.map(p => <p key={p} style={{ margin: 0 }}><a href={`tel:${p}`}>{p}</a></p>)}<p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p><Link className="btn navy" to="/contact">Send a message</Link></div></section>
  </>)
}
