import { useEffect, useState, useRef } from 'react'
import styles from '../src/App.module.css'
import korLogo from './assets/kor-logo.svg'
import filterIcon from './assets/filter_list_FILL0_wght400_GRAD0_opsz24.svg'
import sortIcon from './assets/sort_FILL0_wght400_GRAD0_opsz24.svg'
import './App.css'

import { calculateFirstWod } from './utils/calculateFirstWod'
import { calculateThirdWod } from './utils/calculateThirdWod'
import { createFinalLeaderboard } from './components/leaderboardHelpers/createFinalLeaderboard'
import LeaderboardTeams from './components/LeaderboardTeams/LeaderboardTeams'
import { createLeaderboard } from './components/leaderboardHelpers/leaderboardHelpers'

function App() {
  const [currentLeaderboard, setCurrentLeaderboard] = useState([])
  const [ascendingNameOrder, setAscendingNameOrder] = useState(true);
  const [ascendingWodOne, setAscendingWodOne] = useState(true);
  const [ascendingWodTwo, setAscendingWodTwo] = useState(true);
  const [ascendingWodThree, setAscendingWodThree] = useState(true);
  const [ascendingTotal, setAscendingTotal] = useState(true);
  const [isTeamsSelected, setIsTeamsSelected] = useState(false)

  
  //CREATE NEW ARRAY FOR EACH CATEGORY (RX / SCALED / TEAMS)
  let rxLeaderboard = useRef(createLeaderboard('RX')).current;
  let scaledLeaderboard = useRef(createLeaderboard('scaled')).current;
  let ascendingRxLeaderboard = createFinalLeaderboard(rxLeaderboard)

  const rxTeamLeaderboard = rxLeaderboard.filter((item) => item.team) // FIND TEAM MEMBERS
  const scaledTeamLeaderboard = scaledLeaderboard.filter((item) => item.team) // FIND TEAM MEMBERS
  const teamLeaderboard = rxTeamLeaderboard.concat(scaledTeamLeaderboard) // MERGE AND CREATE FINAL TEAM LEADERBOARD

  // HANDLE CATEGORY CHANGE
  const changeCategory = () => {
    if(currentLeaderboard === rxLeaderboard) {
      return setCurrentLeaderboard(scaledLeaderboard)
    }
    setCurrentLeaderboard(rxLeaderboard)
  }

  // HANDLE SORT BY 24.1
  const sortByFirst = () => {
    if (ascendingWodOne === false) {
      setCurrentLeaderboard(calculateFirstWod(currentLeaderboard));
      setAscendingWodOne(true)
    } else if (ascendingWodOne === true) {
      const reversedArray  = calculateFirstWod(currentLeaderboard).reverse()
      setCurrentLeaderboard(reversedArray);
      setAscendingWodOne(false)
    }
  };

  // HANDLE SORT BY 24.2
  const sortBySecond = () => {
    if (ascendingWodTwo === false) {
      let sortedLeaderboard = [...currentLeaderboard]
      sortedLeaderboard.sort((a,b) => a.secondWodReps - b.secondWodReps)
      setCurrentLeaderboard(sortedLeaderboard);
      setAscendingWodTwo(true)
    } else if (ascendingWodTwo === true) {
      let sortedLeaderboard = [...currentLeaderboard]
      sortedLeaderboard.sort((b,a) => a.secondWodReps - b.secondWodReps)
      setCurrentLeaderboard(sortedLeaderboard);
      setAscendingWodTwo(false)
    }
  };

  // HANDLE SORT BY 24.3
  const sortByThird = () => {
    if (ascendingWodThree === false) {
      setCurrentLeaderboard(calculateThirdWod(currentLeaderboard));
      setAscendingWodThree(true)
    } else if (ascendingWodThree === true) {
      const reversedArray = calculateThirdWod(currentLeaderboard).reverse()
      setCurrentLeaderboard(reversedArray);
      setAscendingWodThree(false)
    }
  };

  // HANDLE SORT BY TOTAL
  const sortByTotal = () => {
    if (ascendingTotal === false) {
      let sortedLeaderboard = [...currentLeaderboard]
      sortedLeaderboard.sort((a,b) => a.total - b.total)
      setCurrentLeaderboard(sortedLeaderboard);
      setAscendingTotal(true)
    } else if (ascendingTotal === true) {
      let sortedLeaderboard = [...currentLeaderboard]
      sortedLeaderboard.sort((b,a) => a.total - b.total)
      setCurrentLeaderboard(sortedLeaderboard);
      setAscendingTotal(false)
    }
  };

  // HANDLE SORT BY NAME
  const sortByName = () => {
    if (ascendingNameOrder===false){
      let sortedLeaderboard = [...currentLeaderboard]
      sortedLeaderboard.sort((a, b) => a.name.localeCompare(b.name));
      setCurrentLeaderboard(sortedLeaderboard);
      setAscendingNameOrder(true)

    } else if (ascendingNameOrder===true) {
      let sortedLeaderboard = [...currentLeaderboard];
      sortedLeaderboard.sort((b, a) => a.name.localeCompare(b.name));
      setCurrentLeaderboard(sortedLeaderboard);
      setAscendingNameOrder(false)
    }
  };
  

  // RENDER FIRST LEADERBOARD
  useEffect(()=>{
    setCurrentLeaderboard(rxLeaderboard)
  },[])

  useEffect(() => {
  },[rxLeaderboard,scaledLeaderboard,currentLeaderboard])



  function timeConverter(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
} 

//COMPONENT INDIVIDUAL LEADERBOARD
const IndividualLeaderboard = () => {
  return (
    <div style={{ minWidth: '80vw'}}>
          <div className='leaderboard__line'>
            <p className='leaderboard__index'></p>
            <p className='leaderboard__name'><img className='leaderboard__icon' src={sortIcon} onClick={sortByName}/>Nome</p>
            <p className='leaderboard__text'><img className='leaderboard__icon' src={sortIcon} onClick={changeCategory}/>Categoria</p>
            <p className='leaderboard__text'><img className='leaderboard__icon' src={sortIcon} onClick={sortByFirst}/>24.1</p>
            <p className='leaderboard__text'><img className='leaderboard__icon' src={sortIcon} onClick={sortBySecond}/>24.2</p>
            <p className='leaderboard__text'><img className='leaderboard__icon' src={sortIcon} onClick={sortByThird}/>24.3</p>
            <p className='leaderboard__text'><img className='leaderboard__icon' src={sortIcon} onClick={sortByTotal}/>TOTAL</p>
          </div>
          <ul className='leaderboard__ul'>
            {currentLeaderboard.map((athlete,index) => (
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
      </div>
  )
}

  return (
    <>
      <div>
        <img src={korLogo} className={styles.logo}></img>
        <h1 className={styles.title}>Open 2024 LEADERBOARD</h1>
        <div className={styles.selectorWrapper}>
          <button className={styles.selector} onClick={() => {setIsTeamsSelected(false)}}>Individual</button>
          <button className={styles.selector} onClick={() => {setIsTeamsSelected(true)}}>Equipes</button>
        </div>
        {!isTeamsSelected && <IndividualLeaderboard />}
        {isTeamsSelected && <LeaderboardTeams
          sortIcon={sortIcon}
          filterIcon={filterIcon}
          teamLeaderboard={teamLeaderboard}
          /> }
      </div>

    </>
  )
}

export default App
