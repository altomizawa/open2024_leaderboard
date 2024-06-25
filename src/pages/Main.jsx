import '../styles/Main.css'
import Form from '../components/Form/Form';
import Card from '../components/Card/Card';
import requestApi from '../utils/api';
import { useState, useEffect, Suspense } from 'react';
import Loader from '../components/Loader/Loader';
import Pagination from '../components/Pagination/Pagination';
import LeaderboardTeams from '../components/LeaderboardTeams/LeaderboardTeams';




function Main() {
  const [currentLeaderboard, setCurrentLeaderboard] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [form, setForm] = useState({
    category: 'RX',
    wod: 'finalRanking',
    type: 'individual'
  })
  const [wod, setWod] = useState('')
  

  // REQUESTS FOR ALL FILTERS
  const filterRequest = async (options) => {
    setCurrentLeaderboard([])
    setIsLoading(true)
    const sortedRanking = await requestApi.getAllUsers(options);
    setCurrentLeaderboard(sortedRanking)
    setIsLoading(false)
  }

  useEffect(() => {
    filterRequest({
      filter:{
        category: form.category,
      },
      sort:{
        [form.wod]: 1,
      } 
    });
  },[])

  return (
    <div className='main'>
      <h1 className='main__title'>OPEN LEADERBOARD</h1>
      <Form form={form} setForm={setForm} filterRequest={filterRequest} setWod={setWod} />
      <div className='main__cards'>
        {isLoading && <Loader />}
        {currentLeaderboard.map((athlete) => (
          <Card athlete={athlete} key={athlete._id} wod={wod}/>
        ))}
      </div>
      {/* <Pagination currentLead erboard={currentLeaderboard}/> */}
      {/* <LeaderboardTeams /> */}
    </div>
  )
}

export default Main
