import styles from '../LeaderboardTeams/LeaderboardTeams.module.css'

import LeaderboardItemTeams from '../LeaderboardItemTeams/LeaderboardItemTeams';

export default function LeaderboardTeams(props){
    const {filterIcon, sortIcon,teamLeaderboard} = props;

    // CREATE TEAMS
    function CreateTeamsResult(teamName){
        return(
            finalTeamsArray.map((team, index) => <LeaderboardItemTeams key={index} team={team} /> )
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
      
    const finalTeamsArray = [
    createTeamWithScore('Coaches', teamLeaderboard),
    createTeamWithScore('Nameless', teamLeaderboard),
    createTeamWithScore('Missão Suados', teamLeaderboard)
    ];

    finalTeamsArray.sort((teamA, teamB) => teamA.totalScore - teamB.totalScore )

    return (
        <>
            <div className={styles.leaderboard__header}>
            <h2 className={styles.leaderboard__position}>1</h2>
            <h2 style={{textAlign: 'left', cursor: 'pointer', userSelect: 'none'}}><img src={sortIcon}/>Equipe</h2>
            <h2 style={{cursor: "pointer", userSelect: 'none'}}><img src={sortIcon}/>24.1</h2>
            <h2 style={{cursor: "pointer", userSelect: 'none'}}><img src={sortIcon}/>24.2</h2>
            <h2 style={{cursor: "pointer", userSelect: 'none'}}><img src={sortIcon}/>24.3</h2>
            </div>
            {/* <CreateAthleteResult /> */}
            {CreateTeamsResult('Coaches')}

        </>
    )
}