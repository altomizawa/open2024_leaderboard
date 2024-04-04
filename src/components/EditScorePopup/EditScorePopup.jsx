import { useState, useEffect } from "react"

import TimeInput from "../TimeInput/TimeInput";

import requestApi from "../../utils/api";

export default function EditScorePopup(props) {
  const [didAthleteFinish, setDidAthleteFinish] = useState(true)
  
  const { closeAllPopups, wodNumber, user, setUser } = props;
  
  const [input, setInput] = useState({
    wodOneTime: user.wodOneTime,
    wodOneResult: user.wodOneResult,
    wodTwoResult: user.wodTwoResult,
    wodThreeTime: user.wodThreeTime,
    wodThreeResult: user.wodThreeResult,
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input)
    // requestApi.changeUserScore(user._id, input)
    // .then(user => setUser(user))
    closeAllPopups();
  }
 
  return( 
    <div className='editScorePopup'>
      <form className='editScorePopup__form' onSubmit={handleSubmit}>
        <h2 className='editScorePopup__title'>{`EDITING 24.${wodNumber}`}</h2>
        {(wodNumber === 1 | wodNumber=== 3 ) &&
        <div>
          <div className='editScorePopup__button-wrapper'>
            <h3>DID ATHLETE FINISH WOD?</h3>
            <div className='editScorePopup__button'>
              <p
                className={didAthleteFinish ? 'editScorePopup__selection editScorePopup__selection_false' : 'editScorePopup__selection'}
                onClick={() => setDidAthleteFinish(false)}>NO</p>
              <p
                className={didAthleteFinish ? 'editScorePopup__selection' : 'editScorePopup__selection editScorePopup__selection_false'}
                onClick={() => setDidAthleteFinish(true)}>YES</p>
              <div className={didAthleteFinish ? 'editScorePopup__selector' : 'editScorePopup__selector editScorePopup__selector_false'}></div>
            </div>
          </div>
          <h3 className='editScorePopup__score-label'>
            {didAthleteFinish ? 'Final time:' : 'Total Reps:'}</h3>
            <TimeInput
              wodNumber = {wodNumber}
              didAthleteFinish={didAthleteFinish}
              setInput={setInput}
              user={user}
              />
        </div>}
        {wodNumber === 2 && 
        <div>
          <h3 className='editScorePopup__score-label'>Total Reps:</h3>
            <TimeInput
              wodNumber = {wodNumber}
              didAthleteFinish={didAthleteFinish}
              setInput={setInput}
              user={user}
            />
          </div>}
        <div className='editScorePopup__form-button-wrapper'>
          <button type='button' className='editScorePopup__form-button editScorePopup__form-button_cancel' onClick={closeAllPopups}>CANCEL</button>
          <button type='submit' className='editScorePopup__form-button'>SUBMIT</button>

        </div>
      </form>
    </div>
  )
}