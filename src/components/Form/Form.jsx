import '../../styles/Form.css'
import { useState } from 'react';


function Form({ filterRequest, form, setForm, setWod }) {
  const [isFiltersOpen, setIfFiltersOpen] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(isFiltersOpen === true) setIfFiltersOpen(false);
    
    const options = {
      filter: {
        category: form.category,
      },
      sort: {
        [form.wod]: 1
      }
    }
    filterRequest(options)
    setWod(form.wod)
  } 

  const handleChange = (e) => {
    setForm({...form, 
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
        <button className='form__open-filters' type='button' onClick={() => setIfFiltersOpen(true)}>FILTER LEADERBOARD</button>
        <h2 className='form__title'>FILTERS:</h2>
        <div className='form__filters'>
          <label htmlFor='category'>CATEGORY:</label>
          <select id="category" name="category" onChange={handleChange}>
            <option value="RX">RX</option>
            <option value="scaled">Scaled</option>
          </select>
          <label htmlFor='wod'>WOD:</label>
          <select id="wod" name="wod" onChange={handleChange}>
            <option value="finalRanking">TOTAL</option>
            <option value="wodOneRanking">24.1</option>
            <option value="wodTwoRanking">24.2</option>
            <option value="wodThreeRanking">24.3</option>
          </select>
          <label htmlFor='type'>TYPE:</label>
          <select id="type" name="type" onChange={handleChange}>
            <option value="individual">INDIVIDUAL</option>
            <option value="teams">TEAMS</option>
          </select>
          <button type='submit'>REFRESH</button>
        </div>
        {isFiltersOpen && <div className='form__filters_mobile'>
          <h2>FILTER LEADERBOARD</h2>
          <div className='form__filter'>
            <label htmlFor='category'>CATEGORY:</label>
            <select id="category" name="category" onChange={handleChange}>
              <option value="RX">RX</option>
              <option value="scaled">Scaled</option>
            </select>
          </div>
          <div className='form__filter'>
            <label htmlFor='wod'>WOD:</label>
            <select id="wod" name="wod" onChange={handleChange}>
              <option value="finalRanking">TOTAL</option>
              <option value="wodOneRanking">24.1</option>
              <option value="wodTwoRanking">24.2</option>
              <option value="wodThreeRanking">24.3</option>
            </select>
          </div>
          <div className='form__filter'>
            <label htmlFor='type'>TYPE:</label>
            <select id="type" name="type" onChange={handleChange}>
              <option value="individual">INDIVIDUAL</option>
              <option value="teams">TEAMS</option>
            </select>
          </div>
            <div className='form__button-wrapper'>
              <button className='form__button_cancel' type='button' onClick={() => setIfFiltersOpen(false)} >CANCEL</button>
              <button type='submit'>REFRESH</button>
            </div>
        </div>}
      </form>
  )
}

export default Form
