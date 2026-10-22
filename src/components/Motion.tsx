import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

export function Reveal({ children, delay = 0, className = '', from = 'up' }: { children: ReactNode; delay?: number; className?: string; from?: 'up' | 'left' | 'right' }) {
  const reduce = useReducedMotion()
  const x = from === 'left' ? -40 : from === 'right' ? 40 : 0
  const y = from === 'up' ? 28 : 0
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, x, y }} whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay }}>{children}</motion.div>
}

/** Restrained 3D tilt on hover. */
export function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} style={{ transformPerspective: 900 }}
    whileHover={reduce ? undefined : { rotateX: -4, rotateY: 5, y: -6 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }}>{children}</motion.div>
}

export function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!inView) return
    if (reduce) { setN(to); return }
    let f = 0
    const id = setInterval(() => { f++; setN(Math.round((to * f) / 40)); if (f >= 40) clearInterval(id) }, 30)
    return () => clearInterval(id)
  }, [inView, to, reduce])
  return <span ref={ref}>{n}</span>
}
