import styles from '../LeaderboardTeams/LeaderboardTeams.module.css'

import LeaderboardItemTeams from '../LeaderboardItemTeams/LeaderboardItemTeams';

export default function LeaderboardTeams(props){
    const {filterIcon, sortIcon,teamLeaderboard} = props;

    // CREATE TEAMS
    function CreateTeamsResult(){
        return(
            teamsArray.map((team, index) => <LeaderboardItemTeams key={index} team={team} index={index} /> )
        )
    }

    // function CreateTeamsArray(teamName){
    //     const teamArray = teamLeaderboard.filter((athlete) => athlete.team === teamName);
        
    //     const newTeamName = {
    //         team: teamName,
    //         athletes: teamArray,
    //         totalScore: calculateTeamScore(teamArray)
    //     }
    //     return newTeamName

    //     function calculateTeamScore(teamAthletes) {
    //         let totalScore = 0;
    //         teamAthletes.forEach(athlete => {
    //           totalScore += athlete.rankingWodOne + athlete.rankingWodTwo;
    //         })
    //         return totalScore;
    //     }
    // }

    // const finalTeamsArray = [
    //     CreateTeamsArray('Coaches'), CreateTeamsArray('Nameless'), CreateTeamsArray('Missão Suados')
    // ]
    function createTeamWithScore(teamName, teamLeaderboard) {
        const teamAthletes = teamLeaderboard.filter(athlete => athlete.team === teamName);
        const totalScore = teamAthletes.reduce((score, athlete) => score + athlete.rankingWodOne + athlete.rankingWodTwo, 0);
      
        return {
          team: teamName,
          athletes: teamAthletes,
          points: 0, // Initialize points to 0 (can be modified)
          totalScore
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

    // finalTeamsArray.sort((teamA, teamB) => teamA.totalScore - teamB.totalScore )
    // const addRankingToTeams = (teamLeaderboard) => {
    //     teamLeaderboard.map((team) => team.ranking = teamLeaderboard.indexOf(team)+1) //add ranking to each object in array
    //     return teamLeaderboard
    // }
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
            {/* <CreateAthleteResult /> */}
            {CreateTeamsResult(teamsArray)}

        </>
    )
}