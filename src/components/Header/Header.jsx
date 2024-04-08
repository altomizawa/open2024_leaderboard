import { useNavigate } from "react-router-dom"
import korLogo from '../../assets/kor-logo.svg'

import Login from "../../pages/Login";


export default function Header(props) {
    const navigate = useNavigate();
    const {isLoggedIn, handleLogout, handleClosePopup, handleOpenPopup, isLoginPopupActive, popupRef, handleLogin, user, setUser} = props
    return (
        <>
        <header className='header'>
        <img src={korLogo} onClick={() => navigate('/')} className='header__logo'/>
        <div className='header__login'>
          {isLoggedIn ? 
            (<>
             <div className='profile'>
                <div className='profile__details'>
                    <img className='profile__picture' src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="profile picture" />
                    <p>{user.name}</p>                   
                </div>
                <div className='profile__link-wrapper'>
                    <a onClick={() => {console.log(user)}} className='header__link'>EDIT PROFILE</a>
                    <a onClick={() => {navigate('/admin')}} className='header__link'>GO TO ADMIN</a>
                    <a onClick={handleLogout} className='header__link'>LOG OUT</a>
                    <a onClick={() => {console.log('close profile')}} className='header__link'>X</a>            
                </div>
             </div>
            </>)
           : <button onClick={handleOpenPopup} className='header__button'>LOGIN</button>
          }
          {isLoginPopupActive && <Login handleClosePopup={handleClosePopup} popupRef={popupRef} navigate={navigate} handleLogin={handleLogin} /> }
        </div>
      </header>
        </>
    )
}