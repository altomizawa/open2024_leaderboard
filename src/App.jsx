import { useEffect, useState, useRef } from 'react'
import styles from '../src/App.module.css'
import korLogo from './assets/kor-logo.svg'
import filterIcon from './assets/filter_list_FILL0_wght400_GRAD0_opsz24.svg'
import sortIcon from './assets/sort_FILL0_wght400_GRAD0_opsz24.svg'
import './App.css'

import LeaderboardItem from './components/LeaderboardItem/LeaderboardItem'
import LeaderboardTeams from './components/LeaderboardTeams/LeaderboardTeams'
import { createLeaderboard } from './components/leaderboardHelpers/leaderboardHelpers'

function App() {
  const [filteredLeaderboard, setFilteredLeaderboard] = useState([]);
  const [category, setCategory] = useState('RX');
  const [ascendingNameOrder, setAscendingNameOrder] = useState(true);
  const [ascendingWodOne, setAscendingWodOne] = useState(true);
  const [ascendingWodTwo, setAscendingWodTwo] = useState(true);

  
  //CREATE NEW ARRAY FOR EACH CATEGORY (RX / SCALED)
  let rxLeaderboard = useRef(createLeaderboard('RX')).current;
  let scaledLeaderboard = useRef(createLeaderboard('scaled')).current;

  // HANDLE CATEGORY CHANGE
  const handleCategoryChange = () => {
    if (category === 'RX') {
      handleTotalScoreSorting(category);
      setCategory('scaled')
      setAscendingWodOne(true);
      setAscendingWodTwo(true);
    } else {
      handleTotalScoreSorting(category);
      setCategory('RX')
      setAscendingWodOne(true);
      setAscendingWodTwo(true);
    }
  }

  // HANDLE NAME SORTING
  const handleNameSorting = () => {
      const nameFilter = category === 'RX' ? rxLeaderboard : scaledLeaderboard
      ascendingNameOrder ? nameFilter.sort((a, b) => a.name.localeCompare(b.name)) : nameFilter.sort((b, a) => a.name.localeCompare(b.name)); // Sort by name alphabetically
      setAscendingNameOrder(prevState => !prevState)
      setAscendingWodOne(true);
      setAscendingWodTwo(true);
  }

  // HANDLE FIRST WOD SORTING
  const handleFirstWodSorting = () => {
    const wodFilter = category === 'RX' ? rxLeaderboard : scaledLeaderboard;
    const firstWodResults = ascendingWodOne ? wodFilter.sort((a,b) => a.rankingWodOne - b.rankingWodOne) : wodFilter.sort((b,a) => a.rankingWodOne - b.rankingWodOne);
    setFilteredLeaderboard(firstWodResults);
    setAscendingWodOne(prevState => !prevState);
    setAscendingWodTwo(true);
  }

  // HANDLE SECOND WOD SORTING
  const handleSecondWodSorting = () => {
    const wodFilter = category === 'RX' ? rxLeaderboard : scaledLeaderboard;
    const secondWodResults = ascendingWodTwo ? wodFilter.sort((b,a) => a.secondWodReps - b.secondWodReps) : wodFilter.sort((a,b) => a.secondWodReps - b.secondWodReps);
    setFilteredLeaderboard(secondWodResults);
    setAscendingWodTwo(prevState => !prevState);
    setAscendingWodOne(true)
  }

  // HANDLE TOTAL SCORE SORTING
  const handleTotalScoreSorting = (category) => {
    const orderedLeaderboard = category==='RX' ? rxLeaderboard.sort((a,b) => a.rankingTotal - b.rankingTotal) : scaledLeaderboard.sort((a,b) => a.rankingTotal - b.rankingTotal)
    setFilteredLeaderboard(orderedLeaderboard)
  }

  // // RENDER FIRST LEADERBOARD
  useEffect(()=>{
    setFilteredLeaderboard(category==='RX' ? rxLeaderboard : scaledLeaderboard)
  }),[category, rxLeaderboard, scaledLeaderboard]

  // CREATE ATHLETE
  function CreateAthleteResult(){
    return (
      filteredLeaderboard.map((athlete, index) => <LeaderboardItem key={athlete.name} athlete={athlete} index={index+1}/>)
    )
  }

  return (
    <>
      <div>
        <img src={korLogo} className={styles.logo}></img>
        <h1 className={styles.title}>Open 2024 LEADERBOARD</h1>
        <div className={styles.leaderboard__header}>
          <h2 className={styles.leaderboard__position}></h2>
          <h2 style={{textAlign: 'left', cursor: 'pointer', userSelect: 'none'}} onClick={handleNameSorting}><img src={sortIcon}/>Nome</h2>
          <h2 onClick={handleCategoryChange} style={{cursor: "pointer", userSelect: 'none'}}><img src={filterIcon}/>Categoria</h2>
          <h2 onClick={handleFirstWodSorting} style={{cursor: "pointer", userSelect: 'none'}}><img src={sortIcon}/>24.1</h2>
          <h2 onClick={handleSecondWodSorting} style={{cursor: "pointer", userSelect: 'none'}}><img src={sortIcon}/>24.2</h2>
          <h2 style={{cursor: "pointer", userSelect: 'none'}}><img src={sortIcon}/>24.3</h2>
        </div>
        <CreateAthleteResult />
        {/* <LeaderboardTeams sortIcon={sortIcon} filterIcon={filterIcon}/> */}

      </div>

    </>
  )
}

export default App
