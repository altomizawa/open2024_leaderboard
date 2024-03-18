import { useEffect, useState, useRef } from 'react'
import styles from '../src/App.module.css'
import korLogo from './assets/kor-logo.svg'
import filterIcon from './assets/filter_list_FILL0_wght400_GRAD0_opsz24.svg'
import sortIcon from './assets/sort_FILL0_wght400_GRAD0_opsz24.svg'
import './App.css'
import { calculateThirdWod } from './utils/calculateThirdWod'
import { createFinalLeaderboard } from './components/leaderboardHelpers/createFinalLeaderboard'

import LeaderboardIndividual from './components/LeaderboardIndividual/LeaderboardIndividual' 
import LeaderboardItem from './components/LeaderboardItem/LeaderboardItem'
import LeaderboardTeams from './components/LeaderboardTeams/LeaderboardTeams'
import { createLeaderboard } from './components/leaderboardHelpers/leaderboardHelpers'

function App() {
  const [currentLeaderboard, setCurrentLeaderboard] = useState([])
  const [category, setCategory] = useState('RX')

  // const [filteredLeaderboard, setFilteredLeaderboard] = useState([]);
  // const [category, setCategory] = useState('RX');
  // const [ascendingNameOrder, setAscendingNameOrder] = useState(true);
  // const [ascendingWodOne, setAscendingWodOne] = useState(true);
  // const [ascendingWodTwo, setAscendingWodTwo] = useState(true);
  // const [ascendingWodThree, setAscendingWodThree] = useState(true);
  // const [isTeamsSelected, setIsTeamsSelected] = useState(false)

  
  //CREATE NEW ARRAY FOR EACH CATEGORY (RX / SCALED / TEAMS)
  let rxLeaderboard = useRef(createLeaderboard('RX')).current;
  let scaledLeaderboard = useRef(createLeaderboard('scaled')).current;

  const rxTeamLeaderboard = rxLeaderboard.filter((item) => item.team) // FIND TEAM MEMBERS
  const scaledTeamLeaderboard = scaledLeaderboard.filter((item) => item.team) // FIND TEAM MEMBERS
  const teamLeaderboard = rxTeamLeaderboard.concat(scaledTeamLeaderboard) // MERGE AND CREATE FINAL TEAM LEADERBOARD

  console.log(teamLeaderboard)


  // // HANDLE CATEGORY CHANGE
  // const handleCategoryChange = () => {
  //   if (category === 'RX') {
  //     handleTotalScoreSorting(category);
  //     setCategory('scaled')
  //     setAscendingWodOne(true);
  //     setAscendingWodTwo(true);
  //   } else {
  //     handleTotalScoreSorting(category);
  //     setCategory('RX')
  //     setAscendingWodOne(true);
  //     setAscendingWodTwo(true);
  //   }
  // }

  // // HANDLE NAME SORTING
  // const handleNameSorting = () => {
  //     const nameFilter = category === 'RX' ? rxLeaderboard : scaledLeaderboard
  //     ascendingNameOrder ? nameFilter.sort((a, b) => a.name.localeCompare(b.name)) : nameFilter.sort((b, a) => a.name.localeCompare(b.name)); // Sort by name alphabetically
  //     setAscendingNameOrder(prevState => !prevState)
  //     setAscendingWodOne(true);
  //     setAscendingWodTwo(true);
  // }

  // // HANDLE FIRST WOD SORTING
  // const handleFirstWodSorting = () => {
  //   const wodFilter = category === 'RX' ? rxLeaderboard : scaledLeaderboard;
  //   const firstWodResults = ascendingWodOne ? wodFilter.sort((a,b) => a.rankingWodOne - b.rankingWodOne) : wodFilter.sort((b,a) => a.rankingWodOne - b.rankingWodOne);
  //   setFilteredLeaderboard(firstWodResults);
  //   setAscendingWodOne(prevState => !prevState);
  //   setAscendingWodTwo(true);
  // }

  // // HANDLE SECOND WOD SORTING
  // const handleSecondWodSorting = () => {
  //   const wodFilter = category === 'RX' ? rxLeaderboard : scaledLeaderboard;
  //   const secondWodResults = ascendingWodTwo ? wodFilter.sort((b,a) => a.secondWodReps - b.secondWodReps) : wodFilter.sort((a,b) => a.secondWodReps - b.secondWodReps);
  //   setFilteredLeaderboard(secondWodResults);
  //   setAscendingWodTwo(prevState => !prevState);
  //   setAscendingWodOne(true)
  // }

  //   // HANDLE THIRD WOD SORTING
  //   const handleThirdWodSorting = () => {
  //     const wodFilter = category === 'RX' ? rxLeaderboard : scaledLeaderboard;
  //     const thirdWodResults = ascendingWodThree ? wodFilter.sort((a,b) => a.rankingWodThree - b.rankingWodThree) : wodFilter.sort((b,a) => a.rankingWodThree - b.rankingWodThree);
  //     setFilteredLeaderboard(thirdWodResults);
  //     console.log(filteredLeaderboard)
  //     setAscendingWodThree(prevState => !prevState);
  //     setAscendingWodTwo(true);
  //   }



  // // HANDLE TOTAL SCORE SORTING
  // const handleTotalScoreSorting = (category) => {
  //   const orderedLeaderboard = category==='RX' ? rxLeaderboard.sort((a,b) => a.rankingTotal - b.rankingTotal) : scaledLeaderboard.sort((a,b) => a.rankingTotal - b.rankingTotal)
  //   setFilteredLeaderboard(orderedLeaderboard)
  // }

  // HANDLE CATEGORY CHANGE
  const changeCategory = () => {
    if(currentLeaderboard === rxLeaderboard) {
      return setCurrentLeaderboard(scaledLeaderboard)
    }
    setCurrentLeaderboard(rxLeaderboard)
  }

  // HANDLE SORT BY 24.1
  const sortByFirst = () => {  
    rxLeaderboard.sort((a, b) => a.rankingWodOne - b.rankingWodOne);
    setCurrentLeaderboard(currentLeaderboard)
    console.log(rxLeaderboard)
  }

  // HANDLE SORT BY NAME
  const sortByName = () => {
    let sortedLeaderboard = currentLeaderboard.sort((a, b) => a.name.localeCompare(b.name));
    setCurrentLeaderboard(sortedLeaderboard);
    console.log(currentLeaderboard)
  };
  

  // RENDER FIRST LEADERBOARD
  useEffect(()=>{
    setCurrentLeaderboard(rxLeaderboard)
  },[])

  useEffect(() => {
    console.log('updated')
  },[rxLeaderboard,scaledLeaderboard, currentLeaderboard])



  function timeConverter(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
} 

  return (
    <>
      <img src={korLogo} className={styles.logo}></img>
      <h1 className={styles.title}>Open 2024 LEADERBOARD</h1>
      <div className={styles.selectorWrapper}>
        <button className={styles.selector} onClick={() => {setIsTeamsSelected(false)}}>Individual</button>
        <button className={styles.selector} onClick={() => {setIsTeamsSelected(true)}}>Equipes</button>
      </div>
      <div style={{ minWidth: '80vw'}}>
        <div className='leaderboard__line'>
          <p className='leaderboard__index'></p>
          <p className='leaderboard__name'><img className='leaderboard__icon' src={sortIcon} onClick={sortByName}/>Nome</p>
          <p className='leaderboard__text'><img className='leaderboard__icon' src={sortIcon} onClick={changeCategory}/>Categoria</p>
          <p className='leaderboard__text'><img className='leaderboard__icon' src={sortIcon} onClick={sortByFirst}/>24.1</p>
          <p className='leaderboard__text'><img className='leaderboard__icon' src={sortIcon} />24.2</p>
          <p className='leaderboard__text'><img className='leaderboard__icon' src={sortIcon} />24.3</p>
          <p className='leaderboard__text'>TOTAL</p>
        </div>
        <ul className='leaderboard__ul'>
          {createFinalLeaderboard(currentLeaderboard).map((athlete,index) => (
            <li className='leaderboard__line' key={index}>
              <p className='leaderboard__index'>{index+1}</p>
              <p className='leaderboard__name'>{athlete.name}<span className='leaderboard__span'> ({athlete.rankingTotal})</span></p>
              <p className='leaderboard__text'>{athlete.category}</p>
              <p className='leaderboard__text'>{athlete.firstWodTime===900 ? athlete.firstWodReps : timeConverter(athlete.firstWodTime)} <span className='leaderboard__span'>({athlete.rankingWodOne})</span></p>
              <p className='leaderboard__text'>{athlete.secondWodReps} <span className='leaderboard__span'>({athlete.rankingWodTwo})</span></p>
              <p className='leaderboard__text'>{athlete.thirdWodTime===900 ? athlete.thirdWodReps : timeConverter(athlete.thirdWodTime)} <span className='leaderboard__span'>({athlete.rankingWodThree})</span></p>
              <p className='leaderboard__text'>{athlete.total}<span> pts</span></p>
            </li>
          ))}
        </ul>

        {/* {!isTeamsSelected && 
        <LeaderboardIndividual leaderboard={createFinalLeaderboard(rxLeaderboard)} />}
        {isTeamsSelected && <div>
          <LeaderboardTeams
          sortIcon={sortIcon}
          filterIcon={filterIcon}
          teamLeaderboard={teamLeaderboard}
          /> 
        </div>} */}
      </div>

    </>
  )
}

export default App
