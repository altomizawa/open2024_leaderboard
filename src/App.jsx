import { useState } from 'react'

import korLogo from './assets/kor-logo.svg'
import filterIcon from './assets/filter_list_FILL0_wght400_GRAD0_opsz24.svg'
import sortIcon from './assets/sort_FILL0_wght400_GRAD0_opsz24.svg'
import './App.css'

import LeaderboardItem from './components/LeaderboardItem/LeaderboardItem'

import results from './database/results.json'

function App() {
  const [filteredLeaderboard, setFilteredLeaderboard] = useState(results.filter(item => item.category === 'RX'))
  const [category, setCategory] = useState('RX')
  const [ascendingNameOrder, setAscendingNameOrder] = useState(true)
  // const [filteredResults, setFilteredResults] = useState([]);

// HANDLE CATEGORY CHANGE
  const handleCategoryChange = () => {
    if (category === 'RX') {
      setFilteredLeaderboard(results.filter(item => item.category === 'scaled'))
      setCategory('scaled')
    } else {
      setFilteredLeaderboard(results.filter(item => item.category === 'RX'))
      setCategory('RX')
    }
  }
// HANDLE NAME SORTING
  const handleNameSorting = () => {
      const nameFilter = filteredLeaderboard.filter(item => item.category === category);//filter by category first
      ascendingNameOrder ? nameFilter.sort((a, b) => a.name.localeCompare(b.name)) : nameFilter.sort((b, a) => a.name.localeCompare(b.name)); // Sort by name alphabetically
      setAscendingNameOrder(prevState => !prevState)
      setFilteredLeaderboard(nameFilter)//render leaderboard
  }

// HANDLE FIRST WOD SORTING
  const handleFirstWodSorting = () => {
    const firstWodResults = filteredLeaderboard.sort((a,b) => a.firstWodTime - b.firstWodTime)
    console.log(firstWodResults)
    setFilteredLeaderboard(firstWodResults)
  }


// CREATE ATHLETE
  function CreateAthleteResult(){
    return (
      filteredLeaderboard.map((athlete) => <LeaderboardItem key={athlete.name} athlete={athlete} />)
    )
  }

  
  
  return (
    <>
      <div>
        <img src={korLogo} className='logo'></img>
        <h1>Open 2024 LEADERBOARD</h1>
        
        <div className='leaderboard__header'>
          <h2 style={{textAlign: 'left'}} onClick={handleNameSorting}><img src={sortIcon}/>Nome</h2>
          <h2 onClick={handleCategoryChange}><img src={filterIcon}/>Categoria</h2>
          <h2 onClick={handleFirstWodSorting}><img src={sortIcon}/>24.1</h2>
          <h2><img src={sortIcon}/>24.2</h2>
          <h2><img src={sortIcon}/>24.3</h2>
        </div>
        <CreateAthleteResult />

      </div>
    </>
  )
}

export default App
