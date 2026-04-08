import { HashRouter, Routes, Route } from 'react-router-dom'
import { LangProvider } from './context/LangContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Skills from './components/Skills'
import OtherProjects from './components/OtherProjects'
import MarkdownPage from './components/MarkdownPage'

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
          <Route path="/:lang/projects/:id" element={<MarkdownPage />} />
          <Route path="/:lang/overview" element={<MarkdownPage />} />
          <Route path="/:lang/timeline" element={<MarkdownPage />} />
          <Route path="/:lang/skills" element={<MarkdownPage />} />
          <Route path="/:lang/architecture" element={<MarkdownPage />} />
          <Route path="/:lang/intelz" element={<MarkdownPage />} />
        </Routes>
      </HashRouter>
    </LangProvider>
  )
}
