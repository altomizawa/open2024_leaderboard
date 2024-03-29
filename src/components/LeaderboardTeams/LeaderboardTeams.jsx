import styles from '../LeaderboardTeams/LeaderboardTeams.module.css'

import LeaderboardItemTeams from '../LeaderboardItemTeams/LeaderboardItemTeams';

export default function LeaderboardTeams(props){
    const {sortIcon, teamLeaderboard} = props;

    // CREATE TEAMS
    function CreateTeamsResult(){
        return(
            teamsArray.map((team, index) => <LeaderboardItemTeams key={index} team={team} index={index} /> )
        )
    }

    // CREATE TEAMS
  function createTeamWithScore(teamName, teamLeaderboard) {
    const teamAthletes = teamLeaderboard.filter(athlete => athlete.team === teamName);
    const totalScore = teamAthletes.reduce((score, athlete) => {
      const wodScores = [athlete.rankingWodOne, athlete.rankingWodTwo, athlete.rankingWodThree]; // Include rankingWodThree
      return score + wodScores.reduce((wodSum, wodScore) => wodSum + wodScore, 0);
    }, 0);

    return {
      team: teamName,
      athletes: teamAthletes,
      points: 0, // Initialize points to 0 (can be modified)
      totalScore,
    };
  }

    // CREATE TEAM WITH SCORE ARRAY
    const createTeamWithScoreArray = () => {
        const finalTeamsArray = [
            createTeamWithScore('Coaches', teamLeaderboard),
            createTeamWithScore('Na Força do Wódio', teamLeaderboard),
            createTeamWithScore('Missão Suados', teamLeaderboard)
        ];
        return finalTeamsArray;
    }
    
    // SORT ARRAY AND CREATE RANKING FOR EACH TEAM
    const sortAndRankTeams = (rankedArray) => {
        rankedArray.sort((b,a) => (b.totalScore - a.totalScore) )
        rankedArray.map((team) => team.ranking = rankedArray.indexOf(team)+1)
        return rankedArray
    }

    const teamsArray = sortAndRankTeams(createTeamWithScoreArray())

    return (
        <>
            <div className={styles.leaderboard__header}>
            <h2 className={styles.leaderboard__position}></h2>
            <h2 style={{textAlign: 'left', cursor: 'pointer', userSelect: 'none'}}><img src={sortIcon}/>Equipe</h2>
            <h2 style={{cursor: "pointer", userSelect: 'none'}}><img src={sortIcon}/>24.1</h2>
            <h2 style={{cursor: "pointer", userSelect: 'none'}}><img src={sortIcon}/>24.2</h2>
            <h2 style={{cursor: "pointer", userSelect: 'none'}}><img src={sortIcon}/>24.3</h2>
            <h2 style={{cursor: "pointer", userSelect: 'none'}}><img src={sortIcon}/>TOTAL</h2>
            </div>
            {CreateTeamsResult(teamsArray)}

        </>
    )
}