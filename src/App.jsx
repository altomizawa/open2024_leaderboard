import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState , useRef, useEffect } from 'react'
import styles from '../src/App.module.css'

import './App.css'

import Header from './components/Header/Header'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Leaderboards from './pages/Leaderboards'
import EditPlayerScore from './pages/EditPlayerScore'
import NotFoundPage from './pages/NotFoundPage'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import requestApi from './utils/api'
import authApi from './utils/auth'
import Main from './pages/Main'

function App() {
  const [isLoginPopupActive, setIsLoginPopupActive] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(false);


  const popupRef = useRef(null);

  const navigate = useNavigate();
  
  const handleOpenPopup = () => {
    setIsLoginPopupActive(true)
  }

  const handleClosePopup = () => {
    setIsLoginPopupActive(false)
    navigate('/')
  }

  // HANDLE LOGIN AFTER TOKEN CHECK
  const handleLogin = async(token) => {
    const loggedUser = await authApi.getMyProfile(token)
    if(!loggedUser) {
      return console.error('Login failed', err)
    }
    setUser(loggedUser)
    setIsLoggedIn(true)
    // handleClosePopup();
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({})
    localStorage.removeItem('token')
    navigate('/')
  }

  // CHECK FOR PREVIOUS TOKEN AND LOGIN IF EXISTS
  useEffect(() => {
    const token = localStorage.getItem('token');
    token ? handleLogin(token) : console.log('no token found, login')
  },[])

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        isLoginPopupActive={isLoginPopupActive}
        popupRef={popupRef}
        handleLogout={handleLogout}
        handleOpenPopup={handleOpenPopup}
        handleClosePopup={handleClosePopup}
        handleLogin={handleLogin}
        user={user}
        setUser={setUser}
      />
      
      <div className={styles.main}>
        <h1 className={styles.title}>Open LEADERBOARD</h1>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/admin' element={
          <ProtectedRoute isLoggedIn={isLoggedIn} />}>
            <Route path='/admin' element={<Admin />} />
        </Route>
        <Route path='/:id/editscore' element={<EditPlayerScore />} />
        <Route path='/register' element={<Register popupRef={popupRef} handleClosePopup={handleClosePopup}/>}/>
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
