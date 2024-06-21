import { useState } from 'react';
import '../styles/Form.css'


function Form({ filterRequest }) {
  const[category, setCategory] = useState('RX');
  const[wod, setWod] = useState('total');
  const[type, setType] = useState('individual')


  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      filter: {
        category: category,
      },
      sort: {
        [wod]: 1
      }
    }
    filterRequest(options)
  } 

  return (
    <form onSubmit={handleSubmit} className='form'>
        <h2 className='form__title'>FILTERS:</h2>
        <div className='form__filters'>
          <label htmlFor='category'>CATEGORY:</label>
          <select id="category" name="category" onChange={(e)=>{setCategory(e.target.value)}}>
            <option value="RX">RX</option>
            <option value="scaled">Scaled</option>
          </select>
          <label htmlFor='wod'>WOD:</label>
          <select id="wod" name="wod" onChange={(e) => {setWod(e.target.value)}}>
            <option value="finalRanking">TOTAL</option>
            <option value="wodOneRanking">24.1</option>
            <option value="wodTwoRanking">24.2</option>
            <option value="wodThreeRanking">24.3</option>
          </select>
          <label htmlFor='type'>TYPE:</label>
          <select id="type" name="type" onChange={(e) => {setType(e.target.value)}}>
            <option value="individual">INDIVIDUAL</option>
            <option value="teams">TEAMS</option>
          </select>
        <button type='submit'>REFRESH</button>
        </div>
      </form>
  )
}

export default Form
