import { useEffect, useState } from 'react';

import sortIcon from '../../assets/sort_FILL0_wght400_GRAD0_opsz24.svg'

import requestApi from '../../utils/api';

import LeaderboardItemTeams from '../LeaderboardItemTeams/LeaderboardItemTeams';

export default function LeaderboardTeams(){
  const[teams, setTeams] = useState([])

  const getTeamLeaderboard = async() => {
    const teamLeaderboard = await requestApi.getTeams();
    setTeams(teamLeaderboard)
  }

  useEffect(() => {
    getTeamLeaderboard()
  },[])

  const calculateTeamEventResult = (athletes, event) => {
    let scores = 0; // Initialize scores to 0
    for (let i = 0; i < athletes.length; i++) {
        scores += athletes[i][event]; // Accumulate the scores
    }
    return scores;
  };

  return (
      <>
        <div className='leaderboardTeams__header'>
        <h2 className='leaderboardTeams__position'></h2>
        <h2 style={{textAlign: 'left', cursor: 'pointer', userSelect: 'none'}}><img src={sortIcon}/>Equipe</h2>
        <h2 style={{cursor: "pointer", userSelect: 'none'}}><img src={sortIcon}/>24.1</h2>
        <h2 style={{cursor: "pointer", userSelect: 'none'}}><img src={sortIcon}/>24.2</h2>
        <h2 style={{cursor: "pointer", userSelect: 'none'}}><img src={sortIcon}/>24.3</h2>
        <h2 style={{cursor: "pointer", userSelect: 'none'}}><img src={sortIcon}/>TOTAL</h2>
        </div>
        <ul>
          {teams.map((team, index) => (            
            <div className='leaderboardTeams__line' key={team._id}>
              <p>{index+1}</p>
              <div>
                <p className='leaderboardTeams__name'>{team._id}<span style={{color: 'grey'}}> ({index+1})</span></p>
                {team.athletes.map((athlete) => (
                  <div className='leaderboardTeams__athletes' key={athlete._id}>
                    <p className='leaderboardTeams__team-name'>{athlete.name}</p>
                  </div>
                ))}
              </div>
              <div>
                <p>{calculateTeamEventResult(team.athletes, 'wodOneRanking')} pts</p>
                {team.athletes.map((athlete, index) => (
                  <p className='leaderboardTeam_athlete-result' key={index}>{athlete.wodOneRanking} pts</p>
                ))}
              </div>
              <div>
                <p>{calculateTeamEventResult(team.athletes, 'wodTwoRanking')} pts</p>
                {team.athletes.map((athlete, index) => (
                  <p className='leaderboardTeam_athlete-result' key={index}>{athlete.wodTwoRanking} pts</p>
                ))}
              </div>
              <div>
                <p>{calculateTeamEventResult(team.athletes, 'wodThreeRanking')} pts</p>
                {team.athletes.map((athlete, index) => (
                  <p className='leaderboardTeam_athlete-result' key={index}>{athlete.wodThreeRanking} pts</p>
                ))}
              </div>
              <div>
                <p>{calculateTeamEventResult(team.athletes, 'finalRanking')} pts</p>
                {team.athletes.map((athlete, index) => (
                  <p className='leaderboardTeam_athlete-result' key={index}>{athlete.finalRanking} pts</p>
                ))}
              </div>
            </div>            
          ))}
        </ul>
       

      </>
  )
}