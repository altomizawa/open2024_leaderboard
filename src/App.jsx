import { Routes, Route } from 'react-router-dom'
import styles from '../src/App.module.css'

import korLogo from './assets/kor-logo.svg'

import './App.css'

import Admin from './pages/Admin'

import Leaderboards from './pages/Leaderboards'
import EditPlayerScore from './pages/EditPlayerScore'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <>
      <div>
        <img src={korLogo} className={styles.logo}></img>
        <h1 className={styles.title}>Open 2024 LEADERBOARD</h1>
      <Routes>
        <Route path='/admin' element={<Admin />} />
        <Route path='/' element={<Leaderboards />} />
        <Route path='/:id/editscore' element={<EditPlayerScore />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      </div>

    </>
  )
}

export default App
