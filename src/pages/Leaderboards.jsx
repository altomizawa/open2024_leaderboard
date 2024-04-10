import { useState } from 'react'


import IndividualLeaderboard from '../components/IndividualLeaderboard/IndividualLeaderboard'
import LeaderboardTeams from '../components/LeaderboardTeams/LeaderboardTeams'

export default function Leaderboards() {
  const [isTeamsSelected, setIsTeamsSelected] = useState(false);

  return (
    <div className='leaderboard'>
      <div className='leaderboard__selectorWrapper'>
        <button className='leaderboard__selector' onClick={() => {setIsTeamsSelected(false)}}>Individual</button>
        <button className='leaderboard__selector' onClick={() => {setIsTeamsSelected(true)}}>Equipes</button>
      </div>

      {!isTeamsSelected && <IndividualLeaderboard />}

      {isTeamsSelected && <LeaderboardTeams /> }
    </div>
  )
}
