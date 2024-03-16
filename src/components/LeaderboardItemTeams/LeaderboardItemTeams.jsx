import { useState } from 'react';
import styles from './LeaderboardItemTeams.module.css'

export default function LeaderboardItemTeams(props) {
    const[isAthletesOpen, setIsAthletesOpen] = useState(false);

// console.log(props)
    const {team=team, athletes = team.athletes, ranking=ranking, totalScore } = props.team

    //Calculate points based on rankingWodOne+rankingWodTwo 
    const calculateTeamWodOneResult = () => {
        let total = 0;
        athletes.forEach((athlete) => {
            total += athlete.rankingWodOne;
        });
        return total;
    }
    const calculateTeamWodTwoResult = () => {
        let total = 0;
        athletes.forEach((athlete) => {
            total += athlete.rankingWodTwo;
        });
        return total;
    }
    const calculateTeamWodThreeResult = () => {
        let total = 0;
        athletes.forEach((athlete) => {
            total += athlete.rankingWodThree;
        });
        return total;
    }

    const handleTeamDetails = () => {
        setIsAthletesOpen(prevState => !prevState)
    }


    // function formatTime(seconds) {
    //     if(seconds === 900 && !firstWodReps){
    //         return firstWodReps
    //     }
    //     const minutes = Math.floor(seconds / 60);
    //     const remainingSeconds = seconds % 60;
    //     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    // }

    return (
        <>
        <div className={styles.leaderboard__item} style={{columnGap: '2rem'}}>
          <p style={{textAlign: 'left'}}></p>
          <div>
            <p onClick={handleTeamDetails}style={{textAlign: 'left', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer'}}>{team} <span>({ranking})</span></p>
            {isAthletesOpen && athletes.map((athlete) => (<p style={{textAlign: 'left'}}>{athlete.name}</p>))}
          </div>
          <p>{calculateTeamWodOneResult()} pts</p>
          <p>{calculateTeamWodTwoResult()} pts</p>
          {/* <p>{calculateTeamWodThreeResult()}</p> */}
          {/* <p>{formatTime(firstWodResult)}</p> */}
          {/* <p>{secondWodResult}</p> */}
          {/* <p>{thirdWodResult}</p> */}
        </div>
        </>
    )
}