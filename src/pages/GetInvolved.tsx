import { Link } from 'react-router-dom'
import { PageHero } from '../components/Bits'
import { Reveal, Tilt } from '../components/Motion'
import { INQUIRIES } from '../data'
export default function GetInvolved() {
  return (<><PageHero eyebrow="Get Involved" title="Partner With Us" text="Teachers, schools and education stakeholders are welcome to connect with TWL." img="/images/hero.jpg" />
    <section><div className="wrap"><div className="grid g3">{INQUIRIES.slice(0, 4).map((t, i) => (
      <Reveal key={t} delay={i * 0.08}><Tilt><div className="card"><h3>{t}</h3><p>Reach out to learn how TWL can work with you.</p><Link className="btn navy" to={`/contact?type=${encodeURIComponent(t)}`}>Inquire</Link></div></Tilt></Reveal>))}</div>
      <p className="note" style={{ marginTop: 24 }}>No online donation system is configured. To support TWL’s charity and health work, please contact the organization directly.</p></div></section></>)
}
