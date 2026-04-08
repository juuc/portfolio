import { HashRouter, Routes, Route } from 'react-router-dom'
import { LangProvider } from './context/LangContext'
import Nav from './components/Nav'

function Home() {
  return <div style={{ paddingTop: 56, color: 'var(--text-secondary)', padding: '80px 40px' }}>Sections coming soon…</div>
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
