export default function LeaderboardItem(props) {
    const {
        name:name,
        category,
        firstWodTime:firstWodResult,
        firstWodReps,
        secondWodReps:secondWodResult,
        thirdWodReps: thirdWodResult,
        rankingWodOne,
        rankingWodTwo,
        rankingTotal} = props.athlete;

    function formatTime(seconds) {
        if(seconds === 900){
            return firstWodReps
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    return (
        <>
        <div className='leaderboard__item'>
          <p style={{textAlign: 'left'}}>{name} <span>({rankingTotal})</span></p>
          <p>{category}</p>
          <p>{formatTime(firstWodResult)} <span>({rankingWodOne})</span></p>
          <p>{secondWodResult} <span>({rankingWodTwo})</span></p>
          <p>{thirdWodResult}</p>
        </div>
        </>
    )
}