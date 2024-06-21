import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import requestApi from "../utils/api"
import EditScorePopup from "../components/EditScorePopup/EditScorePopup";
// import react from "@vitejs/plugin-react-swc";

export default function EditPlayerScore() {
  const [user, setUser] = useState({})
  const [wodNumber, setWodNumber] = useState(null)
  const navigate = useNavigate();
  const {id} = useParams();

  const userToEdit = async () => {
    const user = await requestApi.getUserById(id)
    return user;
  }

  const closeAllPopups = () => {
    setWodNumber(null)
  }


  // SET USER
  useEffect(() => {
    userToEdit().then((user) => setUser(user))
  }, [])


  return(
    <>
      <div className='editplayerscore'>
        <h2 className='editplayerscore__title'>EDITING SCORES FOR {user.name}</h2>
        <h3 className='editplayerscore__subtitle'>Pick a WOD to change the score</h3>

        <button className='editplayerscore__wod-selector' onClick={() => {
          setWodNumber(1)
          }}>24.1</button>

        <button className='editplayerscore__wod-selector' onClick={() => {
          setWodNumber(2)
        }}>24.2</button>

        <button className='editplayerscore__wod-selector' onClick={() => {
          setWodNumber(3)
          }}>24.3</button>

        <button className='editplayerscore__wod-selector editplayerscore__back-button' onClick={() => navigate(-1)}>BACK TO SEARCH</button>
        
        {wodNumber && <EditScorePopup
          closeAllPopups={closeAllPopups}
          setUser={setUser}
          user={user}
          wodNumber = {wodNumber} />
        }
      </div>
    </>
  )
}