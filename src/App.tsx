import { HashRouter, Routes, Route } from 'react-router-dom'
import { LangProvider } from './context/LangContext'
import Nav from './components/Nav'
import Hero from './components/Hero'

function Home() {
  return (
    <>
      <Hero />
      <div style={{ color: 'var(--text-secondary)', padding: '80px 40px' }}>More sections coming…</div>
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
