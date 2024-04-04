import { useState, useEffect } from "react"

export default function TimeInput(props) {


  const { wodNumber, setInput, didAthleteFinish} = props;

  const [thisInput, setThisInput] = useState('')

  const setWodName = () => {
    if (wodNumber===1) {
      return 'wodOneTime'
    } if (wodNumber===3) {
      return 'wodThreeTime'
    }
  }
  
  // const handleMinutes = (e) => {
  //   if(e.target.value.length<3 && e.target.value<60 && e.target.value>=0) {
  //     setMinutes(e.target.value)
  //   }
  //   return 
  // }

  // const handleSeconds = (e) => {
  //   if(e.target.value.length<3 && e.target.value<60 && e.target.value>=0) {
  //     setSeconds(e.target.value)
  //   }
  //   return
  // }
  useEffect(() => {
    let totalInSeconds = parseInt(thisInput.minutes*60)+ parseInt(thisInput.seconds)
    if(wodNumber === '1') {
      setInput(prevState => ({
        ...prevState,
        wodOneTime: didAthleteFinish ? totalInSeconds : 900,
        wodOneResult: didAthleteFinish ? 180 : thisInput.wodOneResult
      }))
    }
    setInput(prevState => ({
      ...prevState,
      wodThreeTime: didAthleteFinish ? totalInSeconds : 900,
      wodThreeResult: didAthleteFinish ? 180 : thisInput.wodThreeResult
    }))
  }, [thisInput])

  const handleThisInput = (e) => {
    const target = e.target;
    const name = e.target.name;
    if(didAthleteFinish) {
      if (target.value.length<3 && target.value < 60 && target.value>=0) {
        setThisInput(prevState => ({...prevState, [name]: target.value}))
      } else return 
    } if (e.target.value.length < 4) {setThisInput(prevState => ({...prevState, [name]: target.value}))}
  }

  return(
    <div className='timeInput'>
      {!didAthleteFinish && <input
            name={wodNumber === '1' ? 'wodOneResult' : 'wodThreeResult'}
            className='editScorePopup__form-input'
            value = {wodNumber === '1' ? [thisInput.wodOneResult] : [thisInput.wodThreeResult]}
            type='number'
            onChange={handleThisInput}/>}
      {didAthleteFinish && <input className='timeInput__input' type='number' maxLength={2} name='minutes' value={thisInput.minutes} onChange={handleThisInput} /> }
      {didAthleteFinish && <h3>:</h3> }
      {didAthleteFinish &&<input className='timeInput__input' type='number' maxLength={2} name='seconds' value={thisInput.seconds}onChange={handleThisInput} /> }    </div>
  )
}