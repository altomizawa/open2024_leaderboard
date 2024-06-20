import '../styles/Card.css'


function Card({ athlete }) {
  return (
    <div key={athlete.id}>
        <div className='card'>
          <img src={athlete.avatar} alt={athlete.name} />
          <div className='card__header'>
            <h2>{athlete.name}</h2>
            <h3>{athlete.category.toUpperCase()}</h3>
          </div>
          <div className='card__scores'>
          <div className='card__wod'>
              <p style={{fontWeight: '700'}}>WOD</p>
              <p style={{fontWeight: '700'}}>RESULT</p>
              <p style={{fontWeight: '700'}}>POINTS</p>
              <p style={{fontWeight: '700'}}>POS</p>
            </div>
            <div className='card__wod'>
              <p>24.1</p>
              <p>{athlete.firstResult} reps</p>
              <p>{athlete.firstPoints}</p>
              <p>{athlete.firstPosition}</p>
            </div>
            <div className='card__wod'>
              <p>24.1</p>
              <p>{athlete.secondResult} reps</p>
              <p>{athlete.secondPoints}</p>
              <p>{athlete.secondPosition}</p>
            </div>
            <div className='card__wod'>
              <p>24.1</p>
              <p>{athlete.thirdResult} reps</p>
              <p>{athlete.thirdPoints}</p>
              <p>{athlete.thirdPosition}</p>
            </div>
          </div>
          <h4>POSITION: {athlete.overallPosition}</h4>
        </div>
      </div>
  )
}

export default Card
