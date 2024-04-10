import { useNavigate } from "react-router-dom"
import { useState } from "react";
import korLogo from '../../assets/kor-logo.svg'

import Login from "../../pages/Login";
import ProfilePopup from "../ProfilePopup/ProfilePopup";

export default function Header(props) {
    const navigate = useNavigate();
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false)
    const {isLoggedIn, handleLogout, handleClosePopup, handleOpenPopup, isLoginPopupActive, popupRef, handleLogin, user, setUser} = props

    return (
        <>
        <header className='header'>
        <img src={korLogo} onClick={() => navigate('/')} className='header__logo'/>
        <div className='header__login'>
          {isLoggedIn ? (<div style={{display: 'flex', alignItems: 'center', columnGap: '1rem'}}>
            <p>{user.name}</p>
            <img src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='profile picture' onClick={() => {setIsProfilePopupOpen(true)}} className='header__profile-img'/>
          </div>)
           : <button onClick={handleOpenPopup} className='header__button'>LOGIN</button>
          }
          {isProfilePopupOpen && <ProfilePopup handleLogout={handleLogout} user={user} setIsProfilePopupOpen={setIsProfilePopupOpen} />}
          <Login handleClosePopup={handleClosePopup} popupRef={popupRef} navigate={navigate} handleLogin={handleLogin} isLoginPopupActive={isLoginPopupActive}/>
        </div>
      </header>
        </>
    )
}