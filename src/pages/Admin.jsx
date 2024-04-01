import { useNavigate } from "react-router-dom";
import requestApi from "../utils/api"
import { useState } from "react";

export default function Admin() {
  const [users, setUsers] = useState([])
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();

  const submitSearch = async (e) => {
    e.preventDefault();
    const options = {
      filter: {
        name: {$regex: searchInput, $options: 'i'}
      }
    }
    const searchResults = await requestApi.getAllUsers(options)
    setUsers(searchResults)
  }


  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value)
  }

  const handleEditScoreClick = (userId) => {
    navigate(`/${userId}/editscore`)
  }

  function timeConverter(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  } 

  return (
    <div className='admin'>
      <p className='admin__title'>Search athlete by name</p>
      <form className='admin__form' onSubmit={submitSearch}>
        <input className='admin__form-input' name='search-bar' placeholder="Enter keywords here" onChange={handleSearchInputChange}></input>
        <button className='admin__form-button' type='submit'>SEARCH</button>
      </form>
      <li className='admin__line admin__line-header'>
          <p></p>
          <p>Name</p>
          <p>Rx/Scaled</p>
          <p>WOD 1</p>
          <p>WOD 2</p>
          <p>WOD 3</p>
          <p>TOTAL</p>
        </li>
      {users.map((user) => (
        <div key={user._id}>
          <li className='admin__line'>
            <button className='admin__edit-button' type='button' onClick={() => {handleEditScoreClick(user._id)}}>Edit</button>
            <p>{ user.name }</p>
            <p>{ user.category }</p>
            <p>{ user.wodOneTime === 900 ? user.wodOneResult : timeConverter(user.wodOneTime) }</p>
            <p>{ user.wodTwoResult }</p>
            <p>{ user.wodThreeTime === 900 ? user.wodThreeResult : timeConverter(user.wodThreeTime) }</p>
            <p>{ user.wodOneResult + user.wodTwoResult + user.wodThreeResult }</p>
          </li>
        </div>
      ))}
    </div>
  )
}