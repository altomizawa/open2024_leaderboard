import '../styles/Main.css'
import Form from '../components/Form';
import Card from '../components/Card';
import requestApi from '../utils/api';
import { useState, useEffect, Suspense } from 'react';



const athletes = [
  {
    id: 1,
    name: 'Mat Fraser',
    category: 'rx',
    firstResult: 145,
    firstPoints: 233,
    firstPosition: 234,
    secondResult: 145,
    secondPoints: 233,
    secondPosition: 234,
    thirdResult: 145,
    thirdPoints: 233,
    thirdPosition: 234,
    overallPosition: 1,
    isTeams: true,
    avatar: 'https://m.media-amazon.com/images/S/amzn-author-media-prod/hqbclhhbhepq4jkaa4agbol85g._SY450_CR0%2C0%2C450%2C450_.jpg',
  },
  {
    id: 2,
    name: 'Rich Froning',
    category: 'rx',
    firstResult: 145,
    firstPoints: 233,
    firstPosition: 234,
    secondResult: 145,
    secondPoints: 233,
    secondPosition: 234,
    thirdResult: 145,
    thirdPoints: 233,
    thirdPosition: 234,
    overallPosition: 2,
    isTeams: true,
    avatar: 'https://cdn.outsideonline.com/wp-content/uploads/migrated-images_parent/migrated-images_66/rich-froning_fe.jpg',
  },
  {
    id: 3,
    name: 'Tia Clair',
    category: 'rx',
    firstResult: 145,
    firstPoints: 233,
    firstPosition: 234,
    secondResult: 145,
    secondPoints: 233,
    secondPosition: 234,
    thirdResult: 145,
    thirdPoints: 233,
    thirdPosition: 234,
    overallPosition: 3,
    isTeams: true,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr9ACjb2L9FY9vqOQEZf5c5u2rnQWCac03WQ&s',
  },
  {
    id: 4,
    name: 'Chris Spealler',
    category: 'rx',
    firstResult: 145,
    firstPoints: 233,
    firstPosition: 234,
    secondResult: 145,
    secondPoints: 233,
    secondPosition: 234,
    thirdResult: 145,
    thirdPoints: 233,
    thirdPosition: 234,
    overallPosition: 4,
    isTeams: true,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPhEgc7JzDrb2seQrItVqLhQJW-XqB9Qb0YA&s'
  },
  {
    id: 5,
    name: 'Jason Khalipa',
    category: 'rx',
    firstResult: 145,
    firstPoints: 233,
    firstPosition: 234,
    secondResult: 145,
    secondPoints: 233,
    secondPosition: 234,
    thirdResult: 145,
    thirdPoints: 233,
    thirdPosition: 234,
    overallPosition: 5,
    isTeams: true,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt9GwFH4BVoYhnc7V9yZdRt3wgjwAhB1jzCw&s',
  },
  {
    id: 6,
    name: 'Ben Smith',
    category: 'rx',
    firstResult: 145,
    firstPoints: 233,
    firstPosition: 234,
    secondResult: 145,
    secondPoints: 233,
    secondPosition: 234,
    thirdResult: 145,
    thirdPoints: 233,
    thirdPosition: 234,
    overallPosition: 6,
    isTeams: true,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBAKrcfJnHBdLMzs_BMcwiDNy32fmEIh3YfA&s',
  },
  {
    id: 7,
    name: 'Alec Smith',
    category: 'rx',
    firstResult: 145,
    firstPoints: 233,
    firstPosition: 234,
    secondResult: 145,
    secondPoints: 233,
    secondPosition: 234,
    thirdResult: 145,
    thirdPoints: 233,
    thirdPosition: 234,
    overallPosition: 7,
    isTeams: true,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Z8wUbZiXZr-dgzJ34FiETuDKWlgoYUoqNw&s',
  },
]

function Main() {
  const [currentLeaderboard, setCurrentLeaderboard] = useState([])
  

  // REQUESTS FOR ALL FILTERS
  const filterRequest = async (options) => {
    // setIsLoading(true)
    const sortedRanking = await requestApi.getAllUsers(options)
    console.log(sortedRanking)
    setCurrentLeaderboard(sortedRanking)
    // setIsLoading(false)
  }
  
  useEffect(() => {
    filterRequest();
  },[])

  return (
    <>
      <Form />
      <div className='main__cards'>
        {athletes.map((athlete) => (
          <Card athlete={athlete} key={athlete.id}/>
        ))}
      </div>
    </>
  )
}

export default Main
