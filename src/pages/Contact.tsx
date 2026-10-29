import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHero } from '../components/Bits'
import { EMAIL, INQUIRIES, OFFICES, PHONES } from '../data'

// Optional real backend: set VITE_CONTACT_ENDPOINT (see README). Without it, the form opens the visitor's email app.
const ENDPOINT = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) || undefined

export default function Contact() {
  const [sp] = useSearchParams()
  const [errs, setErrs] = useState<Record<string, string>>({})
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'mail' | 'error'>('idle')
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (state === 'sending') return
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    if (d.website) return
    const er: Record<string, string> = {}
    if (!d.name?.trim()) er.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email ?? '')) er.email = 'Please enter a valid email address.'
    if ((d.message ?? '').trim().length < 5) er.message = 'Please enter a message.'
    setErrs(er)
    if (Object.keys(er).length) return
    if (ENDPOINT) {
      setState('sending')
      try { const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }); setState(r.ok ? 'sent' : 'error') } catch { setState('error') }
    } else {
      const body = `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone}\nOrganization: ${d.org}\nInquiry: ${d.type}\n\n${d.message}`
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Website inquiry: ' + d.type)}&body=${encodeURIComponent(body)}`
      setState('mail')
    }
  }
  const field = (id: string, label: string, props: Record<string, unknown> = {}) => (<><label htmlFor={id}>{label}</label><input id={id} name={id} aria-invalid={!!errs[id]} {...props} /><div className="err">{errs[id]}</div></>)
  const t = sp.get('type') ?? ''
  return (<><PageHero eyebrow="Contact Us" title="Let’s work together" text="Call, email, or send us a message." />
    <section><div className="wrap grid g2"><div><h2>Reach us</h2>{PHONES.map(p => <p key={p} style={{ margin: 0 }}><a href={`tel:${p}`}>{p}</a></p>)}<p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        <h2 style={{ marginTop: 32 }}>Our Offices</h2>{OFFICES.map(o => <p key={o.label}><b>{o.label}:</b> {o.org}<br />{o.address}</p>)}</div>
      <form className="card" onSubmit={submit} noValidate>
        <div style={{ position: 'absolute', left: -9999 }} aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div>
        {field('name', 'Full name *', { required: true })}{field('email', 'Email *', { type: 'email', required: true })}{field('phone', 'Phone (optional)', { type: 'tel' })}{field('org', 'Organization or school (optional)')}
        <label htmlFor="type">Inquiry type</label><select id="type" name="type" defaultValue={INQUIRIES.includes(t) ? t : 'General Inquiry'}>{INQUIRIES.map(i => <option key={i}>{i}</option>)}</select>
        <label htmlFor="message">Message *</label><textarea id="message" name="message" rows={5} aria-invalid={!!errs.message} /><div className="err">{errs.message}</div>
        <button className="btn navy" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send message'}</button>
        <p role="status" className="note">{state === 'sent' && 'Your message was delivered to the server.'}{state === 'mail' && 'Your email app should open with the message ready. It is only sent when you press Send there.'}{state === 'error' && `Sorry, sending failed. Please email ${EMAIL} directly.`}</p>
      </form></div></section></>)
}
