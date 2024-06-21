import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import requestApi from "../utils/api"
import { useState, useEffect } from "react";

import Loader from "../components/Loader/Loader";
import Card from '../components/Card'

export default function Admin() {
  const [users, setUsers] = useState([])
  // const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams({q:''})

  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();
    getAthletes();
  }

  const getAthletes = async () => {
    const searchInput = searchParams.get('q')
    const options = {
      filter: {
        name: {$regex: searchInput, $options: 'i'}
      }
    }
    setIsLoading(true);
    const searchResults = await requestApi.getAllUsers(options)
    setUsers(searchResults)
    setIsLoading(false)
  }


  const handleSearchInputChange = (e) => {
    // setSearchInput(e.target.value)
    setSearchParams({q: e.target.value})
  }

  const handleEditScoreClick = (userId) => {
    navigate(`/${userId}/editscore`)
  }

  function timeConverter(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  } 

  useEffect(() => {
    if (searchParams.get('q')==='') return
      getAthletes()
  },[]);


  return (
    <div className='admin'>
      <h2 className='admin__title'>EDIT ATHLETE SCORE</h2>
      <form className='admin__form' onSubmit={submitSearch}>
        <input className='admin__form-input' name='search-bar' placeholder="Enter keywords here" onChange={handleSearchInputChange}></input>
        <button className='admin__form-button' type='submit'>SEARCH</button>
      </form>
      <div className='admin__cards'>
        {users.map((athlete) => (
          <div key={athlete.id} className='admin__card-wrapper'>
            <Card athlete={athlete} />
            <button onClick={() => {handleEditScoreClick(athlete._id)}}>Edit</button>
          </div>
        ))}
      </div>
      {isLoading && <Loader />}
    </div>
  )
}