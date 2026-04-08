import { HashRouter, Routes, Route } from 'react-router-dom'
import { LangProvider } from './context/LangContext'

function Home() {
  return <div style={{ color: 'white', padding: '80px 40px' }}>Sections coming soon…</div>
}

export default function App() {
  return (
    <LangProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </HashRouter>
    </LangProvider>
  )
}
