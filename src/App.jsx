import { useEffect, useState, useRef } from 'react'
import styles from '../src/App.module.css'
import korLogo from './assets/kor-logo.svg'
import filterIcon from './assets/filter_list_FILL0_wght400_GRAD0_opsz24.svg'
import sortIcon from './assets/sort_FILL0_wght400_GRAD0_opsz24.svg'
import './App.css'

import LeaderboardItem from './components/LeaderboardItem/LeaderboardItem'

import results from './database/results.json'

function App() {
  const [filteredLeaderboard, setFilteredLeaderboard] = useState([]);
  const [category, setCategory] = useState('RX');
  const [ascendingNameOrder, setAscendingNameOrder] = useState(true);
  const [ascendingWodOne, setAscendingWodOne] = useState(true);
  const [ascendingWodTwo, setAscendingWodTwo] = useState(true);


  
  // CREATE LEADERBOARD
  const createLeaderboard = (category) => {
    const leaderboard = results.filter(item => item.category === category); //create array based for RX or scaled
    const leaderboardAfterWodOne = addRankingFirstWod(leaderboard)
    const leaderboardAfterWodTwo = addRankingSecondWod(leaderboardAfterWodOne)
    const finalLeaderboard = addTotalRanking(leaderboardAfterWodTwo)
    return finalLeaderboard //return sorted array
  }

  // ADD RANKING FOR FIRST WOD
  const addRankingFirstWod = (leaderboard) => {
    const orderedLeaderboard = leaderboard.sort((a,b) => a.firstWodTime - b.firstWodTime) //sort array based on FirstWodResult
    orderedLeaderboard.map((item) => item.rankingWodOne = orderedLeaderboard.indexOf(item)+1) //add first wod ranking to each object
    return orderedLeaderboard
  }

   // ADD RANKING FOR SECOND WOD
   const addRankingSecondWod = (leaderboard) => {
    const orderedLeaderboard = leaderboard.sort((b,a) => a.secondWodReps - b.secondWodReps) //sort array based on FirstWodResult
    orderedLeaderboard.map((item) => item.rankingWodTwo = orderedLeaderboard.indexOf(item)+1) //add second wod ranking to each object
    return orderedLeaderboard
  }

  // ADD TOTAL RANKING
  const addTotalRanking = (leaderboard) => {
    const orderedLeaderboard = leaderboard.sort((a,b) => (a.rankingWodOne+a.rankingWodTwo) - (b.rankingWodOne+b.rankingWodTwo)) //sort array based on ALL WODs
    orderedLeaderboard.map((item) => item.rankingTotal = orderedLeaderboard.indexOf(item)+1) //add total ranking to each object in array
    return orderedLeaderboard
  }

  
  //CREATE NEW ARRAY FOR EACH CATEGORY (RX / SCALED)
  let rxLeaderboard = useRef(createLeaderboard('RX')).current;
  let scaledLeaderboard = useRef(createLeaderboard('scaled')).current;

  // HANDLE CATEGORY CHANGE
  const handleCategoryChange = () => {
    if (category === 'RX') {
      const orderedLeaderboard = scaledLeaderboard.sort((a,b) => a.rankingTotal - b.rankingTotal)
      setFilteredLeaderboard(orderedLeaderboard)
      setCategory('scaled')
    } else {
      const orderedLeaderboard = rxLeaderboard.sort((a,b) => a.rankingTotal - b.rankingTotal)
      setFilteredLeaderboard(orderedLeaderboard)
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
    const firstWodResults = ascendingWodOne ? wodFilter.sort((a,b) => a.rankingWodOne - b.rankingWodOne) : wodFilter.sort((b,a) => a.rankingWodOne - b.rankingWodOne)
    setFilteredLeaderboard(firstWodResults)
    setAscendingWodOne(prevState => !prevState)
  }

  // HANDLE SECOND WOD SORTING
  const handleSecondWodSorting = () => {
    const wodFilter = category === 'RX' ? rxLeaderboard : scaledLeaderboard
    const secondWodResults = ascendingWodTwo ? wodFilter.sort((a,b) => a.secondWodReps - b.secondWodReps) : wodFilter.sort((b,a) => a.secondWodReps - b.secondWodReps)
    setFilteredLeaderboard(secondWodResults)
    setAscendingWodTwo(prevState => !prevState)
  }

  // // RENDER FIRST LEADERBOARD
  useEffect(()=>{
    setFilteredLeaderboard(category==='RX' ? rxLeaderboard : scaledLeaderboard)
  }),[category, rxLeaderboard, scaledLeaderboard]

  // CREATE ATHLETE
  function CreateAthleteResult(){
    return (
      filteredLeaderboard.map((athlete) => <LeaderboardItem key={athlete.name} athlete={athlete} />)
    )
  }

  return (
    <>
      <div>
        <img src={korLogo} className={styles.logo}></img>
        <h1>Open 2024 LEADERBOARD</h1>
        
        <div className={styles.leaderboard__header}>
          <h2 style={{textAlign: 'left', cursor: 'pointer', userSelect: 'none'}} onClick={handleNameSorting}><img src={sortIcon}/>Nome</h2>
          <h2 onClick={handleCategoryChange} style={{cursor: "pointer", userSelect: 'none'}}><img src={filterIcon}/>Categoria</h2>
          <h2 onClick={handleFirstWodSorting} style={{cursor: "pointer", userSelect: 'none'}}><img src={sortIcon}/>24.1</h2>
          <h2 onClick={handleSecondWodSorting} style={{cursor: "pointer", userSelect: 'none'}}><img src={sortIcon}/>24.2</h2>
          <h2 style={{cursor: "pointer", userSelect: 'none'}}><img src={sortIcon}/>24.3</h2>
        </div>
        <CreateAthleteResult />

      </div>
    </>
  )
}

export default App
