import { useEffect, useState, useRef } from 'react'

import korLogo from './assets/kor-logo.svg'
import filterIcon from './assets/filter_list_FILL0_wght400_GRAD0_opsz24.svg'
import sortIcon from './assets/sort_FILL0_wght400_GRAD0_opsz24.svg'
import './App.css'

import LeaderboardItem from './components/LeaderboardItem/LeaderboardItem'

import results from './database/results.json'

function App() {
  const [filteredLeaderboard, setFilteredLeaderboard] = useState(results.filter(item => item.category === 'RX'));
  const [category, setCategory] = useState('RX');
  const [ascendingNameOrder, setAscendingNameOrder] = useState(true);
  const [ascendingWodOne, setAscendingWodOne] = useState(true);


  
  // CREATE LEADERBOARD
  const createLeaderboard = (category) => {
    const leaderboard = results.filter(item => item.category === category); //create array based for RX or scaled
    const orderedLeaderboard = leaderboard.sort((a,b) => a.firstWodTime - b.firstWodTime) //sort array based on FirstWodResult
    orderedLeaderboard.map((item) => item.ranking = orderedLeaderboard.indexOf(item)+1) //add ranking to each object in array
    return orderedLeaderboard //return sorted array
  }
  
  //CREATE NEW ARRAY FOR EACH CATEGORY (RX / SCALED)
  let rxLeaderboard = useRef(createLeaderboard('RX')).current;
  let scaledLeaderboard = useRef(createLeaderboard('scaled')).current;

  // HANDLE CATEGORY CHANGE
  const handleCategoryChange = () => {
    if (category === 'RX') {
      setFilteredLeaderboard(scaledLeaderboard)
      setCategory('scaled')
    } else {
      setFilteredLeaderboard(rxLeaderboard)
      setCategory('RX')
    }
  }
  // HANDLE NAME SORTING
  const handleNameSorting = () => {
      const nameFilter = category === 'RX' ? rxLeaderboard : scaledLeaderboard
      ascendingNameOrder ? nameFilter.sort((a, b) => a.name.localeCompare(b.name)) : nameFilter.sort((b, a) => a.name.localeCompare(b.name)); // Sort by name alphabetically
      setAscendingNameOrder(prevState => !prevState)
  }

  // HANDLE FIRST WOD SORTING
  const handleFirstWodSorting = () => {
    const wodFilter = category === 'RX' ? rxLeaderboard : scaledLeaderboard
    const firstWodResults = ascendingWodOne ? wodFilter.sort((a,b) => a.firstWodTime - b.firstWodTime) : wodFilter.sort((b,a) => a.firstWodTime - b.firstWodTime)
    setFilteredLeaderboard(firstWodResults)
    setAscendingWodOne(prevState => !prevState)
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
