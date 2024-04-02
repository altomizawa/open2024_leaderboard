import { useState, useEffect } from "react"
import { useParams, useNavigate} from "react-router-dom"
import requestApi from "../utils/api"
import EditScorePopup from "../components/EditScorePopup/EditScorePopup";
// import react from "@vitejs/plugin-react-swc";

export default function EditPlayerScore() {
  const [user, setUser] = useState({})
  const [isFirstPopupOpen, setIsFirstPopupOpen] = useState(false);
  const [isSecondPopupOpen, setIsSecondPopupOpen] = useState(false);
  const [isThirdPopupOpen, setIsThirdPopupOpen] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams();

  const userToEdit = async () => {
    const user = await requestApi.getUserById(id)
    return user;
  }
  const [wodResults, setWodResults] = useState({
    wodOneTime: undefined,
    wodOneResult: undefined,
    wodTwoResult: undefined,
    wodThreeTime: undefined,
    wodThreeResult: undefined,
  })

  function resetWodResults(){
    setWodResults({
      wodOneTime: undefined,
      wodOneResult: undefined,
      wodTwoResult: undefined,
      wodThreeTime: undefined,
      wodThreeResult: undefined,
    })
  }

  const closeAllPopups = () => {
    setIsFirstPopupOpen(false);
    setIsSecondPopupOpen(false);
    setIsThirdPopupOpen(false);
  }
  
  const submitWodResults = (e) => {
    e.preventDefault();
    requestApi.changeUserScore(id, wodResults)
    .then (user => console.log(user))
    resetWodResults();
    navigate('/admin')
  }
  
  const handleWodResultsInput = (e) => {
    const {name, value} = e.target;
    setWodResults(
      prevState => ({
      ...prevState, [name]: value
      })
    );
  };

  // CANCEL EDITING SCORES
  const cancelEditing = () => {
    resetWodResults();
    navigate('/admin')
  }

  // SET USER
  useEffect(() => {
    userToEdit().then(user => setUser(user))
  }, [])

  return(
    <>
      <div className='editplayerscore'>
        <h2 className='editplayerscore__title'>Editing scores for {user.name}</h2>
        <h3 className='editplayerscore__subtitle'>Pick a WOD to change the score</h3>
        <button className='editplayerscore__wod-selector' onClick={() => {setIsFirstPopupOpen(true)}}>24.1</button>
        <button className='editplayerscore__wod-selector'>24.2</button>
        <button className='editplayerscore__wod-selector' onClick={() => {setIsThirdPopupOpen(true)}}>24.3  </button>
        <button className='editplayerscore__wod-selector editplayerscore__back-button' onClick={cancelEditing}>VOLTAR</button>
        {isFirstPopupOpen && <EditScorePopup
          closeAllPopups={closeAllPopups} />
        }
        {isThirdPopupOpen && <EditScorePopup
          closeAllPopups={closeAllPopups} />
        }
      </div>
    </>
  )
}