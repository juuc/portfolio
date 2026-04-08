import { HashRouter, Routes, Route } from 'react-router-dom'
import { LangProvider } from './context/LangContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Skills from './components/Skills'
import OtherProjects from './components/OtherProjects'

function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Timeline />
      <Skills />
      <OtherProjects />
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <HashRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </HashRouter>
    </LangProvider>
  )
}
