import styles from './LeaderboardItem.module.css'

export default function LeaderboardItem(props) {
    const position = props.index
    const {
        name:name,
        category,
        firstWodTime:firstWodResult,
        firstWodReps,
        secondWodReps:secondWodResult,
        thirdWodTime: thirdWodResult,
        thirdWodReps,
        rankingWodOne,
        rankingWodTwo,
        rankingWodThree,
        rankingTotal} = props.athlete;

    function formatTimeWodOne(seconds) {
        if(seconds === 900){
            return firstWodReps
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    function formatTimeWodThree(seconds) {
        if(seconds === 900){
            return thirdWodReps
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    function totalPoints() {
        return  rankingWodOne + rankingWodTwo + rankingWodThree
    }

    

    return (
        <>
        <div className={styles.leaderboard__item}>
          <p className={styles.leaderboard__position}>{position}</p>
          <p style={{textAlign: 'left'}}>{name} <span>({rankingTotal})</span></p>
          <p>{category}</p>
          <p>{formatTimeWodOne(firstWodResult)} <span>({rankingWodOne})</span></p>
          <p>{secondWodResult} <span>({rankingWodTwo})</span></p>
          <p>{formatTimeWodThree(thirdWodResult)} <span>({rankingWodThree})</span></p>
          <p>{totalPoints()}</p>
        </div>
        </>
    )
}