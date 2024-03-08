import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import LeaderboardItem from './components/LeaderboardItem/LeaderboardItem'

import results from './database/results.json'

function App() {
  const [filteredLeaderboard, setFilteredLeaderboard] = useState(results)
  const [category, setCategory] = useState('RX')

  
  const filterLeaderboard = () => {
    if (category === 'RX') {
      setCategory('scaled')
    } else {setCategory('RX')}
    const filteredResults = results.filter(item => item.category === category);
    setFilteredLeaderboard(filteredResults)
  }

  return (
    <>
      <div>
        <h1>Open 2024 LEADERBOARD</h1>
        <div className='leaderboard__header'>
          <h2 style={{textAlign: 'left'}}>Nome</h2>
          <h2 onClick={filterLeaderboard}>Categoria</h2>
          <h2>24.1</h2>
          <h2>24.2</h2>
          <h2>24.3</h2>
        </div>
        {filteredLeaderboard.map((athlete) => <LeaderboardItem key={athlete.name} athlete={athlete} />)}
      </div>
    </>
  )
}

export default App
