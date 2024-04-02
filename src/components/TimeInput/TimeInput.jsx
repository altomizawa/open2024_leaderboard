import { useState } from "react"

export default function TimeInput() {
  const [minutes, setMinutes] = useState(undefined);
  const [seconds, setSeconds] = useState(undefined);
  
  const handleMinutes = (e) => {
    if(e.target.value.length<3 && e.target.value<60 && e.target.value>=0) {
      setMinutes(e.target.value)
    }
    return
  }

  const handleSeconds = (e) => {
    if(e.target.value.length<3 && e.target.value<60 && e.target.value>=0) {
      setSeconds(e.target.value)
    }
    return
  }

  return(
    <div className='timeInput'>
      <input className='timeInput__input' type='number' maxLength={2} value={minutes} onChange={handleMinutes} />
        <h3>:</h3>
      <input className='timeInput__input' type='number' maxLength={2} value={seconds} onChange={handleSeconds} />
    </div>
  )
}