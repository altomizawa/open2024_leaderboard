import { useState, useEffect } from "react"

export default function TimeInput(props) {


  const { wodNumber, setInput, didAthleteFinish, user } = props;
  console.log(wodNumber)

  const [thisInput, setThisInput] = useState('')

  const convertNumberToTwoDigits  = (number) => number.toString().padStart(2,'0');

  const minutePlaceholder = wodNumber == 1 ? Math.floor(user.wodOneTime/60) : Math.floor(user.wodThreeTime/60)
  const secondPlaceholder = wodNumber == 1 ? convertNumberToTwoDigits(user.wodOneTime%60) : convertNumberToTwoDigits(user.wodThreeTime%60)
  const repPlaceholder = wodNumber == 1  ? user.wodOneResult : user.wodThreeResult
  const wodName = () => {
    if (!didAthleteFinish && wodNumber === 1) {
      return 'wodOneResult'
    } if (didAthleteFinish && wodNumber === 1) {
      return 'wodOneTime'
    } if (wodNumber === 2) {
      return 'wodTwoResult'
    } if (!didAthleteFinish && wodNumber === 3) {
      return 'wodThreeResult'
    } if (didAthleteFinish && wodNumber === 3) {
      return 'wodThreeTime'
    }
  }

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

  const handleThisInput = (e) => {
    const target = e.target;
    const name = e.target.name;
    if(didAthleteFinish) {
      if (target.value.length<3 && target.value < 60 && target.value>=0) {
        setThisInput(prevState => ({...prevState, [name]: target.value}))
      } else return 
    } if (e.target.value.length < 4) {setThisInput(prevState => ({...prevState, [name]: parseFloat(target.value)}))}
  }

  return(
    <div className='timeInput'>

      {!didAthleteFinish && <input
        name={wodName}
        className='editScorePopup__form-input'
        value = {wodNumber === 1 ? thisInput.wodOneResult : thisInput.wodThreeResult}
        placeholder={repPlaceholder}
        type='number'
        onChange={handleThisInput}/>}

      {didAthleteFinish && <input
        name='minutes'
        className='timeInput__input'
        value={thisInput.minutes}
        placeholder={minutePlaceholder}
        type='number'
        maxLength={2}
        onChange={handleThisInput} /> }

      {didAthleteFinish && <h3>:</h3> }

      {didAthleteFinish &&<input
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