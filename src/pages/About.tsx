import { Link } from 'react-router-dom'
import { PageHero, WhyGrid } from '../components/Bits'
import { Reveal } from '../components/Motion'
export default function About() {
  return (<>
    <PageHero eyebrow="About Us" title="Who we are" text="Teacher World Liberia works to improve the quality of education across Liberia." img="/images/training.jpg" />
    <section><div className="wrap grid g2"><Reveal from="left"><h2>Our purpose</h2>
      <p>TWL works to improve the quality of education through teacher professional development, training, educational consultancy, learning resources, and community-focused initiatives.</p>
      <p>The organization aims to expand its services across Liberia, beginning with Montserrado County, while responding to the educational and professional development needs of teachers and communities.</p>
      <p><b>Duration:</b> Long-term goal project.</p></Reveal>
      <Reveal from="right"><div className="card"><h3>Proposed mission</h3><p>To raise the quality of teaching through training, resources and community support.</p><h3>Proposed vision</h3><p>Quality education and opportunity for every learner and teacher across Liberia.</p>
        <p className="note">Proposed summaries of TWL’s work, pending client approval; not official quotations.</p></div></Reveal></div></section>
    <section className="alt"><div className="wrap"><h2>Why choose us</h2><WhyGrid /><p><Link className="btn navy" to="/programs">Explore programs</Link></p></div></section>
  </>)
}
