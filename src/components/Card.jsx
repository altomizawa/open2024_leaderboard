import '../styles/Card.css'
import { convertToTime } from '../utils/convertFirstWod'
import placeholder from '../assets/profile_placeholder.jpg'

function Card({ athlete, wod }) {
  return (
    <div key={athlete.id}>
        <div className='card'>
          <img src={athlete.avatar!==undefined ? athlete.avatar : placeholder} alt={athlete.name} />
          <div className='card__header'>
            <h2>{athlete.name}</h2>
            <h3>{athlete.category.toUpperCase()}</h3>
          </div>
          <div className='card__scores'>
          <div className='card__wod'>
              <p style={{fontWeight: '700'}}>WOD</p>
              <p style={{fontWeight: '700'}}>RESULT</p>
              <p style={{fontWeight: '700'}}>POINTS</p>
              <p style={{fontWeight: '700'}}>RANK.</p>
            </div>
            <div className='card__wod'>
              <p>24.1</p>
              <p>{athlete.wodOneTime===900 ? athlete.wodOneResult + ' reps' : convertToTime(athlete.wodOneTime)}</p>
              <p>{athlete.wodOneRanking}</p>
              <p>{athlete.wodOneRanking}</p>
            </div>
            <div className='card__wod'>
              <p>24.2</p>
              <p>{athlete.wodTwoResult} reps</p>
              <p>{athlete.wodOneRanking + athlete.wodTwoRanking}</p>
              <p>{athlete.wodTwoRanking}</p>
            </div>
            <div className='card__wod'>
              <p>24.3</p>
              <p>{athlete.wodThreeTime===900 ? athlete.wodThreeResult + ' reps': convertToTime(athlete.wodThreeTime)}</p>
              <p>{athlete.wodOneRanking + athlete.wodTwoRanking + athlete.wodThreeRanking}</p>
              <p>{athlete.wodThreeRanking}</p>
            </div>
          </div>
          <h4>POSITION: {athlete.finalRanking}</h4>
        </div>
      </div>
  )
}

export default Card
