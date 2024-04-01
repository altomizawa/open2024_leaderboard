import { useState } from "react"

export default function ResultForm(props) {
  const { user, isEditScoresOpen, setIsEditScoreOpen}  = props

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
    console.log(wodResults)
    resetWodResults();
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
    setIsEditScoreOpen(false);
    console.log('cliked')
    resetWodResults();
  }

  return (
    <form className={isEditScoresOpen ? 'result__form' : 'result__form result__form_inactive'} onSubmit={submitWodResults}>
      <input type='number' value={wodResults.wodOneTime} name='wodOneTime' placeholder='WOD 1 Time' onChange={handleWodResultsInput} />
      <input type='number' value={wodResults.wodOneResult} name='wodOneResult' placeholder='WOD 1 Result' onChange={handleWodResultsInput} />
      <input type='number' value={wodResults.wodTwoResult} name='wodTwoResult' placeholder='WOD 2 Result' onChange={handleWodResultsInput} />
      <input type='number' value={wodResults.wodThreeTime} name='wodThreeTime' placeholder='WOD 3 Time' onChange={handleWodResultsInput} />
      <input type='number' value={wodResults.wodThreeResult} name='wodThreeResult' placeholder='WOD 3 Result' onChange={handleWodResultsInput} />
      <button type='button' onClick={cancelEditing} >CANCEL</button>
      <button type='submit'>SUBMIT</button>
    </form>
  )
}