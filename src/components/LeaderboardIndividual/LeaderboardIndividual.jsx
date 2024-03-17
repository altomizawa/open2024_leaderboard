import styles from './LeaderboardIndividual.module.css'

import filterIcon from '../../assets/filter_list_FILL0_wght400_GRAD0_opsz24.svg'
import sortIcon from '../../assets/sort_FILL0_wght400_GRAD0_opsz24.svg'


export default function LeaderboardIndividual(props) {
    const {CreateAthleteResult, handleNameSorting, handleCategoryChange, handleFirstWodSorting, handleSecondWodSorting, handleThirdWodSorting} =  props;
    return(
        <div>
          <div className={styles.leaderboard__header}>
            <h2 className={styles.leaderboard__position}></h2>
            <h2 style={{textAlign: 'left', cursor: 'pointer', userSelect: 'none'}} onClick={handleNameSorting}><img src={sortIcon}/>Nome</h2>
            <h2 onClick={handleCategoryChange} style={{cursor: "pointer", userSelect: 'none'}}><img src={filterIcon}/>Categoria</h2>
            <h2 onClick={handleFirstWodSorting} style={{cursor: "pointer", userSelect: 'none'}}><img src={sortIcon}/>24.1</h2>
            <h2 onClick={handleSecondWodSorting} style={{cursor: "pointer", userSelect: 'none'}}><img src={sortIcon}/>24.2</h2>
            <h2 onClick={handleThirdWodSorting} style={{cursor: "pointer", userSelect: 'none'}}><img src={sortIcon}/>24.3</h2>
            <h2 style={{cursor: "pointer", userSelect: 'none'}}>TOTAL</h2>
          </div>
          <CreateAthleteResult />
        </div>
    )
}