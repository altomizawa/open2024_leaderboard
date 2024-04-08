import {useNavigate} from 'react-router-dom'

export default function ProfilePopup(props) {
  const { handleLogout, user, setIsProfilePopupOpen } = props;
  const navigate = useNavigate();
  
  // EDIT SCORES
  const editScores = () => {
    setIsProfilePopupOpen(false);
    navigate('/admin')
  } 
  // EDIT PROFILE
  
  // LOGOUT
  const logout = () =>{
    handleLogout();
    setIsProfilePopupOpen(false)
  }

  // VIEW LEADERBOARD
  const viewLeaderboard = () => {
    setIsProfilePopupOpen(false)
    navigate('/')
  }

  return(
    <>
      <div className='profilePopup'>
        <div className='profilePopup__details'>
            <img className='profilePopup__picture' src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="profilePopup picture" />
            <p>{user.name}</p>                   
        </div>
        <div className='profilePopup__link-wrapper'>
          <a onClick={() => {console.log(user)}} className='profilePopup__link'>Edit profile</a>
          <a onClick={viewLeaderboard} className='profilePopup__link'>View Leaderboard</a>
          <a onClick={editScores} className='profilePopup__link'>Edit Scores</a>
          <a onClick={logout} className='profilePopup__link'>Log out</a>
          <button onClick={() => {setIsProfilePopupOpen(false)}} className='profilePopup__close-btn'>X</button>            
        </div>
      </div>
    </>
  )
}