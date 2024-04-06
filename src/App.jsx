import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState , useRef } from 'react'
import styles from '../src/App.module.css'

import korLogo from './assets/kor-logo.svg'

import './App.css'

import Admin from './pages/Admin'
import Login from './pages/Login'
import Leaderboards from './pages/Leaderboards'
import EditPlayerScore from './pages/EditPlayerScore'
import NotFoundPage from './pages/NotFoundPage'
import Register from './pages/Register'

function App() {
  const [isLoginPopupActive, setIsLoginPopupActive] = useState(false)
  const popupRef = useRef(null);

  const navigate = useNavigate();
  
  const handleOpenPopup = () => {
    setIsLoginPopupActive(true)
  }

  const handleClosePopup = () => {
    setIsLoginPopupActive(false)
    navigate('/')
  }


  return (
    <>
      <header className='header'>
        <img src={korLogo} onClick={() => navigate('/')} className='header__logo'/>
        <div className='header__login'>
          <button onClick={handleOpenPopup} className='header__button'>LOGIN</button>
          {isLoginPopupActive && <Login handleClosePopup={handleClosePopup} popupRef={popupRef} navigate={navigate}/> }
        </div>
      </header>
      <div>
        {/* <img src={korLogo} className={styles.logo}></img> */}
        <h1 className={styles.title}>Open 2024 LEADERBOARD</h1>
      <Routes>
        <Route path='/register' element={<Register popupRef={popupRef} handleClosePopup={handleClosePopup}/>}/>
        <Route path='/admin' element={<Admin />} />
        <Route path='/' element={<Leaderboards />} />
        <Route path='/:id/editscore' element={<EditPlayerScore />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      </div>
      <footer className='footer'>
        <p className='footer__type'>Design & Developed by Al Tomizawa 2024</p>
      </footer>

    </>
  )
}

export default App
