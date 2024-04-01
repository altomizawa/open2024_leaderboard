import { useState, useEffect } from "react"
import { useParams, useNavigate} from "react-router-dom"
import requestApi from "../utils/api"
import EditScorePopup from "../components/EditScorePopup/EditScorePopup";
// import react from "@vitejs/plugin-react-swc";

export default function EditPlayerScore() {
  const [user, setUser] = useState({})

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
        <button className='editplayerscore__wod-selector'>24.1</button>
        <button className='editplayerscore__wod-selector'>24.2</button>
        <button className='editplayerscore__wod-selector'>24.3  </button>
        <EditScorePopup />
        {/* <form className='editplayerscore__form' onSubmit={submitWodResults}>
            <h3>24.1</h3>
          <div className='editplayerscore__input-wrapper'>
            <input type='number' value={wodResults.wodOneTime} name='wodOneTime' placeholder={user.wodOneTime} onChange={handleWodResultsInput} />
            <input type='number' value={wodResults.wodOneResult} name='wodOneResult' placeholder={user.wodOneResult} onChange={handleWodResultsInput} />
          </div>
            <h3>24.2</h3>
          <div className='editplayerscore__input-wrapper'>
            <input type='number' value={wodResults.wodTwoResult} name='wodTwoResult' placeholder={user.wodTwoResult} onChange={handleWodResultsInput} />
          </div>
            <h3>24.3</h3>
          <div className='editplayerscore__input-wrapper'>
            <input type='number' value={wodResults.wodThreeTime} name='wodThreeTime' placeholder={user.wodThreeTime} onChange={handleWodResultsInput} />
            <input type='number' value={wodResults.wodThreeResult} name='wodThreeResult' placeholder={user.wodThreeResult} onChange={handleWodResultsInput} />
          </div>
          <div className='editplayerscore__input-wrapper'>
            <button type='button' onClick={cancelEditing} >CANCEL</button>
            <button type='submit'>SUBMIT</button>
          </div>
        </form> */}
      </div>
    </>
  )
}