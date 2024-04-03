import { useState } from "react"

export default function TimeInput(props) {


  const { handleInput, input, timeInput } = props;
  
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

  return(
    <div className='timeInput'>
      <input className='timeInput__input' type='number' maxLength={2} name='minutes' onChange={handleInput} value={timeInput.minutes} />
        <h3>:</h3>
      <input className='timeInput__input' type='number' maxLength={2} name='seconds' onChange={handleInput} value={timeInput.seconds}/>
    </div>
  )
}