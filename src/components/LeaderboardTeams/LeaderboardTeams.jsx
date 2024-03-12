import styles from '../LeaderboardTeams/LeaderboardTeams.module.css'



export default function LeaderboardTeams(props){
    const {filterIcon, sortIcon} = props;
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
        </>
    )
}