import '../styles/Main.css'
import Form from '../components/Form';
import Card from '../components/Card';
import requestApi from '../utils/api';
import { useState, useEffect, Suspense } from 'react';
import Loader from '../components/Loader/Loader';
import Pagination from '../components/Pagination/Pagination';

function Main() {
  const [currentLeaderboard, setCurrentLeaderboard] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [form, setForm] = useState({
    category: 'RX',
    wod: 'finalRanking',
    type: 'individual'
  })
  

  // REQUESTS FOR ALL FILTERS
  const filterRequest = async (options) => {
    setCurrentLeaderboard([])
    setIsLoading(true)
    const sortedRanking = await requestApi.getAllUsers(options);
    console.log(sortedRanking.length)
    setCurrentLeaderboard(sortedRanking)
    setIsLoading(false)
  }
  
  useEffect(() => {
    filterRequest({
      filter:{
        category: 'RX',
      },
      sort:{
        finalRanking: 1,
      } 
    });
  },[])

  return (
    <>
      <h1 className='main__title'>OPEN LEADERBOARD</h1>
      <Form form={form} setForm={setForm} filterRequest={filterRequest}/>
      <div className='main__cards'>
        {isLoading && <Loader />}
        {currentLeaderboard.map((athlete) => (
          <Card athlete={athlete} key={athlete.id} />
        ))}
      </div>
      {/* <Pagination currentLead erboard={currentLeaderboard}/> */}
      
    </>
  )
}

export default Main
