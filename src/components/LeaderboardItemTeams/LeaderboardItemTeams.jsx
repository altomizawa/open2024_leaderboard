import styles from './LeaderboardItemTeams.module.css'

export default function LeaderboardItemTeams(props) {
    console.log(props.team)
    const {name:name, category, firstWodTime:firstWodResult, firstWodReps, secondWodReps:secondWodResult, thirdWodReps: thirdWodResult, team} = props.athlete;
    function formatTime(seconds) {
        if(seconds === 900 && !firstWodReps){
            return firstWodReps
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    return (
        <>
        <div className={styles.leaderboard__item}>
          <p style={{textAlign: 'left'}}></p>
          <p style={{textAlign: 'left'}}>{name}</p>
          <p>{team}</p>
          <p>{formatTime(firstWodResult)}</p>
          <p>{secondWodResult}</p>
          <p>{thirdWodResult}</p>
        </div>
        </>
    )
}