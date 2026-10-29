import { PageHero } from '../components/Bits'
import { Reveal, Counter } from '../components/Motion'
import { KEYNOTE } from '../data'
const MS = [
  ['Teacher refresher workshops', 'Since its inception, Teacher World Liberia has actively engaged private, faith-based, and public institutions through teacher refresher workshops conducted in Sanniquellie, Yekepa, Lower Margibi, and Montserrado County.'],
  ['Educational survey — September 2022', 'In September 2022, TWL conducted an educational survey in Nimba County, specifically in Yekepa, Sanniquellie, and Borsonnor. The survey revealed that 328 individuals expressed interest in attending an in-service teacher training institution because many could not afford enrollment at Nimba University or other higher institutions. In response, TWL assured participants of its commitment to addressing their educational and professional development needs.'],
  ['First cohort of teacher-trainees', 'Teacher World Liberia successfully graduated its first cohort of teacher-trainees. Nine (9) people completed the program and are qualified and prepared to contribute positively to classrooms and Liberia’s education sector.'],
  ['Future expansion', 'TWL intends to extend its services across Liberia, beginning with Montserrado County.'],
]
export default function Impact() {
  return (<>
    <PageHero eyebrow="Our Impact" title="Milestones so far" text="Reported historical achievements, not live or continuously updated statistics." img="/images/grad.jpg" />
    <section><div className="wrap">
      <div className="grid g2"><div className="card"><div className="stat"><Counter to={328} /></div><p>individuals expressed interest in in-service teacher training.</p></div>
        <div className="card"><div className="stat"><Counter to={9} /></div><p>teacher-trainees graduated from the first cohort.</p></div></div>
      <Reveal><div className="card keynote"><img src={KEYNOTE.img} alt={KEYNOTE.alt} loading="lazy" /><div><p className="eyebrow">Our first graduation guest speaker</p><h3>{KEYNOTE.name}</h3><p>{KEYNOTE.role}</p></div></div></Reveal>
      <div className="tl">{MS.map(([h, p], i) => <Reveal key={h} from={i % 2 ? 'right' : 'left'}><div><h3>{h}</h3><p>{p}</p></div></Reveal>)}</div></div></section>
  </>)
}
