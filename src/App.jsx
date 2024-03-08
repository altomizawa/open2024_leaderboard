import { useEffect, useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import LeaderboardItem from './components/LeaderboardItem/LeaderboardItem'

import results from './database/results.json'

function App() {
  const [filteredLeaderboard, setFilteredLeaderboard] = useState(results.filter(item => item.category === 'RX'))
  const [category, setCategory] = useState('RX')
  const [filteredResults, setFilteredResults] = useState([]);


  const handleCategoryChange = () => {
    if (category === 'RX') {
      setFilteredLeaderboard(results.filter(item => item.category === 'scaled'))
      setCategory('scaled')
    } else {
      setFilteredLeaderboard(results.filter(item => item.category === 'RX'))
      setCategory('RX')
    }
  }

  function CreateAthleteResult(){
    return (
      filteredLeaderboard.map((athlete) => <LeaderboardItem key={athlete.name} athlete={athlete} />)
    )
  }
  
  return (
    <>
      <div>
        <h1>Open 2024 LEADERBOARD</h1>
        <div className='leaderboard__header'>
          <h2 style={{textAlign: 'left'}}>Nome</h2>
          <h2 onClick={handleCategoryChange}>Categoria</h2>
          <h2>24.1</h2>
          <h2>24.2</h2>
          <h2>24.3</h2>
        </div>
        <CreateAthleteResult />
      </div>
    </>
  )
}

export default App
