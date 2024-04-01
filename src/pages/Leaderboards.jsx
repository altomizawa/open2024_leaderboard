import filterIcon from '../assets/filter_list_FILL0_wght400_GRAD0_opsz24.svg'
import sortIcon from '../assets/sort_FILL0_wght400_GRAD0_opsz24.svg'

import LeaderboardTeams from '../components/LeaderboardTeams/LeaderboardTeams'
import IndividualLeaderboard from '../components/IndividualLeaderboard/IndividualLeaderboard'


export default function Leaderboards(props) {

  const { isTeamsSelected, setIsTeamsSelected, teamLeaderboard } = props
  return (
    <>
      <div className='Leaderboard__selectorWrapper'>
        <button className='Leaderboard.selector' onClick={() => {setIsTeamsSelected(false)}}>Individual</button>
        <button className='Leaderboard.selector' onClick={() => {setIsTeamsSelected(true)}}>Equipes</button>
      </div>
      {!isTeamsSelected && <IndividualLeaderboard />}
        {isTeamsSelected && <LeaderboardTeams
          sortIcon={sortIcon}
          filterIcon={filterIcon}
          teamLeaderboard={teamLeaderboard}
          /> }
    </>
  )
}
