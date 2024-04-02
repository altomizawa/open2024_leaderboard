import { useState } from "react"

import TimeInput from "../TimeInput/TimeInput";

export default function EditScorePopup(props) {
  const [didAthleteFinish, setDidAthleteFinish] = useState(true)
  const [input, setInput] = useState(undefined)

  const { closeAllPopups } = props;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('form submitted');
  }

  const handleRepsInput = (e) => {
    if(e.target.value.length<4){
      setInput(e.target.value)
    }
    return
  }

  return(
    <div className='editScorePopup'>
      <form className='editScorePopup__form' onSubmit={handleSubmit}>
        <h2 className='editScorePopup__title'>EDITING 24.1</h2>
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
          {didAthleteFinish ? <TimeInput /> : <input className='editScorePopup__form-input' type='number' value={input} onChange={handleRepsInput}/>}
        <div className='editScorePopup__form-button-wrapper'>
          <button type='button' className='editScorePopup__form-button editScorePopup__form-button_cancel' onClick={closeAllPopups}>CANCEL</button>
          <button type='submit' className='editScorePopup__form-button'>SUBMIT</button>

        </div>
      </form>
    </div>
  )
}