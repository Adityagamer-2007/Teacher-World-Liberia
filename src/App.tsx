import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
import Impact from './pages/Impact'
import Team from './pages/Team'
import Contact from './pages/Contact'
import GetInvolved from './pages/GetInvolved'
export default function App() {
  return (<Routes><Route element={<Layout />}>
    <Route index element={<Home />} /><Route path="about" element={<About />} /><Route path="programs" element={<Programs />} />
    <Route path="impact" element={<Impact />} /><Route path="team" element={<Team />} /><Route path="contact" element={<Contact />} />
    <Route path="get-involved" element={<GetInvolved />} /><Route path="*" element={<Home />} /></Route></Routes>)
}
