import { useState } from 'react';
import '../styles/Form.css'


function Form() {
  const[category, setCategory] = useState('rx');
  const[wod, setWod] = useState('total');
  const[type, setType] = useState('individual')


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(category, wod, type)
  } 

  return (
    <form onSubmit={handleSubmit} className='form'>
        <h2 className='form__title'>FILTERS:</h2>
        <div className='form__filters'>
          <label htmlFor='category'>CATEGORY:</label>
          <select id="category" name="category" onChange={(e)=>{setCategory(e.target.value)}}>
            <option value="rx">RX</option>
            <option value="scaled">Scaled</option>
          </select>
          <label htmlFor='wod'>WOD:</label>
          <select id="wod" name="wod" onChange={(e) => {setWod(e.target.value)}}>
            <option value="total">TOTAL</option>
            <option value="first">24.1</option>
            <option value="second">24.2</option>
            <option value="third">24.3</option>
          </select>
          <label htmlFor='type'>TYPE:</label>
          <select id="type" name="type" onChange={(e) => {setType(e.target.value)}}>
            <option value="individual">INDIVIDUAL</option>
            <option value="teams">TEAMS</option>
          </select>
        <button>&gt;</button>
        </div>
      </form>
  )
}

export default Form
