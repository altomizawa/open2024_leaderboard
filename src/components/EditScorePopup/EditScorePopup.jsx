import { useState, useEffect } from "react"

import TimeInput from "../TimeInput/TimeInput";

export default function EditScorePopup(props) {
  const [didAthleteFinish, setDidAthleteFinish] = useState(true)
  const [timeInput, setTimeInput] = useState('')
  const [input, setInput] = useState(
    {
      wodOneTime: 0,
      wodOneResult: 0,
      wodTwoResult: 0,
      wodThreeTime: 0,
      wodThreeResult: 0,
    }
  )

  const { closeAllPopups, wodNumber, user } = props;
  console.log(user)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input)
    // // const formData = new FormData(e.target);
    // // const data = Object.fromEntries(formData)
    // // console.log(typeof data)
    // if(didAthleteFinish===true) {
    //   const minutes = parseInt(data.minutes);
    //   const seconds = parseInt(data.seconds);
    //   data.wodOneTime = (minutes*60) + seconds
    //   console.log(data)
    //   return data
    // } else {
    //   console.log(data)
    //   return data}
  }

  // useEffect(() => {
  //   let timeResult = parseInt(timeInput.minutes*60)+parseInt(timeInput.seconds)
  //   wodNumber === '1' ?
  //   setInput((prevInput) => ({
  //     ...prevInput,
  //     wodOneResult: 180,
  //     wodOneTime: timeResult
  //   })) :
  //   setInput((prevInput) => ({
  //     ...prevInput,
  //     wodThreeResult: 180,
  //     wodThreeTime: timeResult
  //   })) 
  // },[timeInput])

  const handleInput = (e) => {
    if (!didAthleteFinish && e.target.value.length<4) {
      const { name, value } = e.target
      setInput((prevInput) => (  
        {
          ...prevInput,
          [name]: value,
        }
      ))
      }
    if(e.target.value.length<3 && e.target.value<60 && e.target.value>=0) {
      const {name, value } = e.target
      setTimeInput((prevInput) => (
        {
          ...prevInput,
          [name]: value,
        }
      ))
      console.log(timeInput)
    }
  }
 
  return( 
    <div className='editScorePopup'>
      <form className='editScorePopup__form' onSubmit={handleSubmit}>
        <h2 className='editScorePopup__title'>{wodNumber==='1' ? 'EDITING 24.1' : 'EDITING 24.3' }</h2>
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
            />
          {/* {didAthleteFinish ? <TimeInput
            wodNumber = {wodNumber}
            didAthleteFinish={didAthleteFinish}
            setInput={setInput}
            /> : <input
            name={wodNumber === '1' ? 'wodOneResult' : 'wodThreeResult'}
            className='editScorePopup__form-input'
            type='number'
            onChange={handleInput}/>} */}
        <div className='editScorePopup__form-button-wrapper'>
          <button type='button' className='editScorePopup__form-button editScorePopup__form-button_cancel' onClick={closeAllPopups}>CANCEL</button>
          <button type='submit' className='editScorePopup__form-button'>SUBMIT</button>

        </div>
      </form>
    </div>
  )
}