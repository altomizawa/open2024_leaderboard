import { useState, useEffect } from "react"

export default function TimeInput(props) {


  const { wodNumber, setInput, input, didAthleteFinish, user } = props;

  const [thisInput, setThisInput] = useState('')

  const convertNumberToTwoDigits  = (number) => number.toString().padStart(2,'0');

  const minutePlaceholder = wodNumber == 1 ? Math.floor(user.wodOneTime/60) : Math.floor(user.wodThreeTime/60)
  const secondPlaceholder = wodNumber == 1 ? convertNumberToTwoDigits(user.wodOneTime%60) : convertNumberToTwoDigits(user.wodThreeTime%60)

  // CONVERT RESULTS FROM MM:SS TO SECONDS ONLY
  useEffect(() => {
    let totalInSeconds = parseInt(thisInput.minutes*60)+ parseInt(thisInput.seconds)
    if(wodNumber === 1 ) {
      setInput(prevState => ({
        ...prevState,
        wodOneTime: didAthleteFinish ? totalInSeconds : 900,
        wodOneResult: didAthleteFinish ? 180 : thisInput.wodOneResult
      }))
    } else if (wodNumber === 3 ){
      setInput(prevState => ({
        ...prevState,
        wodThreeTime: didAthleteFinish ? totalInSeconds : 900,
        wodThreeResult: didAthleteFinish ? 180 : thisInput.wodThreeResult
      }))
    }
  }, [thisInput])

  // HANDLE INPUT
  const handleThisInput = (e) => {
    const target = e.target;
    const name = e.target.name;
    // CHECK IF TI'S WOD 2
    if (wodNumber === 2 && target.value.length < 4 ) {
      setInput((prevState) => ({...prevState, [name]: parseFloat(target.value)}))
    } else {
      if(didAthleteFinish) {
        if (target.value.length<3 && target.value < 60 && target.value>=0) {
          setThisInput(prevState => ({...prevState, [name]: target.value}))
        } else return 
      } if (e.target.value.length < 4) {
        setThisInput(prevState => ({...prevState, [name]: parseFloat(target.value)}))
        console.log(thisInput)
      } 
    }
    
  }

  return(
    <div className='timeInput'>

      {!didAthleteFinish && wodNumber === 1 && <input
          name='wodOneResult'
          className='editScorePopup__form-input'
          value = {thisInput.wodOneResult}
          placeholder={user.wodOneResult}
          type='number'
          onChange={handleThisInput}/>}

      {!didAthleteFinish && wodNumber === 3 && <input
        name='wodThreeResult'
        className='editScorePopup__form-input'
        value = {thisInput.wodThreeResult}
        placeholder={user.wodThreeResult}
        type='number'
        onChange={handleThisInput}/>}

      {wodNumber === 2 && <input
        name='wodTwoResult'
        className='editScorePopup__form-input'
        value = {thisInput.wodTwoResult}
        placeholder={user.wodTwoResult}
        type='number'
        onChange={handleThisInput}/>}

      {didAthleteFinish && wodNumber!==2 && <input
        name='minutes'
        className='timeInput__input'
        value={thisInput.minutes}
        placeholder={minutePlaceholder}
        type='number'
        maxLength={3}
        onChange={handleThisInput} /> }

      {didAthleteFinish && wodNumber !== 2 && <h3>:</h3> }

      {didAthleteFinish && wodNumber !== 2 &&<input
        name='seconds'
        className='timeInput__input'
        value={thisInput.seconds}
        placeholder={secondPlaceholder}
        type='number'
        onChange={handleThisInput}
        maxLength={2}/> }
    </div>
  )
}